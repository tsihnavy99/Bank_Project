package com.temisone.bank.User;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigInteger;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.Security;
import java.security.SignatureException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CRLException;
// import java.security.cert.CRLReason;
import java.security.cert.CertPath;
import java.security.cert.CertPathValidator;
import java.security.cert.CertPathValidatorException;
import java.security.cert.CertStore;
import java.security.cert.Certificate;
import java.security.cert.CertificateEncodingException;
import java.security.cert.CertificateException;
import java.security.cert.CertificateExpiredException;
import java.security.cert.CertificateFactory;
import java.security.cert.CertificateNotYetValidException;
import java.security.cert.CertificateParsingException;
import java.security.cert.CollectionCertStoreParameters;
import java.security.cert.PKIXCertPathValidatorResult;
import java.security.cert.PKIXParameters;
import java.security.cert.TrustAnchor;
import java.security.cert.X509CRL;
import java.security.cert.X509CRLEntry;
import java.security.cert.X509Certificate;
import java.security.cert.X509Extension;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Set;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.security.auth.x500.X500Principal;

import org.bouncycastle.asn1.x509.BasicConstraints;
import org.bouncycastle.asn1.x509.KeyUsage;
import org.bouncycastle.asn1.x509.X509Extensions;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.x509.X509V2CRLGenerator;
import org.bouncycastle.x509.X509V3CertificateGenerator;
import org.bouncycastle.x509.extension.AuthorityKeyIdentifierStructure;
import org.bouncycastle.x509.extension.SubjectKeyIdentifierStructure;

public class CertTest {
enum CertType {ROOT,INTER,ENDENTITY};
	
	// RSA 키생성 함수 
	public static KeyPair generateRSAKeyPair() throws NoSuchAlgorithmException {
		KeyPairGenerator kpg  = KeyPairGenerator.getInstance("RSA");
		kpg.initialize(1024);
		return kpg.genKeyPair();
	}
	
	// 인증서 생성 함수 
	public static X509Certificate generateCertificate(
			X500Principal subjectDN,	// 주체
			PublicKey pubKey,			// 공개키
			PrivateKey signatureKey,	// 발급키 (발급자의 서명키)
			X509Certificate caCert,		// 발급자 인증서
			CertType type)				// 인증서 종류
		throws CertificateEncodingException,NoSuchProviderException,NoSuchAlgorithmException,SignatureException,InvalidKeyException,CertificateParsingException {
		X509V3CertificateGenerator certGen = new X509V3CertificateGenerator();
		certGen.setSerialNumber(BigInteger.valueOf(System.currentTimeMillis())); // 인증서 일련번호를 현재시간정보로부터 설정 
		if(type==CertType.ROOT)  // 루트인증서인 경우 발급자와 사용자가 똑같이 루트임 
			certGen.setIssuerDN(subjectDN);
		else  // 일반 사용자 인증서인 경우 함수에 입력된 값을 이용 
			certGen.setIssuerDN(caCert.getSubjectX500Principal());
		certGen.setSubjectDN(subjectDN);
		GregorianCalendar currentDate = new GregorianCalendar();  // 발급시간 
		GregorianCalendar expiredDate // 만료시간, 인증서의 유효기간은 2년으로 설정했음  
			= new GregorianCalendar(currentDate.get(Calendar.YEAR)+2,currentDate.get(Calendar.MONTH),currentDate.get(Calendar.DAY_OF_MONTH));
		certGen.setNotBefore(currentDate.getTime()); // 유효기간 시작
		certGen.setNotAfter(expiredDate.getTime());  // 유효기간 만료 
		certGen.setPublicKey(pubKey); // 공개키 설정
		certGen.setSignatureAlgorithm("SHA1withRSAEncryption");  // 서명알고리즘 설정 
		if(type!=CertType.ROOT){   // 루트인증서인 경우의 확장영역 
			certGen.addExtension(X509Extensions.AuthorityKeyIdentifier, false, 
				new AuthorityKeyIdentifierStructure(caCert));
			certGen.addExtension(X509Extensions.SubjectKeyIdentifier, false, 
				new SubjectKeyIdentifierStructure(pubKey));
		}
		if(type!=CertType.ENDENTITY){   // 중간 인증기관인 경우의 확장영역. 키의 사용용도를 전자서명, 인증서 서명, CRL 서명의 용도로 사용할 수 있음  
			certGen.addExtension(X509Extensions.BasicConstraints, true, new BasicConstraints(0));
			certGen.addExtension(X509Extensions.KeyUsage, true, 
					new KeyUsage(KeyUsage.digitalSignature | KeyUsage.keyCertSign | KeyUsage.cRLSign));
		}
		else  // 일반 사용자인 경우의 확장영역. 키의 사용용도는 전자서명용, 키암호화용으로 사용 가능  
			certGen.addExtension(X509Extensions.KeyUsage, true, 
				new KeyUsage(KeyUsage.digitalSignature | KeyUsage.keyEncipherment));
		return certGen.generate(signatureKey,"BC");  // 인증서를 생성하여 결과로 리턴 
	}
	
	// CRL 생성 함수. CRL은 인증기관이 생성하여 공표  
	public static X509CRL generateCRL(
			X509Certificate caCert,		// CRL 발급자 인증서
			PrivateKey signatureKey,	// CRL 발급자 서명키
			BigInteger serialNumber)	// 폐지할 인증서 일련번호
		throws CRLException,NoSuchProviderException,NoSuchAlgorithmException,SignatureException,InvalidKeyException{
		X509V2CRLGenerator crlGen = new X509V2CRLGenerator();  // CRL을 위한 변수명 설정 
		crlGen.setIssuerDN(caCert.getSubjectX500Principal());  // CRL의 발급자는 인증기관  
		GregorianCalendar currentDate = new GregorianCalendar(); // 발급시간 
		GregorianCalendar nextDate   // 다음 업데이트 시간 
			= new GregorianCalendar(currentDate.get(Calendar.YEAR)+1,(currentDate.get(Calendar.MONTH)+1)%12,currentDate.get(Calendar.DAY_OF_MONTH));
		crlGen.setThisUpdate(currentDate.getTime());
		crlGen.setNextUpdate(nextDate.getTime());
		crlGen.setSignatureAlgorithm("SHA1withRSAEncryption");  // 서명알고리즘 설정 
		if(serialNumber!=null)   // 폐지할 인증서의 일련번호를 엔트리에 추가 
			crlGen.addCRLEntry(serialNumber, currentDate.getTime(), 1);
		return crlGen.generate(signatureKey,"BC");   // CRL을 생성하여 출력 
	}
	
	public static void main(String[] args) throws IOException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException{
		// BouncyCastle Provider 추가
		Security.addProvider(new BouncyCastleProvider());  // 프로바이더 추가 
		/*String providerName = "BC";
		if(Security.getProvider(providerName)==null){
			System.out.println("Provider Not Installed");
		}
		else System.out.println("Provider Installed");*/
		try{
			KeyPair rootKeyPair = generateRSAKeyPair();  // 루트인증기관 키생성 및 인증서 발급
			X509Certificate rootCert = generateCertificate(
					new X500Principal("C=KR,CN=ROOT"), rootKeyPair.getPublic(),
					rootKeyPair.getPrivate(), null, CertType.ROOT);
			//System.out.println(rootCert);
			KeyPair interKeyPair = generateRSAKeyPair();  // 중간인증기관의 키생성 및 인증서 발급 
			X509Certificate interCert = generateCertificate(
					new X500Principal("C=KR,CN=INTER"), interKeyPair.getPublic(),
					rootKeyPair.getPrivate(), rootCert, CertType.INTER);
			//System.out.println(interCert);
			KeyPair aliceKeyPair = generateRSAKeyPair();  // 사용자 Alice의 키생성 및 인증서 발급 
			X509Certificate aliceCert = generateCertificate(
					new X500Principal("C=KR,O=KUT,OU=IME,CN=Alice"), aliceKeyPair.getPublic(),
					interKeyPair.getPrivate(), interCert, CertType.ENDENTITY);
			//System.out.println(aliceCert);
			KeyPair bobKeyPair = generateRSAKeyPair();   // 사용자 Bob의 키생성 및 인증서 발급 
			X509Certificate bobCert = generateCertificate(
					new X500Principal("C=KR,CN=Bob"), bobKeyPair.getPublic(),
					interKeyPair.getPrivate(), interCert, CertType.ENDENTITY);
			//System.out.println(bobCert);
			
			// 루트인증기관의 CRL 생성 
			X509CRL rootCRL = generateCRL(rootCert,rootKeyPair.getPrivate(),null);
			// 중간인증기관이 CRL 생성 - Bob의 키를 취소시키기 위해 Bob의 인증서 일련번호를 추가   
			X509CRL interCRL = generateCRL(interCert,interKeyPair.getPrivate(),bobCert.getSerialNumber());
			
			rootCert.verify(rootKeyPair.getPublic());  // 루트인증기관의 인증서 유효성 검증 

			// 일반사용자 Alice의 인증서 유효성 검증 
			try{
				aliceCert.checkValidity(new Date());  // 현재시간과 유효기간의 비교 
			}
			catch(CertificateExpiredException cee){   // 유효기간이 지난 경우 에러메시지 
				cee.printStackTrace();
			}
			catch(CertificateNotYetValidException cnyve){  // 유효기간이 아직 시작되지 않은 경우 에러메시지 
				cnyve.printStackTrace();
			}
			aliceCert.verify(interKeyPair.getPublic());  // 인증서의 서명 검증 
			
			// Alice의 인증서를 파일로 저장
			System.out.println("\n* Alice 인증서 : 생성 후");
			System.out.println(aliceCert);   // 인증서 내용을 화면에 표시 
			System.out.println("\n* Alice 공개키 : 생성 후 ");
			System.out.println(aliceCert.getPublicKey());  // 공개키 내용을 화면에 표시  
			FileOutputStream fos = new FileOutputStream(new File("aliceCert.der")); 
			fos.write(aliceCert.getEncoded());  // 파일로 저장 
			fos.close();
			
			// 인증서 파일 읽어오기 
			CertificateFactory cf = CertificateFactory.getInstance("X.509");
			FileInputStream fis = new FileInputStream(new File("aliceCert.der"));
			X509Certificate cert = (X509Certificate)cf.generateCertificate(fis);  // 파일에서 읽어서 인증서 형식으로 할당 
			fis.close();
			System.out.println("\n* Alice 인증서 : 저장 후 읽어온 것 ");
			System.out.println(cert);
			System.out.println("\n* Alice 공개키 : 저장 후 읽어온 것 ");
			System.out.println(cert.getPublicKey()); 
			
			// RSA 암호화 - 인증서에 저장된 공개키 이용  
			System.out.println("\n* Alice의 인증서에서 읽어온 공개키로 RSA 암호화 ");
			String plaintext = "Hello world!";
			System.out.println("평문 : "+plaintext);
			byte[] t0 = plaintext.getBytes();
	        Cipher cipher = Cipher.getInstance("RSA");
	        cipher.init(Cipher.ENCRYPT_MODE, cert.getPublicKey());
	        byte[] b0 = cipher.doFinal(t0);
	        System.out.print("\n 암호문 : ");
	        for(byte b: b0) System.out.printf("%02X ", b); 
	        System.out.println();
	        			
			// 개인키를 파일로 저장
	        // 개인키는 암호화하여 저장해야 하며 암호화를 위한 키 코드가 필요 
			System.out.println("\n* Alice 개인키 : 생성 후 ");
			System.out.println(aliceKeyPair.getPrivate()); 	// 생성된 그대로 화면에 표시 		
			char[] code = {'s','e','c','r','e','t','c','o','d','e'};  // 개인키 암호화를 위한 키 코드 설정. 편의상 고정하였음 
			// 이 소프트웨어를 여러 사용자가 사용하게 되는 경우 키 코드를 사용자 입력으로 받을 수 있도록 변경할 필요 
			KeyStore ks = KeyStore.getInstance(KeyStore.getDefaultType());  // 키스토어라는 형태로 저장하게 됨 
			ks.load(null,null);
			X509Certificate[] chain = new X509Certificate[3];  // 키스토어에 저장시 인증체인 정보 필요. 루트로부터 사용자까지의 인증서 정보  
			chain[0] = aliceCert;
			chain[1] = interCert;  // 중간인증기관이 Alice에게 인증서를 발급 
			chain[2] = rootCert;  // 루트인증기관이 중간인증기관의 인증서를 발급 
			ks.setKeyEntry("AlicePrivateKeyAlias",aliceKeyPair.getPrivate(),code,chain); // 필요한 정보를 키스토어에 암호화하여 저장 
			fos = new FileOutputStream(new File("alicePriv.key"));   
			ks.store(fos,code);  // 키스토어의 내용을 code로 암호화하여 파일로 저장 
			fos.close();
			
			// 개인키 파일 읽어오기 
			fis = new FileInputStream(new File("alicePriv.key"));
			ks = KeyStore.getInstance(KeyStore.getDefaultType());
			ks.load(fis,code);  // 파일에서 읽어와서 키스토어에 로드 
			fis.close();
			PrivateKey alicePrivateKey = (PrivateKey)ks.getKey("AlicePrivateKeyAlias",code); // 키스토어에서 개인키를 읽어올때 암호화 키 코드 필요 
			System.out.println("\n* Alice 개인키 : 저장 후 읽어온 것 ");
			System.out.println(alicePrivateKey);
			
			// RSA 복호화 - 개인키 파일에서 읽어온 개인키 이용   
			System.out.println("\n* Alice의 개인키 파일에서 읽어온 개인키로 RSA 복호화 ");
	        cipher.init(Cipher.DECRYPT_MODE, alicePrivateKey);
	        byte[] b1 = cipher.doFinal(b0);
	        System.out.print("\n 복호화된 평문 : "+ new String(b1) +"\n"); 
	        for(byte b: b1) System.out.printf("%02X ", b); 			
	        System.out.println();
	        
			// 인증서 폐지 여부 검사
			System.out.println("\n* CRL : 생성 후  ");
			X509CRLEntry entry = interCRL.getRevokedCertificate(bobCert.getSerialNumber());
			if(entry!=null){
				System.out.printf("인증서번호: %d%n", entry.getSerialNumber());
				if(entry.getCertificateIssuer()==null)
					System.out.printf("발급자: %s%n", interCRL.getIssuerX500Principal());
				else System.out.printf("발급자: %s%n", entry.getCertificateIssuer());
			}
			System.out.println("\n Bob의 인증서  ");
			System.out.println(bobCert);
			
			// CRL 파일 저장
			fos = new FileOutputStream(new File("inter.crl"));
			fos.write(interCRL.getEncoded());
			fos.close();
			// CRL 파일 읽어오기 
			cf = CertificateFactory.getInstance("X.509");
			fis = new FileInputStream(new File("inter.crl"));
			X509CRL newcrl = (X509CRL)cf.generateCRL(fis);
			fis.close();
			entry = newcrl.getRevokedCertificate(bobCert.getSerialNumber());
			System.out.println("\n* CRL : 저장 후 읽어온 것 ");
			if(entry!=null){
				System.out.printf("인증서번호: %d%n", entry.getSerialNumber());
				if(entry.getCertificateIssuer()==null)
					System.out.printf("발급자: %s%n", newcrl.getIssuerX500Principal());
				else System.out.printf("발급자: %s%n", entry.getCertificateIssuer());
			}
			
			// 인증서 디렉토리 생성
			List<X509Extension> list = new ArrayList<X509Extension>();
			list.add(rootCert);
			list.add(interCert);
			list.add(aliceCert);
			list.add(bobCert);
			list.add(rootCRL);
			list.add(interCRL);
			// System.out.println(list);
			
			CollectionCertStoreParameters params = new CollectionCertStoreParameters(list);
			CertStore store = CertStore.getInstance("Collection",params);
			
			// 인증 경로 생성 및 확인
			cf = CertificateFactory.getInstance("X.509");
			List<Certificate> certChain = new ArrayList<Certificate>();
			certChain.add(bobCert);
			certChain.add(interCert);
			CertPath certPath = cf.generateCertPath(certChain);
			Set<TrustAnchor> trust = Collections.singleton(new TrustAnchor(rootCert,null));
			CertPathValidator validator = CertPathValidator.getInstance("PKIX","BC");
			PKIXParameters param = new PKIXParameters(trust);
			param.addCertStore(store);
			param.setDate(new Date());
			try{
				PKIXCertPathValidatorResult result = (PKIXCertPathValidatorResult)validator.validate(certPath,param);
				System.out.println(result);
			}
			catch(CertPathValidatorException e){
				System.out.println("\n* 인증 경로");
				System.out.println(e.getCertPath());
				System.out.println("\n* 검증 실패 사유");
				System.out.println("validation failed "+e.getIndex()+" detail: "+e.getMessage());
			}	
		}
		catch(NoSuchAlgorithmException nsae){
			nsae.printStackTrace();
		}
		catch(CertificateException ce){
			ce.printStackTrace();
		}
		catch(InvalidKeyException ike){
			ike.printStackTrace();
		}
		catch(InvalidAlgorithmParameterException iape){
			iape.printStackTrace();
		}
		catch(SignatureException se){
			se.printStackTrace();
		}
		catch(NoSuchProviderException nspre){
			nspre.printStackTrace();
		}
		catch(KeyStoreException kse){
			kse.printStackTrace();
		}
		catch(UnrecoverableKeyException uke){
			uke.printStackTrace();
		}
		catch(CRLException nsae){
			nsae.printStackTrace();
		}
	}
}

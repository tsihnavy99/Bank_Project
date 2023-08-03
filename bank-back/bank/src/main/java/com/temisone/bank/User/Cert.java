package com.temisone.bank.User;


import java.io.File;
import java.io.FileInputStream;
// import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.math.BigInteger;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.InvalidKeyException;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
// import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
// import java.security.PrivateKey;
import java.security.SignatureException;
// import java.security.cert.CertificateEncodingException;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
// import java.security.cert.X509CRL;
// import java.security.cert.X509CRLEntry;
import java.security.cert.X509Certificate;
import java.util.Date;

// import javax.crypto.Cipher;

import org.bouncycastle.jce.X509Principal;
import org.bouncycastle.x509.X509V3CertificateGenerator;

public class Cert {
	
	public static BigInteger makeCert() throws CertificateException, NoSuchProviderException, NoSuchAlgorithmException, KeyStoreException, IOException, InvalidKeyException, IllegalStateException, SignatureException  {
		ObjectOutputStream os = new ObjectOutputStream(new FileOutputStream("C:\\cert\\temisone.key"));
		KeyPairGenerator kpg = KeyPairGenerator.getInstance("RSA");
		kpg.initialize(1024);
		KeyPair mKeyPair = kpg.genKeyPair();
		
		os.writeObject(mKeyPair);
		os.close();
		
		
		X509V3CertificateGenerator v3CertGen = new X509V3CertificateGenerator();
		v3CertGen.setSerialNumber(new BigInteger("1234"));
		v3CertGen.setIssuerDN(new X509Principal("CN=temisone, OU=temisone, O=Company, L=Seoul, C=KR"));
		v3CertGen.setNotBefore(new Date());
		v3CertGen.setNotAfter(new Date(System.currentTimeMillis()+1000L*60*60*24*365*10));
		v3CertGen.setSubjectDN(new X509Principal("CN=temisone, OU=temisone, O=Company, L=Seoul, C=KR"));
		v3CertGen.setPublicKey(mKeyPair.getPublic());
		v3CertGen.setSignatureAlgorithm("SHA1withRSA");
		
		X509Certificate pKCertificate = v3CertGen.generate(mKeyPair.getPrivate());
		
		
		/*
		 * Security.addProvider(new
		 * org.bouncycastle.jce.provider.BouncyCastleProvider()); CertificateFactory
		 * certFactory = CertificateFactory.getInstance("X.509", "BC");
		 * 
		 * X509Certificate certificate = (X509Certificate) certFactory
		 * .generateCertificate(new FileInputStream(certificatePath));
		 * 
		 * KeyPairGenerator rsaGen = KeyPairGenerator.getInstance("RSA"); final KeyPair
		 * pair = rsaGen.generateKeyPair();
		 */

		// pkcs12 key store 생성
		/*
		 * KeyStore pkcs12 = KeyStore.getInstance("jks"); pkcs12.load(null, null);
		 * 
		 * pkcs12.setKeyEntry("temisonePrivate", mKeyPair.getPrivate(),
		 * "temisone1245".toCharArray(), new Certificate[] { pKCertificate });
		 * 
		 * // PFX 파일 저장 try (FileOutputStream p12 = new
		 * FileOutputStream("C:/cert/temisone.crt")) {
		 * response.setContentType("application/x-x509-ca-cert");
		 * response.setHeader("Content-Disposition",
		 * String.format("attachment;filename=%s.crt", "temisone"));
		 * 
		 * pkcs12.store(response.getOutputStream(), "temisone1245".toCharArray()); }
		 */
		FileOutputStream fos = new FileOutputStream("C:\\cert\\temisone.crt");
		fos.write(pKCertificate.getEncoded());
		fos.close();
		System.out.println("키저장완료");
		return pKCertificate.getSerialNumber();
	}
	public static void deleteCert() {
		Path crtPath = Paths.get("C:\\cert\\temisone.crt");
		Path keyPath = Paths.get("C:\\cert\\temisone.key");
		
		try {
			Files.delete(crtPath);
			Files.delete(keyPath);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	public static BigInteger verify() throws CertificateException, IOException {
		CertificateFactory cf = CertificateFactory.getInstance("X.509");
		FileInputStream fis = new FileInputStream(new File("C:/cert/temisone.crt"));
		X509Certificate cert = (X509Certificate)cf.generateCertificate(fis);  // 파일에서 읽어서 인증서 형식으로 할당 
		fis.close();
		return cert.getSerialNumber();
	}
	
}

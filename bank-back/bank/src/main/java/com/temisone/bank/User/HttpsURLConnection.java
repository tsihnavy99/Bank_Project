package com.temisone.bank.User;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.security.KeyManagementException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.KeyManager;
import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.TrustManagerFactory;
import javax.net.ssl.X509TrustManager;

public class HttpsURLConnection {
	static String urlString= "https://localhost:443";
	static String line = null;
	static InputStream in = null;
	static BufferedReader reader = null;
	static javax.net.ssl.HttpsURLConnection httpsConn = null;
	public HttpsURLConnection() throws IOException, NoSuchAlgorithmException, KeyManagementException, KeyStoreException, CertificateException, UnrecoverableKeyException {
		URL url = new URL(urlString);
		httpsConn = (javax.net.ssl.HttpsURLConnection) url.openConnection();
		
		// Set Hostname verification
		httpsConn.setHostnameVerifier(new HostnameVerifier() {
			@Override
			public boolean verify(String hostname, SSLSession session) {
				// Ignore host name verification. It always returns true.
				return true;
			}
		});
		
		// Input setting
		httpsConn.setDoInput(true);
		// Output setting
		//httpsConn.setDoOutput(true);
		// Caches setting
		httpsConn.setUseCaches(false);
		// Read Timeout Setting
		httpsConn.setReadTimeout(1000);
		// Connection Timeout setting
		httpsConn.setConnectTimeout(1000);
		// Method Setting(GET/POST)
		httpsConn.setRequestMethod("GET");
		// Header Setting
		httpsConn.setRequestProperty("HeaderKey","HeaderValue");
		KeyStore clientStore = KeyStore.getInstance("jks");
		clientStore.load(new FileInputStream("C:/cert/temisone.crt"),"temisone1245".toCharArray());
		
		KeyManagerFactory kmf = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm());
		kmf.init(clientStore,"temisone1245".toCharArray());
		KeyManager[] kms = kmf.getKeyManagers();
		
		KeyStore trustStore = KeyStore.getInstance("jks");
		trustStore.load(new FileInputStream("C:/java_hyj/jre/lib/security/cacerts"),"temisone1245".toCharArray() );
		
		TrustManagerFactory tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
		tmf.init(trustStore);
		TrustManager[] trustAllCerts = new TrustManager[] { new X509TrustManager() {
			public java.security.cert.X509Certificate[] getAcceptedIssuers() {
				return null;
			}

			public void checkClientTrusted(X509Certificate[] certs, String authType){
			}

			public void checkServerTrusted(X509Certificate[] certs, String authType) {
			}
		} };

		
		SSLContext sslContext = null;
		sslContext = SSLContext.getInstance("TLS");
		sslContext.init(kms, trustAllCerts,new SecureRandom());
		
		httpsConn.setSSLSocketFactory(sslContext.getSocketFactory());
		System.out.println("끝");
		
		httpsConn.connect();
		httpsConn.setInstanceFollowRedirects(false);
	}
	public String returnMethod() {
		// TODO Auto-generated method stub
		 return urlString;
	}
	
}

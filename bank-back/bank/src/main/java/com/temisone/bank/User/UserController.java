package com.temisone.bank.User;

import java.io.IOException;

import java.math.BigInteger;
// import java.net.http.HttpResponse;
import java.security.InvalidKeyException;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.SignatureException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;
// import java.util.HashMap;
// import java.util.Map;

// import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
// import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
@CrossOrigin
@Controller
public class UserController {
	@Autowired
	UserService userService;
	@RequestMapping(value = "/cert",method = RequestMethod.POST)
	public ResponseEntity<?> cert(@RequestBody RequestUser rUser) throws CertificateException, IOException, InvalidKeyException, IllegalStateException, NoSuchAlgorithmException, SignatureException, NoSuchProviderException, KeyManagementException, UnrecoverableKeyException, KeyStoreException {
		//신원확인
		UserVo userVo = userService.selectUser(rUser.getUserId());
		System.out.println(rUser.getUserId());
		System.out.println(userVo);
		Response response2 = new Response();
		response2.setType("result");
		if(userVo.getUserId()==null) {
			
			response2.setContent("fail-0");
		}else {
			//인증서 확인
			if(userVo.getCert()==1) {
				response2.setContent("fail-1");
				
			}else {
				BigInteger crtCode = Cert.makeCert();
				CertVo certVo = new CertVo();
				certVo.setCertSerial(crtCode);
				certVo.setUserId(userVo.getUserId());
				userService.insertCert(certVo);
				userVo.setCert(1);
				userService.updateUser(userVo);
				response2.setContent("success");
			}
		}
		return new ResponseEntity<Response>(response2,HttpStatus.OK);
		/*
		 * HttpsURLConnection connection = new HttpsURLConnection(); Response response2
		 * = new Response(); response2.setType("redirectUrl");
		 * response2.setContent(connection.returnMethod()); return new
		 * ResponseEntity<>(response2,HttpStatus.OK);
		 */
	}
	
	@RequestMapping(value = "/dcert",method = RequestMethod.POST)
	public ResponseEntity<?> dcert(@RequestBody RequestUser rUser) throws CertificateException, IOException, InvalidKeyException, IllegalStateException, NoSuchAlgorithmException, SignatureException, NoSuchProviderException, KeyManagementException, UnrecoverableKeyException, KeyStoreException {
		//신원확인
		UserVo userVo = userService.selectUser(rUser.getUserId());
		System.out.println(rUser.getUserId());
		System.out.println(userVo);
		Response response2 = new Response();
		response2.setType("result");
		if(userVo.getUserId()==null) {
			
			response2.setContent("fail-0");
		}else {
			//인증서 확인
			if(userVo.getCert()==0) {
				response2.setContent("fail-1");
				
			}else {
				Cert.deleteCert();
				userVo.setCert(0);
				userService.updateUser(userVo);
				response2.setContent("success");
			}
		}
		return new ResponseEntity<Response>(response2,HttpStatus.OK);
		/*
		 * HttpsURLConnection connection = new HttpsURLConnection(); Response response2
		 * = new Response(); response2.setType("redirectUrl");
		 * response2.setContent(connection.returnMethod()); return new
		 * ResponseEntity<>(response2,HttpStatus.OK);
		 */
	}
	@RequestMapping(value = "/signUp",method =RequestMethod.POST)
	public ResponseEntity<?> signUp(@RequestBody UserVo user){
		userService.insertUser(user);
		Response response = new Response();
		response.setType("result");
		response.setContent("success");
		return new ResponseEntity<Response>(response,HttpStatus.OK);
	}
	@RequestMapping(value = "/idLogin",method = RequestMethod.POST)
	public ResponseEntity<?> idLogin(@RequestBody UserVo ruser){
		UserVo userVo = userService.selectUser(ruser.getUserId());
		Response response = new Response();
		response.setType("type");
		if(ruser.getUserPassword().equals(userVo.getUserPassword())) {
			response.setContent("success");
			return new ResponseEntity<Response>(response,HttpStatus.OK);
		}else {
			response.setContent("fail");
			return new ResponseEntity<Response>(response,HttpStatus.OK);
		}
	}
	@RequestMapping(value = "/certLogin",method = RequestMethod.POST)
	public ResponseEntity<?> certLogin(@RequestBody UserVo ruser) throws CertificateException, IOException{
		UserVo userVo = userService.selectName(ruser);
		CertVo cert = userService.selectCert(userVo);
		Response response = new Response();
		BigInteger serial = Cert.verify();
		response.setType("type");
		if(cert.getCertSerial().equals(serial)) {
			response.setContent("success");
			return new ResponseEntity<Response>(response,HttpStatus.OK);
		}else {
			response.setContent("fail");
			return new ResponseEntity<Response>(response,HttpStatus.OK);
		}
	}
	@RequestMapping(value = "/countUser", method = RequestMethod.GET)
	@ResponseBody
	public int selectUserCount() throws IOException {
		return userService.selectUserCount();
	}
	
}

package com.temisone.bank.LoginBefore;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@CrossOrigin
@Controller
public class LoginBeforeContoller {
	
	@ResponseBody
	@RequestMapping(value = "/before")
	public ResponseEntity<?> before() {
		System.out.println("지나갑니다");
		return new ResponseEntity<String>("aaaaa",HttpStatus.OK);
		
	}

}

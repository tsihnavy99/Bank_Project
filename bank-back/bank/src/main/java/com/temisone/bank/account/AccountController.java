package com.temisone.bank.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
// import org.springframework.web.bind.annotation.ResponseBody;

import com.temisone.bank.User.Response;

@CrossOrigin
@Controller
public class AccountController {
	
	@Autowired
	AccountService accountService;
	
	@RequestMapping(value = "/accountInsert", method = RequestMethod.POST)
	public ResponseEntity<?> accountInsert(@RequestBody AccountVo accountVo) throws Exception{
		System.out.println("지나가나요1==============>"+accountVo.getAccountPw());
		accountService.accountInsert(accountVo);
		Response response = new Response();
		response.setType("result");
		response.setContent("success");
		System.out.println("지나가나요2==============>");
		return new ResponseEntity<Response>(response,HttpStatus.OK);
		
	}

}

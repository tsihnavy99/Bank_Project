package com.temisone.bank.AccountSub;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.temisone.bank.User.Response;

@CrossOrigin
@Controller
public class AccountSubController {
	@Autowired
	AccountSubService accountService;
	
	@RequestMapping(value = "/getAccounts",method = RequestMethod.POST)
	public ResponseEntity<?> getAccounts(@RequestBody AccountSubVo accountVo) throws Exception {

		accountVo.setUserId("hyj1077");	// userId session 받아와야함
		
		return new ResponseEntity<List<AccountSubVo>>(accountService.getAccounts(accountVo),HttpStatus.OK);
	}
	
	@RequestMapping(value = "/checkAccountNo",method = RequestMethod.POST)
	public ResponseEntity<?> checkAccountNo(@RequestBody AccountSubVo accountVo) throws Exception {

		int result = accountService.checkAccountNo(accountVo);
		
		Response response = new Response();
		response.setType("result");
		
		response.setContent((result==0)?"success":"fail");
				
		return new ResponseEntity<Response>(response,HttpStatus.OK);
	}
	
	@RequestMapping(value = "/setAccountMyway",method = RequestMethod.POST)
	public ResponseEntity<?> setAccountMyway(@RequestBody AccountSubVo accountVo) throws Exception {
		
		accountVo.setUserId("hyj1077");	// userId session 받아와야함
		
		int result = accountService.setMyway(accountVo);
		Response response = new Response();
		response.setType("result");
		
		response.setContent((result>0)?"success":"fail");
		
		return new ResponseEntity<Response>(response,HttpStatus.OK);
	}
	
	@RequestMapping(value = "/deleteAccountMyway",method = RequestMethod.POST)
	public ResponseEntity<?> deleteAccountMyway(@RequestBody AccountSubVo accountVo) throws Exception {
		
		accountVo.setUserId("hyj1077");	// userId session 받아와야함
		
		int result = accountService.deleteMyway(accountVo);
		Response response = new Response();
		response.setType("result");
		
		response.setContent((result>0)?"success":"fail");
		
		return new ResponseEntity<Response>(response,HttpStatus.OK);
	}
	
	@RequestMapping(value = "/accountTransfer",method = RequestMethod.POST)
	public ResponseEntity<?> accountTransfer(@RequestBody TransactionDetailVo detail) throws Exception {
		
		detail.setUserId("hyj1077");	// userId session 받아와야함

		int result = accountService.accountTransfer(detail);
		result += accountService.updateAccountAmount(detail);
		Response response = new Response();
		response.setType("result");
		
		response.setContent((result>1)?"success":"fail");
		
		return new ResponseEntity<Response>(response,HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getDetails",method = RequestMethod.POST)
	public ResponseEntity<?> getDetails(@RequestBody AccountSubVo accountVo) throws Exception {
		return new ResponseEntity<List<TransactionDetailVo>>(accountService.getDetails(accountVo),HttpStatus.OK);
	}
	
}

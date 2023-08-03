package com.temisone.bank.AccountAuto;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.temisone.bank.AccountSub.AccountSubVo;
import com.temisone.bank.User.Response;

@CrossOrigin
@Controller
public class AccountAutoController {
	@Autowired
	AccountAutoService accountAutoService;

	@RequestMapping(value = "/accountAutoList", method = RequestMethod.POST)
	public ResponseEntity<?> accountAutoList(@RequestBody AccountSubVo accountVo) throws Exception {
		
		accountVo.setUserId("hyj1077");	// userId session 받아와야함
		
		return new ResponseEntity<List<AccountAutoVo>>(accountAutoService.accountAutoList(accountVo),HttpStatus.OK);
	}
	
	@RequestMapping(value = "/checkReceiveAccountNo", method = RequestMethod.POST)
	public ResponseEntity<?> checkReceiveAccountNo(@RequestBody AccountSubVo accountVo) throws Exception {
				
		int result = accountAutoService.checkReceiveAccountNo(accountVo);
				
		Response response = new Response();
		response.setType("result");
		
		String content=accountAutoService.getRecipient(accountVo);
		
		response.setContent((result>0&&content!=null)?content:"fail");
		
				
		return new ResponseEntity<Response>(response,HttpStatus.OK);
	}
	
	@RequestMapping(value = "/addAccountAuto", method = RequestMethod.POST)
	public ResponseEntity<?> addAccountAuto(@RequestBody AccountAutoVo accountAutoVo) throws Exception {
		
		accountAutoVo.setUserId("hyj1077");	// userId session 받아와야함
		int result = accountAutoService.addAccountAuto(accountAutoVo);
		
		Response response = new Response();
		response.setType("result");
		response.setContent((result>0)?"success":"fail");
		
		return new ResponseEntity<Response>(response,HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getAccountAuto", method = RequestMethod.POST)
	public ResponseEntity<?> getAccountAuto(@RequestBody AccountAutoVo accountAutoVo) throws Exception {
		
		accountAutoVo.setUserId("hyj1077");	// userId session 받아와야함
		
		return new ResponseEntity<AccountAutoVo>(accountAutoService.getAccountAuto(accountAutoVo),HttpStatus.OK);
	}
	
	@RequestMapping(value = "/updateAccountAuto", method = RequestMethod.POST)
	public ResponseEntity<?> updateAccountAuto(@RequestBody AccountAutoVo accountAutoVo) throws Exception {
		
		int result = accountAutoService.updateAccountAuto(accountAutoVo);
		result += accountAutoService.setAccountAuto(accountAutoVo);
		
		Response response = new Response();
		response.setType("result");
		response.setContent((result>1)?"success":"fail");
		
		return new ResponseEntity<Response>(response,HttpStatus.OK);
	}
}

package com.temisone.bank.AccountAuto;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.temisone.bank.AccountSub.AccountSubVo;

@Service
public class AccountAutoService {
	@Autowired
	AccountAutoDAO accountAutoDAO;
	
	public List<AccountAutoVo> accountAutoList(AccountSubVo accountVo){
		return accountAutoDAO.accountAutoList(accountVo);
	}
	
	public int checkReceiveAccountNo(AccountSubVo accountVo) {
		return accountAutoDAO.checkReceiveAccountNo(accountVo);
	}
	
	public String getRecipient(AccountSubVo accountVo) {
		return accountAutoDAO.getRecipient(accountVo);
	}
	public int addAccountAuto(AccountAutoVo accountAutoVo){
		return accountAutoDAO.addAccountAuto(accountAutoVo);
	}
	
	public AccountAutoVo getAccountAuto(AccountAutoVo accountAutoVo) {
		return accountAutoDAO.getAccountAuto(accountAutoVo);
	}
	public int updateAccountAuto(AccountAutoVo accountAutoVo){
		return accountAutoDAO.updateAccountAuto(accountAutoVo);
	}
	
	public int setAccountAuto(AccountAutoVo accountAutoVo) {
		return accountAutoDAO.setAccountAuto(accountAutoVo);
	}
	
	
}

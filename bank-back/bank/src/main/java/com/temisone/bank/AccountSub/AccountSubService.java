package com.temisone.bank.AccountSub;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountSubService {
	@Autowired
	AccountSubDAO accountDAO;
	
	public List<AccountSubVo> getAccounts(AccountSubVo accountVo) {
		return accountDAO.getAccounts(accountVo);
	}
	public int checkAccountNo(AccountSubVo accountVo){
		return accountDAO.checkAccountNo(accountVo);
	}
	
	public int setMyway(AccountSubVo accountVo){
		return accountDAO.setMyway(accountVo);
	}
	
	public int deleteMyway(AccountSubVo accountVo){
		return accountDAO.deleteMyway(accountVo);
	}
	
	public int accountTransfer(TransactionDetailVo detail) {
		return accountDAO.accountTransfer(detail);
	}
	
	public int updateAccountAmount(TransactionDetailVo detail) {
		return accountDAO.updateAccountAmount(detail);
	}
	
	public List<TransactionDetailVo> getDetails(AccountSubVo accountVo) {
		return accountDAO.getDetails(accountVo);
	}
}

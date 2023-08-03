package com.temisone.bank.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl implements AccountService{
	
	@Autowired
	AccountDao accountDao;

	@Override
	public void accountInsert(AccountVo accountVo) throws Exception {
		// TODO Auto-generated method stub
		accountDao.accountInsert(accountVo);
	}

}

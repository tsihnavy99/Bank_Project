package com.temisone.bank.account;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AccountDaoImpl implements AccountDao{
	
	@Autowired
	private SqlSession sqlSession;

	@Override
	public void accountInsert(AccountVo accountVo) throws Exception {
		// TODO Auto-generated method stub
		sqlSession.insert("account.accountInsert", accountVo);
	}
	
	
}

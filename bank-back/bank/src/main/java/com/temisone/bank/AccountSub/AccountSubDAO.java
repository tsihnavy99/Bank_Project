package com.temisone.bank.AccountSub;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


@Repository
public class AccountSubDAO {
	@Autowired
	SqlSession sqlSession;
	
	public List<AccountSubVo> getAccounts(AccountSubVo accountVo) {
		return sqlSession.selectList("accountSub.getAccounts", accountVo);
	}
	public int checkAccountNo(AccountSubVo accountVo){
		return sqlSession.selectOne("accountSub.checkAccountNo", accountVo);
	}
	
	public int setMyway(AccountSubVo accountVo){
		return sqlSession.update("accountSub.setMyway", accountVo);
	}
	
	public int deleteMyway(AccountSubVo accountVo){
		return sqlSession.update("accountSub.deleteMyway", accountVo);
	}
	
	public int accountTransfer(TransactionDetailVo detail) {
		return sqlSession.insert("accountSub.accountTransfer", detail);
	}
	
	public int updateAccountAmount(TransactionDetailVo detail) {
		return sqlSession.update("accountSub.updateAccountAmount", detail);
	}
	
	public List<TransactionDetailVo> getDetails(AccountSubVo accountVo) {
		return sqlSession.selectList("accountSub.getDetails", accountVo);
	}
}

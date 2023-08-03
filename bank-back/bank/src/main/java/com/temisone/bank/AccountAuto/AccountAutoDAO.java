package com.temisone.bank.AccountAuto;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.temisone.bank.AccountSub.AccountSubVo;

@Repository
public class AccountAutoDAO {
	@Autowired
	SqlSession sqlSession;
	
	public List<AccountAutoVo> accountAutoList(AccountSubVo accountVo){
		return sqlSession.selectList("accountAuto.accountAutoList", accountVo);
	}
	
	public int checkReceiveAccountNo(AccountSubVo accountVo) {
		return sqlSession.selectOne("accountAuto.checkReceiveAccountNo", accountVo);
	}
	public String getRecipient(AccountSubVo accountVo) {
		return sqlSession.selectOne("accountAuto.getRecipient", accountVo);
	}
	public int addAccountAuto(AccountAutoVo accountAutoVo){
		return sqlSession.insert("accountAuto.addAccountAuto", accountAutoVo);
	}
	
	public AccountAutoVo getAccountAuto(AccountAutoVo accountAutoVo) {
		return sqlSession.selectOne("accountAuto.getAccountAuto", accountAutoVo);
	}
	
	public int updateAccountAuto(AccountAutoVo accountAutoVo){
		return sqlSession.update("accountAuto.updateAccountAuto", accountAutoVo);
	}
	
	public int setAccountAuto(AccountAutoVo accountAutoVo) {
		return sqlSession.update("accountAuto.setAccountAuto", accountAutoVo);
	}
}

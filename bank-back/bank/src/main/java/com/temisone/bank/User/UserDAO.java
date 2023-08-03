package com.temisone.bank.User;

import org.apache.ibatis.session.SqlSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
@Repository
public class UserDAO {
	@Autowired
	SqlSession session;
	
	public void insertUser(UserVo userVo) {
		session.insert("user.insertUser", userVo);
	}
	public UserVo selectUser(UserVo user) {
		return session.selectOne("user.selectUser", user);
	}
	public void updateUser(UserVo user) {
		session.update("user.updateUser", user);
	}
	public UserVo selectName(UserVo user) {
		return session.selectOne("user.selectName",user);
	}
	public void insertCert(CertVo cert) {
		session.insert("user.insertCert",cert);
	}
	public CertVo selectCert(UserVo user) {
		return session.selectOne("user.selectCert",user);
	}
	public int selectUserCount() {
		return session.selectOne("user.selectUserCount");
	}
}

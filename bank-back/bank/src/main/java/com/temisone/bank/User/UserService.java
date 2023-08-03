package com.temisone.bank.User;

// import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	@Autowired
	UserDAO userDAO;
	public void insertUser(UserVo userVo) {
		userDAO.insertUser(userVo);
	}
	public UserVo selectUser(String userId) {
		UserVo userVo = new UserVo();
		userVo.setUserId(userId);
		return userDAO.selectUser(userVo);
	}
	public void updateUser(UserVo user) {
		userDAO.updateUser(user);
	}
	public UserVo selectName(UserVo user) {
		return userDAO.selectName(user);
	}
	public void insertCert(CertVo cert) {
		userDAO.insertCert(cert);
	}
	public CertVo selectCert(UserVo user) {
		return userDAO.selectCert(user);
	}
	public int selectUserCount() {
		return userDAO.selectUserCount();
	}
}

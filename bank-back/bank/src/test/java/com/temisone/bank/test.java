package com.temisone.bank;

// import java.sql.Connection;
import java.sql.SQLException;

import javax.sql.DataSource;

// import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.temisone.bank.User.UserService;
import com.temisone.bank.User.UserVo;
public class test {
	@Autowired
	UserService userService;
	@Autowired
	DataSource dataSource;
	@Autowired
	SqlSessionFactory sqlSessionFactory;
	@Test
	public void user() throws SQLException {
		UserVo userVo = userService.selectUser("hyj1077");
		System.out.println(userVo);
		
	}
}

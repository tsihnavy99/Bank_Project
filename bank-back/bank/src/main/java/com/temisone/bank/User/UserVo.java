package com.temisone.bank.User;

import java.sql.Date;

public class UserVo {
	private String userId;
	private String accountPw;
	private String userPassword;
	private Date userBirth;
	private int cert;
	private String userName;
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserPassword() {
		return userPassword;
	}
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}
	public String getUserId() {
		return userId;
	}
	@Override
	public String toString() {
		return "UserVo [userId=" + userId + ", accountPw=" + accountPw + ", userBirth=" + userBirth + ", cert=" + cert
				+ "]";
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getAccountPw() {
		return accountPw;
	}
	public void setAccountPw(String accountPw) {
		this.accountPw = accountPw;
	}
	public Date getUserBirth() {
		return userBirth;
	}
	public void setUserBirth(Date userBirth) {
		this.userBirth = userBirth;
	}
	public int getCert() {
		return cert;
	}
	public void setCert(int cert) {
		this.cert = cert;
	}
}

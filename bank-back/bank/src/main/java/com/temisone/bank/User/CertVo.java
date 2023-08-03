package com.temisone.bank.User;

import java.math.BigInteger;

public class CertVo {
	private int certCode;
	private BigInteger certSerial;
	private String userId;
	
	public int getCertCode() {
		return certCode;
	}
	public BigInteger getCertSerial() {
		return certSerial;
	}
	public void setCertSerial(BigInteger certSerial) {
		this.certSerial = certSerial;
	}
	public void setCertCode(int certCode) {
		this.certCode = certCode;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
}

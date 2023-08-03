package com.temisone.bank.account;

public class AccountVo {
	
	private int accountNo;
	private String accountPw;
	private int typeId;
	private String accountMiddle;
	private String accountLast;
	private String accountNickName;
	private String accountMyWay;
	private String userId ;
	private int accountAuto;
	private String accountWithdrawal;
	private String startMoney;
	private String accountAmount;
	public int getAccountNo() {
		return accountNo;
	}
	public void setAccountNo(int accountNo) {
		this.accountNo = accountNo;
	}
	public String getAccountPw() {
		return accountPw;
	}
	public void setAccountPw(String accountPw) {
		this.accountPw = accountPw;
	}
	public int getTypeId() {
		return typeId;
	}
	public void setTypeId(int typeId) {
		this.typeId = typeId;
	}
	public String getAccountMiddle() {
		return accountMiddle;
	}
	public void setAccountMiddle(String accountMiddle) {
		this.accountMiddle = accountMiddle;
	}
	public String getAccountLast() {
		return accountLast;
	}
	public void setAccountLast(String accountLast) {
		this.accountLast = accountLast;
	}
	public String getAccountNickName() {
		return accountNickName;
	}
	public void setAccountNickName(String accountNickName) {
		this.accountNickName = accountNickName;
	}
	public String getAccountMyWay() {
		return accountMyWay;
	}
	public void setAccountMyWay(String accountMyWay) {
		this.accountMyWay = accountMyWay;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public int getAccountAuto() {
		return accountAuto;
	}
	public void setAccountAuto(int accountAuto) {
		this.accountAuto = accountAuto;
	}
	public String getAccountWithdrawal() {
		return accountWithdrawal;
	}
	public void setAccountWithdrawal(String accountWithdrawal) {
		this.accountWithdrawal = accountWithdrawal;
	}
	public String getStartMoney() {
		return startMoney;
	}
	public void setStartMoney(String startMoney) {
		this.startMoney = startMoney;
	}
	public String getAccountAmount() {
		return accountAmount;
	}
	public void setAccountAmount(String accountAmount) {
		this.accountAmount = accountAmount;
	}
	
	@Override
	public String toString() {
		return "AccountVo [accountNo=" + accountNo + ", accountPw=" + accountPw + ", typeId=" + typeId
				+ ", accountMiddle=" + accountMiddle + ", accountLast=" + accountLast + ", accountNickName="
				+ accountNickName + ", accountMyWay=" + accountMyWay + ", userId=" + userId + ", accountAuto="
				+ accountAuto + ", accountWithdrawal=" + accountWithdrawal + ", startMoney=" + startMoney
				+ ", accountAmount=" + accountAmount + "]";
	}
	
	
	

}

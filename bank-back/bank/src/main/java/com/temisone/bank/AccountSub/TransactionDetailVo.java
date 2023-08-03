package com.temisone.bank.AccountSub;

public class TransactionDetailVo {
	private int transactionNo;
	private int typeId;
	private int accountMiddle;
	private int accountLast;
	private String sender;
	private String recipient;
	private int depositAmount;
	private int withdrawalAmount;
	private int balance;
	private String userId;
	private String receiveAccount;
	
	
	public int getTransactionNo() {
		return transactionNo;
	}
	public void setTransactionNo(int transactionNo) {
		this.transactionNo = transactionNo;
	}
	public int getTypeId() {
		return typeId;
	}
	public void setTypeId(int typeId) {
		this.typeId = typeId;
	}
	public int getAccountMiddle() {
		return accountMiddle;
	}
	public void setAccountMiddle(int accountMiddle) {
		this.accountMiddle = accountMiddle;
	}
	public int getAccountLast() {
		return accountLast;
	}
	public void setAccountLast(int accountLast) {
		this.accountLast = accountLast;
	}
	public String getSender() {
		return sender;
	}
	public void setSender(String sender) {
		this.sender = sender;
	}
	public String getRecipient() {
		return recipient;
	}
	public void setRecipient(String recipient) {
		this.recipient = recipient;
	}
	public int getDepositAmount() {
		return depositAmount;
	}
	public void setDepositAmount(int depositAmount) {
		this.depositAmount = depositAmount;
	}
	public int getWithdrawalAmount() {
		return withdrawalAmount;
	}
	public void setWithdrawalAmount(int withdrawalAmount) {
		this.withdrawalAmount = withdrawalAmount;
	}
	public int getBalance() {
		return balance;
	}
	public void setBalance(int balance) {
		this.balance = balance;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getReceiveAccount() {
		return receiveAccount;
	}
	public void setReceiveAccount(String receiveAccount) {
		this.receiveAccount = receiveAccount;
	}
}

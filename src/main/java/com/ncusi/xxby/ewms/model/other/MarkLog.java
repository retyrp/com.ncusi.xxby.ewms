package com.ncusi.xxby.ewms.model.other;

public class MarkLog {

	private String code;// 流水号
	private int mark;
	private String aimID;
	private String userID;
	private String remark;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public int getMark() {
		return mark;
	}

	public void setMark(int mark) {
		this.mark = mark;
	}

	public String getAimID() {
		return aimID;
	}

	public void setAimID(String aimID) {
		this.aimID = aimID;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}

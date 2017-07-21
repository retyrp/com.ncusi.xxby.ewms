package com.ncusi.xxby.ewms.model.warehouse;

import java.sql.Timestamp;

public class Move {

	private String code;
	private String opID;
	private String aimID;
	private String sourceID;
	private Timestamp date;
	private String goodID;
	private int quantity;
	private int state;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getOpID() {
		return opID;
	}

	public void setOpID(String opID) {
		this.opID = opID;
	}

	public String getAimID() {
		return aimID;
	}

	public void setAimID(String aimID) {
		this.aimID = aimID;
	}

	public String getSourceID() {
		return sourceID;
	}

	public void setSourceID(String sourceID) {
		this.sourceID = sourceID;
	}

	public Timestamp getDate() {
		return date;
	}

	public void setDate(Timestamp date) {
		this.date = date;
	}

	public String getGoodID() {
		return goodID;
	}

	public void setGoodID(String goodID) {
		this.goodID = goodID;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

}

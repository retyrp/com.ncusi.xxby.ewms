package com.ncusi.xxby.ewms.model.other;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class Order {

	private String code;
	private String user;
	private BigDecimal price;
	private Timestamp date;
	private String State;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public Timestamp getDate() {
		return date;
	}

	public void setDate(Timestamp date) {
		this.date = date;
	}

	public String getState() {
		return State;
	}

	public void setState(String state) {
		State = state;
	}

}

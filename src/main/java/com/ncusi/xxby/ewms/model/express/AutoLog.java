package com.ncusi.xxby.ewms.model.express;

import java.sql.Timestamp;

public class AutoLog {

	private String code;// 流水号
	private String opCode;// 操作码
	private String eCode;// 物流代号
	private Timestamp date;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getOpCode() {
		return opCode;
	}

	public void setOpCode(String opCode) {
		this.opCode = opCode;
	}

	public String geteCode() {
		return eCode;
	}

	public void seteCode(String eCode) {
		this.eCode = eCode;
	}

	public Timestamp getDate() {
		return date;
	}

	public void setDate(Timestamp date) {
		this.date = date;
	}

}

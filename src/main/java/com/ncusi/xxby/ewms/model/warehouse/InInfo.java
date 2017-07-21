package com.ncusi.xxby.ewms.model.warehouse;

import java.math.BigDecimal;

public class InInfo {

	private String code;// 流水号
	private String opCode;// 操作码
	private String warehouseID;
	private String goodID;
	private String tGoodID;// 用户自定义商品编号
	private String goodName;// 商品名称
	private BigDecimal price;
	private int classID;
	private int quantity;
	private String remark;
	private String userID;

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	@Override
	public String toString() {
		return "InInfo [code=" + code + ", opCode=" + opCode + ", warehouseID=" + warehouseID + ", goodID=" + goodID
				+ ", tGoodID=" + tGoodID + ", goodName=" + goodName + ", price=" + price + ", classID=" + classID
				+ ", quantity=" + quantity + ", remark=" + remark + ", userID=" + userID + "]";
	}

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

	public String getWarehouseID() {
		return warehouseID;
	}

	public void setWarehouseID(String warehouseID) {
		this.warehouseID = warehouseID;
	}

	public String getGoodID() {
		return goodID;
	}

	public void setGoodID(String goodID) {
		this.goodID = goodID;
	}

	public String gettGoodID() {
		return tGoodID;
	}

	public void settGoodID(String tGoodID) {
		this.tGoodID = tGoodID;
	}

	public String getGoodName() {
		return goodName;
	}

	public void setGoodName(String goodName) {
		this.goodName = goodName;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public int getClassID() {
		return classID;
	}

	public void setClassID(int classID) {
		this.classID = classID;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}

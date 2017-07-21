package com.ncusi.xxby.ewms.model.user;

public class UserAddress {

	private String indexA;
	private String address;
	private String warehouseID;// 绑定一个仓库，设计添加时绑定默认仓库
	private String userId;

	public String getIndexA() {
		return indexA;
	}

	public void setIndexA(String indexA) {
		this.indexA = indexA;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getWarehouseID() {
		return warehouseID;
	}

	public void setWarehouseID(String warehouseID) {
		this.warehouseID = warehouseID;
	}
}

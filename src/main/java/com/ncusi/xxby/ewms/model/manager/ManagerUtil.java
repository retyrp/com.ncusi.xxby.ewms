package com.ncusi.xxby.ewms.model.manager;

public class ManagerUtil {

	private String id;
	private String name;
	private String sex;
	private String birth;
	private String phone;
	private String mail;
	private String address;
	private String cridet;
	private String warehouse;
	private int star;
	private String remark;

	public ManagerUtil() {
		super();
	}

	public ManagerUtil setManagerUtil(ManagerInfo i) {
		this.id = i.getID();
		this.name = i.getName();
		this.sex = i.getSex();
		this.birth = i.getBirth().toString();
		this.phone = i.getPhone();
		this.mail = i.getMail();
		this.address = i.getAddress();
		this.cridet = i.getCredit();
		this.warehouse = i.getWarehouseID();
		this.star = i.getStar();
		this.remark = i.getOther();
		return this;
	}

	public ManagerUtil(String id, String name, String sex, String birth, String phone, String mail, String address,
			String cridet, String warehouse, int star, String remark) {
		super();
		this.id = id;
		this.name = name;
		this.sex = sex;
		this.birth = birth;
		this.phone = phone;
		this.mail = mail;
		this.address = address;
		this.cridet = cridet;
		this.warehouse = warehouse;
		this.star = star;
		this.remark = remark;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getBirth() {
		return birth;
	}

	public void setBirth(String birth) {
		this.birth = birth;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCridet() {
		return cridet;
	}

	public void setCridet(String cridet) {
		this.cridet = cridet;
	}

	public String getWarehouse() {
		return warehouse;
	}

	public void setWarehouse(String warehouse) {
		this.warehouse = warehouse;
	}

	public int getStar() {
		return star;
	}

	public void setStar(int star) {
		this.star = star;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}

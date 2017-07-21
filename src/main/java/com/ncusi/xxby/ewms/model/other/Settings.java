package com.ncusi.xxby.ewms.model.other;

public class Settings {

	// sms配置
	private String smsHost = "http://sms.market.alicloudapi.com";
	private String smsPath = "/singleSendSms";
	private String smsMethod = "GET";
	private String smsAppcode = "null";

	// identity配置
	private String identityHost = "http://idcard.market.alicloudapi.com";
	private String identityPath = "/lianzhuo/idcard";
	private String identityMethod = "GET";
	private String identityAppcode = "null";

	// ECI配置
	private String Ehost = "http://ali.eci.yjapi.com";
	private String Epath = "/ECI/GetDetails";
	private String Emethod = "GET";
	private String Eappcode = "null";

	public String getEhost() {
		return Ehost;
	}

	public void setEhost(String ehost) {
		Ehost = ehost;
	}

	public String getEpath() {
		return Epath;
	}

	public void setEpath(String epath) {
		Epath = epath;
	}

	public String getEmethod() {
		return Emethod;
	}

	public void setEmethod(String emethod) {
		Emethod = emethod;
	}

	public String getEappcode() {
		return Eappcode;
	}

	public void setEappcode(String eappcode) {
		Eappcode = eappcode;
	}

	public String getIdentityHost() {
		return identityHost;
	}

	public void setIdentityHost(String identityHost) {
		this.identityHost = identityHost;
	}

	public String getIdentityPath() {
		return identityPath;
	}

	public void setIdentityPath(String identityPath) {
		this.identityPath = identityPath;
	}

	public String getIdentityMethod() {
		return identityMethod;
	}

	public void setIdentityMethod(String identityMethod) {
		this.identityMethod = identityMethod;
	}

	public String getIdentityAppcode() {
		return identityAppcode;
	}

	public void setIdentityAppcode(String identityAppcode) {
		this.identityAppcode = identityAppcode;
	}

	public String getSmsHost() {
		return smsHost;
	}

	public void setSmsHost(String smsHost) {
		this.smsHost = smsHost;
	}

	public String getSmsPath() {
		return smsPath;
	}

	public void setSmsPath(String smsPath) {
		this.smsPath = smsPath;
	}

	public String getSmsMethod() {
		return smsMethod;
	}

	public void setSmsMethod(String smsMethod) {
		this.smsMethod = smsMethod;
	}

	public String getSmsAppcode() {
		return smsAppcode;
	}

	public void setSmsAppcode(String smsAppcode) {
		this.smsAppcode = smsAppcode;
	}

}

package com.ncusi.xxby.ewms.model.cache;

import java.util.List;

import com.ncusi.xxby.ewms.model.express.Express;

public class CacheExpress {

	private String key;
	private List<Express> value;
	private long timeOut;
	private boolean expired;

	public CacheExpress() {
		super();
	}

	public CacheExpress(String key, List<Express> value, long timeOut, boolean expired) {
		this.key = key;
		this.value = value;
		this.timeOut = timeOut;
		this.expired = expired;
	}

	public String getKey() {
		return key;
	}

	public long getTimeOut() {
		return timeOut;
	}

	public List<Express> getValue() {
		return value;
	}

	public void setKey(String string) {
		key = string;
	}

	public void setTimeOut(long l) {
		timeOut = l;
	}

	public void setValue(List<Express> object) {
		value = object;
	}

	public boolean isExpired() {
		return expired;
	}

	public void setExpired(boolean b) {
		expired = b;
	}
}

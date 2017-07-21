package com.ncusi.xxby.ewms.model.cache;

import java.util.List;

import com.ncusi.xxby.ewms.model.other.Price;

public class CachePrice {

	private String key;
	private List<Price> value;
	private long timeOut;
	private boolean expired;

	public CachePrice() {
		super();
	}

	public CachePrice(String key, List<Price> value, long timeOut, boolean expired) {
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

	public List<Price> getValue() {
		return value;
	}

	public void setKey(String string) {
		key = string;
	}

	public void setTimeOut(long l) {
		timeOut = l;
	}

	public void setValue(List<Price> object) {
		value = object;
	}

	public boolean isExpired() {
		return expired;
	}

	public void setExpired(boolean b) {
		expired = b;
	}
}

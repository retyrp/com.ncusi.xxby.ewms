package com.ncusi.xxby.ewms.service.warehouse;

import com.ncusi.xxby.ewms.model.other.Op;

public interface StoreStatusService {

	public Op getStatus(String operationCode);

	public Object handler(String operationCode);

	public String test(String s);
}

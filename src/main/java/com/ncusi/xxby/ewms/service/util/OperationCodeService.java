package com.ncusi.xxby.ewms.service.util;

import com.ncusi.xxby.ewms.model.other.Op;

public interface OperationCodeService {

	public Op addOpCode(Op o);

	public boolean updateOpCode(Op o);

	/**
	 * 获取出入库临时码
	 * 
	 * @param o
	 * @return
	 */
	public String getCodeNumber(String s);

}

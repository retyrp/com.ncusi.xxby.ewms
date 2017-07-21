package com.ncusi.xxby.ewms.service.manager;

import java.util.List;
import java.util.Map;

import com.ncusi.xxby.ewms.model.manager.Manager;

public interface OperateStoreInOutService {

	/**
	 * 出入库操作 临时码
	 * 
	 * @param u
	 * @param s
	 *            临时码
	 * @return
	 */
	public Map<String, List<Object>> operateByCode(String s, Manager m);

	/**
	 * 检查操作是否完成，若完成则删除临时码
	 * 
	 * @param s
	 */
	public void checkCode(String s, Manager m);

}

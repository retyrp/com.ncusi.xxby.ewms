package com.ncusi.xxby.ewms.service.user;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

import com.ncusi.xxby.ewms.model.user.User;
import com.ncusi.xxby.ewms.model.warehouse.InLog;
import com.ncusi.xxby.ewms.model.warehouse.OutLog;
import com.ncusi.xxby.ewms.model.warehouse.Store;

/**
 * 用户查询功能
 * 
 * @author retyr
 *
 */
public interface UserStoreSearchService {
	/**
	 * 获取用户库存信息
	 * 
	 * @param u
	 * @return
	 */
	public List<Store> getStore(User u);

	/**
	 * 获取用户入库记录
	 * 
	 * @param u
	 * @return
	 */
	public List<InLog> getInLog(User u);

	/***
	 * 获取用户出库记录
	 * 
	 * @param u
	 * @return
	 */
	public List<OutLog> getOutLog(User u);

	/**
	 * 获取用户记录按照时间
	 */

	public List<Object> getLogByTime(User u, Timestamp t);

	/**
	 * 按条件查询用户记录
	 */
	public Map<String, List<Object>> getLogPlus(User u, String s);
}

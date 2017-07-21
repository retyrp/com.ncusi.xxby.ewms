package com.ncusi.xxby.ewms.service.manager;

import java.util.List;
import java.util.Map;

/**
 * 管理员查询接口
 * 
 * @author retyr
 *
 */
public interface ManagerStoreSearchService {

	/**
	 * 查询库存
	 * 
	 * @param s
	 * @param store
	 * @return
	 */
	public Map getStore(String store);

	/**
	 * 库存任务
	 * 
	 * @param s
	 * @return
	 */
	public Map<String, List<Object>> getStoreUndo(String s, String store);

	/**
	 * 查看操作日志
	 * 
	 * @return
	 */
	public Map<String, List<Object>> LogCat(String s);

	/**
	 * 清理旧的日志
	 * 
	 * @return
	 */
	public boolean LogClear();
}

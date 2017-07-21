package com.ncusi.xxby.ewms.service.manager;

import com.ncusi.xxby.ewms.model.warehouse.InInfo;
import com.ncusi.xxby.ewms.model.warehouse.Out;
import com.ncusi.xxby.ewms.model.warehouse.Store;
import com.ncusi.xxby.ewms.model.warehouse.StoreBox;

/**
 * 库存处理接口
 * 
 * @author retyr
 *
 */
public interface OperateStoreService {

	/**
	 * 库存处理器
	 * 
	 * @param uid
	 * @param id
	 */
	public void storeHandler(String uid, String id);

	/**
	 * 入库处理单元
	 * 
	 * @param uid
	 * @param id
	 */
	public InInfo storeInHandler(String uid, String id);

	/**
	 * 入库Store表
	 * 
	 * @param inInfo
	 * @return
	 */
	public Store getStoreIn(InInfo inInfo);

	/**
	 * 生成箱子
	 * 
	 * @param s
	 * @return
	 */
	public StoreBox createBox(String uid, String id, InInfo i);

	/**
	 * 获取箱子
	 * 
	 * @param s
	 * @return
	 */
	public StoreBox getBox(String uid, String id, Out o, Store s);

	/**
	 * 入库日志记录
	 * 
	 * @param i
	 */
	public void storeInLog(String uid, String id, InInfo inInfo, Store s);

	/**
	 * 出库处理器单元
	 * 
	 * @param uid
	 * @param id
	 */
	public Out storeOutHandler(String uid, String id);

	/**
	 * 出库Store表
	 * 
	 * @param inInfo
	 * @return
	 */
	public Store getStoreOut(Out out);

	/**
	 * 出库日志记录
	 * 
	 * @param o
	 */
	public void storeOutLog(String uid, String id, Out inInfo, Store s);
}

package com.ncusi.xxby.ewms.service.manager;

import java.util.List;

import com.ncusi.xxby.ewms.model.manager.Manager;
import com.ncusi.xxby.ewms.model.warehouse.Move;
import com.ncusi.xxby.ewms.model.warehouse.MoveInfo;

public interface OperateStoreMoveService {
	/**
	 * 移库表查询
	 * 
	 * @return
	 */
	public List<Move> search(String w);

	/**
	 * 移库申请
	 * 
	 * @param move
	 */
	public void addMove(Manager m, Move move);

	/**
	 * 取消申请
	 * 
	 * @param key
	 */
	public void deleteMove(String key);

	/**
	 * 同意申请
	 * 
	 * @param m
	 */
	public void checkApply(Move m, String managerID);

	/**
	 * 移库日志查询
	 * 
	 * @param w
	 * @return
	 */
	public List<MoveInfo> Logcat(String w);

	/**
	 * 移库日志添加
	 * 
	 * @param info
	 */
	public void addLog(MoveInfo info);

	/**
	 * 日志删除
	 * 
	 * @param key
	 */
	public void delete(String key);
}

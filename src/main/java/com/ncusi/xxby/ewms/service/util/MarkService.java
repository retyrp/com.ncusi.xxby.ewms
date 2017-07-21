package com.ncusi.xxby.ewms.service.util;

import java.util.List;

import com.ncusi.xxby.ewms.model.other.MarkLog;

public interface MarkService {

	/**
	 * 插入评分记录
	 */
	public int insertMarkLog(MarkLog m);

	/**
	 * 查找评分记录
	 * 
	 * @param m
	 * @return
	 */
	public List<MarkLog> searchMarkLog(MarkLog m);

	/**
	 * 删除评分记录
	 * 
	 * @param m
	 * @return
	 */
	public int deleteMarkLog(MarkLog m);
}

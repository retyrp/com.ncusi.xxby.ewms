package com.ncusi.xxby.ewms.service.user;

import com.ncusi.xxby.ewms.model.cache.Cache;
import com.ncusi.xxby.ewms.model.cache.CacheUserManager;

public interface OpertaionStatusServer {

	/**
	 * 写入缓存
	 * 
	 * @param operateCode
	 *            操作码
	 * @param content
	 *            缓存对象
	 * @param time
	 *            缓存时间
	 */
	public void doCache(CacheUserManager content, long time);

	/**
	 * 获取缓存
	 * 
	 * @param operateCode
	 *            操作码
	 */
	public Cache getCache(CacheUserManager content);

	public Cache getCache(String operationCode);

	/**
	 * 删除缓存
	 * 
	 * @param operateCode
	 *            操作码
	 */
	public boolean delCache(CacheUserManager content);

}

package com.ncusi.xxby.ewms.model.cache;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

import com.ncusi.xxby.ewms.model.express.Express;
import com.ncusi.xxby.ewms.model.other.Price;

public class CacheManager {

	private static HashMap cacheMap = new HashMap();

	/**
	 * This class is singleton so private constructor is used.
	 */
	private CacheManager() {
		super();
	}

	/**
	 * returns cache item from hashmap
	 * 
	 * @param key
	 * @return Cache
	 */
	private synchronized static Cache getCache(String key) {
		return (Cache) cacheMap.get(key);
	}

	private synchronized static CachePrice getCachePrice(String key) {
		return (CachePrice) cacheMap.get(key);
	}

	private synchronized static CacheExpress getCacheExpress(String key) {
		return (CacheExpress) cacheMap.get(key);
	}

	/**
	 * Looks at the hashmap if a cache item exists or not
	 * 
	 * @param key
	 * @return Cache
	 */
	private synchronized static boolean hasCache(String key) {
		return cacheMap.containsKey(key);
	}

	/**
	 * Invalidates all cache
	 */
	public synchronized static void invalidateAll() {
		cacheMap.clear();
	}

	/**
	 * Invalidates a single cache item
	 * 
	 * @param key
	 */
	public synchronized static void invalidate(String key) {
		cacheMap.remove(key);
	}

	/**
	 * Adds new item to cache hashmap
	 * 
	 * @param key
	 * @return Cache
	 */
	private synchronized static void putCache(String key, Cache object) {
		cacheMap.put(key, object);
	}

	/**
	 * Reads a cache item's content
	 * 
	 * @param key
	 * @return
	 */
	public static Cache getContent(String key) {
		if (hasCache(key)) {
			Cache cache = getCache(key);
			if (cacheExpired(cache)) {
				cache.setExpired(true);
			}
			return cache;
		} else {
			return null;
		}
	}

	/**
	 * 
	 * @param key
	 * @param content
	 * @param ttl
	 */
	public static void putContent(String key, Object content, long ttl) {
		Cache cache = new Cache();
		cache.setKey(key);
		cache.setValue(content);
		cache.setTimeOut(ttl + new Date().getTime());
		cache.setExpired(false);
		putCache(key, cache);
	}

	public static void putContent(String key, Object content) {
		Cache cache = new Cache();
		cache.setKey(key);
		cache.setValue(content);
		cache.setExpired(false);
		putCache(key, cache);
	}

	private static boolean cacheExpired(Cache cache) {
		if (cache == null) {
			return false;
		}
		long milisNow = new Date().getTime();
		long milisExpire = cache.getTimeOut();
		if (milisExpire < 0) { // Cache never expires
			return false;
		} else if (milisNow >= milisExpire) {
			return true;
		} else {
			return false;
		}
	}

	public static void putContentPrice(String key, List<Price> searchPrice) {
		CachePrice cache = new CachePrice();
		cache.setKey(key);
		cache.setValue(searchPrice);
		cache.setExpired(false);
		putCache(key, cache);

	}

	public static CachePrice getContentPrice(String key) {
		if (hasCache(key)) {
			CachePrice cache = getCachePrice(key);
			if (cacheExpired(cache)) {
				cache.setExpired(true);
			}
			return cache;
		} else {
			return null;
		}
	}

	private static boolean cacheExpired(CachePrice cache) {
		if (cache == null) {
			return false;
		}
		long milisNow = new Date().getTime();
		long milisExpire = cache.getTimeOut();
		if (milisExpire < 0) { // Cache never expires
			return false;
		} else if (milisNow >= milisExpire) {
			return true;
		} else {
			return false;
		}
	}

	private static void putCache(String key, CacheExpress cache) {
		cacheMap.put(key, cache);
	}

	public static void putContentExpress(String key, List<Express> searchPrice) {
		CacheExpress cache = new CacheExpress();
		cache.setKey(key);
		cache.setValue(searchPrice);
		cache.setExpired(false);
		putCache(key, cache);

	}

	public static CacheExpress getContentExpress(String key) {
		if (hasCache(key)) {
			CacheExpress cache = getCacheExpress(key);
			if (cacheExpired(cache)) {
				cache.setExpired(true);
			}
			return cache;
		} else {
			return null;
		}
	}

	private static boolean cacheExpired(CacheExpress cache) {
		if (cache == null) {
			return false;
		}
		long milisNow = new Date().getTime();
		long milisExpire = cache.getTimeOut();
		if (milisExpire < 0) { // Cache never expires
			return false;
		} else if (milisNow >= milisExpire) {
			return true;
		} else {
			return false;
		}
	}

	private static void putCache(String key, CachePrice cache) {
		cacheMap.put(key, cache);
	}
}

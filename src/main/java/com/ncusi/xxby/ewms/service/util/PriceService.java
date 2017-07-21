package com.ncusi.xxby.ewms.service.util;

import java.util.List;

import com.ncusi.xxby.ewms.model.other.Price;

public interface PriceService {

	/**
	 * 获取商品组列表
	 */
	public List<Price> getGoodCapture();

	/**
	 * 获取对应商品组
	 */
	public List<Price> getGoodCapture(Price p);
}

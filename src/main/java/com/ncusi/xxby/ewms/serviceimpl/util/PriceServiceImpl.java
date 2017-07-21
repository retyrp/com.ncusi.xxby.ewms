package com.ncusi.xxby.ewms.serviceimpl.util;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ncusi.xxby.ewms.model.cache.CacheManager;
import com.ncusi.xxby.ewms.model.other.Price;
import com.ncusi.xxby.ewms.service.util.PriceService;

@Service("priceService")
public class PriceServiceImpl implements PriceService {

	@Override
	public List<Price> getGoodCapture() {
		return CacheManager.getContentPrice("PriceInfos").getValue();
	}

	@Override
	public List<Price> getGoodCapture(Price p) {
		// TODO Auto-generated method stub
		return null;
	}

}

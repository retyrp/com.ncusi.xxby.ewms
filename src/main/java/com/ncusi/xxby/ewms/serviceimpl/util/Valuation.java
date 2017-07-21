package com.ncusi.xxby.ewms.serviceimpl.util;

import java.math.BigDecimal;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ncusi.xxby.ewms.mapper.OtherMapper;
import com.ncusi.xxby.ewms.model.other.Price;
import com.ncusi.xxby.ewms.model.warehouse.InInfo;
import com.ncusi.xxby.ewms.model.warehouse.StoreBox;

@Service
public class Valuation {

	@Resource
	private OtherMapper om;

	/**
	 * 传入不完整的price和InLog
	 * 
	 * @param p
	 * @param i
	 * @return
	 */
	public double getPrice(StoreBox s) {
		Price p = new Price();
		p.setCode(s.getClassID());
		p = om.searchPrice(p).get(0);
		return p.getPrice().doubleValue();
	}

	public BigDecimal getPriceIn(InInfo i) {
		Price p = new Price();
		p.setCode(i.getClassID());
		p = om.searchPrice(p).get(0);
		return p.getPrice().multiply(BigDecimal.valueOf(i.getQuantity()));
		// TODO Auto-generated method stub

	}

	public String test() {
		InInfo i = new InInfo();
		i.setClassID(1);
		i.setQuantity(10);
		return getPriceIn(i).toString();
	}
}

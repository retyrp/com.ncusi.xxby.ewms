package com.ncusi.xxby.ewms.serviceimpl.user;

import java.math.BigDecimal;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ncusi.xxby.ewms.mapper.OtherMapper;
import com.ncusi.xxby.ewms.mapper.StoreMapper;
import com.ncusi.xxby.ewms.model.other.Op;
import com.ncusi.xxby.ewms.model.other.Price;
import com.ncusi.xxby.ewms.model.user.User;
import com.ncusi.xxby.ewms.model.warehouse.InInfo;
import com.ncusi.xxby.ewms.service.user.OperationInService;
import com.ncusi.xxby.ewms.serviceimpl.util.RandomString;

@Service("OperationInServiceImpl")
public class OperationIn implements OperationInService {

	@Resource
	private OtherMapper om;
	@Resource
	private StoreMapper sm;

	/**
	 * 入库操作
	 * 
	 * @param u
	 *            用户类
	 * @param i
	 *            入库类
	 */
	@Transactional
	public InInfo operateIn(User u, InInfo i, Op o) {
		// 流水号
		i.setCode(RandomString.getStringTime(u.getId()));
		// 交易发起人
		u.getId();
		// 操作码
		i.setOpCode(o.getCode());

		// 仓库编号 *

		// 商品编号*

		// 商品名称*

		// 商品价格*

		// 商品组*

		// 商品数量*

		// 备注*

		// 商品仓库编号*

		// if (i.getGoodID() == null) {
		// i.setGoodID(RandomString.getStringTime(i.gettGoodID()));
		// // **********************************
		//
		// }
		return i;

	}

	@Transactional

	public boolean doOperationIn(User u, InInfo i) {
		if (sm.insertInInfo(i) > 0)
			return true;
		else
			return false;
	}

	/**
	 * 计算每日的价格
	 * 
	 * @param i
	 *            入库类
	 * @return
	 */
	public BigDecimal getPriceIn(InInfo i) {
		Price p = new Price();
		p.setCode(i.getClassID());
		p = om.searchPrice(p).get(0);
		return p.getPrice().multiply(BigDecimal.valueOf(i.getQuantity()));
		// TODO Auto-generated method stub

	}
}

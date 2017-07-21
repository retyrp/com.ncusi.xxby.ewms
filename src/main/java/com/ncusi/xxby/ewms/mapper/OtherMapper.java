package com.ncusi.xxby.ewms.mapper;

import java.util.List;

import com.ncusi.xxby.ewms.model.other.MarkLog;
import com.ncusi.xxby.ewms.model.other.Op;
import com.ncusi.xxby.ewms.model.other.Order;
import com.ncusi.xxby.ewms.model.other.Price;
import com.ncusi.xxby.ewms.model.other.UserOCode;

public interface OtherMapper {

	// 评分记录
	public int insertMarkLog(MarkLog m);

	public List<MarkLog> searchMarkLog(MarkLog m);

	public int deleteMarkLog(MarkLog m);

	// 操作码
	public int insertOp(Op o);

	public List<Op> searchOp(Op o);

	public int deleteOp(Op o);

	public int updateOp(Op o);

	// 订单
	public int insertOrder(Order o);

	public List<Order> searchOrder(Order o);

	public int deleteOrder(Order o);

	public int updateOrder(Order o);

	// 价格
	public int insertPrice(Price p);

	public List<Price> searchPrice(Price p);

	public int updatePrice(Price p);

	public int deletePrice(Price p);

	// 临时操作码
	public int insertUserOCode(UserOCode u);

	public List<UserOCode> searchUserOCode(UserOCode u);

	public int updateUserOCode(UserOCode u);

	public int deleteUserOCode(UserOCode u);
}

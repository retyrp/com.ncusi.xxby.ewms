package com.ncusi.xxby.ewms.serviceimpl.util;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ncusi.xxby.ewms.mapper.OtherMapper;
import com.ncusi.xxby.ewms.model.other.Op;
import com.ncusi.xxby.ewms.model.other.UserOCode;
import com.ncusi.xxby.ewms.service.util.OperationCodeService;

@Service("operationCodeService")
public class OperationCode implements OperationCodeService {

	@Resource
	private OtherMapper om;

	/**
	 * 添加操作码
	 * 
	 * @param o
	 * @return
	 */
	public Op addOpCode(Op o) {
		o.setCode(RandomString.getStringTime(""));
		if (om.insertOp(o) > 0)
			return o;
		else
			return null;
	}

	/**
	 * 操作码数据库更新
	 * 
	 * @param o
	 * @return
	 */
	public boolean updateOpCode(Op o) {
		if (om.updateOp(o) > 0)
			return true;
		else
			return false;
	}

	@Override
	public String getCodeNumber(String s) {
		UserOCode u = new UserOCode();
		u.setOpCode(s);
		om.deleteUserOCode(u);
		u.setoCode(RandomString.rdmNumber(6));
		om.insertUserOCode(u);
		return u.getoCode();
	}
}

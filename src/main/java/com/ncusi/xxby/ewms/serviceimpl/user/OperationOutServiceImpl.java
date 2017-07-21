package com.ncusi.xxby.ewms.serviceimpl.user;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ncusi.xxby.ewms.mapper.StoreMapper;
import com.ncusi.xxby.ewms.model.other.Op;
import com.ncusi.xxby.ewms.model.user.User;
import com.ncusi.xxby.ewms.model.warehouse.Out;
import com.ncusi.xxby.ewms.service.user.OperationOutService;
import com.ncusi.xxby.ewms.serviceimpl.util.RandomString;

@Service(value = "operationOutServiceImpl")
public class OperationOutServiceImpl implements OperationOutService {

	@Resource
	private StoreMapper sm;

	@Override
	public Out operateOut(User u, Out i, Op o) {
		// 出库流水号
		i.setCode(RandomString.getStringTime(u.getId()));
		// 操作码
		i.setOpCode(o.getCode());
		// 仓库编号*

		// 仓库外键*

		// 数量*

		// 备注*
		return i;
	}

	@Override
	@Transactional
	public boolean operationOutDo(User u, Out i) {
		if (sm.insertOut(i) > 0)
			return true;
		else
			return false;
	}

}

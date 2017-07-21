package com.ncusi.xxby.ewms.service.user;

import java.math.BigDecimal;

import com.ncusi.xxby.ewms.model.other.Op;
import com.ncusi.xxby.ewms.model.user.User;
import com.ncusi.xxby.ewms.model.warehouse.InInfo;

public interface OperationInService {

	public InInfo operateIn(User u, InInfo i, Op o);

	public boolean doOperationIn(User u, InInfo i);

	public BigDecimal getPriceIn(InInfo i);
}

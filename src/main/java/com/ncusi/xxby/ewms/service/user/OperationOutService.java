package com.ncusi.xxby.ewms.service.user;

import com.ncusi.xxby.ewms.model.other.Op;
import com.ncusi.xxby.ewms.model.user.User;
import com.ncusi.xxby.ewms.model.warehouse.Out;

public interface OperationOutService {

	public Out operateOut(User u, Out i, Op o);

	public boolean operationOutDo(User u, Out i);
}

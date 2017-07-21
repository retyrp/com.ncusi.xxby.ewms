package com.ncusi.xxby.ewms.mapper;

import java.util.List;

import com.ncusi.xxby.ewms.model.express.Auto;
import com.ncusi.xxby.ewms.model.express.AutoLog;
import com.ncusi.xxby.ewms.model.express.Express;

public interface ExpressMapper {

	// 配送方操作码
	public List<Auto> searchAuto(Auto a);

	public int insertAuto(Auto a);

	public int deleteAuto(Auto a);

	public int updateAuto(Auto a);

	// 日志
	public List<AutoLog> searchAutoLog(AutoLog a);

	public int insertAutoLog(AutoLog a);

	public int deleteAutoLog(AutoLog a);

	// 配送方
	public List<Express> searchExpress(Express e);

	public int insertExpress(Express e);

	public int updateExpress(Express e);

	public int deleteExpress(Express e);

}

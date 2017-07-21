package com.ncusi.xxby.ewms.mapper;

import java.util.List;

import com.ncusi.xxby.ewms.model.warehouse.InInfo;
import com.ncusi.xxby.ewms.model.warehouse.InLog;
import com.ncusi.xxby.ewms.model.warehouse.Move;
import com.ncusi.xxby.ewms.model.warehouse.MoveInfo;
import com.ncusi.xxby.ewms.model.warehouse.Out;
import com.ncusi.xxby.ewms.model.warehouse.OutLog;
import com.ncusi.xxby.ewms.model.warehouse.Store;
import com.ncusi.xxby.ewms.model.warehouse.StoreBox;
import com.ncusi.xxby.ewms.model.warehouse.StoreInfo;
import com.ncusi.xxby.ewms.model.warehouse.StoreState;

public interface StoreMapper {

	// 添加
	public int insertStore(StoreInfo s);

	// 查出所有
	public List<StoreInfo> getStoreInfo(StoreInfo s);

	// 条件查询
	public List<StoreInfo> getStoreInfoPlus(StoreInfo s);

	// 删除
	public int deleteStoreInfo(StoreInfo s);

	// 修改by
	public int updateStoreInfo(StoreInfo s);

	// ----------------------------------------------------------
	// 查询仓库货品
	public List<Store> getStore(Store s);

	// 添加仓库货品
	public int insertStoreS(Store s);

	// 更改仓库货品
	public int updateStoreS(Store s);

	// 删除仓库货品
	public int deleteStoreS(Store s);

	// ---------------------------------------------------------------
	// 查询box
	public List<StoreBox> getBox(StoreBox b);

	// 添加box
	public int insertBox(StoreBox b);

	// 删除box
	public int deleteBox(StoreBox b);

	// ---------------------------------------------------------------------
	// 仓库状态日志查询
	public List<StoreState> getStoreStateLog(StoreState s);

	// 添加状态日志
	public int insertStoreStateLog(StoreState s);

	// 删除状态日志
	public int deleteStoreStateLog(StoreState s);

	// --------------------------------------------------------------------------
	// 入库表查询
	public List<InInfo> getInInfo(InInfo i);

	// 入库表添加
	public int insertInInfo(InInfo i);

	// 入库表删除
	public int deleteInInfo(InInfo i);

	// 入库表更新
	public int updateInInfo(InInfo i);

	// ---------------------------------------------------------------------------------
	// 入库日志查询
	public List<InLog> getInLog(InLog i);

	// 入库日志添加
	public int insertInLog(InLog i);

	// 入库日志删除
	public int deleteInLog(InLog i);

	// ----------------------------------------------------------------------------------
	// 出库表查询
	public List<Out> getOut(Out o);

	// 出库表添加
	public int insertOut(Out o);

	// 出库表删除
	public int deleteOut(Out o);

	// 出库表更新
	public int updateOut(Out o);

	// ---------------------------------------------------------------------------------------
	// 出库日志查询
	public List<OutLog> getOutLog(OutLog o);

	// 出库日志添加
	public int insertOutLog(OutLog o);

	// 出库日志删除
	public int deleteOutLog(OutLog o);

	// ----------------------------------------------------------------------------------------
	// 移库表查询
	public List<Move> getMove(Move m);

	// 移库表添加
	public int insertMove(Move m);

	// 移库表删除
	public int deleteMove(Move m);

	// 移库表更新
	public int updateMove(Move m);

	// ----------------------------------------------------------------------------------------
	// 移库日志查询
	public List<MoveInfo> getMoveInfo(MoveInfo m);

	// 移库日志添加
	public int insertMoveInfo(MoveInfo m);

	// 移库日志删除
	public int deleteMoveInfo(MoveInfo m);
}

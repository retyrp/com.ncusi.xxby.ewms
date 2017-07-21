package com.ncusi.xxby.ewms.serviceimpl.user;

import javax.annotation.Resource;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import com.ncusi.xxby.ewms.mapper.ManagerMapper;
import com.ncusi.xxby.ewms.model.manager.Manager;
import com.ncusi.xxby.ewms.model.manager.ManagerLog;
import com.ncusi.xxby.ewms.model.other.Op;
import com.ncusi.xxby.ewms.model.other.Price;
import com.ncusi.xxby.ewms.model.user.User;
import com.ncusi.xxby.ewms.model.warehouse.InInfo;
import com.ncusi.xxby.ewms.model.warehouse.Move;
import com.ncusi.xxby.ewms.model.warehouse.Out;
import com.ncusi.xxby.ewms.service.util.OperationCodeService;
import com.ncusi.xxby.ewms.serviceimpl.util.RandomString;
import com.ncusi.xxby.ewms.serviceimpl.util.TimeCenterFactory;

@Component
@Aspect
public class AspectUserServiceImpl {

	@Resource
	private OperationCodeService operationCodeImpl;
	@Resource
	private ManagerMapper mm;

	@Pointcut("execution(* com.ncusi.xxby.ewms.serviceimpl.user.OperationIn.operateIn(..))")
	public void flag() {
	};

	@Pointcut("execution(* com.ncusi.xxby.ewms.serviceimpl.user.OperationOutServiceImpl.operateOut(..))")
	// @Pointcut("execution(*
	// com.ncusi.xxby.ewms.serviceimpl.user.OperationIn.operationInDo(..))")
	public void flag2() {
	};

	@Pointcut("execution(* com.ncusi.xxby.ewms.serviceimpl.manager.OperateStoreInOutServiceImpl.operateByCode(..))")
	public void flag3() {
	};

	@Pointcut("execution(* com.ncusi.xxby.ewms.serviceimpl.manager.OperateStoreInOutServiceImpl.checkCode(..))")
	public void flag4() {
	};

	@Pointcut("execution(* com.ncusi.xxby.ewms.serviceimpl.manager.OperateStoreMoveServiceImpl.checkApply(..))")
	public void flag5() {
	};

	@Pointcut("execution(* com.ncusi.xxby.ewms.serviceimpl.manager.StoreGroupServiceImpl.updateGroup(..))")
	public void flag7() {
	};

	@Pointcut("execution(* com.ncusi.xxby.ewms.serviceimpl.manager.StoreGroupServiceImpl.addGroup(..))")
	public void flag8() {
	};

	@Pointcut("execution(* com.ncusi.xxby.ewms.serviceimpl.manager.StoreGroupServiceImpl.delGroup(..))")
	public void flag9() {
	};

	@Before("flag()")
	public void test(JoinPoint point) {
		System.out.println("!!!!!!!!!!!!!!!!!!!!!!!\n");
	}

	@Around("flag()")
	public Object test3(ProceedingJoinPoint pjp) throws Throwable {
		Object[] args = pjp.getArgs();
		Op o = (Op) pjp.getArgs()[2];
		o.setState("准备中");
		o = operationCodeImpl.addOpCode(o);
		args[2] = o;
		System.out.println("插入操作码完成！");
		Object retVal = pjp.proceed(args);
		return retVal;
	}

	@Around("flag2()")
	public Object opOut(ProceedingJoinPoint pjp) throws Throwable {
		Object[] args = pjp.getArgs();
		Op o = (Op) pjp.getArgs()[2];
		o.setState("准备中");
		o = operationCodeImpl.addOpCode(o);
		args[2] = o;
		System.out.println("插入操作码完成！");
		Object retVal = pjp.proceed(args);
		return retVal;
	}

	@After("flag2()")
	public void emailOut(JoinPoint point) {
		// TODO Auto-generated method stub
		User u = (User) point.getArgs()[0];
		Out o = (Out) point.getArgs()[1];
		String temp = "用户您好，您的出库申请已完成. 操作码为：【" + o.getOpCode() + "】";
		System.out.println(temp + "--" + u.getMail());
		// try {
		// EmailSend.sendMail(temp, u.getMail());
		// } catch (Exception e) {
		// // TODO Auto-generated catch block
		// e.printStackTrace();
		// }
	}

	// @Before("flag()")
	// public void test2() {
	// System.out.println("22222222222222222222222222222222222222222");
	// }

	/**
	 * 
	 */
	@After("flag()")
	public void emailIn(JoinPoint point) {
		// TODO Auto-generated method stub
		User u = (User) point.getArgs()[0];
		InInfo i = (InInfo) point.getArgs()[1];
		String temp = "用户您好，您的申请入库已完成. 操作码为：【" + i.getOpCode() + "】";
		System.out.println(temp + "--" + u.getMail());
		// try {
		// EmailSend.sendMail(temp, u.getMail());
		// } catch (Exception e) {
		// // TODO Auto-generated catch block
		// e.printStackTrace();
		// }
	}

	@After("flag3()")
	public void log(JoinPoint point) {
		Manager m = (Manager) point.getArgs()[1];
		ManagerLog log = new ManagerLog();
		log.setCode(RandomString.getStringTime());
		log.setDate(TimeCenterFactory.getSqlTime());
		log.setInfo((String) point.getArgs()[0]);
		log.setManagerID(m.getID());
		log.setResults("执行");
		log.setType("出入库操作");
		mm.insertManagerLog(log);
	}

	@After("flag4()")
	public void logdone(JoinPoint point) {
		Manager m = (Manager) point.getArgs()[1];
		ManagerLog log = new ManagerLog();
		log.setCode(RandomString.getStringTime());
		log.setDate(TimeCenterFactory.getSqlTime());
		log.setInfo((String) point.getArgs()[0]);
		log.setManagerID(m.getID());
		log.setResults("完成");
		log.setType("出入库操作");
		mm.insertManagerLog(log);
	}

	@After("flag5()")
	public void afterdo(JoinPoint point) {
		Move m = (Move) point.getArgs()[0];
		String ID = (String) point.getArgs()[1];

		ManagerLog log = new ManagerLog();
		log.setCode(RandomString.getStringTime("LogMove"));
		log.setDate(TimeCenterFactory.getSqlTime());
		log.setInfo(ID);
		log.setManagerID(ID);
		log.setResults("就绪");
		log.setType("同意移库");
		mm.insertManagerLog(log);
	}

	@After("flag7()")
	public void afterdo7(JoinPoint point) {
		Price m = (Price) point.getArgs()[0];
		String ID = (String) point.getArgs()[1];

		ManagerLog log = new ManagerLog();
		log.setCode(RandomString.getStringTime("Group"));
		log.setDate(TimeCenterFactory.getSqlTime());
		log.setInfo(m.getScript() + m.getName());
		log.setManagerID(ID);
		log.setResults("完成");
		log.setType("商品组");
		mm.insertManagerLog(log);
	}

	@After("flag8()")
	public void afterdo8(JoinPoint point) {
		Price m = (Price) point.getArgs()[0];
		String ID = (String) point.getArgs()[1];

		ManagerLog log = new ManagerLog();
		log.setCode(RandomString.getStringTime("Group"));
		log.setDate(TimeCenterFactory.getSqlTime());
		log.setInfo(m.getScript() + m.getName());
		log.setManagerID(ID);
		log.setResults("完成");
		log.setType("商品组");
		mm.insertManagerLog(log);
	}

	@After("flag9()")
	public void afterdo9(JoinPoint point) {
		Price m = (Price) point.getArgs()[0];
		String ID = (String) point.getArgs()[1];

		ManagerLog log = new ManagerLog();
		log.setCode(RandomString.getStringTime("Group"));
		log.setDate(TimeCenterFactory.getSqlTime());
		log.setInfo(m.getScript() + m.getName());
		log.setManagerID(ID);
		log.setResults("完成");
		log.setType("商品组");
		mm.insertManagerLog(log);
	}

}

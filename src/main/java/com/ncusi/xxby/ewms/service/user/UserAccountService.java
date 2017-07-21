package com.ncusi.xxby.ewms.service.user;

import com.ncusi.xxby.ewms.model.user.User;

public interface UserAccountService {
	/**
	 * 用户登录
	 * 
	 * @param key
	 * @param pwd
	 * @return
	 */
	public User login(String key, String pwd);

	/**
	 * 用户注册
	 * 
	 * @param phone
	 * @param code
	 * @param pwd
	 * @param mail
	 * @param kind
	 *            用户类别
	 * @return
	 */
	public boolean register(String phone, String code, String pwd, String mail, String kind);

	/**
	 * 用户注册检测
	 * 
	 * @param phone
	 * @param mail
	 * @return
	 */
	public boolean preRegister(String phone, String mail);

	/**
	 * 用户基本信息修改
	 * 
	 * @param name
	 * @param sex
	 * @param birth
	 *            这里把表中的other列借用
	 * @param mail
	 * @return
	 */
	public boolean infoEditer(String name, String sex, String birth, String connect);

	/**
	 * 修改绑定手机-----》申请
	 * 
	 * @param phone
	 * @return
	 */
	public boolean phoneChange(String phone);

	/**
	 * 修改绑定手机-----》执行
	 * 
	 * @param code
	 *            发送至用户的验证码
	 * @param phone
	 *            用户手机
	 * @return
	 */
	public boolean phoneChangeCheck(String code, String phone);

	/**
	 * 修改绑定邮箱-----》申请
	 * 
	 * @param mail
	 * @return
	 */
	public boolean mailChange(String mail);

	/**
	 * 修改绑定邮箱-----》执行
	 * 
	 * @param code
	 *            发送至用户的验证码
	 * @return
	 */
	public boolean mailChangeCheck(String code, String mail);

	/**
	 * 修改密码
	 * 
	 * @param u
	 *            用户身份
	 * @param kind
	 *            用户选择邮件还是手机("mail"or"phone")
	 * @return
	 */
	public boolean passwordChange(User u, String kind);

	/**
	 * 修改密码执行
	 * 
	 * @param u
	 *            包含明文新密码
	 * @param key
	 *            关键字
	 * @param value
	 *            验证码
	 * @return
	 */
	public boolean passwordChangeCheck(User u, String key, String value);

}

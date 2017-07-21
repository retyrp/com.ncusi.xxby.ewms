package com.ncusi.xxby.ewms.mapper;

import java.util.List;

import com.ncusi.xxby.ewms.model.user.User;
import com.ncusi.xxby.ewms.model.user.UserAddress;
import com.ncusi.xxby.ewms.model.user.UserInfo;

public interface UserMapper {

	// 登录
	public User loginUser(User u);

	// 注册
	public int registerUser(User u);

	// 验证后添加详细信息
	public int registerInfo(UserInfo u);

	// 修改
	public int updateUser(User u);

	// 查询
	public List<User> searchUser(User u);

	// 获取详细信息
	public List<UserInfo> getUserInfo(UserInfo u);

	// 修改详细信息
	public int updateUserInfo(UserInfo u);

	// 删除
	public int deleteUser(User u);

	// *********************************************************

	// 地址

	public int addAddress(UserAddress a);

	public int deleteAddress(UserAddress a);

	public int updateAddress(UserAddress a);

	public List<UserAddress> getUserAddress(UserAddress a);

}

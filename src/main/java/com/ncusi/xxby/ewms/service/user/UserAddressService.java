package com.ncusi.xxby.ewms.service.user;

import java.util.List;

import com.ncusi.xxby.ewms.model.user.User;
import com.ncusi.xxby.ewms.model.user.UserAddress;

public interface UserAddressService {

	public List<UserAddress> getAddress(User u);

	public boolean addAddress(UserAddress ua);

	public boolean deleteAddress(UserAddress ua);

	public boolean updateAddress(UserAddress ua);
}

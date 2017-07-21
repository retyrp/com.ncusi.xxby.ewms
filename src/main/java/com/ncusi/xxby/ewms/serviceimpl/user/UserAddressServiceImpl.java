package com.ncusi.xxby.ewms.serviceimpl.user;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.ncusi.xxby.ewms.mapper.StoreMapper;
import com.ncusi.xxby.ewms.mapper.UserMapper;
import com.ncusi.xxby.ewms.model.user.User;
import com.ncusi.xxby.ewms.model.user.UserAddress;
import com.ncusi.xxby.ewms.model.warehouse.StoreInfo;
import com.ncusi.xxby.ewms.service.user.UserAddressService;

@Service("userAddressService")
public class UserAddressServiceImpl implements UserAddressService {

	@Resource
	private UserMapper um;
	@Resource
	private StoreMapper sm;

	/**
	 * 查询用户地址
	 */
	@Override
	@Cacheable(value = "user", key = "'Address'+#u.getId()")
	public List<UserAddress> getAddress(User u) {
		UserAddress ua = new UserAddress();
		ua.setUserId(u.getId());
		return um.getUserAddress(ua);
	}

	/**
	 * 添加地址
	 */
	@Override
	@CacheEvict(value = "user", key = "'Address'+#ua.getUserId()")
	public boolean addAddress(UserAddress ua) {
		UserAddress temp = new UserAddress();
		StoreInfo si = new StoreInfo();

		temp.setUserId(ua.getUserId());
		ua.setIndexA(String.valueOf(um.getUserAddress(temp).size()));
		si.setAddress("%" + ua.getAddress().split(":")[0] + "%");
		si = sm.getStoreInfoPlus(si).get(0);
		if (si == null) {
			si.setAddress("%" + ua.getAddress().split(":")[0].split("%")[0] + "%"
					+ ua.getAddress().split(":")[0].split("%")[1] + "%");
		}
		si = sm.getStoreInfoPlus(si).get(0);
		if (si == null) {
			si.setAddress("%" + ua.getAddress().split(":")[0].split("%")[0] + "%");
		}
		ua.setAddress(ua.getAddress().replaceAll("%", "").replaceAll(":", ""));
		ua.setWarehouseID(sm.getStoreInfoPlus(si).get(0).getCode());
		if (um.addAddress(ua) > 0)
			return true;
		return false;
	}

	/**
	 * 删除地址
	 */
	@Override
	@CacheEvict(value = "user", key = "'Address'+#ua.getUserId()")
	public boolean deleteAddress(UserAddress ua) {
		if (um.deleteAddress(ua) > 0)
			return true;
		return false;
	}

	/**
	 * 修改地址
	 */
	@Override
	@CacheEvict(value = "user", key = "'Address'+#ua.getUserId()")
	public boolean updateAddress(UserAddress ua) {
		if (um.updateAddress(ua) > 0)
			return true;
		return false;
	}

}

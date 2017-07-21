package com.ncusi.xxby.ewms.serviceimpl.user;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ncusi.xxby.ewms.mapper.UserMapper;
import com.ncusi.xxby.ewms.model.cache.Cache;
import com.ncusi.xxby.ewms.model.cache.CacheConstant;
import com.ncusi.xxby.ewms.model.cache.CacheManager;
import com.ncusi.xxby.ewms.model.user.User;
import com.ncusi.xxby.ewms.model.user.UserInfo;
import com.ncusi.xxby.ewms.service.user.UserAccountService;
import com.ncusi.xxby.ewms.service.util.AccountValidatorUtil;
import com.ncusi.xxby.ewms.service.util.Sms;
import com.ncusi.xxby.ewms.serviceimpl.util.EmailSend;
import com.ncusi.xxby.ewms.serviceimpl.util.MD5;
import com.ncusi.xxby.ewms.serviceimpl.util.RandomString;

@Service("userAccountServiceImpl")
public class UserAccountServiceImpl implements UserAccountService {
	@Resource
	private UserMapper um;
	@Resource
	private Sms smsImpl;

	@Override
	@Cacheable(value = "user", key = "#key+#pwd")
	public User login(String key, String pwd) {
		User u = new User();
		if (AccountValidatorUtil.isMobile(key))
			u.setPhone(key);
		else if (AccountValidatorUtil.isEmail(key))
			u.setMail(key);
		else
			u.setId(key);
		u.setPassword(MD5.encryption(pwd));
		List<User> l = um.searchUser(u);
		if (l.size() > 0) {
			u = l.get(0);
			UserInfo token = new UserInfo();
			token.setId(u.getId());
			token = um.getUserInfo(token).get(0);
			u.setPassword(token.getKind());
		}
		if (u.getName() != null && u.getName() != "") {
			return u;
		} else {
			u.setId("Error");
			return u;
		}
	}

	@Override
	@Transactional
	public boolean register(String phone, String code, String pwd, String mail, String kind) {
		User u = new User();
		UserInfo uInfo = new UserInfo();
		if (phoneChangeCheck(code, phone)) {
			String id = RandomString.rdmNumber(10);
			u.setId(id);
			u.setMail(mail);
			u.setName("用户");
			u.setPassword(MD5.encryption(pwd));
			u.setPhone(phone);
			um.registerUser(u);
			uInfo.setAddress("");
			uInfo.setCheckid("N");
			uInfo.setCheckmail("N");
			uInfo.setCheckphone("Y");
			uInfo.setConnect(phone);
			uInfo.setId(u.getId());
			uInfo.setKind(kind);
			uInfo.setSex("男");
			uInfo.setOther("");
			um.registerInfo(uInfo);
			return true;
		}
		return false;
	}

	@Override
	@Transactional
	public boolean infoEditer(String name, String sex, String birth, String connect) {
		User u = new User();
		UserInfo uInfo = new UserInfo();
		uInfo.setSex(sex);
		uInfo.setOther(birth);
		uInfo.setConnect(connect);
		u.setName(name);
		if (um.updateUser(u) > 0 && um.updateUserInfo(uInfo) > 0)
			return true;
		return false;
	}

	@Override
	public boolean phoneChange(String phone) {
		if (AccountValidatorUtil.isMobile(phone)) {
			String code = RandomString.rdmNumber(6);
			System.out.println("您正在验证手机，您的验证码为【" + code + "】请立即填写，两分钟后失效。");
			smsImpl.smsSend("您正在验证手机，您的验证码为【" + code + "】请立即填写，两分钟后失效。", phone);
			CacheManager.invalidate(phone);
			CacheManager.putContent(phone, code, CacheConstant.EXPIRE_AFTER_TWO_MINUTES);
			return true;
		}
		return false;
	}

	@Override
	public boolean phoneChangeCheck(String code, String phone) {
		Cache c = new Cache();
		c = CacheManager.getContent(phone);
		CacheManager.invalidate(phone);
		if (c != null && code.equals(c.getValue()))
			return true;
		return false;
	}

	@Override
	public boolean mailChange(String mail) {
		if (AccountValidatorUtil.isEmail(mail)) {
			String code = RandomString.rdmString(7);
			System.out.println("您正在修改邮箱，您的验证码为【" + code + "】一小时后失效。");
			try {
				EmailSend.sendMail("您正在修改邮箱，您的验证码为【" + code + "】一小时后失效。", mail);
			} catch (Exception e) {
				System.out.println("发送失败");
				return false;
			}
			CacheManager.invalidate(mail);
			CacheManager.putContent(mail, code, CacheConstant.EXPIRE_AFTER_ONE_HOUR);
			return true;
		}
		return false;
	}

	@Override
	public boolean mailChangeCheck(String code, String mail) {
		Cache c = new Cache();
		c = CacheManager.getContent(mail);
		CacheManager.invalidate(mail);
		if (c != null && code.equals(c.getValue()))
			return true;
		return false;
	}

	@Override
	public boolean passwordChange(User u, String kind) {
		if (kind.equals("mail")) {
			String code = RandomString.rdmString(7);
			System.out.println("您正在修改密码，您的验证码为【" + code + "】一小时后失效。");
			try {
				EmailSend.sendMail("您正在修改密码，您的验证码为【" + code + "】一小时后失效。", u.getMail());
			} catch (Exception e) {
				System.out.println("发送失败");
				return false;
			}
			CacheManager.invalidate(u.getMail());
			CacheManager.putContent(u.getMail(), code, CacheConstant.EXPIRE_AFTER_ONE_HOUR);
			return true;
		} else {
			String code = RandomString.rdmNumber(6);
			System.out.println("您正在修改密码，您的验证码为【" + code + "】请立即填写，两分钟后失效。");
			smsImpl.smsSend("您正在修改密码，您的验证码为【" + code + "】请立即填写，两分钟后失效。", u.getPhone());
			CacheManager.invalidate(u.getPhone());
			CacheManager.putContent(u.getPhone(), code, CacheConstant.EXPIRE_AFTER_TWO_MINUTES);
			return true;
		}
	}

	@Override
	@CacheEvict(value = "default", key = "#u.getId()")
	public boolean passwordChangeCheck(User u, String key, String value) {

		Cache c = new Cache();
		c = CacheManager.getContent(key);
		CacheManager.invalidate(key);
		if (c != null && value.equals(c.getValue())) {
			u.setPassword(MD5.encryption(u.getPassword()));
			um.updateUser(u);
			return true;
		}
		return false;
	}

	@Override
	public boolean preRegister(String phone, String mail) {
		User u = new User();
		u.setPhone(phone);
		if (um.searchUser(u).size() > 0) {
			return false;
		}
		u.setPhone(null);
		u.setMail(mail);
		if (um.searchUser(u).size() > 0) {
			return false;
		}
		return true;
	}

}

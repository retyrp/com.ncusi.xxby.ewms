package com.ncusi.xxby.ewms.serviceimpl.manager;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ncusi.xxby.ewms.mapper.ManagerMapper;
import com.ncusi.xxby.ewms.model.cache.CacheConstant;
import com.ncusi.xxby.ewms.model.cache.CacheManager;
import com.ncusi.xxby.ewms.model.manager.Manager;
import com.ncusi.xxby.ewms.model.manager.ManagerInfo;
import com.ncusi.xxby.ewms.model.manager.ManagerUtil;
import com.ncusi.xxby.ewms.service.manager.ManagerAccountService;
import com.ncusi.xxby.ewms.service.util.AccountValidatorUtil;
import com.ncusi.xxby.ewms.serviceimpl.util.MD5;
import com.ncusi.xxby.ewms.serviceimpl.util.RandomString;

@Service("managerAccountServiceImpl")
public class ManagerAccountServiceImpl implements ManagerAccountService {

	@Resource
	private ManagerMapper mm;

	@Override
	@Cacheable(value = "manager", key = "'login'+#key+#pwd")
	public Manager login(String key, String pwd) {
		Manager m = new Manager();
		ManagerInfo mInfo = new ManagerInfo();

		m.setID(key);
		m.setPassword(MD5.encryption(pwd));
		if (mm.login_manager(m) != null) {
			m = mm.login_manager(m);
			mInfo.setID(m.getID());
			CacheManager.putContent(key, mm.searchInfo(mInfo).get(0));
			return m;
		}
		m = null;
		return m;
	}

	@Override
	@Transactional
	public boolean register(Manager m, ManagerInfo mInfo) {
		m.setID(RandomString.rdmNumber(7));
		m.setAccess(2);
		m.setPassword(MD5.encryption(m.getPassword()));
		mm.add(m);
		mInfo.setID(m.getID());
		mm.addInfo(mInfo);
		return true;
	}

	@Override
	@Transactional
	public boolean updateInfo(ManagerInfo m) {

		ManagerInfo token = new ManagerInfo();
		token.setID(m.getID());
		ManagerInfo info = mm.searchInfo(token).get(0);
		if (m.getPhone() != null && m.getPhone() != "")
			info.setPhone(m.getPhone());
		if (m.getMail() != null && m.getPhone() != "")
			info.setMail(m.getMail());
		info.setAddress(m.getAddress());
		info.setName(m.getName());
		info.setSex(m.getSex());
		info.setBirth(m.getBirth());
		info.setOther(m.getOther());

		mm.updateInfo(info);
		return true;
	}

	@Override
	@Transactional
	public boolean delMember(Manager m) {
		mm.delete(m);
		return false;
	}

	@Override
	@Transactional
	public boolean updatePwd(Manager m) {
		Manager temp = new Manager();
		temp.setAccess(3);
		temp.setID(m.getID());
		temp = mm.search(temp).get(0);
		if (m.getPassword() == null)
			temp.setAccess(m.getAccess());
		else
			temp.setPassword(MD5.encryption(m.getPassword()));
		mm.update(temp);
		return false;
	}

	@Override
	public List<ManagerUtil> search(String s) {
		List<ManagerUtil> lm = new ArrayList<ManagerUtil>();

		ManagerInfo mInfo = new ManagerInfo();
		if (AccountValidatorUtil.isChinese(s)) {
			mInfo.setName(s);
			for (ManagerInfo temp : mm.searchInfo(mInfo)) {
				ManagerUtil m = new ManagerUtil();
				lm.add(m.setManagerUtil(temp));
			}
		} else if (s == null || s == "" || s.isEmpty()) {
			ManagerInfo tmp = new ManagerInfo();

			for (int i = 0; i < mm.searchInfo(tmp).size(); i++) {
				ManagerUtil t = new ManagerUtil();
				t = t.setManagerUtil(mm.searchInfo(tmp).get(i));
				lm.add(t);
			}
		}

		else {
			ManagerInfo tmp = new ManagerInfo();
			ManagerUtil m = new ManagerUtil();
			tmp.setID(s);
			if (mm.searchInfo(tmp).size() > 0)
				lm.add(m.setManagerUtil(mm.searchInfo(tmp).get(0)));
		}
		return lm;
	}

	@Override
	public String apply(String s, String id) {
		String code = RandomString.rdmNumber(6);
		ManagerInfo info = new ManagerInfo();
		info.setID(id);
		if (AccountValidatorUtil.isMobile(s))
			info.setPhone(s);
		else
			info.setMail(s);
		CacheManager.putContent(code, info, CacheConstant.EXPIRE_AFTER_FIFTH_MINUTES);
		return code;
	}

	@Override
	public boolean check(String s, String id) {
		if (CacheManager.getContent(s) != null) {
			ManagerInfo info = new ManagerInfo();
			ManagerInfo token = (ManagerInfo) CacheManager.getContent(s).getValue();
			info.setID(id);
			info = mm.searchInfo(info).get(0);
			if (token.getPhone() != null)
				info.setPhone(token.getPhone());
			else
				info.setMail(token.getMail());
			if (id.equals(token.getID())) {
				updateInfo(info);
				return true;
			} else
				return false;
		}
		return false;
	}

}

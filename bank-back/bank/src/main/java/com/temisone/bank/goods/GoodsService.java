package com.temisone.bank.goods;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class GoodsService {
	@Autowired
	GoodsDAO goodsDAO;
	public List<GoodsVo> selectGoods(){
		return goodsDAO.selectGoods();
	}
}

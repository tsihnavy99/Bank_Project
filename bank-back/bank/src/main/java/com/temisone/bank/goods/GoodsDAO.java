package com.temisone.bank.goods;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
@Repository
public class GoodsDAO {
	@Autowired
	SqlSession sqlSession;
	public List<GoodsVo> selectGoods(){
		return sqlSession.selectList("goods.selectGoodsAll");
	}
}

package com.temisone.bank.goods;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@CrossOrigin
public class GoodsController {
	@Autowired
	GoodsService goodsService;
	@RequestMapping(value = "/goods",method = RequestMethod.GET)
	public ResponseEntity<?> goods(){
		return new ResponseEntity<List<GoodsVo>>(goodsService.selectGoods(),HttpStatus.OK);
	}
}

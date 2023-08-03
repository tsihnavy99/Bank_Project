<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>login before</title>
</head>
<script src="https://kit.fontawesome.com/4f1859afb7.js" crossorigin="anonymous"></script>
<style>
#logcerBox{
box-sizing: border-box;

position: absolute;
width: 700px;
height: 300px;

left:33.6389vw;
top:40vh;

}
#loginBox{
box-sizing: border-box;

position: absolute;
width: 320px;
height: 143px;
left:20px;
top:80px;

background: #FEBC3C;
border: 1px solid #FEBC3C;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.fa-right-to-bracket{
 position: absolute;
width: 102px;
height: 99px;

font-family: 'Font Awesome 6 Free';
font-style: normal;
font-weight: 900;
font-size: 80px;
line-height: 80px;

left: 50px;
top:33px;

color: white;
}
.loginText{
 position: absolute;
width: 150px;
height: 40px;

font-family: 'Manjari';
font-style: normal;
font-weight: 700;
font-size: 36px;
line-height: 42px;

left: 140px;
top:50px;

color: #FFFFFF;
}
#certificateBox{
 position: absolute;
width: 320px;
height: 143px;
left:350px;
top:80px;

background: #676560;
}
.fa-shield-halved{
position: absolute; 
width: 102px;
height: 99px;

font-family: 'Font Awesome 6 Free';
font-style: normal;
font-weight: 900;
font-size: 80px;
line-height: 80px;

left: 50px;
top:33px;

color: #FFFFFF;
}
#bankProductBox{

position: absolute;
width: 900px;
height: 300px;

left:31.5389vw;
top:90vh;
}
#productTextBox{
float:left;
position: absolute; 
text-align: center;

}
#productText{
font-size: 2em;
font-weight: bold;
}
#shortCut{
color: lightgray;
}
#shortCut:hover{
color: gray;
}
#account{
margin-left: 200px;
float: left;
text-align: center;
}
.productIcon{
font-size: 4em;
color: lightgray;
}
.productText2{
font-size: 1em;
}
#deposit{
margin-left: 100px;
float : left;
text-align: center;
}
#installment{
margin-left: 100px;
float : left;
text-align: center;
}
#insurance{
margin-left: 100px;
float : left;
text-align: center;
}
</style>
<body>
	<div id="logcerBox">
		<div id="loginBox">
			<i class="fa-solid fa-right-to-bracket"></i> 
			<span class="loginText">로그인</span>
		</div>
		<div id="certificateBox">
			<i class="fa-solid fa-shield-halved"></i> 
			<span class="loginText">인증센터</span>
		</div>
	</div>

	<div id="bankProductBox">
		<div id="productTextBox">
			<span id="productText">금융상품</span> 
			<br>
			<a id="shortCut">바로가기></a>
		</div>
		<div id="account">
			<i class="fa-solid fa-money-bill-transfer productIcon"></i> 
			<br> 
			<span class="productText2">입출금</span>
		</div>
		<div id="deposit">
			<i class="fa-solid fa-building-columns productIcon"></i>
			<br>
			<span class="productText2">예금</span>
		</div>
		<div id="installment">
			<i class="fa-solid fa-piggy-bank productIcon"></i>
			<br>
			<span class="productText2">적금</span>
		</div>
		<div id="insurance">
			<i class="fa-solid fa-umbrella productIcon"></i>
			<br>
			<span class="productText2">보험</span>
		</div>
	</div>


</body>
</html>
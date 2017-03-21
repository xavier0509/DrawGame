var MoreInfo_all = null;
var Draw_angle = null; //转盘转的角度
var Draw_awardLevel = null; //奖品等级
var Draw_awardName = null; //奖品名称
var Draw_lotteryAwardMemberId = null; //奖品ID
var Draw_awardPictureUrl = null; //奖品url
var Awardid = null;
var wait = 60; //验证码倒计时
var nowActive = 10;

$(function() {
	focuseffection(); //焦点效果
	FairIntroduction(); //活动简介
	//AwardGetList(); //中奖名单
	//LotteryNumber(); //抽奖次数
	getCountDown(); //验证码倒计时
	activityStartorNot(); //活动是否开始
	//MoreInfo(); //更多详情页文字说明
	MoreInfoImage(); //更多详情页图片
	//myAwardList(); //我的奖品
	//document.getElementById("startdDraw").focus();
	//console.log("toast display:" + document.getElementById("div-toast-img-12").style.display);
	$("#text_info-1").text("参与方式：开通会员，即可参与抽奖，赢取巴西（里约热内卢）奥运之旅");
	$("#text_info-7").text("活动已经结束!");
});
//活动未开始 隐藏中奖名单区域
function hideChild_000() {
	document.getElementById("gotovipcenter_speciallyeffect").focus();
	var ul = document.getElementById("bg_Operation-img-8");
	if (ul.style.display == "block") {
		ul.style.display = "none";
	} else {
		ul.style.display = "none";
	}
	var ul1 = document.getElementById("text_info-2");
	if (ul1.style.display == "block") {
		ul1.style.display = "none";
	} else {
		ul1.style.display = "none";
	}
	var ul1 = document.getElementById("startdDraw");
	if (ul1.style.display == "block") {
		ul1.style.display = "none";
	} else {
		ul1.style.display = "none";
	}
	var ul1 = document.getElementById("startdDraw-1");
	if (ul1.style.display == "none") {
		ul1.style.display = "block";
	} else {
		ul1.style.display = "block";
	}
}
//显示抽奖按钮
function showChild_011() {
	var ul1 = document.getElementById("startdDraw");
	if (ul1.style.display == "none") {
		ul1.style.display = "block";
	} else {
		ul1.style.display = "block";
	}
	document.getElementById("startdDraw").focus();
}
//活动未开始 中奖名单区域显示还未开始框
function hideChild_001() {
	var ul = document.getElementById("text_info-2-1");
	if (ul.style.display == "none") {
		ul.style.display = "block";
	} else {
		ul.style.display = "block";
	}
	var ul001 = document.getElementById("text_info-4");
	if (ul001.style.display == "block") {
		ul001.style.display = "none";
	} else {
		ul001.style.display = "none";
	}
	var ul002 = document.getElementById("text_info-40");
	if (ul002.style.display == "block") {
		ul002.style.display = "none";
	} else {
		ul002.style.display = "none";
	}
	var ul003 = document.getElementById("text_info-41");
	if (ul003.style.display == "none") {
		ul003.style.display = "block";
	} else {
		ul003.style.display = "block";
	}
	$("#text_info-41").text("活动马上开始，敬请期待！");
}
//活动未开始 隐藏中奖名单区域
function hideChild_002() {
	var ul = document.getElementById("text_info-2-2");
	if (ul.style.display == "none") {
		ul.style.display = "block";
	} else {
		ul.style.display = "block";
	}
	var ul001 = document.getElementById("text_info-4");
	if (ul001.style.display == "block") {
		ul001.style.display = "none";
	} else {
		ul001.style.display = "none";
	}
	var ul001 = document.getElementById("text_info-40");
	if (ul001.style.display == "block") {
		ul001.style.display = "none";
	} else {
		ul001.style.display = "none";
	}
	var ul = document.getElementById("text_info-41");
	if (ul.style.display == "none") {
		ul.style.display = "block";
		$("#text_info-41").text("活动已经结束...");
	} else {
		ul.style.display = "block";
		$("#text_info-41").text("活动已经结束...");
	}
}
//弹出框--活动已经结束
function showChild_000() {
	var ul = document.getElementById("div-toast-img-0");
	if (ul.style.display == "block") {
		ul.style.display = "none";
	} else {
		ul.style.display = "block";
	}
	var ul001 = document.getElementById("text_info-4");
	if (ul001.style.display == "block") {
		ul001.style.display = "none";
	} else {
		ul001.style.display = "none";
	}
	var ul002 = document.getElementById("text_info-41");
	if (ul002.style.display == "block") {
		ul002.style.display = "none";
	} else {
		ul002.style.display = "block";
	}

	$("#text_info-5-1").text("活动已经结束!");
	$("#text_info-41").text("活动已经结束...");
	document.getElementById("button-ensure-1").focus();
	$("#indexhtml :button").attr("disabled", "disabled");
}
//弹出框--活动未开始
function showChild_001() {
	var ul = document.getElementById("div-toast-img-1");
	var mmmmmmmmmmm = document.getElementsByClassName("toast");
	console.log("mmmmmmmmmmm: " + mmmmmmmmmmm[0].id + "----" + ul);
	if (ul.style.display == "block") {
		ul.style.display = "none";
	} else {
		ul.style.display = "block";
	}
	$("#text_info-6-1").text("活动马上开始!");
	document.getElementById("button-ensure-2").focus();
	$("#indexhtml :button").attr("disabled", "disabled");
}
//弹出框--恭喜抽中（跳转影视会员中心）
function showChild_002(txt, awards, typeId, lotteryAwardMemberId, imageurl) {
	//传值进来，做后续处理
	$("#text_info-8-1").text("影视VIP会员!");
	var ul = document.getElementById("div-toast-img-2");
	if (ul.style.display == "block") {
		ul.style.display = "none";
	} else {
		ul.style.display = "block";
	}
	console.log("in showChild_002 imageurl is " + imageurl);
	//var urllllll = "images/5844131.png";
	$(".AwardImagesUrl").attr("src", imageurl); //OK
	document.getElementById("startmemcenter").focus();
	//zhongjiangmusic();
}
//弹出框--获取更多机会
function getProductPackage() {
	var ul = document.getElementById("div-toast-img-3");
	if (ul.style.display == "block") {
		ul.style.display = "none";
	} else {
		ul.style.display = "block";
	}
	document.getElementById("button-img-3-1").focus();
	$("#indexhtml :button").attr("disabled", "disabled");

	var activid_2 = $("#activityid").text();
	console.log("activid_2" + activid_2);
	//指定产品包
	$.ajax({
		type: "get",
		async: true,
		url: "http://restful.lottery.coocaatv.com/v1/lottery/video/condition/" + activid_2,
		dataType: "jsonp",
		jsonp: "callback",
		//jsonpCallback: "receive",
		success: function(data) {
			var i = 1;
			//alert(data.data[i].productPackageTypeName);
			var temp = data.data[i].productPackageTypeName;
			$("#text_info-9-div").text("【" + temp + "】");
		},
		error: function() {
			console.log('fail');
		}
	});
}
//弹出框--未中奖
function showChild_004() {
	var ul = document.getElementById("div-toast-img-4");
	if (ul.style.display == "block") {
		ul.style.display = "none";
	} else {
		ul.style.display = "block";
	}
	document.getElementById("button-img-4-1").focus();
	$("#indexhtml :button").attr("disabled", "disabled");
	meizhongjiangmusic();
}

function phonewriteornot(txt, awards, typeId, lotteryAwardMemberId) {
	var ph = $("#temp_userphonenumber").text();
	console.log("phonewriteornot:" + ph.length + "txt" + txt);
	if (ph.length == 0) {
		$("#text_info-11-0").text(txt);
		showChild_005();

	} else {
		console.log("-----txt----" + txt);
		$("#foom-back-2").text(txt);
		//$("#foom-back-3").text("您当前手机号是"+lphone);
		showChild_016();
	}
	zhongjiangmusic();
}

//弹出框--恭喜抽中（检测到未填写手机号）
function showChild_005() {
	$("#text_info-11-1").text("请填写您的手机号码领取奖品");
	var ul = document.getElementById("div-toast-img-5");
	if (ul.style.display == "block") {
		ul.style.display = "none";
	} else {
		ul.style.display = "block";
	}
	document.getElementById("button-img-5-1").focus();
	$("#indexhtml :button").attr("disabled", "disabled");
}
//弹出框--恭喜抽中（检测到填写手机号，确认是否更改）
function showChild_016() {
	var ul = document.getElementById("toost-back-warm");
	if (ul.style.display == "none") {
		ul.style.display = "block";
	} else {
		ul.style.display = "block";
	}
	var allnumber = $("#temp_userphonenumber").text();
	console.log("----allnumber---" + allnumber);
	var mphone = allnumber.substr(3, 4);
	var lphone = allnumber.replace(mphone, "****");
	$("#foom-back-3").html("您当前手机号是" + lphone);
	document.getElementById("buttoon-back-3-1").focus();
	$("#indexhtml :button").attr("disabled", "disabled");
}

//确定以当前手机号领取奖品
function ensuretoaward(id) {
	var phoneNumber = $('#form-info-7-3').val();
	//var captcha_new = $('#form-info-7-4').val();
	var Awardid_new = $('#unseediv').text();
	var userOpen_id = $('#userOpenId').text();
	var AccessToken_new = $('#accesstoken').text();
	//var userOpen_id = "26fcc0f8009a11e684bd00505687790a";
	console.log("in ensuretoaward----------------");
	//需要在这里给后台传递参数：openid，中奖奖品，当前手机号等等
	cancelToast(id);
	$.ajax({
		type: "get",
		async: true,
		data: {
			"lotteryAwardMemberId": Awardid_new,
			"phone": phoneNumber
		},
		url: "http://restful.lottery.coocaatv.com/v1/lottery/video/setUserInfo/" + AccessToken_new,
		dataType: "jsonp",
		jsonp: "callback",
		success: function(data) {
			//alert("--------------");
		},
		error: function() {
			alert('fail');
		}
	});
}
//弹出填写手机号的详情页
function showChild_007() {
	var ul = document.getElementById("div-toast-text-7");
	if (ul.style.display == "none") {
		ul.style.display = "block";
	} else {
		ul.style.display = "block";
	}
	var ul2 = document.getElementById("deviceready");
	if (ul2.style.display == "block") {
		ul2.style.display = "none";
	} else {
		ul2.style.display = "none";
	}

}
//手机号填写准确与错误的弹出框
function showChild_008() {
	//给后台传用户输入的手机号和验证码和用户的中奖名单ID		
	var phoneNumber = $('#form-info-7-3').val();
	var captcha_new = $('#form-info-7-4').val();
	var Awardid_new = $('#unseediv').text();
	var userOpen_id = $('#userOpenId').text();
	var AccessToken_second = $('#accesstoken').text();
	console.log(phoneNumber + "--" + captcha_new + "---" + Awardid_new + "---" + AccessToken_second);
	//把中奖Id 手机号 验证码 传给后台,向后台传递这三个参数
	var showChild_008_all = function(phone, captcha, awardid, userOpen_id) {
		console.log("--------in showChild_008_all----------")
		$.ajax({
			type: "get",
			async: true,
			data: {
				"lotteryAwardMemberId": awardid,
				"phone": phone,
				"code": captcha
			},
			url: "http://restful.lottery.coocaatv.com/v1/lottery/video/updateUserInfo/" + AccessToken_second,
			dataType: "jsonp",
			jsonp: "callback",
			success: function(data) {
				var questionflag = data.success;
				console.log("------return status" + "--------" + questionflag);
				theInfoResult(questionflag);
				$("#codeflag").text("true");
			},
			error: function() {
				console.log('fail');
			}
		});
		setTimeout(codeFlag, 3000);
	};

	showChild_008_all(phoneNumber, captcha_new, Awardid_new, userOpen_id);
	//showChild_008_all(phoneNumber, captcha_new, "532", "69e6aac4306611e6ba4200163e022eda");
}

function codeFlag() {
	var isCodeFlag = $("#codeflag").text();
	console.log("isCodeFlag=" + isCodeFlag);
	if (isCodeFlag == "true") {
		console.log("code id right");
	} else {
		var ul = document.getElementById("codeIsWrong");
		if (ul.style.display == "none") {
			ul.style.display = "block";
		} else {
			ul.style.display = "block";
		}

		setTimeout("codeFlagRemove()", 3000);
	}
}

function codeFlagRemove() {
	var ul = document.getElementById("codeIsWrong");
	if (ul.style.display == "block") {
		ul.style.display = "none";
	} else {
		ul.style.display = "none";
	}
}
//判定信息修改的结果
function theInfoResult(result) {
	//获取后台的判定结果
	if (result) {
		var ul = document.getElementById("toastsuccess");
		if (ul.style.display == "none") {
			ul.style.display = "block";
		} else {
			ul.style.display = "block";
		}

		//1秒后弹出提示框，3秒后回到抽奖主界面
		setTimeout("func()", 1000);
		//setTimeout("showChild_008_return()", 3000);

	} else {
		var ul = document.getElementById("toastfalse");
		if (ul.style.display == "none") {
			ul.style.display = "block";
		} else {
			ul.style.display = "block";
		}
		$("#form-info-7-6-1").val("验证码错误，请重新填写。");
		setTimeout("toWriteAgain()", 2000);
	}
}
//重新填写
function toWriteAgain() {
	//隐藏错误信息
	var ul = document.getElementById("toastfalse");
	if (ul.style.display == "block") {
		ul.style.display = "none";
	} else {
		ul.style.display = "none";
	}
}
//悬浮提示框效果
function func() {
	var layer = document.createElement("div");
	layer.id = "layer";
	var style = {
		background: "#5B5B5B",
		position: "absolute",
		zIndex: 10,
		width: "434px",
		height: "50px",
		left: "465px",
		top: "408px",
		fontSize: "32px",
		textAlign: "center"
	}
	for (var i in style)
		layer.style[i] = style[i];
	if (document.getElementById("layer") == null) {
		document.body.appendChild(layer);
		//		$("#layer").text("3秒后回到抽奖页面");
		//setTimeout("document.body.removeChild(layer)", 2000)
		window.location.href = 'index.html';
	}
}
//跳转回到抽奖主界面
function showChild_008_return() {
	window.location.reload();
}
//得到焦点触发事件--文本框效果图
function OnfocusFun(element, elementvalue) {
	if (element.value == elementvalue) {
		element.value = "";
	}
}
//离开输入框触发事件
function OnBlurFun(element, elementvalue) {
	if (element.value == "" || element.value.replace(/\s/g, "") == "") {
		element.value = elementvalue;
	}
}

//跳转更多详情页
function showChild_009() {
	var ul2 = document.getElementById("deviceready");
	if (ul2.style.display == "block") {
		ul2.style.display = "none";
	} else {
		ul2.style.display = "none";
	}
	var ul = document.getElementById("div-toast-text-9");
	if (ul.style.display == "none") {
		ul.style.display = "block";
	} else {
		ul.style.display = "block";
	}
	document.getElementById("form-info-9-2").focus();
	MoreInfo(); //向指定id插入后台获取的活动详细信息
	//MoreInfoImage(); //向指定id插入后台获取的活动奖品图片信息
}

function showChild_010() {
	myAwardList();
	var ul = document.getElementById("div-toast-text-10");
	if (ul.style.display == "block") {
		ul.style.display = "none";
	} else {
		ul.style.display = "block";
	}
	var ul2 = document.getElementById("deviceready");
	if (ul2.style.display == "block") {
		ul2.style.display = "none";
	} else {
		ul2.style.display = "none";
	}
}
//根据我的奖品数创建多个div，存储图片
function myAwardList() {
	var _MyAwardImage = new Array();
	var _MyAwardsBeanlength = null;
	var _AwardFlag = new Array();
	var _AwardName = new Array();
	var _AwardExchangeFlag = new Array();
	var userOpen_id = $('#userOpenId').text();
	var MyAccessToken = $('#accesstoken').text();
	console.log("-------MyAccessToken-------" + MyAccessToken);
	$.ajax({
		type: "get",
		async: true,
		data: {
			"Awards": "awards",
			"Phone": "phone",
			"Captcha": "captcha"
		},
		url: "http://restful.lottery.coocaatv.com/v1/lottery/video/myAwards/" + MyAccessToken,
		dataType: "jsonp",
		jsonp: "callback",
		success: function(data) {
			$("#form-info-10-1 div").remove();
			_MyAwardsBeanlength = data.myAwardsBean.length
			for (var i = 0; i < _MyAwardsBeanlength; i++) {
				_AwardExchangeFlag[i] = data.myAwardsBean[i].awardExchangeFlag
				console.log("_AwardExchangeFlag=" + _AwardExchangeFlag[i]);
				_AwardFlag[i] = data.myAwardsBean[i].awardFlag;
				_AwardName[i] = data.myAwardsBean[i].awardName;
				_Number = i;
				_MyAwardImage[i] = data.myAwardsBean[i].awardUrl
				if (_AwardName[i] == '谢谢参与') {

				} else {
					if (_AwardExchangeFlag[i] == "0") {
						var lastNameOne = _AwardName[i] + "(已放弃)";
						myAwardListtwo(_Number, _MyAwardsBeanlength, _AwardFlag[i], lastNameOne, _MyAwardImage);
					} else {
						var lastNameTwo = _AwardName[i] + "(已领取)";
						myAwardListtwo(_Number, _MyAwardsBeanlength, _AwardFlag[i], lastNameTwo, _MyAwardImage);
					}

				}
			}

		},
		error: function() {
			//alert('fail');
		}
	});
	//创建相应div存储图片
	var myAwardListtwo = function(number, length, flag, name, imageurl) {
		//$("#form-info-10-1 div").remove();
		console.log("length" + length + "----" + "name" + name);
		var _div = '<div title="images" class="wrap" id="' + name + '" style="width: 45%; height: 65%; padding-right: 5%; margin-top: 0.5%; overflow: hidden; text-overflow: ellipsis;  opacity: 1; float: left; ">' + '<div title ="AwardImage" class ="AwardImageUrl" style="width: 95%; height: 80%; padding-left: 0%; padding-top: 0%;  margin-top: 0.5%; margin-left: 0.5%; background-color: white; overflow: hidden;  text-overflow: ellipsis; border: 1px solid black; opacity: 0.5; float: left;' + 'background-image: url(' + _MyAwardImage[_Number] + ');background-size:100%;">' + (_Number + 1) + '</div>' + '<div title="Detail" id="NO." tabindex="-1" style="width: 95%; height: 10%; margin-top: 80%; margin-left: 0.5%; text-align: center; border: 0px solid black; opacity: 1;">' + name + '</div>' + '</div>';
		$("#form-info-10-1").append(_div);
	};
}

//活动简介   动态创建div存储奖品图片
function FairIntroduction() {
	//获取当前时间
	var oDate = new Date(); //实例一个时间对象；
	var year_now = oDate.getFullYear(); //获取系统的年；
	var month_now = oDate.getMonth() + 1; //获取系统月份，由于月份是从0开始计算，所以要加1
	var day_now = oDate.getDate(); // 获取系统日，
	var hours_now = oDate.getHours(); //获取系统时，
	var minute_now = oDate.getMinutes(); //分
	var second_now = oDate.getSeconds(); //秒
	var menmber_now = second_now * 1 + minute_now * 100 + hours_now * 10000 + day_now * 1000000 + month_now * 100000000 + year_now * 10000000000;
	//该接口有活动id、奖品送货方式、奖品id、奖品等级、奖品名称、奖品图片地址、奖品类型（虚实奖）
	$.ajax({
		type: "get",
		async: true,
		url: "http://restful.lottery.coocaatv.com/v1/lottery/video/active",
		dataType: "jsonp",
		jsonp: "callback",
		success: function(data) {
			//动态创建多个div插入文字；			
			console.log("activeid：" + data.awardBeanList[0].activeId);
			$("#activityid").text(data.awardBeanList[0].activeId);

			for (var i = 0; i < data.awardBeanList.length; i++) {
				if (i == 0) {
					if (data.awardBeanList[i].awardName == '谢谢参与') {} else {
						$("#text_info-3").append(data.awardBeanList[i].awardName);
					}
				} else {
					if (data.awardBeanList[i].awardName == '谢谢参与') {} else {
						$("#text_info-3").append("、");
						$("#text_info-3").append(data.awardBeanList[i].awardName);
					}
				}
			}
			$("#text_info-3").append("。");

			var begintime = data.activeBean.activeBeginTime;
			var endtime = data.activeBean.activeEndTime;
			//活动开始时间
			var year_activity_begin = begintime.substr(0, 4);
			var month_activity_begin = begintime.substr(5, 2);
			var day_activity_begin = begintime.substr(8, 2);
			var hour_activity_begin = begintime.substr(11, 2);
			var minute_activity_begin = begintime.substr(14, 2);
			var second_activity_begin = begintime.substr(17, 2);
			var menmber_activity_begin = second_activity_begin * 1 + minute_activity_begin * 100 + hour_activity_begin * 10000 + day_activity_begin * 1000000 + month_activity_begin * 100000000 + year_activity_begin * 10000000000;
			//活动结束时间
			var year_activity_end = endtime.substr(0, 4);
			var month_activity_end = endtime.substr(5, 2);
			var day_activity_end = endtime.substr(8, 2);
			var hour_activity_end = endtime.substr(11, 2);
			var minute_activity_end = endtime.substr(14, 2);
			var second_activity_end = endtime.substr(17, 2);
			var menmber_activity_end = second_activity_end * 1 + minute_activity_end * 100 + hour_activity_end * 10000 + day_activity_end * 1000000 + month_activity_end * 100000000 + year_activity_end * 10000000000;
			console.log(menmber_activity_end);
			//活动开始时间
			$("#text_info-0").text("活动时间:" + year_activity_begin + "年" + month_activity_begin + "月" + day_activity_begin + "日" + "-" + year_activity_end + "年" + month_activity_end + "月" + day_activity_end + "日");
			if (menmber_activity_begin <= menmber_now && menmber_now <= menmber_activity_end) { //如果活动开始
				console.log("活动开始");
				showChild_011();
			} else {
				console.log("活动未开始。");
				var ul = document.getElementById("bg_Operation-img-2-1");
				if (ul.style.display == "block") {
					ul.style.display = "none";
				} else {
					ul.style.display = "block";
				}
				var ul1 = document.getElementById("startdDraw");
				if (ul1.style.display == "block") {
					ul1.style.display = "none";
				} else {
					ul1.style.display = "none";
				}
			}

			//活动详情里的奖品图片
			var _AwardImage = new Array();
			for (var i = 0; i < data.awardBeanList.length; i++) {
				_AwardImage[i] = data.awardBeanList[i].awardPictureUrl;
				console.log(_AwardImage[i] + "ok"); //获取指定图片url地址
				if (data.awardBeanList[i].awardName == '谢谢参与') {

				} else {
					var _div = '<div title="Questions" onclick="onclickfunc(this)" class="wrap"  id="' + i + '" style="width: 25%; height: 100%; overflow: hidden; text-overflow: ellipsis; opacity: 1; float: left; ">' + '<div title ="AwardImage" class ="AwardImageUrl" style="width: 85%; height: 85%; padding-left: 0%; padding-top: 0%;  margin-top: 0.5%; padding-right: 2.5%;  overflow: hidden;  text-overflow: ellipsis; border: 0px solid black; opacity: 1; float: left;">' + '<img id="imageurladdress" style="width:100%; height:100% ;border:0 ; background: url(' + _AwardImage[i] + ');background-size:100%;"/>' + '</div>' + '<br/>' + '<div title="Detail" id="NO." tabindex="-1" style="width: 85%; text-align: center; border: 0px solid black; opacity: 1;">' + data.awardBeanList[i].awardName + '</div>' + '</div>';
					$("#form-info-9-4").append(_div);
				}
			}

			AwardGetList();
			setTimeout(LotteryNumber, 3000);
		},
		error: function(data) {
			console.log(data);
		}
	});

}
//更多详情
function MoreInfo() {
	//活动规则介绍
	var activid_1 = $("#activityid").text();
	console.log("activid_1:" + activid_1);
	$.ajax({
		type: "get",
		async: true,
		url: "http://restful.lottery.coocaatv.com/v1/lottery/video/detail/" + activid_1,
		dataType: "jsonp",
		jsonp: "callback",
		//jsonpCallback: "receive",
		success: function(data) {
			var MoreInfo_web;
			MoreInfo_all = data.activeDetail;
			//MoreInfo_web = MoreInfo_all.replace("-", "\n");
			MoreInfo_web = MoreInfo_all.replace(/@/g,"<br/>");//change all '@' to '\n'.
			//console.log("MoreInfo_web" + MoreInfo_web);
			$("#form-info-9-2").append(MoreInfo_web);
		},
		error: function() {
			console.log('fail');
		}
	});
	
}

//抽奖机会次数
function LotteryNumber() {
	//该接口有抽奖次数
	var activid_4 = $("#activityid").text();
	console.log("activid_4 : " + activid_4);
	var access_token_4 = $("#accesstoken").text();
	console.log("access_token_4 : " + access_token_4);

	$.ajax({
		type: "get",
		async: true,
		url: "http://restful.lottery.coocaatv.com/v1/lottery/video/leftNumber/" + activid_4 + "/" + access_token_4,
		dataType: "jsonp",
		jsonp: "callback",
		success: function(data) {
			console.log("chenggong...");
			var lotterynumber = data.number;
			$("#text_info-40").text(lotterynumber);
			$("#drawleftnum").text(lotterynumber);
		},
		error: function() {
			console.log("shibai...");
		}
	});
}
//点击取消
function cancelToast(id) {
	var s;
	s = document.getElementById(id).parentElement.id;
	var ul = document.getElementById(s);
	if (ul.style.display == "block") {
		ul.style.display = "none";
	} else {
		ul.style.display = "block";
	}
	$("#indexhtml :button").removeAttr("disabled");
}

function cancelToastback(id) {
	var s;
	s = document.getElementById(id).parentElement.id;
	console.log("------" + s + "-----------");
	var ul = document.getElementById(s);
	if (ul.style.display == "block") {
		ul.style.display = "none";
	} else {
		ul.style.display = "block";
	}
	$("#button-img-5-1").removeAttr("disabled");
	$("#buttoon-back-3-1").removeAttr("disabled");
	$("#buttoon-back-3-2").removeAttr("disabled");
	$("#toost-back-warm :button").removeAttr("disabled");
	$("#indexhtml :button").removeAttr("disabled");
	$("#homepage :button").removeAttr("disabled");
	document.getElementById("startdDraw").focus();
	var s1 = document.getElementById("div-toast-img-5");
	var s2 = document.getElementById("toost-back-warm");
	var s3 = document.getElementById("div-toast-text-7");
	if (s1.style.display == "block") {
		console.log("---------------1------------");
		document.getElementById("button-img-5-1").focus();
	}
	if (s2.style.display == "block") {
		console.log("---------------2------------");
		document.getElementById("buttoon-back-3-1").focus();
	}
	if (s3.style.display == "block") {
		console.log("---------------3------------");
		//document.getElementById("buttoon-back-3-1").focus();
	}
}

function gotohomepage() {
	var pageflag = document.getElementsByClassName("toast");
	var ii = null;
	for (ii = 0; ii < pageflag.length; ii++) {
		if (pageflag[ii].style.display == "block") {
			pageflag[ii].style.display = "none";
		} else {
			pageflag[ii].style.display = "none";
		}
	}
	var ii1 = document.getElementById("deviceready");
	console.log("------ii1 one:" + ii1 + "---------");
	if (ii1.style.display == "none") {
		console.log("------ii1 two:" + ii1 + "---------");
		ii1.style.display = "block";
	} else {
		console.log("------ii1 three:" + ii1 + "---------");
		ii1.style.display = "block";
	}
	$("#indexhtml :button").removeAttr("disabled");
	$("#homepage :button").removeAttr("disabled");
	document.getElementById("startdDraw").focus();
}

//更多详情下的奖品图片
function MoreInfoImage() {
	//该接口有活动id、奖品送货方式、奖品id、奖品等级、奖品名称、奖品图片地址、奖品类型（虚实奖）
	$.ajax({
		type: "get",
		async: true,
		url: "http://restful.lottery.coocaatv.com/v1/lottery/video/active",
		dataType: "jsonp",
		jsonp: "callback",
		//jsonpCallback: "receive",
		success: function(data) {
			//alert(data.awardBeanList);
		},
		error: function() {}
	});
}
//点击开始抽奖--根据时间判断执行何种后续功能
function gotoStartDraw() {
	//choujiangmusic();
	var TimeBeginFlag = null;
	//获取当前时间
	var oDate = new Date(); //实例一个时间对象；
	var year_now = oDate.getFullYear(); //获取系统的年；
	var month_now = oDate.getMonth() + 1; //获取系统月份，由于月份是从0开始计算，所以要加1
	var day_now = oDate.getDate(); // 获取系统日，
	var hours_now = oDate.getHours(); //获取系统时，
	var minute_now = oDate.getMinutes(); //分
	var second_now = oDate.getSeconds(); //秒
	var menmber_now = second_now * 1 + minute_now * 100 + hours_now * 10000 + day_now * 1000000 + month_now * 100000000 + year_now * 10000000000;
	console.log("now time is ：" + menmber_now);
	//获取活动开始结束的时间
	$.ajax({
		type: "get",
		async: true,
		url: "http://restful.lottery.coocaatv.com/v1/lottery/video/active",
		dataType: "jsonp",
		jsonp: "callback",
		//jsonpCallback: "receive",
		success: function(data) {
			var begintime = data.activeBean.activeBeginTime;
			var endtime = data.activeBean.activeEndTime;
			//活动开始时间
			var year_activity_begin = begintime.substr(0, 4);
			var month_activity_begin = begintime.substr(5, 2);
			var day_activity_begin = begintime.substr(8, 2);
			var hour_activity_begin = begintime.substr(11, 2);
			var minute_activity_begin = begintime.substr(14, 2);
			var second_activity_begin = begintime.substr(17, 2);
			var menmber_activity_begin = second_activity_begin * 1 + minute_activity_begin * 100 + hour_activity_begin * 10000 + day_activity_begin * 1000000 + month_activity_begin * 100000000 + year_activity_begin * 10000000000;
			//alert(menmber_activity_begin);
			//活动结束时间
			var year_activity_end = endtime.substr(0, 4);
			var month_activity_end = endtime.substr(5, 2);
			var day_activity_end = endtime.substr(8, 2);
			var hour_activity_end = endtime.substr(11, 2);
			var minute_activity_end = endtime.substr(14, 2);
			var second_activity_end = endtime.substr(17, 2);
			var menmber_activity_end = second_activity_end * 1 + minute_activity_end * 100 + hour_activity_end * 10000 + day_activity_end * 1000000 + month_activity_end * 100000000 + year_activity_end * 10000000000;

			if (menmber_activity_begin <= menmber_now && menmber_now <= menmber_activity_end) { //如果活动开始
				console.log("活动开始");
				startDrawFlag();
			} else if (menmber_now >= menmber_activity_end) { //如果活动已经结束
				console.log("活动已经结束。");
				showChild_000()
			} else if (menmber_now <= menmber_activity_begin) {
				console.log("活动马上开始。");
				showChild_001();
				$("#text_info-6-2").text("活动时间：" + month_activity_begin + "月" + day_activity_begin + "日-" + month_activity_end + "月" + day_activity_end + "日");
			}
		},
		error: function() {
			//alert('fail');
		}
	});

}
//活动开始与否的判断
function activityStartorNot() {
	var TimeBeginFlag = null;
	//获取当前时间
	var oDate = new Date(); //实例一个时间对象；
	var year_now = oDate.getFullYear(); //获取系统的年；
	var month_now = oDate.getMonth() + 1; //获取系统月份，由于月份是从0开始计算，所以要加1
	var day_now = oDate.getDate(); // 获取系统日，
	var hours_now = oDate.getHours(); //获取系统时，
	var minute_now = oDate.getMinutes(); //分
	var second_now = oDate.getSeconds(); //秒
	var menmber_now = second_now * 1 + minute_now * 100 + hours_now * 10000 + day_now * 1000000 + month_now * 100000000 + year_now * 10000000000;
	//获取活动开始结束的时间
	$.ajax({
		type: "get",
		async: true,
		url: "http://restful.lottery.coocaatv.com/v1/lottery/video/active",
		dataType: "jsonp",
		jsonp: "callback",
		success: function(data) {
			var begintime = data.activeBean.activeBeginTime;
			var endtime = data.activeBean.activeEndTime;
			//活动开始时间
			var year_activity_begin = begintime.substr(0, 4);
			var month_activity_begin = begintime.substr(5, 2);
			var day_activity_begin = begintime.substr(8, 2);
			var hour_activity_begin = begintime.substr(11, 2);
			var minute_activity_begin = begintime.substr(14, 2);
			var second_activity_begin = begintime.substr(17, 2);
			var menmber_activity_begin = second_activity_begin * 1 + minute_activity_begin * 100 + hour_activity_begin * 10000 + day_activity_begin * 1000000 + month_activity_begin * 100000000 + year_activity_begin * 10000000000;
			//alert(menmber_activity_begin);
			//活动结束时间
			var year_activity_end = endtime.substr(0, 4);
			var month_activity_end = endtime.substr(5, 2);
			var day_activity_end = endtime.substr(8, 2);
			var hour_activity_end = endtime.substr(11, 2);
			var minute_activity_end = endtime.substr(14, 2);
			var second_activity_end = endtime.substr(17, 2);
			var menmber_activity_end = second_activity_end * 1 + minute_activity_end * 100 + hour_activity_end * 10000 + day_activity_end * 1000000 + month_activity_end * 100000000 + year_activity_end * 10000000000;
			if (menmber_activity_begin <= menmber_now && menmber_now <= menmber_activity_end) { //如果活动开始
				//活动开始，首页默认状态为正确状态
				showChild_011();
			} else if (menmber_activity_begin > menmber_now) { //如果活动已经结束或者还未开始
				console.log("还未开始");
				hideChild_000(); //隐藏中奖名单区域
				hideChild_001(); //中奖名单 上下滚动效果
			} else if (menmber_activity_end < menmber_now) {
				console.log("已经结束");
				hideChild_000(); //隐藏中奖名单区域
				hideChild_002();
			}
		},
		error: function() {}
	});
}
//判断抽奖次数，若不为0，执行startDraw（），若为0，弹次数为0的toast
function startDrawFlag() {
	var isloginflag = $("#islogin").text();
	console.log("isloginflag:" + isloginflag);
	var startdrawflag = $("#drawleftnum").text();
	console.log("startdrawflag:" + startdrawflag);
	if (isloginflag == "false") {
		//提示您还没有登录，请先登录.
		console.log("you haved not loaded . Please login in first");
		var back = document.getElementById("toast-nologin-warm");
		if (back.style.display == "none") {
			back.style.display = "block";
		} else {
			back.style.display = "block";
		}
		document.getElementById("button-nologin-3-1").focus();
		//$("#button-img-5-1").attr("disabled", "disabled");
		$("#indexhtml :button").attr("disabled", "disabled");
	} else {
		console.log("left draw number is" + startdrawflag);
		if (startdrawflag != 0) {
			startDraw();
		} else {
			//抽奖次数为零，弹获取机会的toast；
			getProductPackage();
		}
	}
}
//开始抽奖,获取后台数据：奖品名称、等级、旋转角度
function startDraw() {
	//转盘转动的代码
	console.log("click start draw");
	var rotateTimeOut = function() {
		$('#rotate').rotate({
			angle: 0,
			animateTo: 2160,
			duration: 8000,
			callback: function() {
				alert('网络超时，请检查您的网络设置！');
			}
		});
	};
	var bRotate = false;
	var rotateFn = function(awards, angles, txt, typeid, lotteryAwardMemberId, imageurl) { //awards:奖项，angle:奖项对应的角度
		bRotate = !bRotate;
		$('#rotate').stopRotate();
		$('#rotate').rotate({
			angle: 0,
			animateTo: angles + 1800,
			duration: 3000,
			callback: function() {
				$("#unseediv").text(lotteryAwardMemberId);
				//这里需要传递几个用得到的参数过去：奖品名称 图片url地址
				console.log("got the winner award" + txt + angles + awards + "---" + typeid + "---" + lotteryAwardMemberId + "--------" + imageurl);
				//区分实体奖、虚体奖、谢谢参与
				if (txt == '影视会员VIP') {
					console.log("imageurl is " + imageurl);
					showChild_002(txt, awards, typeid, lotteryAwardMemberId, imageurl); //抽中影视会员VIP
				} else if (txt != '影视会员VIP' && txt != '谢谢参与') {
					console.log("no VIP and thanks for in");
					phonewriteornot(txt, awards, typeid, lotteryAwardMemberId); //抽中其他
					//$("#text_info-12-0").text(txt);
				} else {
					showChild_004(); //谢谢参与--未抽中
				}
				bRotate = !bRotate;
			}
		})
	};
	//向后台请求数据：角度，奖品ID，奖品名称，奖品等级   并传参macadress
	var macaddress = $("#macaddressnum").text();
	console.log("----------macaddress-------" + macaddress); //OK
	var accesstoken = $("#accesstoken").text();
	console.log("----------accesstoken-------" + accesstoken); //OK

	$.ajax({
		type: "post",
		async: true,
		data: {
			"macaddress": macaddress,
		},
		url: "http://restful.lottery.coocaatv.com/v1/lottery/video/lottery/" + macaddress + "/" + accesstoken,
		dataType: "jsonp",
		jsonp: "callback",
		success: function(data) {
			console.log('SUCCESS' + data + '-' + data.data.angle);
			Draw_angle = data.data.angle; //角度
			Draw_awardLevel = data.data.awardLevel; //几等奖
			Draw_awardName = data.data.awardName; //奖项名称
			Draw_lotteryAwardMemberId = data.data.lotteryAwardMemberId; //奖品id短信验证时用于传给后台
			Draw_awardTypeId = data.data.awardTypeId; //1是虚2是实
			Draw_awardPictureUrl = data.data.awardPictureUrl;
			//Draw_awardPictureUrl = null;
			console.log("转圈前：" + Draw_angle + Draw_awardLevel + Draw_awardName);
			if (bRotate) return;
			rotateFn(Draw_awardLevel, Draw_angle, Draw_awardName, Draw_awardTypeId, Draw_lotteryAwardMemberId, Draw_awardPictureUrl);
			console.log("in rotateFn imageurl is " + Draw_awardPictureUrl);
			LotteryNumber();
			//$("#unseediv").text(Draw_awardLevel);

		},
		error: function() {}
	});
}
//中奖名单
function AwardGetList() {
	var activid_3 = $("#activityid").text();
	console.log("activid_3" + activid_3);
	$.ajax({
		type: "get",
		async: true,
		url: "http://restful.lottery.coocaatv.com/v1/lottery/video/awardList/" + activid_3,
		dataType: "jsonp",
		jsonp: "callback",
		//jsonpCallback: "receive",
		success: function(data) {
			console.log("data.data.length" + data.data.length);
			var _UserNickName = new Array();
			var _AwardName = new Array();
			var _AwardTime = new Array();
			var _AwardTimeTime = new Array();
			for (var i = 0; i < data.data.length; i++) {
				_UserNickName[i] = data.data[i].userNickName;
				_AwardName[i] = data.data[i].awardName;
				_AwardTime[i] = data.data[i].awardTime;
				_AwardTimeTime[i] = _AwardTime[i].substr(0, 11);
			}
			for (var i = 0; i < data.data.length; i++) {
				if (_AwardName[i] == '谢谢参与') {

				} else {
					var _div = '<li >' + '<div class ="msg" >' + '<nobr style="width:30%; float: left; overflow: hidden;text-overflow :ellipsis">' + _UserNickName[i] + '</nobr>' + '<nobr style="width:28%; float: left; overflow: hidden; text-overflow :ellipsis">' + _AwardName[i] + '</nobr>' + '<nobr style="width:38%; float: left; overflow: hidden;text-overflow :ellipsis">' + _AwardTimeTime[i] + '</nobr>' + '</div>' + '</li>';
					$("#scrollinglist").append(_div);
				}
			}
		},
		error: function() {}
	});
	setTimeout(AwardGetList, 1800000); //设置为半小时
}
//页面特效功能
function focuseffection() {
	//开通会员
	$('#gotovipcenter_speciallyeffect').focus(function() {
		gotFocus(this.id);
	});
	$('#gotovipcenter_speciallyeffect').blur(function() {
		loseFocus(this.id);
	});
	//登录,如果用户没登录显示登录button
	$('#button-logo').focus(function() {
		gotFocus(this.id);
	});
	$('#button-logo').blur(function() {
		loseFocus(this.id);
	});
	//登录,如果用户已登录
	$('#button-been-logo').focus(function() {
		gotFocus(this.id);
	});
	$('#button-been-logo').blur(function() {
		loseFocus(this.id);
	});
	//开始抽奖
	$('#startdDraw').focus(function() {
		document.getElementById("bg_Operation-img-2").style.display= "none";
		document.getElementById("bg_Operation-img-2-border").style.display= "block";
	});
	$('#startdDraw').blur(function() {
		document.getElementById("bg_Operation-img-2").style.display= "block";
		document.getElementById("bg_Operation-img-2-border").style.display= "none";
	});
	//更多详情
	$('#moreinfo_speciallyeffect').focus(function() {
		gotFocus(this.id);
	});
	$('#moreinfo_speciallyeffect').blur(function() {
		loseFocus(this.id);
	});
	//我的奖品
	$('#myaward_speciallyeffect').focus(function() {
		gotFocus(this.id);
	});
	$('#myaward_speciallyeffect').blur(function() {
		loseFocus(this.id);
	});

	$('#button-ensure-1').focus(function() {
		gotFocus(this.id);
	});
	$('#button-ensure-1').blur(function() {
		loseFocus(this.id);
	});
	$('#button-ensure-2').focus(function() {
		gotFocus(this.id);
	})
	$('#button-img-3-1').focus(function() {
		gotFocus(this.id);
	});
	$('#button-img-3-1').blur(function() {
		loseFocus(this.id);
	});

	$('#button-img-3-2').focus(function() {
		gotFocus(this.id);
	});
	$('#button-img-3-2').blur(function() {
		loseFocus(this.id);
	});

	$('#button-back-3-1').focus(function() {
		gotFocus(this.id);
	});
	$('#button-back-3-1').blur(function() {
		loseFocus(this.id);
	});

	$('#button-back-3-2').focus(function() {
		gotFocus(this.id);
	});
	$('#button-back-3-2').blur(function() {
		loseFocus(this.id);
	});
	//	测试焦点变化
	$('#buttoon-back-3-1').focus(function() {
		gotFocus(this.id);
	});
	$('#buttoon-back-3-1').blur(function() {
		loseFocus(this.id);
	});

	$('#buttoon-back-3-2').focus(function() {
		gotFocus(this.id);
	});
	$('#buttoon-back-3-2').blur(function() {
		loseFocus(this.id);
	});

	$('#button-img-4-1').focus(function() {
		gotFocus(this.id);
	});
	$('#button-img-4-1').blur(function() {
		loseFocus(this.id);
	});

	$('#button-img-4-2').focus(function() {
		gotFocus(this.id);
	});
	$('#button-img-4-2').blur(function() {
		loseFocus(this.id);
	});

	$('#button-img-5-1').focus(function() {
		gotFocus(this.id);
	});
	$('#button-img-5-1').blur(function() {
		loseFocus(this.id);
	});

	$('#button-img-6-1').focus(function() {
		gotFocus(this.id);
	});
	$('#button-img-6-1').blur(function() {
		loseFocus(this.id);
	});

	$('#button-img-6-2').focus(function() {
		gotFocus(this.id);
	});
	$('#button-img-6-2').blur(function() {
		loseFocus(this.id);
	});
	//短信验证页确定
	$('#button-text-7').focus(function() {
		gotFocus(this.id);
	});
	$('#button-text-7').blur(function() {
		loseFocus(this.id);
	});
	//短信验证页验证码
	$('#form-info-7-5').focus(function() {
		$('#form-info-7-5').css("background-color", "red");
	});
	$('#form-info-7-5').blur(function() {
		$('#form-info-7-5').css("background-color", "blue");
	});
	$('#button-nologin-3-1').focus(function() {
		gotFocus(this.id);
	});
	$('#button-nologin-3-1').blur(function() {
		loseFocus(this.id);
	});
	$('#button-nologin-3-2').focus(function() {
		gotFocus(this.id);
	});
	$('#button-nologin-3-2').blur(function() {
		loseFocus(this.id);
	});

}

function gotFocus(id) {
	var thisid;
	thisid = document.getElementById(id).children[1].id;
	var ul = document.getElementById(thisid);
	if (ul.style.display == "block") {
		ul.style.display = "none";
	} else {
		ul.style.display = "block";
	}
}

function loseFocus(id) {
	var thisid;
	thisid = document.getElementById(id).children[1].id;
	var ul = document.getElementById(thisid);
	if (ul.style.display == "block") {
		ul.style.display = "none";
	} else {
		ul.style.display = "none";
	}
}

function FocusChange(id){	
	if (id == "form-info-9-2") {
		var scrollNubmerOne = $("#form-info-9-2").scrollTop();
		console.log(id+"---"+scrollNubmerOne);
		if(scrollNubmerOne==0){
			console.log("在最顶上");
			//document.getElementById("#form-info-9-2").focus();
			$("#form-info-9-4").attr("tabindex","-1");
		}else{
			$("#form-info-9-4").attr("tabindex","1");
		}
	} else{
		var scrollNubmerTwo = $("#form-info-9-4").scrollTop();
		console.log(id+"---"+scrollNubmerTwo);
		if(scrollNubmerTwo!=0){
			console.log("不在最顶上");
			$("#form-info-9-2").attr("tabindex","-1");
			//document.getElementById("#form-info-9-4").focus();
		}else{
			console.log("在最顶上");
			$("#form-info-9-2").attr("tabindex","1");
			//document.getElementById("#form-info-9-2").focus();
		}
	}
}
//验证手机号是否正确，正确就执行读秒倒计时操作并给后台传递正确的手机号
function getCountDown() {
	var validCode = true;
	$(".captcha").click(function() {
		var phoneNumber = $('#form-info-7-3').val();
		var rel = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
		if (rel.test(phoneNumber)) {
			time(this); //验证通过读秒60秒
			//将用户填写的手机号传给后台
			$.ajax({
				type: "get",
				async: true,
				url: "http://restful.lottery.coocaatv.com/v1/lottery/video/sendMessage/" + phoneNumber,
				dataType: "jsonp",
				jsonp: "callback",
				jsonpCallback: "receive",
				success: function(data, textStatus) {
					console.log("------------request success data---------" + data);
					console.log("------------request success textStatus---------" + textStatus);
					$("#fivePhone").text("true");
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("444:");
				},
			});
		} else {
			if (phoneNumber == "  请准确填写手机号") {
				console.log("空" + phoneNumber);
				var ul = document.getElementById("toastfalse");
				if (ul.style.display == "none") {
					ul.style.display = "block";
				} else {
					ul.style.display = "block";
				}
				$("#form-info-7-6-1").val("手机号不能为空，请重新填写。");
				setTimeout("toWriteAgain()", 2000);
			} else {
				var ul = document.getElementById("toastfalse");
				if (ul.style.display == "none") {
					ul.style.display = "block";
				} else {
					ul.style.display = "block";
				}
				$("#form-info-7-6-1").val("手机号不匹配请重新填写。");
				setTimeout("toWriteAgain()", 2000);
			}
		}
		setTimeout(overflow, 3000);
	});

}

//验证码读秒
function time(o) {
	if (wait == 0) {
		o.removeAttribute("disabled");
		o.value = "获取验证码";
		wait = 60;
	} else {
		o.setAttribute("disabled", true);
		o.value = "重新发送(" + wait + ")";
		wait--;
		setTimeout(function() {
				time(o)
			},
			1000)
	}
}

function overflow() {
	var fiveFlag = $("#fivePhone").text();
	console.log("fiveFlag=" + fiveFlag);
	if (fiveFlag == "true") {
		console.log("Thr number id less than 5.");
	} else {
		console.log("Thr number id over than 5.");
		var ul = document.getElementById("numberBigFive");
		if (ul.style.display == "none") {
			ul.style.display = "block";
		} else {
			ul.style.display = "block";
		}
		setTimeout("overflowRemove()", 3000);
	}
}

function overflowRemove() {
	var ul = document.getElementById("numberBigFive");
	if (ul.style.display == "block") {
		ul.style.display = "none";
	} else {
		ul.style.display = "none";
	}
}

//音乐效果
function choujiangmusic() {
	var music = document.getElementById("music");
	music.pause();
	$("#music").attr("src", "sounds/clickdraw.mp3");
}

function zhongjiangmusic() {
	var music = document.getElementById("music");
	$("#music").attr("src", "sounds/winmusic.mp3");
}

function meizhongjiangmusic() {
	var music = document.getElementById("music");
	$("#music").attr("src", "sounds/sorrymusic.mp3");
}

function shouyemusic() {
	var music = document.getElementById("music");
	$("#music").attr("src", "sounds/001aixia.mp3");
}
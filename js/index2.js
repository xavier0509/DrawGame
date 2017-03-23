document.write("<script language=javascript src='../js/framework2.js' charset=\"utf-8\"></script>");
var begintime = null;//活动开始时间(后台)
var endtime = null;  //活动结束时间（后台）
var trueBegin = null;
var trueEnd = null;
var nowTime = new Date().getTime();
var lotterynumber = null;

$(function() {
	focuseffection();
});
//index页面按钮点击切换效果
function buttonInit(){
	console.log("hello");
	document.getElementById("button_moreInfo").onclick = function(){
		console.log("button_moreInfo");
		document.getElementById("detailInfo").style.display = "block";
		document.getElementById("indexhtml").style.display = "none";
		showMoreInfo();
	}
	document.getElementById("button_myAward").onclick = function(){
		console.log("button_myAward");
		document.getElementById("myAwardInfo").style.display = "block";
		document.getElementById("indexhtml").style.display = "none";
	}
	document.getElementById("notStartButton").onclick = function(){
		console.log("notStartButton");
		document.getElementById("notStartMasking").style.display = "none";
	}
	document.getElementById("alEndButton").onclick = function(){
		console.log("alEndButton");
		document.getElementById("alEndMasking").style.display = "none";
	}
	document.getElementById("goodLuckButton_2").onclick = function(){
		console.log("goodLuckButton_2");
		document.getElementById("formInfo").style.display = "block";
	}
}

//获奖名单滚动效果
function startmarquee(lh,speed,delay,index){ 
	var t; 
	var p=false; 
	var o=document.getElementById("awardList"); 
	o.innerHTML+=o.innerHTML; 
	o.onmouseover=function(){p=true} 
	o.onmouseout=function(){p=false} 
	o.scrollTop = 0; 
	function start(){ 
		t=setInterval(scrolling,speed); 
		if(!p){ o.scrollTop += 1;} 
	} 
	function scrolling(){ 
		if(o.scrollTop%lh!=0){ 
			o.scrollTop += 1; 
			if(o.scrollTop>=o.scrollHeight/2) o.scrollTop = 0; 
			}else{ 
				clearInterval(t); 
				setTimeout(start,delay); 
			} 
		} 
	setTimeout(start,delay); 
} 

//页面初始化
function pageInit(){
	$.ajax({
		type: "get",
		async: true,
		url: "https://beta.restful.lottery.coocaatv.com/v1/lottery/indepqy/active/20",
		dataType: "jsonp",
		jsonp: "callback",
		success: function(data) {
			console.log("seccess for activity info...");
			// console.log("活动信息：" + JSON.stringify(data));
			console.log("活动开始时间：" + data.activeBean.activeBeginTime);
			begintime = data.activeBean.activeBeginTime;
			trueBegin = Date.parse(new Date(begintime));
			console.log("活动开始时间：" + trueBegin);
			console.log("当前时间："+ nowTime)			
			endtime = data.activeBean.activeEndTime;
			trueEnd = Date.parse(new Date(endtime));
			console.log("活动结束时间：" + trueEnd);
			if (nowTime < trueBegin ) {
				$("#awardList").text("活动尚未开始，请耐心等待");
				document.getElementById("turntable_1").style.backgroundImage = "url("+app.rel_html_imgpath(__uri("../images/notstartdraw.png"))+")";
				document.getElementById("turntable_1").setAttribute("disabled","");
			}
			else if (nowTime > trueEnd) {
				$("#awardList").text("活动已经结束，请期待下次活动");
				document.getElementById("turntable_1").setAttribute("disabled","");
				document.getElementById("turntable_1").style.backgroundImage = "url("+app.rel_html_imgpath(__uri("../images/activityEnd.png"))+")";
			}else{
				showAwardList();
				setInterval(showAwardList, 30000);
			}
		},
		error: function() {
			console.log("fail...");
		}
	});
}

//展示抽奖次数
function showDrawTimes(){
	console.log("展示抽奖次数: " );
	console.log("access_token : " + accesstoken);
	$.ajax({
		type: "get",
		async: true,
		url: "https://beta.restful.lottery.coocaatv.com/v1/lottery/indepqy/leftNumber/20/" + accesstoken,
		dataType: "jsonp",
		jsonp: "callback",
		success: function(data) {
			console.log("抽奖次数获取成功：" + data.number);
			lotterynumber = data.number;
			$("#drawTimes").text(lotterynumber);
		},
		error: function() {
			console.log("fail...");
		}
	});
}

//展示获奖名单
function showAwardList(){
	$.ajax({
		type: "get",
		async: true,
		url: "https://beta.restful.lottery.coocaatv.com/v1/lottery/indepqy/awardList/20",
		dataType: "jsonp",
		jsonp: "callback",
		success: function(data) {
			console.log("seccess...");
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
					var list = '<li>' + '<span class="testspan">' + _UserNickName[i] +'</span><span class="testspan">' + _AwardName[i] + '</span><span class="testspan">' + _AwardTimeTime[i] + '</span></li>';
					$("#awardul").append(list);
				}
			}

		},
		error: function() {
			console.log("fail...");
		}
	});
}

//开始抽奖
function startDraw(){
	if (loginstatus == "false") {
		console.log("请先登录！！");
	}else{
		if (lotterynumber > 0) {
			rotateStart();
		}
		else{
			console.log("请先获取抽奖机会")
		}
	}
}
//转动转盘
function rotateStart(){
	console.log("开始抽奖！！！！！！！");
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
		console.log("进来了！！！！"+awards+"@@@@@"+bRotate);
		$('#rotate').stopRotate();
		$('#rotate').rotate({
			angle: 0,
			animateTo: angles + 2000,
			duration: 3000,
			callback: function() {
				console.log("转了！！！！");
				// $("#unseediv").text(lotteryAwardMemberId);
				//这里需要传递几个用得到的参数过去：奖品名称 图片url地址
				// console.log("got the winner award" + txt + angles + awards + "---" + typeid + "---" + lotteryAwardMemberId + "--------" + imageurl);
				//区分实体奖、虚体奖、谢谢参与
				if (txt == '影视会员VIP') {
					console.log("imageurl is " + imageurl);
					// showChild_002(txt, awards, typeid, lotteryAwardMemberId, imageurl); //抽中影视会员VIP
				} else if (txt != '影视会员VIP' && txt != '谢谢参与') {
					console.log("no VIP and thanks for in");
					// phonewriteornot(txt, awards, typeid, lotteryAwardMemberId); //抽中其他
					//$("#text_info-12-0").text(txt);
				} else {
					// showChild_004(); //谢谢参与--未抽中
				}
				bRotate = !bRotate;
			}
		})
	};

	rotateFn("1", "60", "Draw_awardName", "1234", "111", "1521515");

	// $.ajax({
	// 	type: "get",
	// 	async: true,
	// 	url: "https://beta.restful.lottery.coocaatv.com/v1/lottery/indepqy/lottery/20/" + mac + "/" + accesstoken,
	// 	dataType: "jsonp",
	// 	jsonp: "callback",
	// 	success: function(data) {
	// 		console.log("seccess...");
			
	// 	},
	// 	error: function() {
	// 		console.log("fail...");
	// 	}
	// });
}

function showMoreInfo(){
	$.ajax({
		type: "get",
		async: true,
		url: "https://beta.restful.lottery.coocaatv.com/v1/lottery/video/detail/20",
		dataType: "jsonp",
		jsonp: "callback",
		//jsonpCallback: "receive",
		success: function(data) {
			var MoreInfo_all = data.activeDetail;
			$("#detailInfo_1").append(MoreInfo_all);
		},
		error: function() {
			console.log('fail');
		}
	});
}
function dialogShow(){
	var oClassButton = new Array();
	var oDialogObj = ["notStartMasking","alEndMasking","VIPMasking","moreChanceMasking","badLuckMasking","noTelMasking","goodLuckMasking","8","9"];
	oClassButton = document.getElementsByClassName("buttonstyle");
	for(var i = 0; i < oClassButton.length; i++) {
		oClassButton[i].index = i;
		oClassButton[i].onclick = function() {
			console.log(this.index);
			var thisIndex = this.index;
			console.log(oDialogObj[thisIndex]);
			document.getElementById(oDialogObj[thisIndex]).style.display = "block";
		}
	}
}






















//页面特效功能
function focuseffection() {
	//开通会员
//	$('#gotovipcenter_speciallyeffect').focus(function() {
//		gotFocus(this.id);
//	});
//	$('#gotovipcenter_speciallyeffect').blur(function() {
//		loseFocus(this.id);
//	});
	//登录,如果用户没登录显示登录button
//	$('#button-logo').focus(function() {
//		gotFocus(this.id);
//	});
//	$('#button-logo').blur(function() {
//		loseFocus(this.id);
//	});
	//登录,如果用户已登录
//	$('#button-been-logo').focus(function() {
//		gotFocus(this.id);
//	});
//	$('#button-been-logo').blur(function() {
//		loseFocus(this.id);
//	});
	//开始抽奖
//	$('#startdDraw').focus(function() {
//		document.getElementById("bg_Operation-img-2").style.display= "none";
//		document.getElementById("bg_Operation-img-2-border").style.display= "block";
//	});
//	$('#startdDraw').blur(function() {
//		document.getElementById("bg_Operation-img-2").style.display= "block";
//		document.getElementById("bg_Operation-img-2-border").style.display= "none";
//	});
	//更多详情
//	$('#moreinfo_speciallyeffect').focus(function() {
//		gotFocus(this.id);
//	});
//	$('#moreinfo_speciallyeffect').blur(function() {
//		loseFocus(this.id);
//	});
	//我的奖品
//	$('#myaward_speciallyeffect').focus(function() {
//		gotFocus(this.id);
//	});
//	$('#myaward_speciallyeffect').blur(function() {
//		loseFocus(this.id);
//	});

	$('#alEndButton').focus(function() {
		gotFocus(this.id);
	});
	$('#alEndButton').blur(function() {
		loseFocus(this.id);
	});
	$('#notStartButton').focus(function() {
		console.log(this.id);
		gotFocus(this.id);
	});
	$('#notStartButton').blur(function() {
		console.log(this.id);
		loseFocus(this.id);
	});
	$('#moreChanceButton_1').focus(function() {
		gotFocus(this.id);
	});
	$('#moreChanceButton_1').blur(function() {
		loseFocus(this.id);
	});

	$('#moreChanceButton_2').focus(function() {
		gotFocus(this.id);
	});
	$('#moreChanceButton_2').blur(function() {
		loseFocus(this.id);
	});

//	$('#button-back-3-1').focus(function() {
//		gotFocus(this.id);
//	});
//	$('#button-back-3-1').blur(function() {
//		loseFocus(this.id);
//	});
//
//	$('#button-back-3-2').focus(function() {
//		gotFocus(this.id);
//	});
//	$('#button-back-3-2').blur(function() {
//		loseFocus(this.id);
//	});
	$('#goodLuckButton_1').focus(function() {
		gotFocus(this.id);
	});
	$('#goodLuckButton_1').blur(function() {
		loseFocus(this.id);
	});

	$('#goodLuckButton_2').focus(function() {
		gotFocus(this.id);
	});
	$('#goodLuckButton_2').blur(function() {
		loseFocus(this.id);
	});

	$('#badLuckButton_1').focus(function() {
		gotFocus(this.id);
	});
	$('#badLuckButton_1').blur(function() {
		loseFocus(this.id);
	});

	$('#badLuckButton_2').focus(function() {
		gotFocus(this.id);
	});
	$('#badLuckButton_2').blur(function() {
		loseFocus(this.id);
	});

	$('#noTelButton').focus(function() {
		gotFocus(this.id);
	});
	$('#noTelButton').blur(function() {
		loseFocus(this.id);
	});

//	$('#button-img-6-1').focus(function() {
//		gotFocus(this.id);
//	});
//	$('#button-img-6-1').blur(function() {
//		loseFocus(this.id);
//	});
//
//	$('#button-img-6-2').focus(function() {
//		gotFocus(this.id);
//	});
//	$('#button-img-6-2').blur(function() {
//		loseFocus(this.id);
//	});
//	//短信验证页确定
//	$('#button-text-7').focus(function() {
//		gotFocus(this.id);
//	});
//	$('#button-text-7').blur(function() {
//		loseFocus(this.id);
//	});
//	//短信验证页验证码
//	$('#form-info-7-5').focus(function() {
//		$('#form-info-7-5').css("background-color", "red");
//	});
//	$('#form-info-7-5').blur(function() {
//		$('#form-info-7-5').css("background-color", "blue");
//	});
//	$('#button-nologin-3-1').focus(function() {
//		gotFocus(this.id);
//	});
//	$('#button-nologin-3-1').blur(function() {
//		loseFocus(this.id);
//	});
//	$('#button-nologin-3-2').focus(function() {
//		gotFocus(this.id);
//	});
//	$('#button-nologin-3-2').blur(function() {
//		loseFocus(this.id);
//	});
}

function gotFocus(id) {
	var thisid;
	thisid = document.getElementById(id).children[0].id;
	console.log(thisid);
	document.getElementById(thisid).style.display = "block";
}

function loseFocus(id) {
	var thisid;
	thisid = document.getElementById(id).children[0].id;
	document.getElementById(thisid).style.display = "none";
}
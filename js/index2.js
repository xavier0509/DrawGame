document.write("<script language=javascript src='../js/framework2.js' charset=\"utf-8\"></script>");
var begintime = null;//活动开始时间(后台)
var endtime = null;  //活动结束时间（后台）
var trueBegin = null;
var trueEnd = null;
var nowTime = new Date().getTime();
var lotterynumber = null;
var activeId = 20;
var msgCode = null;//短信验证码

$(function() {
 	buttonInit();//index页面两个按钮事件
   	focuseffection();
   	dialogShow();
});
//index页面按钮点击切换效果
function buttonInit(){
	console.log("hello");
	document.getElementById("button_moreInfo").onclick = function(){
		console.log("button_moreInfo");
		dialogShow1("detailInfo");
//		document.getElementById("detailInfo").style.display = "block";
//		indexhtmlButtonF();
		document.getElementById("indexhtml").style.display = "none";
		showMoreInfo();
	}
	document.getElementById("button_myAward").onclick = function(){
		console.log("button_myAward");
		dialogShow1("myAwardInfo");
//		document.getElementById("myAwardInfo").style.display = "block";
//		indexhtmlButtonF();
		document.getElementById("indexhtml").style.display = "none";
		showMyAward();
	}
	document.getElementById("notStartButton").onclick = function(){
		console.log("notStartButton");
		dialogHide("notStartMasking");
//		document.getElementById("notStartMasking").style.display = "none";
//		indexhtmlButtonT();
	}
	document.getElementById("moreChanceButton_2").onclick = function(){
		console.log("moreChanceButton_2");
		dialogHide("moreChanceMasking");
//		document.getElementById("moreChanceMasking").style.display = "none";
//		indexhtmlButtonT();
	}
	document.getElementById("badLuckButton_1").onclick = function(){
		console.log("badLuckButton_1");
		dialogHide("badLuckMasking");
//		document.getElementById("badLuckMasking").style.display = "none";
//		indexhtmlButtonT();
	}
	document.getElementById("badLuckButton_2").onclick = function(){
		console.log("badLuckButton_2");
		dialogHide("badLuckMasking");
//		document.getElementById("badLuckMasking").style.display = "none";
//		indexhtmlButtonT();
	}
	document.getElementById("alEndButton").onclick = function(){
		console.log("alEndButton");
		dialogHide("alEndMasking");
//		document.getElementById("alEndMasking").style.display = "none";
//		indexhtmlButtonT();
	}
	document.getElementById("goodLuckButton_2").onclick = function(){
		console.log("goodLuckButton_2");
		dialogShow1("formInfo");
//		document.getElementById("formInfo").style.display = "block";
//		indexhtmlButtonF();
		document.getElementById("formInfoPINButton").onclick = function(){sendMessage()};
		document.getElementById("formInfoButton").onclick = function(){changePhone()};
	}
	document.getElementById("noTelButton").onclick = function(){
		console.log("noTelButton");
		dialogShow1("formInfo"));
//		document.getElementById("formInfo").style.display = "block";
//		indexhtmlButtonF();
		document.getElementById("formInfoPINButton").onclick = function(){sendMessage()};
		document.getElementById("formInfoButton").onclick = function(){changePhone()};
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
		url: "https://beta.restful.lottery.coocaatv.com/v1/lottery/indepqy/active/"+activeId,
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
				// dialogShow1("notStartMasking");
				$("#awardList").text("活动尚未开始，请耐心等待");
				document.getElementById("turntable_1").style.backgroundImage = "url("+app.rel_html_imgpath(__uri("../images/notstartdraw.png"))+")";
				// document.getElementById("turntable_1").setAttribute("disabled","");
			}
			else if (nowTime > trueEnd) {
				// dialogShow1("alEndMasking");
				$("#awardList").text("活动已经结束，请期待下次活动");
				// document.getElementById("turntable_1").setAttribute("disabled","");
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
		url: "https://beta.restful.lottery.coocaatv.com/v1/lottery/indepqy/leftNumber/"+activeId+"/" + accesstoken,
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
	document.getElementById("awardul").innerHTML="" 
	$.ajax({
		type: "get",
		async: true,
		url: "https://beta.restful.lottery.coocaatv.com/v1/lottery/indepqy/awardList/"+activeId,
		data: {"size":"20"},
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
	console.log("DRAWTIMES:"+lotterynumber);
	if (loginstatus == "false") {
		console.log("请先登录！！");
	}else{
		var drawnow = new Date().getTime();
		if (drawnow <　trueBegin) {
			dialogShow1("notStartMasking");
		}else if(drawnow > trueEnd){
			dialogShow1("alEndMasking");
		}
		else{
			if (lotterynumber > 0) {
			rotateStart();
		}
			else{
				console.log("请先获取抽奖机会");
				dialogShow1("moreChanceMasking");
			}
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
	var mobile = "123";
	var bRotate = false;
	var rotateFn = function(awards, angles, txt, typeid, lotteryAwardMemberId,awardId) { //awards:奖项，angle:奖项对应的角度
		bRotate = !bRotate;
		$('#rotate').stopRotate();
		$('#rotate').rotate({
			angle: 0,
			animateTo: angles + 720,
			duration: 3000,
			callback: function() {
				//这里需要传递几个用得到的参数过去：奖品名称 图片url地址
				console.log("got the winner award" + txt + angles + awards + "---" + typeid + "---" + lotteryAwardMemberId + "--------" );
				//区分实体奖、虚体奖、谢谢参与
				//115---年卡，113月卡，109 7天卡，110谢谢
				if (awardId == '115') {
					dialogShow1("VIPMasking");
					document.getElementById("toast-img-2-2").src = app.rel_html_imgpath(__uri("../images/115.png"));
					document.getElementById("activateNow").onclick = function(){
						vipActive(lotteryAwardMemberId,awardId);
					};
					
					// showChild_002(txt, awards, typeid, lotteryAwardMemberId, imageurl); //抽中影视会员VIP
				} 
				else if(awardId == '113'){
					dialogShow1("VIPMasking");
					document.getElementById("toast-img-2-2").src = app.rel_html_imgpath(__uri("../images/113.png"));
					document.getElementById("activateNow").onclick = function(){vipActive(lotteryAwardMemberId,awardId);}
				}
				else if(awardId == '109'){
					dialogShow1("VIPMasking");
					document.getElementById("toast-img-2-2").src = app.rel_html_imgpath(__uri("../images/109.png"));
					document.getElementById("activateNow").onclick = function(){vipActive(lotteryAwardMemberId,awardId);}
				}
				else if (awardId != '110') {
					console.log("no VIP and thanks for in");
					if (mobile == null || mobile == "") {
						dialogShow1("noTelMasking");
						document.getElementById("text_info-11-0").innerHTML = "【"+txt+"】";
						
					}else{
						dialogShow1("goodLuckMasking");
						document.getElementById("userTel").innerHTML = mobile;
						document.getElementById("goodLuckName").innerHTML = "【"+txt+"】";
						document.getElementById("goodLuckButton_1").onclick = function(){ makesurePhone(lotteryAwardMemberId);}

					}
					
				} else {
					dialogShow1("badLuckMasking");
					
				}
				bRotate = !bRotate;
			}
		})
	};

	$.ajax({
		type: "get",
		async: true,
		url: "https://beta.restful.lottery.coocaatv.com/v1/lottery/indepqy/lottery/"+activeId+"/" + mac + "/" + accesstoken,
		dataType: "jsonp",
		jsonp: "callback",
		success: function(data) {
			console.log("seccess...");
			Draw_angle = data.data.angle; //角度
			Draw_awardLevel = data.data.awardLevel; //几等奖
			Draw_awardName = data.data.awardName; //奖项名称
			Draw_lotteryAwardMemberId = data.data.lotteryAwardMemberId; //奖品id短信验证时用于传给后台
			Draw_awardTypeId = data.data.awardTypeId; //1是虚2是实
			Draw_awardId = data.data.awardId;
			//Draw_awardPictureUrl = null;
			console.log("转圈前：" + Draw_angle + Draw_awardLevel + Draw_awardName);
			if (bRotate) return;
			rotateFn(Draw_awardLevel, Draw_angle, Draw_awardName, Draw_awardTypeId, Draw_lotteryAwardMemberId,Draw_awardId);
			showDrawTimes();
			showAwardList();			
		},
		error: function() {
			console.log("fail...");
		}
	});
}

//激活vip--index
function vipActive(listId,awardId){
	console.log("开始激活影视会员");
	$.ajax({
		type: "get",
		async: true,
		url: "https://beta.restful.lottery.coocaatv.com/v1/lottery/indepqy/"+listId+"/" +awardId+"/"+activeId+"/"+ mac + "/" + accesstoken,
		dataType: "jsonp",
		jsonp: "callback",
		success: function(data) {
			console.log("影视激活..."+data.success+"msg:"+data.msg);
			if(data.success == true){
				dialogHide("VIPMasking");
				dialogShow1("activateSuccessMasking");
				
			}
			else{
				dialogHide("VIPMasking");
				dialogShow1("activateFailureMasking");

			}
			
		},
		error: function() {
			console.log("fail...");
		}
	});
}

//激活vip--myaward
function vipActiveTwo(listId,awardId){
	console.log("开始激活影视会员");
	$.ajax({
		type: "get",
		async: true,
		url: "https://beta.restful.lottery.coocaatv.com/v1/lottery/indepqy/"+listId+"/" +awardId+"/"+activeId+"/"+ mac + "/" + accesstoken,
		dataType: "jsonp",
		jsonp: "callback",
		success: function(data) {
			console.log("影视激活..."+data.success+"msg:"+data.msg);
			if(data.success == true){
				dialogShow1("activateSuccessMasking");
			}
			else{
				dialogShow1("activateFailureMasking2");
			}
			
		},
		error: function() {
			console.log("fail...");
		}
	});
}

//确认手机号
function makesurePhone(obj){
	console.log("lotteryAwardMemberId:"+obj);
	//TODO  隐藏弹框

	$.ajax({
		type: "get",
		async: true,
		url: "https://beta.restful.lottery.coocaatv.com/v1/lottery/indepqy/confirm/" + obj + "/" + mobile + "/" + accesstoken,
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

//发送短信
function sendMessage(){
	var phoneNumber = $("formInfoTel").val();
	var rel = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
	if (rel.test(phoneNumber)) {
		time(this);//验证通过读秒60秒
		$.ajax({
			type: "get",
			async: true,
			url: "https://beta.restful.lottery.coocaatv.com/v1/lottery/indepqy/sendMessage/" + phoneNumber ,
			dataType: "jsonp",
			jsonp: "callback",
			//jsonpCallback: "receive",
			success: function(data) {
			},
			error: function() {
				console.log('fail');
			}
		});
	}
	else {
		//TODO  填错手机号问题
	}
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

//修改手机号
function changePhone(){
	var phoneNumber = $('#formInfoTel').val();
	var captcha_new = $('#formInfoPINText').val();
	$.ajax({
			type: "get",
			async: true,
			url: "https://beta.restful.lottery.coocaatv.com/v1/lottery/indepqy/updateUserInfo/" + Draw_lotteryAwardMemberId + "/" + phoneNumber + "/" + captcha_new + "/" + accesstoken,
			dataType: "jsonp",
			jsonp: "callback",
			success: function(data) {
				//TODO  修改成功后的UI
			},
			error: function() {
				console.log('fail');
			}
		});
}

//我的奖品
function showMyAward(){
	var myAwardInfo = document.getElementById("myAwardInfo_1");
	var _MyAwardsBeanlength = null;
	var _AwardTypeId = new Array();
	var _AwardName = new Array();
	var _AwardExchangeFlag = new Array();
	var _AwardId = new Array();
	var _AwardMemberId = new Array();
	$.ajax({
		type: "get",
		async: true,
		url: "https://beta.restful.lottery.coocaatv.com/v1/lottery/indepqy/myAwards/"+activeId+"/"+accesstoken,
		dataType: "jsonp",
		jsonp: "callback",
		//jsonpCallback: "receive",
		success: function(data) {
			console.log("查询我的奖品成功");
			_MyAwardsBeanlength = data.myAwardsBean.length
			for (var i = 0; i < _MyAwardsBeanlength; i++) {
				_AwardExchangeFlag[i] = data.myAwardsBean[i].awardExchangeFlag;
				console.log("_AwardExchangeFlag=" + _AwardExchangeFlag[i]);
				_AwardName[i] = data.myAwardsBean[i].awardName;
				_AwardTypeId[i] = data.myAwardsBean[i].awardTypeId;
				_AwardId[i] = data.myAwardsBean[i].awardId;
				_AwardMemberId[i] = data.myAwardsBean[i].lotteryAwardMemberId;
				_Number = i;
				var awardImg = app.rel_html_imgpath(__uri('../images/scroll_1.png'));

				if (_AwardExchangeFlag[i] == 0) {
					var imgurl = app.rel_html_imgpath(__uri('../images/rightnow.png'));
				}else{
					var imgurl = app.rel_html_imgpath(__uri('../images/successnow.png'));
				}
				
				// var awardButton = '<button  style="width: 65%; height: 100%; float: left;' + 'background-image: url(' + imgurl + ');background-size:100%;"></button>';
				// // awardButton.appendChild(buttonImg);
				// spanDiv2.innerHTML=awardButton;
				if (_AwardTypeId[i] == "2") {
				var _div = '<div title="images" class="wrap"  style="float:left;border:0px solid; width: 45%; height: 65%; padding-right: 5%; margin-top: 0.5%; overflow: hidden; text-overflow: ellipsis;  opacity: 1; float: left; "><div title ="AwardImage" class ="AwardImageUrl" style="background-repeat: no-repeat;background-size: 100%;border:0px solid blue; width: 95%; height: 80%; padding-left: 0%; padding-top: 0%;  margin-top: 0.5%; margin-left: 0.5%; background-color: white; overflow: hidden;  text-overflow: ellipsis; border: 1px solid black; opacity: 0.5; background-image: url('+awardImg+');background-size:100%;"></div><div title="Detail" tabindex="-1" style="position:relative;border:1px solid; width: 95%; height: 17%;  margin-left: 0.5%; text-align: center; border: 1px solid black; opacity: 1;"><span class="awardName">'+_AwardName[i]+'</span><button onclick="vipActive()" style="background-color: rgba(0, 0, 0, 0);position:absolute;width:28%;height:70%;top:15%;right:2%;float:right;background-image:url('+imgurl+');background-repeat: no-repeat;background-size: 100%;"></button></div></div>'					
				}
				else if (_AwardTypeId[i] == "4") {
				var _div = '<div title="images" class="wrap"  style="float:left;border:0px solid; width: 45%; height: 65%; padding-right: 5%; margin-top: 0.5%; overflow: hidden; text-overflow: ellipsis;  opacity: 1; float: left; "><div title ="AwardImage" class ="AwardImageUrl" style="background-repeat: no-repeat;background-size: 100%;border:0px solid blue; width: 95%; height: 80%; padding-left: 0%; padding-top: 0%;  margin-top: 0.5%; margin-left: 0.5%; background-color: white; overflow: hidden;  text-overflow: ellipsis; border: 1px solid black; opacity: 0.5; background-image: url('+awardImg+');background-size:100%;"></div><div title="Detail" tabindex="-1" style="position:relative;border:1px solid; width: 95%; height: 17%;  margin-left: 0.5%; text-align: center; border: 1px solid black; opacity: 1;"><span class="awardName">'+_AwardName[i]+'</span><button onclick="vipActiveTwo('+_AwardMemberId[i]+','+_AwardId[i]+')" style="background-color: rgba(0, 0, 0, 0);position:absolute;width:28%;height:70%;top:15%;right:2%;float:right;background-image:url('+imgurl+');background-repeat: no-repeat;background-size: 100%;"></button></div></div>'					
				}
				$("#myAwardInfo_1").append(_div);
			}
		},
		error: function() {
			console.log('fail');
		}
	});
}

//更多详情
function showMoreInfo(){
	$.ajax({
		type: "get",
		async: true,
		url: "https://beta.restful.lottery.coocaatv.com/v1/lottery/video/detail/"+activeId,
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
	var oDialogObj = ["notStartMasking","alEndMasking","VIPMasking","moreChanceMasking","badLuckMasking","noTelMasking","goodLuckMasking","backWarn","inCompatibleMasking","activateSuccessMasking","activateFailureMasking","12"];
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

function dialogShow1(txt){
	document.getElementById(txt).style.display = "block";
	$("#indexhtml :button").attr("disabled", "disabled");
}
function dialogHide(txt){
	document.getElementById(txt).style.display = "none";
	$("#indexhtml :button").removeAttr("disabled");
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
	
	$('#activateNow').focus(function() {
		gotFocus(this.id);
	});
	$('#activateNow').blur(function() {
		loseFocus(this.id);
	});

	//短信验证页确定
	$('#formInfoButton').focus(function() {
		gotFocus(this.id);
	});
	$('#formInfoButton').blur(function() {
		loseFocus(this.id);
	});
	//短信验证页验证码
	$('#form-info-7-5').focus(function() {
		$('#form-info-7-5').css("background-color", "red");
	});
	$('#form-info-7-5').blur(function() {
		$('#form-info-7-5').css("background-color", "blue");
	});
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

function indexhtmlButtonT(){
	$("#indexhtml :button").attr("disabled", "disabled");
}
function indexhtmlButtonF(){
	$("#indexhtml :button").removeAttr("disabled");
}
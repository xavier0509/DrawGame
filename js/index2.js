document.write("<script language=javascript src='../js/framework2.js' charset=\"utf-8\"></script>");
var begintime = null;//活动开始时间(后台)
var endtime = null;  //活动结束时间（后台）
var trueBegin = null;
var trueEnd = null;
var nowTime = new Date().getTime();
//index页面按钮点击切换效果
function buttonInit(){
	console.log("hello");
	document.getElementById("button_moreInfo").onclick = function(){
		console.log("button_moreInfo");
		document.getElementById("detailInfo").style.display = "block";
		document.getElementById("indexhtml").style.display = "none";
	}
	document.getElementById("button_myAward").onclick = function(){
		console.log("button_myAward");
		document.getElementById("myAwardInfo").style.display = "block";
		document.getElementById("indexhtml").style.display = "none";
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
		url: "https://beta.restful.lottery.coocaatv.com/v1/lottery/indepqy/active/18",
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
			}
			else if (nowTime > trueBegin) {
				$("#awardList").text("活动已经结束，请期待下次活动");
			}else{
				showAwardList();   //获奖名单
			}
		},
		error: function() {
			console.log("fail...");
		}
	});
}

//展示抽奖次数
function showDrawTimes(){
	// console.log("activid : " + activid);
	console.log("access_token : " + accesstoken);
	$.ajax({
		type: "get",
		async: true,
		url: "https://beta.restful.lottery.coocaatv.com/v1/lottery/indepqy/leftNumber/18" + accesstoken,
		dataType: "jsonp",
		jsonp: "callback",
		success: function(data) {
			console.log("抽奖次数获取成功：" + data.number);
			var lotterynumber = data.number;
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
		url: "https://beta.restful.lottery.coocaatv.com/v1/lottery/indepqy/awardList/18",
		dataType: "jsonp",
		jsonp: "callback",
		success: function(data) {
			console.log("seccess...");
			var lotterynumber = data.number;
			$("#text_info-40").text(lotterynumber);
			$("#drawleftnum").text(lotterynumber);
		},
		error: function() {
			console.log("fail...");
		}
	});
}

$(function() {
	buttonInit();
	startmarquee(25,60,0); 
});

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

function startmarquee(lh,speed,delay){ 
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

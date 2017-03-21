
$(function() {
	buttonInit();
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

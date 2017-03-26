var userInfo = null;     //用户信息
var deviceInfo = null;   //设备信息
var accesstoken = null;  //accesstoken信息 
var mobile = null;
var mac = null;
var androidsdk = null;   //安卓4.3为18，则小于18的均不支持此活动
var loginstatus = false;
var app = {
    canonical_uri: function(src, base_path) {
        var root_page = /^[^?#]*\//.exec(location.href)[0],
            root_domain = /^\w+\:\/\/\/?[^\/]+/.exec(root_page)[0],
            absolute_regex = /^\w+\:\/\//;
        // is `src` is protocol-relative (begins with // or ///), prepend protocol  
        if (/^\/\/\/?/.test(src)) {
            src = location.protocol + src;
        }
        // is `src` page-relative? (not an absolute URL, and not a domain-relative path, beginning with /)  
        else if (!absolute_regex.test(src) && src.charAt(0) != "/") {
            // prepend `base_path`, if any  
            src = (base_path || "") + src;
        }
        // make sure to return `src` as absolute  
        return absolute_regex.test(src) ? src : ((src.charAt(0) == "/" ? root_domain : root_page) + src);
    },

    rel_html_imgpath: function(iconurl) {
        console.log(app.canonical_uri(iconurl.replace(/.*\/([^\/]+\/[^\/]+)$/, '$1')));
        return app.canonical_uri(iconurl.replace(/.*\/([^\/]+\/[^\/]+)$/, '$1'));
    },

    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("backbutton", this.handleBackButton, false);
    },
    handleBackButton: function() {
    	console.log("Back Button Pressed!");
    	var indexflagNumber,myAwardInfoflagNumber = 0;
    	var flagNumber000 = document.getElementById("inCompatibleMasking").style.display;//兼容性弹框的显隐
    	var flagNumber001 = document.getElementById("formInfo").style.display;//填写手机号页的显隐
    	var flagNumber002 = document.getElementById("myAwardInfo").style.display;//我的奖品页的显隐
    	var flagNumber003 = document.getElementById("detailInfo").style.display;//详情页的显隐
    	var indexClassObj = document.getElementsByClassName("indexhtmlDialog");
    	var myAwardClassObj = document.getElementsByClassName("myAwardInfoDialog");
    	console.log("length:"+indexClassObj.length+"----"+myAwardClassObj.length);
    	for (var i=0; i<indexClassObj.length;i++) {
    		if (indexClassObj[i].style.display == "block") {
    			indexflagNumber++;
    		}
    	}
    	for (var i=0; i<myAwardClassObj.length;i++) {
    		if (myAwardClassObj[i].style.display == "block") {
    			myAwardInfoflagNumber++;
    		}
    	}
//  		if(弹框提示不兼容){退出};
//  		if(formInfo/myAwardInfo/detailInfo隐藏并且没有子弹框){退出};
//  		if(formInfo/myAwardInfo/detailInfo隐藏但有首页子弹框){返回到首页};
//  		if(formInfo/myAwardInfo/detailInfo显示并且没有子弹框){返回到首页};
//  		if(formInfo/myAwardInfo/detailInfo显示但有子弹框){返回到formInfo/myAwardInfo/detailInfo页};
    	if (flagNumber000 == "block") {
    		navigator.app.exitApp();
    	} else{
    		if (flagNumber001=="none"||flagNumber002=="none"||flagNumber003=="none") {
    			if (indexflagNumber!=0) {
    				//隐藏所有首页子弹框，保留首页
    				for (var i=0; i<indexClassObj.length;i++) {
			    		indexClassObj[i].style.display = "none";
			    	}
    			} else{
    				//退出
    				navigator.app.exitApp();
    			}
    		} else{
    			if(myAwardInfoflagNumber!=0){
    				//回到首页
    				document.getElementById("formInfo").style.display = "none";
			  		document.getElementById("myAwardInfo").style.display = "none";
			  		document.getElementById("detailInfo").style.display = "none";
			  		document.getElementById("indexhtml").style.display = "block";
    			} else{
    				//隐藏子弹框，保留我的奖品页	
    				for (var i=0; i<myAwardClassObj.length;i++) {
			    		myAwardClassObj[i].style.display = "none";
			    	}
    			}
    		}
    	}
    	
    	
    	if(flagNumber001=="block"||flagNumber002=="block"||flagNumber003=="block"){
    		console.log("hello");

//  		if () {} else{
//  			document.getElementById("formInfo").style.display = "none";
//		  		document.getElementById("myAwardInfo").style.display = "none";
//		  		document.getElementById("detailInfo").style.display = "none";
//		  		document.getElementById("indexhtml").style.display = "block";
//  		}
    	}else{
    		navigator.app.exitApp();
    	}
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.triggleButton();

        buttonInit();//index页面两个按钮事件
        startmarquee(25,60,1,1); //滚动获奖名单
        pageInit();//页面初始化

        coocaaosapi.getDeviceInfo(function(message) {
            deviceInfo = message;
            mac = message.mac;
            androidsdk = message.androidsdk;
            console.log("mac " + message.mac);
            console.log("androidsdk " + message.androidsdk);
            if(androidsdk < 18){
                alert("暂不支持活动");
            }
        }, function(error) {
            console.log(error);
        });

        coocaaosapi.hasCoocaaUserLogin(function(message) {
            console.log("haslogin " + message.haslogin);
            loginstatus = message.haslogin;
            if (message.haslogin == "true") {
                console.log("haslogin two:" + message.haslogin);
                var loginButton = document.getElementById("button_logo");
                loginButton.style.display = "none";                

                
                coocaaosapi.getUserInfo(function(message) {
                    userInfo = message;
                    mobile = message.mobile;
                    console.log("external_info " + message.external_info);
                    console.log("open_id " + message.open_id);
                    console.log("mobile "+message.mobile);
                    console.log("nick_name "+message.nick_name);
                    coocaaosapi.getUserAccessToken(function(message) {
                        console.log("usertoken " + message.accesstoken);
                        accesstoken = message.accesstoken;
                        showDrawTimes();//显示抽奖次数
                    }, function(error) {
                        console.log(error);
                    });
                }, function(error) {
                    console.log(error);
                });

            } else {
                console.log("haslogin three:" + message.haslogin);
            }
        }, function(error) {
            console.log(error);
        });       
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var receivedElement = parentElement.querySelectorAll('.received');
        for (var i = 0, j = receivedElement.length; i < j; i++) {
            receivedElement[i].setAttribute('style', 'display:block;');
        }
        console.log('Received Event: ' + id);
    },
    triggleButton: function() {
        cordova.require("coocaa-plugin-coocaaosapi.coocaaosapi");
        //开通会员
        document.getElementById("button_VIP").addEventListener("click", function() {
            console.log("in button_VIP");
            coocaaosapi.startMovieMemberCenter('qq', function(message) {
                console.log(message);
            }, function(error) {
                console.log(error);
            });
        }, false);
        //登录
        document.getElementById("button_logo").addEventListener("click", function() {
            coocaaosapi.startUserSetting(function(message) {
                console.log(message);
            }, function(error) {
                console.log(error);
            });
            coocaaosapi.addUserChanggedListener(function(message){
                console.log(message);
                loginstatus = "true";
                coocaaosapi.getUserInfo(function(message) {
                    userInfo = message;
                    mobile = message.mobile;
                    console.log("external_info " + message.external_info);
                    console.log("open_id " + message.open_id);
                    console.log("mobile "+message.mobile);
                    console.log("nick_name "+message.nick_name);
                    coocaaosapi.getUserAccessToken(function(message) {
                        console.log("usertoken " + message.accesstoken);
                        accesstoken = message.accesstoken;
                    }, function(error) {
                        console.log(error);
                    });
                }, function(error) {
                    console.log(error);
                });
            });
        }, false);

        //已登录
        // document.getElementById("button-been-logo").addEventListener("click", function() {
        //     coocaaosapi.startUserSetting(function(message) {
        //         console.log(message);
        //     }, function(error) {
        //         console.log(error);
        //     });
        //     coocaaosapi.addUserChanggedListener(function(message){
        //         console.log(message);
        //         loginstatus = "true";
        //         coocaaosapi.getUserInfo(function(message) {
        //             userInfo = message;
        //             mobile = message.mobile;
        //             console.log("external_info " + message.external_info);
        //             console.log("open_id " + message.open_id);
        //             console.log("mobile "+message.mobile);
        //             console.log("nick_name "+message.nick_name);
        //             coocaaosapi.getUserAccessToken(function(message) {
        //                 console.log("usertoken " + message.accesstoken);
        //                 accesstoken = message.accesstoken;
        //             }, function(error) {
        //                 console.log(error);
        //             });
        //         }, function(error) {
        //             console.log(error);
        //         });
        //     });
        // }, false);

        document.getElementById("turntable_1").addEventListener("click", function() {
            startDraw();
        }, false);
        
    }
};

app.initialize();
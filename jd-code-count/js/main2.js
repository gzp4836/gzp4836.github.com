(function () {
    var p_id = getUrlString("type");
    window.location.href  = "//pb.jd.com/activity/2018/kaitonglingquan/html/index.html?p_id="+p_id;
    return false;
    var add = '<img style="width: 100%" src="//storage.jd.com/common.org/imgs/bg1.png"> <img style="width: 100%;height: 50%;margin-top: -20%;" src="//storage.jd.com/common.org/imgs/bg3.png"> <img style="width: 100%;position: absolute;bottom: 0;" src="//storage.jd.com/common.org/imgs/bg2.png"> ';
    document.getElementsByClassName("continer")[0].insertAdjacentHTML('afterbegin', add);
    var ua = window.navigator.userAgent;
    var kind;
    var access = "saomalaxin_";
    var app;
    var download_url;
    var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    var jd_quick;
    var jd_code = 'openapp.jdmobile://virtual?params={"category":"jump","des":"jdpaymentcode"}';
    var jr_quick = 'jdmobile://share?jumpType=5&jumpUrl=2012&­param={\"source\":\"saomalaxin\"}&sourceurl=1022*' + location.href;
    var jr_code = 'jdmobile://share?jumpType=5&jumpUrl=120&sourceurl=1022*' + location.href;
    var jd_ios_down = "//itunes.apple.com/cn/app/id414245413";
    var jd_and_down = "//storage.360buyimg.com/build-cms/V7.0.0.58370_T1_jd-mzbzhi.apk?timeStamp=1525414923529";
    // var jr_ios_down = "//itunes.apple.com/cn/app/jing-dong-jin-rong/id895682747?mt=8";
    // var jr_and_down = "//download.jr.jd.com/downapp/jrapp_jr427.apk";
    var jr_ios_down = "https://m.jr.jd.com/spe/downloadApp/index.html?id=401"; 
    var jr_and_down = "https://m.jr.jd.com/spe/downloadApp/index.html?id=401"; 
    var quick = document.getElementsByClassName("quick")[0];
    var code = document.getElementsByClassName("code")[0];
    var musk = document.getElementsByClassName("musk")[0];
    var head = document.getElementsByTagName('head')[0];
    var detail = document.getElementsByClassName("detail");
    var body = document.body;
    var dialog_shut;
    var dialog_close;
    var dialog_down;
    var openJD;
    var openJR;
    var dialog;
    var detailImage;
    function getDom() {
        dialog_shut = document.getElementsByClassName("dialog-shut");
        dialog_close = document.getElementsByClassName("dialog-close");
        dialog_down = document.getElementsByClassName("a-cover");
        openJD = document.getElementById("openJD");
        openJR = document.getElementById("openJR");
        dialog = document.getElementsByClassName("dialog");
    }


    function isJDJR() {
        if (ua.indexOf("jdapp") != -1) {
            app = "jd";
            return;
        }
        if ((ua.indexOf("jdjr") != -1)) {
            app = "jr";
            return;
        }
        app = null;
    }

    function getUrlString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    function formatDateTime() {
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    }
    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return decodeURIComponent(arr[2]);
        else
            return undefined;
    }

    function sendPac(biz) {
        try {
            var pac = "PAGE";
            if (kind) {
                pac = (kind === "quick") ? "KT_SF" : "KT_MF";
            }
            var sys = isiOS ? "ios" : "and";
            var data = {};
            data.biz = biz || "JR,QP";
            data.key = "saomalaxin," + access + "," + pac + "," + sys;
            if (app) {
                data.key += "," + app;
            }
            data.count = 1;
            data.timestamp = formatDateTime();
            data.visitor = ua;
            var script = document.createElement('script');
            script.id = "maidian";
            script.setAttribute('src', "//oriondm.jd.com/service/writeH5Log?data=" + encodeURIComponent(JSON.stringify(data)));
            head.appendChild(script);
            setTimeout(function () {
                head.removeChild(document.getElementById("maidian"));
            }, 500)
        } catch
                (e) {
        }
    }


    function showDown() {
        // <div class="dialog row">
        //     <div class="dialog-close"></div>
        //     <div class="dialog-title">
        //         <p>开通需下载</p>
        //         <p>最新版本手机京东APP</p>
        //     </div>
        //     <div class="dialog-button jr">
        //         <div class="dialog-jd"><span>去下载</span></div>
        //         <div class="dialog-shut">关闭</div>
        //     </div>
        // </div>
        dialog = document.getElementsByClassName("dialog");
        if (dialog && dialog.length != 0) {
            body.removeChild(dialog[0]);
        }
        muskDisplay("block");
        
        var app_name;
        if (app === "jd") {
            download_url = isiOS ? jd_ios_down : jd_and_down;
            app_name = "手机京东";
        } else {
            download_url = isiOS ? jr_ios_down : jr_and_down;
            app_name = "京东金融";
        }
        var dialog = '<div class="dialog-close"></div><div class="dialog-title"><p>开通需下载</p><p>最新版本' + app_name + 'APP</p></div><div class="dialog-button ' + app + '"><div class="dialog-jd"><a class="a-cover"></a><span>去下载</span></div><div class="dialog-shut">关闭</div></div>';
        setTimeout(function () {
            var div = document.createElement("div");
            div.className = "dialog row";
            div.innerHTML = dialog;
            document.body.appendChild(div);
            getDom();
            dialog_shut[0].addEventListener("click", closeDialog, false);
            dialog_close[0].addEventListener("click", closeDialog, false);
            dialog_down[0].addEventListener("click",downApp,false);
        }, 2000);

    }
    function downApp(){
        if(!download_url){return;}
        sendPac("JR,QP,DW");
        window.location.href = download_url;
    }
    function closeDialog() {
        var dialog = document.getElementsByClassName("dialog");
        var detail = document.getElementsByClassName("dialog-detail");
        if((!dialog || dialog.length === 0)&&(!detail|| detail.length === 0)){
            return;
        }
        if(dialog && dialog.length!=0){
            body.removeChild(dialog[0]);
        }
        if(detail && detail.length!=0){
            body.removeChild(detail[0]);
        }
        muskDisplay("none");
    }

    function jump() {
        var url;
        if (app === "jd" && kind === "quick") {
            url = jd_quick;
        } else if (app === "jd" && kind === "code") {
            url = jd_code;
        } else if (app === "jr" && kind === "quick") {
            if (isiOS) {
                url = jd_quick;
            } else {
                url = jr_quick;
            }
        } else if (app === "jr" && kind === "code") {
            url = jr_code;
        }
        if(isiOS){
            window.location.href = url;
        }else{
            var ifra = document.createElement("iframe");
            ifra.style = "height:0px;display:none;"
            ifra.src = url;
            body.appendChild(ifra);
        }
        
        sendPac();
        showDown();
    }
    function muskDisplay(flag) {
        musk.style.display = flag;
    }
    function seleJDJR() {
        // <div class="dialog">
        //     <div class="dialog-close"></div>
        //     <div class="dialog-title">
        //         <p>开通京东付款码</p>
        //     </div>
        //     <div class="dialog-button">
        //         <div id="openJD" class="dialog-jd">
        //             <span>去手机京东APP开通</span>
        //         </div>
        //         <div id="openJR" class="dialog-jdjr dialog-jd">
        //             <span>去京东金融APP开通</span>
        //         </div>
        //     </div>
        // </div>

        var appKind;
        if (kind === "code") {
            appKind = "付款码";
        } else {
            appKind = "闪付";
        }
        if (dialog && dialog.length != 0) {
            body.removeChild(dialog[0]);
        }
        muskDisplay('block');
        var sele_dialog = '<div class="dialog-close"></div><div class="dialog-title"><p>开通京东' + appKind + '</p></div><div class="dialog-button"><div id="openJD" class="dialog-jd"><span>去手机京东APP开通</span></div><div id="openJR" class="dialog-jdjr dialog-jd"><span>去京东金融APP开通</span></div></div>';
        var div = document.createElement('div');
        div.className = "dialog";
        div.innerHTML = sele_dialog;
        document.body.appendChild(div);
        getDom();
        dialog_close[0].addEventListener("click", closeDialog, false);
        openJD.addEventListener("click", function () {
            app = "jd";
            jump();
        }, false);
        openJR.addEventListener("click", function () {
            app = "jr";
            jump();
        }, false);

    }
    function init() {
        getDom();
        isJDJR();
        addFooter();
        access += getUrlString("type") || "default";
        jd_quick = 'openApp.jdMobile://virtual?params={"category":"jump","des":"quickpass","source":"' + access + '"}'
        musk.addEventListener("click", closeDialog, false);
        sendPac();
        setTimeout(function(){
            detailImage =  new Image();
            detailImage.src = "//storage.jd.com/common.org/payment/img/5a546007N766ca127.jpg";
        },200)
        
        detail[0].addEventListener("click",showDetail,false);
    }
    function showDetail(){
        dialog = document.getElementsByClassName("dialog");
        if (dialog && dialog.length != 0) {
            body.removeChild(dialog[0]);
        }
        var div = document.createElement("div");
        div.className = "dialog-detail";
        detailImage.style = "width:100%";
        div.innerHTML = '<div class="dialog-close"></div>';
        div.appendChild(detailImage);
        body.appendChild(div);
        muskDisplay("block");
        getDom();
        dialog_close[0].addEventListener("click", closeDialog, false);
    }
    function addFooter(){
        let page_type = getUrlString("xd");
        if(page_type == "jrxd"){
            let footerImg = document.createElement("img");
            footerImg.style = "width:100%";
            footerImg.src = "//img30.360buyimg.com/jr_image/jfs/t12898/1/2392050362/70335/75c2eb7d/5a41bb03N69594e4e.png";
            document.getElementsByTagName("body")[0].append(footerImg);
            footerImg.addEventListener("click",function(){window.location.href = "//m.jr.jd.com/spe/qyy/hzq/index.html?usertype=1176&from=dt"},false)
        }
    }

    function kt() {
        isJDJR();
        if ("quick" === kind && isiOS) {
            app = "jd";
            jump();
        } else if (app) {
            jump();
        } else {
            seleJDJR();
        }
    }
    // start
    init();
    quick.addEventListener("click", function () {
        kind = "quick";
        kt();
    }, false);
    code.addEventListener("click", function () {
        kind = "code";
        kt();
    }, false);

})();
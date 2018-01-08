(function () {
    var ua = window.navigator.userAgent;
    var kind;
    var access = "saomalaxin_";
    var app;
    var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    var jd_quick;
    var jd_code = 'openapp.jdmobile://virtual?params={"category":"jump","des":"jdpaymentcode"}';
    var jr_quick = 'jdmobile://share?jumpType=5&jumpUrl=2012&­param={\"source\":\"saomalaxin\"}&sourceurl=1022*' + location.href;
    var jr_code = 'jdmobile://share?jumpType=5&jumpUrl=120&sourceurl=1022*' + location.href;
    var jd_ios_down = "//itunes.apple.com/cn/app/id414245413";
    var jd_and_down = "//storage.360buyimg.com/build-cms/V6.3.0_jd-mzbzhi.apk?timeStamp=1504244360196";
    var jr_ios_down = "//itunes.apple.com/cn/app/jing-dong-jin-rong/id895682747?mt=8";
    var jr_and_down = "//download.jr.jd.com/downapp/jrapp_jr427.apk";
    var quick = document.getElementsByClassName("quick")[0];
    var code = document.getElementsByClassName("code")[0];
    var musk = document.getElementsByClassName("musk")[0];
    var head = document.getElementsByTagName('head')[0];
    var body = document.body;
    var dialog_shut;
    var dialog_close;
    var openJD;
    var openJR;
    var dialog;
    function getDom() {
        dialog_shut = document.getElementsByClassName("dialog-shut");
        dialog_close = document.getElementsByClassName("dialog-close");
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

    function sendPac() {
        try {
            var pac = "PAGE";
            if (kind) {
                pac = (kind === "quick") ? "KT_SF" : "KT_MF";
            }
            var sys = isiOS ? "ios" : "and";
            var data = {};
            data.biz = "JR,QP";
            data.key = "saomalaxin," + access + "," + pac + "," + sys;
            if (app) {
                data.key += "," + app;
            }
            data.count = 1;
            data.timestamp = formatDateTime();
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
        var download_url;
        var app_name;
        if (app === "jd") {
            download_url = isiOS ? jd_ios_down : jd_and_down;
            app_name = "手机京东";
        } else {
            download_url = isiOS ? jr_ios_down : jr_and_down;
            app_name = "京东金融";
        }
        var dialog = '<div class="dialog-close"></div><div class="dialog-title"><p>开通需下载</p><p>最新版本' + app_name + 'APP</p></div><div class="dialog-button ' + app + '"><div class="dialog-jd"><a class="a-cover" href="' + download_url + '"></a><span>去下载</span></div><div class="dialog-shut">关闭</div></div>';
        setTimeout(function () {
            var div = document.createElement("div");
            div.className = "dialog row";
            div.innerHTML = dialog;
            document.body.appendChild(div);
            getDom();
            dialog_shut[0].addEventListener("click", closeDialog, false);
            dialog_close[0].addEventListener("click", closeDialog, false);
        }, 2000);

    }
    function closeDialog() {
        body.removeChild(document.getElementsByClassName("dialog")[0]);
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
        window.location.href = url;
        sendPac();
        showDown();
    }
    function muskDisplay(flag) {
        musk.style.display = flag;
    }
    function sentLH() {

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
        access += getUrlString("type") || "default";
        jd_quick = 'openApp.jdMobile://virtual?params={"category":"jump","des":"quickpass","source":"' + access + '"}'
        musk.addEventListener("click", closeDialog, false);
        sendPac();
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
/**
 *  https://jdpaycert.jd.com/h5/saomalaxin.html?type=a

    {"biz":"JR,QP","key":"saomalaxin,PAGE,type","count":1,"timestamp":"2018-01-05 11:12:55"} 
    {"biz":"JR,QP","key":"saomalaxin,KT_SF,type,JR,ios","count":1,"timestamp":"2018-01-05 11:12:55"}
    {"biz":"JR,QP","key":"saomalaxin,KT_SF,JR,type,and","count":1,"timestamp":"2018-01-05 11:12:55"} 
    {"biz":"JR,QP","key":"saomalaxin,KT_SF,JD,and","count":1,"timestamp":"2018-01-05 11:12:55"} 
    {"biz":"JR,QP","key":"saomalaxin,KT_MF,JD,ios","count":1,"timestamp":"2018-01-05 11:12:55"} 
    {"biz":"JR,QP","key":"saomalaxin,KT_MF,JR,and","count":1,"timestamp":"2018-01-05 11:12:55"} 
    


    type=a
    type=b
    source=saomalaxin
 */
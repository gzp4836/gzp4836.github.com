## 使用方法


### [1.配置平台连接](http://text.jr.jd.com/schema/edit/100000265)

### 2.复制这两段代码到页面中

```
<style>
    .jdp_wrap {
        padding: 5px 10px;
        color: #333333;
    }
    .jdp_title {
        text-align: center;

    }
    .jdp_ul {
        margin-top: 5px;
        overflow: hidden;
    }
    .jdp_li {
        width: 100%;
        border-radius: 3px;
        list-style: none;
        float: left;
        position: relative;
        padding: 15px 0;
        background-color: #f2f2f2;
    }
    .jdp_main_text {
        position: relative;
        margin-left: 4%;
    }
    .jdp_li_1{
        margin-top:5px;
    }
    .jdp_li_1 .jdp_main_text {
        text-align: center;
        width: 70%;
        margin-left: -5%;
    }
    .jdp_sec_text {
        margin-left: 4%;
        color: #999999;
        font-size: .8em;
    }
    .jdp_li_1 .jdp_sec_text {
        text-align: center;
        width: 70%;
        margin-left: -5%;
    }
    .jdp_li_2 {
        width: 49%;
    }
    .jdp_li_2:left{
        background: black;
    }
    .jdp_img {
        position: absolute;
        height: 56%;
        top: 23%;
        right: 4%;
    }
    .jdp_li_1 .jdp_img {
        right: 9%;
    }
    .jdp_a {
        width: 100%;
        position: absolute;
        height: 100%;
        top: 0;
        left: 0;
    }
</style>

<div class="jdp_wrap">
    <div class="jdp_title"></div>
    <div class="jdp_ul">
        <div class="jdp_li jdp_li_2">
            <div class="jdp_main_text"></div>
            <div class="jdp_sec_text"></div>
            <img class="jdp_img">
            <a class="jdp_a"></a>
        </div>
        <div class="jdp_li jdp_li_2" style="float:right;">
            <div class="jdp_main_text"></div>
            <div class="jdp_sec_text"></div>
            <img class="jdp_img">
            <a class="jdp_a"></a>
        </div>
        <div class="jdp_li jdp_li_1">
            <div class="jdp_main_text"></div>
            <div class="jdp_sec_text"></div>
            <img class="jdp_img">
            <a class="jdp_a"></a>
        </div>
    </div>
</div>
```

```
<script src="https://m.jr.jd.com/mjractivity/data_source_100000265.js"></script>
<script>
    (function(){

        function increase_brightness(hex, percent) {
        hex = hex.replace(/^\s*#|\s*$/g, '');
        if (hex.length == 3) {
            hex = hex.replace(/(.)/g, '$1$1');
        }
        var r = parseInt(hex.substr(0, 2), 16),
            g = parseInt(hex.substr(2, 2), 16),
            b = parseInt(hex.substr(4, 2), 16);
        return '#' +
            ((0 | (1 << 8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
            ((0 | (1 << 8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
            ((0 | (1 << 8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
    }
    var wrap = document.getElementsByClassName('jdp_wrap');
    if (data_source_100000265 && data_source_100000265.display === true) {
        var lis = document.getElementsByClassName('jdp_li');
        
        var jdpA = document.getElementsByClassName('jdp_a');
        var secText = document.getElementsByClassName('jdp_sec_text');
        var mainText = document.getElementsByClassName('jdp_main_text');
        var jdpImg = document.getElementsByClassName('jdp_img');
        var jdpTitle = document.getElementsByClassName('jdp_title');

        var data = data_source_100000265;
        jdpTitle[0].innerHTML = "— "+data.title+" —"
        var bgCol = data.bgCol || '#ffffff';
        var txtCol = data.txtCol || '#333333';
        var l_txtCol = increase_brightness(txtCol, 40);
        var l_bgCol = increase_brightness(bgCol, 30);
        
        wrap[0].style.backgroundColor = bgCol;
        wrap[0].style.color = txtCol;
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.backgroundColor = l_bgCol;
            secText[i].style.color = l_txtCol;
            var banner = data.banner1[i];
            secText[i].innerHTML = banner.sec;
            mainText[i].innerHTML = banner.main;
            jdpA[i].href = banner.link;
            jdpImg[i].src = banner.img;
        }
    }else{
        wrap[0].style.display = 'none';
    }
    })()
</script>
```

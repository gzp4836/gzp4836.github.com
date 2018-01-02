(function () {
    function makeE(cn, s, e) {
        if (!e) { e = "div" }
        var ele = document.createElement(e);
        if (cn) { ele.style.cssText = cn };
        if (s) {
            switch (e) {
                case "div": ele.innerHTML = s; break;
                case "img":
                case "script": ele.src = s; break;
                case "a": ele.href = s; break;
                case "sc": ele.href = s; break;
            }
        }
        return ele;
    }
    var scrt = makeE("", "https://m.jr.jd.com/mjractivity/data_source_100000287.js", "script");
    document.body.appendChild(scrt);
    
    setTimeout(function () {
        var wrap = makeE("padding: 5px 10px 10px;");
        if (!data_source_100000287 || data_source_100000287.display != true) {
            wrap.style.display = 'none';
            return;
        }
        var sou = data_source_100000287;
        var banner = sou.banner;
        wrap.style.backgroundColor = sou.beiJingSe;
        var cn = "text-align: center;";
        var title = makeE(cn, "— 为您推荐 —");
        title.style.color = sou.biaoTiSe;
        wrap.appendChild(title)
        for (var i = 0; i < 3; i++) {
            var one = banner[i + ""];
            if (!one) { continue; }
            var ulcn = "margin-top: 5px;overflow: hidden;";
            var ul = makeE(ulcn);
            for (var j = 0; j < one.length; j++) {
                var wd = 1 / one.length * 100;
                var width = "width:100%;";
                if (one.length > 1) {
                    width = "width:calc(" + wd + "% - 2.5px);";
                }
                if (j != 0) { width += ";margin-left:5px;" };
                var licn = "border-radius: 3px;list-style: none;float: left;position: relative;padding: 15px 0;background-color: #f2f2f2;" + width;
                if (j === one.length - 1) { licn += "float:right;" }
                var li = makeE(licn + one.length);
                var item = banner[i][j];
                var mcn = "position: relative;margin-left: 4%;color:" + sou.yiHangZiSe + ";";
                var scn = "margin-left: 4%;color: #999999;font-size: .8em;color:" + sou.erHangZiSe + ";";
                if (one.length === 1) {
                    mcn += "width:70%;text-align:center;";
                    scn += "width:70%;text-align:center;";
                }
                var mt = makeE(mcn, item.main);
                var st = makeE(scn, item.sec);
                var imcn = "position: absolute;height: 56%;top: 23%;right: 4%;";
                var im = makeE(imcn, item.img, "img");
                var acn = "width: 100%;position: absolute;height: 100%;top: 0;left: 0;";
                var a = makeE(acn, item.link, "a");
                li.appendChild(mt);
                li.appendChild(st);
                li.appendChild(im);
                li.appendChild(a);
                ul.appendChild(li);
            }
            wrap.appendChild(ul);
        }
        document.body.appendChild(wrap);
    }, 400);
}())
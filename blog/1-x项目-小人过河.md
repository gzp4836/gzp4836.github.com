小人过河博客-记录优达学城前端课程
===========
一款用canvas实现的js小游戏，代码中涉及面向对象，方法复用等前端js技巧。欢迎大家来创意，完善共同探讨。
### 代码地址
[https://github.com/gzp4836/arcade-came-clone](https://github.com/gzp4836/arcade-came-clone)
### 如何开始
下载代码，浏览器打开文件中的 `index.html` 即可运行。链接地址稍后开发。
### 未添加待完善的功能
* 添加随机石头出现，出现后小人不能穿过
* 添加背景音乐，小人移动音乐
* 记录游戏数据，展示给游戏者。随着游戏成功次数增多，游戏难度加大。
* 加入更多游戏规则

### 代码结构
```shell
├── js
│   ├── app.js       游戏对象封装与创建
│   ├── engine.js    游戏主循环引擎
│   └── resources.js    游戏素材加载工具
├── images    游戏素材
├── css       舞台样式
├── index.html   游戏入口文件
└── README.md
```

### 代码分析
先看下html结构 `index.html` 

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Effective JavaScript: Frogger</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <script src="js/resources.js"></script>
    <script src="js/app.js"></script>
    <script src="js/engine.js"></script>
</body>
</html>
```
没错！就是什么都没有，一直做传统三驾马车的前端程序员，此时有些凌乱。现在是js的时代，那咋们就按照加载顺序挨个看看js文件吧。
第一个文件`resources.js`

```

/* 这个对象通过创造一个公共的资源对象来定义公有的开发者可以访问的函数。*/
    (function () {
    ...
    /* 这是公开访问的图片加载函数, 它接受一个指向图片文件的字符串的数组或者是单个图片的
     * 路径字符串。然后再调用我们私有的图片加载函数。
     */
    function load(urlOrArr) {
        if (urlOrArr instanceof Array) {
            /* 如果开发者传进来一个图片数组，循环访问每个值，然后调用我们的图片加载器 */
            urlOrArr.forEach(function (url) {
                _load(url);
            });
        } else {
            /* 如果开发者传进来的不是一个数组，那么就可以认为参数值是一个字符串，
             * 然后立即调用我们的图片加载器即可。
             */
            _load(urlOrArr);
        }
    }
    ...
    /* 这个对象通过创造一个公共的资源对象来定义公有的开发者可以访问的函数。*/
    window.Resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady,
        random: random
    };
})();
```
看到 `window.Resources` 这段代码，就明白了吧。是的这就是提供工具方法的包装，对象是绑定在window上的Resources。如果有新的公共的方法可以放到这里。继续看 `app.js`

```
// 这是我们的玩家要躲避的敌人
var Enemy = function (loc) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = loc.x || 0;
    this.y = loc.y || 0;
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function (dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    if (this.x >= player.x - Constant.gapX * Constant.colX && this.x <= player.x + Constant.gapX * Constant.colX && player.y === this.y) {
        var heart = new Heart({"x": player.x, "y": player.y});
        allHeart.push(heart);
        player.reset();
        setTimeout(function () {
            heart.eated = true;
        }, 100)
    } else {
        console.log();
    }
    if (this.x >= Constant.colsX) {
        this.x = 0;
        return;
    }
    this.x += dt * this.speed;
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

```
`app.js`里有像`Enemy`这样的对象封装，还有`Player`、`Heart`等。分析Enemy对象，由构造函数接收loc参数返回。方法update,render绑定在对象的原型上，这样多个对象可共用方法。如果添加对象的新方法，就在此处的Enemy.prototype上。恩就看到这里，看下一个文件。什么？那么多细节代码就不看了？是的!细节暂放，先搞懂结构在分析细节。最后看 `engine.js`

```
 var doc = global.document,
    win = global.window,
    canvas = doc.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    lastTime;

canvas.width = 505;
canvas.height = 606;
doc.body.appendChild(canvas);
```
这里就是往html里添加了canvas标签，看来所有的展示内容都在这个canvas里了。继续看...

```
Resources.load([
    'images/stone-block.png',
    'images/water-block.png',
    'images/grass-block.png',
    'images/enemy-bug.png',
    'images/char-boy.png',
    'images/Star.png',
    'images/Heart.png'
]);
Resources.onReady(init);
```
用Resources加载完图片后，执行了init函数。这里面就有些东西值得深思，比如图片加载缓存如何实现的？onReady又如何判断？这里就需要细看Resource.js的代码。在心里打个标记，等会儿再看。继续看init函数

```
/* 这个函数调用一些初始化工作，特别是设置游戏必须的 lastTime 变量，这些工作只用
 * 做一次就够了
 */
function init() {
    reset();
    lastTime = Date.now();
    main();
}
```
接着看main函数

```
/* 这个函数是整个游戏的主入口，负责适当的调用 update / render 函数 */
function main() {
    /* 如果你想要更平滑的动画过度就需要获取时间间隙。因为每个人的电脑处理指令的
     * 速度是不一样的，我们需要一个对每个人都一样的常数（而不管他们的电脑有多快）
     * 就问你屌不屌！
     */
    var now = Date.now(),
        dt = (now - lastTime) / 1000.0;

    /* 调用我们的 update / render 函数， 传递事件间隙给 update 函数因为这样
     * 可以使动画更加顺畅。
     */
    update(dt);
    render();

    /* 设置我们的 lastTime 变量，它会被用来决定 main 函数下次被调用的事件。 */
    lastTime = now;

    /* 在浏览准备好调用重绘下一个帧的时候，用浏览器的 requestAnimationFrame 函数
     * 来调用这个函数
     */
    win.requestAnimationFrame(main);
}
```
关键函数就这个main了，update,render不出意外就是定义在app.js里的各个对象的update,和render的总和。win.requestAnimationFrame是循环的来源，不懂requestAnimationFrame？给你想要的连接[MDN(requestAnimationFrame)](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)，不谢!到这儿，结构分析就差不多了，剩下的就是逐个文件挑自己感兴趣的细节去修改和查阅代码了。推荐看看图片缓存的实现，重点学习这种面向对象的结构设计，先写这么多。


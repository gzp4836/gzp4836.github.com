## 网站性能优化项目

### 项目一 
#### 操作步骤
1.下载代码并执行命令：
``` bash
  $> cd /你的工程目录
  $> npm install
  $> gulp serve
  $> ./ngrok http 8000
```
2.访问
[pagespeed网址](https://developers.google.com/speed/pagespeed/insights/)
输入ngrok映射地址测试
3.推荐使用github.io地址，ngrok的实现网络比较慢
[github.io链接地址](https://www.baidu.com)
#### 修改点
1.添加了gulp及其多个插件，压缩js，css，启动本地服务等
2.修改index.html使用压缩后的js,css
3.Google Analytics 内联js放到perfmatters.js中的onload事件，不会阻塞dom解析
4.两个脚本都添加async 因为没有样式和dom操作，不用阻塞
5.字体css合并到了style.css中。单独一个关键资源请求会阻塞dom解析
### 项目二
#### 修改点
* style.css  在父布局中添加对pizza的大中小三种样式布局
* pizza.html 去掉原有html中固定写好的前两个pizza的宽度设定。因为宽度已经在父布局中添加了百分比样式
* main.js 在 resizePizzas 方法中注销了原有的计算每个pizza设定宽度的做法，添加新方法 changeSliderLabelAndSliderLabel ，方法实现就是修改父布局的样式，调整pizza的宽度。
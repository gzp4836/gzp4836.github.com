### Http网络课程地址
https://classroom.udacity.com/courses/ud303
### XHR XMLHttpRequest
```
const XHR = new XMLHttpRequest();

XHR.open
XHR.onload
XHR.onerror
XHR.send
XHR.onreadystatechang
```

2012定制 XHR2规范 区别 https://www.html5rocks.com/zh/tutorials/file/xhr2/
 
jQuery 如何实现异步调用
$.ajax();

### ES6 课程 https://classroom.udacity.com/courses/ud356

### CORS (Cross-Origin Resource Sharing)

### Fetch API

全新API 使用Javascript Promise https://www.udacity.com/course/javascript-promises--ud898
查看浏览器是否支持：http://caniuse.com/#feat=fetch 
不支持的添加此 Polyfill https://github.com/github/fetch

```
fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
    headers: {
        Authorization: 'Client-ID abc123'
    }
}).then(function(response) {
    debugger; // work with the returned response
});

````




### 微信小程序无内置 formData 对象,不支持 multipart/form-data 格式
原因推测：限制上传域名地址（需要后台配置），想资源绑定自己的CDN，以后收费？？

微信小程序有原生的 api 可以直接调用，不过仅支持单文件上传

原生api写法。
```
wx.uploadFile({
        url: 'url',
        filePath: imgSrc, //imgSrc是微信小程wx.chooseImage等图片选择接口生成图片的tempFilePaths，无论后端能接收多少个这里都只能放一个，这是这个接口的限制
        name: 'image',   //后端接收图片的字段名
        //请求头
        header:{
          'token':token,
          'content-type':'multipart/form-data',
        },
        //携带的其他参数可以放在这
        formData: {
          key1:val1,
          key2:val2,
        },
        success (res){
          console.log(res)
        }
      })
```


手动封装 formData 对象

[formData](./form/formData.js)

[mimeMap](./form/mimeMap.js)

使用核心代码
```
const f = new FormData()
itemInfo.tempFiles.forEach((item: any) => {
  f.appendFile('multipartFiles', item.url, item.name)
})

f.append('param1', 'tupian')
f.append('param2', '123')
let dataR = f.getData() // 关键输入对象
uploadFile(dataR.buffer, dataR.contentType)
```


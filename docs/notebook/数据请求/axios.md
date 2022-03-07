# 一、axios功能特点

+ 在浏览器中发送 XMLHttpRequests请求
+ 在node.js 中发送http请求
+ 支持 Promise API
+ 拦截请求和响应，转换请求和响应数据



# 二、axios多种请求方式

1. axios(config)
2. axios.request(config)
3. axios.get(url, [config])
4. axios.post(url, [data], [config])
5. axios.delete(url, [config])
6. axios.head(url, [config])
7. axios.options(url, [config])
8. axios.put(url, [data], [config])
9. axios.patch(url, [data], [config])



# 三、axios常见配置选项

+ 请求地址
  + url: '/user',
+ 请求类型
  + method: 'get',
+ 请求根路径
  + baseURL: 'http://www.mt.com/api',
+ 请求前的数据处理
  + transformRequest:[function(data){}],
+ 请求后的数据处理
  + transformResponse: [function(data){}],
+ 自定义的请求头
  + headers:{'x-Requested-With':'XMLHttpRequest'},
+ URL查询对象
  + params:{ id: 12 },
+ 查询对象序列化函数
  + paramsSerializer: function(params){ }
+ request body
  + data: { key: 'aa'},
+ 超时设置时间
  + timeout: 1000,
+ 跨域是否带Token
  + withCredentials: false,
+ 自定义请求处理
  + adapter: function(resolve, reject, config){},
+ 身份验证信息
  + auth: { uname: '', pwd: '12'},
+ 响应的数据格式 json / blob /document /arraybuffer / text / stream
  + responseType: 'json',





# 四、axios基本使用



## 1.0、axios安装

```js
npm install axios --save
```



## 2.0、axios(config)基础使用

1. 安装之后需要引入

```js
import axios from 'axios'
```

2. 之后就可以调用

```js
#1
axios({//默认是get请求
  url: 'http://123.207.32.32:8000/home/multidata',//这里是codewhy老师的]
  // method:'get',//设置什么请求

}).then(res => {
  console.log(res)
})

#2
axios({//默认是get请求
  url: 'http://123.207.32.32:8000/home/data',//这里是codewhy老师的]
  // method:'get',//设置什么请求
  params: {//专门对get请求的参数拼接
    type: 'pop',//类型
    page: 1,//第几页
  }
}).then(res => {
  console.log(res)
})
```



## 3.0、axios的并发请求与全局配置

```js
//2.axios发送并发请求

#全局配置
axios.defaults.baseURL = 'http://152.136.185.210:8000/api/n3'//请求根地址，基础地址
axios.defaults.timeout = 5000//超时时间


axios.all([axios({
    
  //baseURL:'http://152.136.185.210:8000/api/n3',
  url: '/home/multidata'//这里的是根路径后拼接的地址
    
}), axios({
    
 //baseURL:'http://152.136.185.210:8000/api/n3',
  url: '/home/data',//这里的是根路径后拼接的地址
  params: {//专门对get请求的参数拼接
    type: 'pop',//类型
    page: 1,//第几页
  }
    
})]).then(axios.spread((res1,res2) => {
  console.log(res1);
  console.log(res2);
  
}))
```



# 五、axios的封装网络请求与使用

### 目的：

+ 防止框架有一天不在维护，不能使用
+ 如果真的不能用，那么就只更改封装的就可以



## 0.0、推荐使用第三或者第四种



## 1.0、传三个参数的封装

+ 可以在src目录下创建一个network文件夹，在network文件夹下边创建一个request.js文件
  + network：网络
  + request：请求



+ request.js文件

```js
/*
这里负责封装网络请求
封装axios
*/
import axios from 'axios'

//1.传三个参数

//config:配置函数   success:成功函数   failure：失败函数
export function request(config,success,failure) {
    //1.创建axios实例
    const instance = axios.create({
        baseURL : 'http://152.136.185.210:8000/api/n3',
        timeout:5000,
    })

    //发送真正的网络请求
    instance(config)//把config给instance实例让他们连接
    .then(res => {
        // console.log(res); 
        success(res)  //成功用success回调出去
    })
    .catch(err=>{
        // console.log(err);  
        failure(err)  //失败用failure回调出去  
    })

}
```



+ main.js入口文件

```js
//1.封装的request模块，传三个参数的调用

//因为不是默认导出所以需要加上{}
import {request} from './network/request'

request({//这里是request函数的第一个参数config
  url:'/home/multidata',
},res=>{//这里是request函数的第二个参数success
  console.log(res);
  
},err=>{//这里是request函数的第三个参数failure
  console.log(err); 

})
```



## 2.0、传一个参数封装



+ request.js文件

```js
//2.传一个参数
//这个方法跟第一个方法区别在于把函数变成对象传到了一个参数中
export function request(config) {
    //1.创建axios实例
    const instance = axios.create({
        baseURL : 'http://152.136.185.210:8000/api/n3',
        timeout:5000,
    })

    //发送真正的网络请求
    instance(config.baseConfig)//把config.baseConfig给instance实例让他们连接
    .then(res => {
        // console.log(res); 
        config.success(res)  //成功用success回调出去
    })
    .catch(err=>{
        // console.log(err);  
        config.failure(err)  //失败用failure回调出去  
    })

}
```



+ main.js入口文件

```js
//5.封装的request模块，传一个参数的调用
import {request} from './network/request'

request({
  baseConfig:{
    url:'/home/multidata'
  },
  success:function(res){
    console.log(res);
  },
  failure:function(err){
    console.log(err);
  }
})
```



## 3.0、利用Promise封装



+ request.js文件

```js
//3.利用Promise

export function request(config) {
    return new Promise((resolve, reject) => {
        //1.创建axios实例
        const instance = axios.create({
            baseURL: 'http://152.136.185.210:8000/api/n3',
            timeout: 5000,
        })

        //发送真正的网络请求
        instance(config)//把config给instance实例让他们连接
            .then(res => {
                // console.log(res); 
                resolve(res) //解决传出去数据
            })
            .catch(err => {
                // console.log(err);  
                reject(err) //出错把错误传出去  
            })
    })

}
```



+ main.js入口文件

```js
//5.封装的request模块，传一个参数的调用
import {request} from './network/request'

request({
  baseConfig:{
    url:'/home/multidata'
  },
  success:function(res){
    console.log(res);
  },
  failure:function(err){
    console.log(err);
  }
})
```



## 4.0、利用create自带的Promise



+ request.js文件

```js
//4.create自带Promise
export function request(config) {

        //1.创建axios实例
        const instance = axios.create({//create的实例返回值就是一个Promise
            baseURL: 'http://152.136.185.210:8000/api/n3',
            timeout: 5000,
        })
        //发送真正的网络请求
       return instance(config)//把config给instance实例让他们连接
  //因为create的返回值就是一个Promise,所以他的实例instance也就是一个Promise

}
```



+ main.js入口文件

```js
//5.封装的request模块，利用Promise
import {request} from './network/request'

request({
 url:'/home/multidata'//config
}).then(res => {//正确
  console.log(res); 
}).catch(err => {//错误
  console.log(err);
  
})
```



### 补充：

1. 如果出现需要不用的根路径那么就再去创建一个实例，来放置其他的根路径



# 六、axios拦截器的使用

+ 全局拦截

  + axios.interceptors

  

## 拦截的目的

1. 可以拦截之后做一些配置，改一些配置，再返回出去



## 1.0、请求拦截



实例 . interceptors . request . use（）{}



+ request.js 文件

```js
import axios from 'axios'

export function request(config) {

        //1.创建axios实例
        const instance = axios.create({//create的实例返回值就是一个Promise
            baseURL: 'http://152.136.185.210:8000/api/n3',
            timeout: 5000,
        })

        #//2.1请求拦截
            //拦截实例请求,use中有两个函数参数
             instance.interceptors.request.use(config=>{//第一个参数是成功
                 console.log(config);
                 return config //这里拦截到,处理完一定要把数据再返回出去，不然请求数据的页面请求不到
             },err => {//第一个是失败
                 console.log(err);
                
             })

        //3.发送真正的网络请求
       return instance(config)//把config给instance实例让他们连接
  //因为create的返回值就是一个Promise,所以他的实例instance也就是一个Promise

}
```



## 2.0、响应拦截

实例 . interceptors . response . use（）{}

+ request.js 文件

```js
import axios from 'axios'

export function request(config) {

        //1.创建axios实例
        const instance = axios.create({//create的实例返回值就是一个Promise
            baseURL: 'http://152.136.185.210:8000/api/n3',
            timeout: 5000,
        })
        
  	#//2.1响应拦截

        instance.interceptors.response.use(res =>{
            // console.log(res);
            return res.data
        },err=>{
            console.log(err);
            
        })

        //3.发送真正的网络请求
       return instance(config)//把config给instance实例让他们连接
  //因为create的返回值就是一个Promise,所以他的实例instance也就是一个Promise

}
```




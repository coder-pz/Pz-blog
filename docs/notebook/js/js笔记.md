z-index		//设置层级，盖的比被盖的数大 z-index: 1;
Math.ceil()	 //向上取整
Math.floor() 	//向下取整 
setAttribute	//设置(名称,值)
getAttribute	//获取(名称)
removeAttribute	//删除(名称)
document.createElement 	//添加标签
父级.appendChild(子节点) 	添加子节点//添加到末尾
父级.insertBefore	//(子节点,在谁之前插);
tBodies	//获取表格
rows	//获取行
cells	//获取行的单元格
tHead	//获取表头
tFoot	//获取表尾
toLowerCase()	//转为小写英文
search()		//找到并且返回字符串出现的位置,如果没找到输出来-1
split() 		//把字符串切开()里边放什么根据什么切
 offsetLeft 	//获取当前位置 
setInterval(  ,时间) 	//开启定时器
clearInterval()	//关闭定时器
true/false 	//真/假 布尔值
Math.abs() 	//绝对值
document.documentElement.clientWidth 	//可视区宽

document.documentElement.clientHeight  	// 可视区高 

scrollTop 					//可视区距离顶部的滚动距离
alert(window.navigator.userAgent);	//查看当前浏览器版本

open 				//打开窗口
close	 			//关闭窗口
about:blank			// 一个空白页面
document.write() 			//打开之前清空之前页面
alert() 				//警告框
confirm("提问的内容"") 		//提问框 有返回值
prompt("请输入,'框内默认文字'") 	//输入框 有返回值

​	

for(初始化;条件;自增){
语句
---------------------------------------------------------------------
var i=0;  	//1.初始化

```javascript
while(i<6){ 	//2.条件

	alert(i);	//3.语句

	i=i+1; //i++;   //4.自增
}
```
-----------------------------------------------------------------

当页面滚动时候发生
-------------------------------------------------------------
```js
window.onscroll=function()
{
```



加载完整个页面之后完成执行代码
---------------------------------------------------------

```js
window.onload=function()
{
```



arr.sort(function(n1,n2)	//sort需要两个比较参数
		{
			return n1-n2;	//小到大,n2,n1调换大到小
		});			//sort字母排序	

function getStyle(){
}	//获取不在行间的样式

​	



# js鼠标移入移出的区别



```js
1.onmouseenter和onmouseleave
鼠标经过自身时触发事件，经过它的子元素时不会触发该事件，不支持事件冒泡。

2.onmouseover和onmouseout
鼠标经过自身时触发事件，经过它的子元素时也会触发该事件，并支持事件冒泡。

3.onmousemove
鼠标移动到自身时鼠标指针在指定区域移动时触发，并支持事件冒泡。

```



```js
mouseover和mouseenter的异同体现在两个方面：
//1.是否支持冒泡
//2.事件的触发时机

1.mouseenter(移入)和mouseleave(移出)
//当鼠标移入元素或其子元素都会触发事件，所以有一个重复触发，冒泡过程。
2.mouseover(移入)和mouseout(移出)
//当鼠标移除元素本身（不包含元素的子元素）会触发事件，也就是不会冒泡。
```





# js定时器

```js
//let timer = setInterval(method,time)

//开启定时器
setInterval(method,time)
//关闭定时器
clearInterval(method)

var al=function(){
		console.log("hello");
	}
var ni=setInterval(al,1000);
clearInterval(ni);//括号中必须添加定时器的名称
```



# 一、浏览器



## 1、cookie

+ 创建cookie



```js
//会话cookie
//退出浏览器即删除
$.cookie('name', 'value');

//保存时间
//expires 保存时间(天)
$.cookie('name', 'value', { expires: 7 });

//创建 cookie，并设置 cookie 的有效路径，路径为网站的根目录：
$.cookie('name', 'value', { expires: 7, path: '/' });
```



+ 读取cookie



```js
//读取单个
$.cookie('name');

//读取所有
$.cookie();
```



+ 删除cookie



```js
// cookie 删除成功返回 true，否则返回 false
$.removeCookie('name'); // => true

// 写入使用了 path时，读取也需要使用相同的属性 (path, domain) 
$.cookie('name', 'value', { path: '/' });
```

## 参数说明

### raw

默认值：false。

默认情况下，读取和写入 cookie 的时候自动进行编码和解码（使用 encodeURIComponent 编码，decodeURIComponent 解码）。要关闭这个功能设置 raw:true 即可：

```
$.cookie.raw = true;
```

### json

设置 cookie 的数据使用 json 存储与读取，这时就不需要使用 JSON.stringify 和 JSON.parse 了。

```
$.cookie.json = true;
```

### expires

```
expires: 365
```

定义 cookie 的有效时间，值可以是一个数字（从创建 cookie 时算起，以天为单位）或一个 Date 对象。如果省略，那么创建的 cookie 是会话 cookie，将在用户退出浏览器时被删除。

### path

```
path: '/'
```

默认情况：只有设置 cookie 的网页才能读取该 cookie。

定义 cookie 的有效路径。默认情况下， 该参数的值为创建 cookie 的网页所在路径（标准浏览器的行为）。

如果你想在整个网站中访问这个 cookie 需要这样设置有效路径：path: '/'。如果你想删除一个定义了有效路径的 cookie，你需要在调用函数时包含这个路径:

```
$.cookie('the_cookie', null,{ path: '/' });
```

### domain

```
domain: 'example.com'
```

默认值：创建 cookie 的网页所拥有的域名。

### secure

```
secure: true
```

默认值：false。如果为 true，cookie 的传输需要使用安全协议（HTTPS）。



# 二、Html



## 1、rem适配

```js
window.onload = function () {
    // window改变大小时 = 调用setRemFont
    window.onresize = setRemFont
    function setRemFont() {
        // 获取html
        var domIe = document.documentElement
        // 获取设备宽度
        var width = domIe.clientWidth
        // 1980是页面标准 16是1rem等于多少px
        domIe.style.fontSize = width / 1980 * 16 + 'px';

    }
    setRemFont()
}

```



## 2、media适配

```css
/* 根据需求来更改 */

@media screen and (max-width: 1680px) {
    html, body {
        font-size: 15px;
    }
}
@media screen and (max-width: 1600px) {
    html, body {
        font-size: 14px;
    }
}
@media screen and (max-width: 1500px) {
    html, body {
        font-size: 13px;
    }
}
@media screen and (max-width: 1440px) {
    html, body {
        font-size: 13px;
    }
}
@media screen and (max-width: 1366px) {
    html, body {
        font-size: 11px;
    }
}

```





# 三、js基本操作



## 1、打断点

+ 使用语句并且打开调试工具 **F12** 执行到这个语句时就会停止暂停后边的执行 (点击继续即可向下执行) 

```js

debugger;
```



## 2、获取节点

```js
　var test = document.getElementById("test");
　　var parent = test.parentNode; // 父节点
　　var chils = test.childNodes; // 全部子节点
　　var first = test.firstChild; // 第一个子节点
　　var last = test.lastChile; // 最后一个子节点　
　　var previous = test.previousSibling; // 上一个兄弟节点
　　var next = test.nextSibling; // 下一个兄弟节点

next.style.diplay = "none"
#报错
# Cannot set property 'display' of undefined
//不能将属性“display”设置为undefined


```

+ **以上获取节点可能设置不了style**
  + 不知道为什么吧，那就来看看下边的这个方式吧

```js
var previous = test.previousElementSibling; // 上一个兄弟节点　
var next = test.nextElementSibling; // 下一个兄弟节点

next.style.diplay = "none"
#这样就可以，牛p不
```

+ 设置不了是因为设置的是节点，节点有很多个，可能你的下一个节点就是一个 **空格**而已，所以获取下一个 **element** 节点，那就可以 **为所欲为了**



## 3、原生js事件委托

+ 这里可以处理渲染出来的数据
  + 通过 **e** 来查找

```js
 parentul.addEventListener("click",function(e) {
    console.log(e);
    let lis = e.target.children
  });
```





# 四、数字的处理



## 1.加减乘除小数点处理



1. 只保留整数

```js
parseInt(5.12345)//5
```

2. 向下取整

```js
Math.floor(5.12345)//5
```

3. 向上取整

```js
Math.ceil(5.123456)//6
```

4. 四舍五入

```js
Math.round(5.12345)//5
Math.round(5.6231)//6
```

5. 获取绝对值

```js
Math.abs(-1)//1
```

6. 返回最大值和最小值

```js
Math.max(1,2)//2
Math.min(1,2)//1
```

7. 随机数字

```js
//向上取整获取随机数
Math.ceil(Math.random()*10); //生成1-10的随机数
```





# 五、处理异常



## 1. try/catch/finally 语句

+ **try** 发现异常并且 **throw** 抛出；
+ **catch** 通过 **err** 捕获异常并且处理；
+ **finally** 语句无论 **try** 和 **catch** 执行结果如何都会执行；

```js


<p>请输入 5 到 10 之间的数:</p>

<input id="demo" type="text">
<button type="button" onclick="myFunction()">检测输入</button>

<p id="message"></p>

function myFunction() {
    var message, x;
    message = document.getElementById("message");
    message.innerHTML = "";
    x = document.getElementById("demo").value;
    try { 
        if(x == "")  throw "为空";
        if(isNaN(x)) throw "不是一个数字";
        if(x > 10)   throw "太大";
        if(x < 5)    throw "太小";
    }
    catch(err) {
        message.innerHTML = "输入的值 " + err;//这里的err就是try的throw抛出来的
    }
    finally {
        document.getElementById("demo").value = "";
    }
}

```





# 六、异步处理



## 1、Promise



+ **Promise** 严格遵守 **resolve** 返回结果 **reject** 抛出错误



###  1. **Promise**  基本

```js
function runAsync(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('执行完成');
            resolve('随便什么数据');
        }, 2000);
    });
    return p;            
}
runAsync().then(function(data){
    console.log(data);//随便什么数据//这里拿到的是resolve返回出来的数据
    //后面可以用传过来的数据做些其他操作
    //......
});
```



### 2. **Promise** 链式编程

```js
   function runAsync() {
      let p = new Promise(function (resolve, reject) {
        //做一些异步操作
        setTimeout(function () {
          resolve("0数据");
        }, 1000);
      });
      return p;
    }
    function runAsync1() {
      let p = new Promise(function (resolve, reject) {
        //做一些异步操作
        setTimeout(function () {
          resolve("1数据");
        }, 1000);
      });
      return p;
    }
    function runAsync2() {
      let p = new Promise(function (resolve, reject) {
        //做一些异步操作
        setTimeout(function () {
          resolve("2数据");
        }, 1000);
      });
      return p;
    }


runAsync().then((res) => {
      console.log(res);#这里的数据是runAsync()的数据//0数据
      return runAsync1()
    }).then((res)=>{
      console.log(res);#这里的数据是runAsync1()的数据//1数据
      return runAsync2()
    }).then((res)=>{
      console.log(res);#这里的数据是runAsync2()的数据//2数据
    })
```



### 3. 处理错误

1. 使用 .**then** 第二个回调函数来接收错误

```js
function getNumber(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            var num = Math.ceil(Math.random()*10); //生成1-10的随机数
            if(num<=5){
                resolve(num);
            }
            else{
                reject('数字太大了');
            }
        }, 1000);
    });
    return p;            
}

getNumber()
.then(
  (data)=>{
    console.log(data);
  },
  (reason)=>{
    console.log(reason);
  }
    // function(data){//正确回调
    //     console.log('resolved');
    //     console.log(data);
    // }, 
    // function(reason){//错误回调
    //     console.log('rejected');
    //     console.log(reason);//这里打印原因
    // }
);
```



2. 使用 **.catch** 来接收错误回调

```js
getNumber()
.then(function(data){//正确去执行
    console.log('resolved');
    console.log(data);//<=5的随机数
})
.catch(function(reject){//这里接受reject抛出的错误
    console.log('rejected');
    console.log(reject);//这里打印原因//数字太大
});
```



### 4. **Promise.all ( [ ] ) ** 

+  **会等待** 最慢的 那个结束 一起执行 回调函数 并且返回来 一个数组

```js
Promise.all([runAsync(),runAsync1(),runAsync2()]).then((res)=>{
  console.log(res);
    //["0的数据", "1的数据", "2的数据"]
})
```



### 5. Promise.race ( [ ] ) 

+ 根据 **最快的** 来执行 回调 

```js
//假如runAsunc()1秒执行完毕其他都是2秒
Promise.race([runAsync(),runAsync1(),runAsync2()]).then((results)=>{
  console.log(results);
   //0执行完成 //0的数据//1执行完成//2行完成
   //这里显示只有0有数据，因为runAsync() 一秒执行完毕直接就调用了函数
})
```



+ **Promise.race( [ ] )** 请求图片超时案例

```js
//请求某个图片资源
function requestImg(){
    var p = new Promise(function(resolve, reject){
        var img = new Image();//new一个新的img标签
        img.onload = function(){
            resolve(img);
        }
        img.src ='xxx'
        // img.src = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=205652071,1642882044&fm=26&gp=0.jpg';
    });
    return p;
}

//延时函数，用于给请求计时
function timeout(){
    var p = new Promise(function(resolve, reject){
        setTimeout(function(){
            reject('图片请求超时');
        }, 3000);
    });
    return p;
}

Promise
//这里回去调用 requestImg() 如果有错那就不会调用 .then 直接调用 .catch 调用第二个回调函数
.race([requestImg(), timeout()])
.then(function(results){
    console.log(results);//这里打印成功
})
.catch(function(reason){
    console.log(reason);//这里打印请求超时
});
```



### 6.  .finally() 无脑执行

+ **.finally** 不管对错都会去执行

```js
getNumber()
.then(function(data){//正确去执行
    console.log('resolved');
    console.log(data);//<=5的随机数
})
.catch(function(reject){//这里接受reject抛出的错误
    console.log('rejected');
    console.log(reject);//这里打印原因//数字太大
})
.finally(function(){
  console.log('无脑执行');
})
```



## 2、async/await

+ **async** : 异步 **await** ：等待

+ 个人初步理解 **async/await** 算是 **promise** 的语法糖 
+ **async/await** 需要搭配使用
  + **async** 下边没有 **await** **async** 没有什么作用,只是一个不同函数
  + **await** 上边没有了 **async** 会报错、



### 1. 基本使用

```js
    function aa() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // console.log('aalog');
          resolve("aa");
        }, 5000);
      });
    }
    function bb() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // console.log('bblog');
          resolve("bb");
        }, 2000);
      });
    }
    async function asy() {
        //这里会有序的向下走,之后 aa() 执行完 aa_ 接受到 才会向下执行
      let aa_ = await aa();
      console.log(aa_);
      let bb_ = await bb();
      console.log(bb_);
    }
    asy();
```



### 2.处理错误

+ 成功的放在 **async** 的 **try** 中 错误的放在 **catch** 中

```js
function 摇色子(猜测) {
      return new Promise((resolve, reject) => {
        let sino = parseInt(Math.random() * 6 + 1); //随机数1-6
        if (sino > 3) {
          //数大于3时
          if (猜测 === "大") {
            resolve(sino);
          } else {
            //猜测不是大
            reject(sino);
          }
        } else {
          //数!大于3时
          if (猜测 === "大") {
            reject(sino);
          } else {
            //猜测不是大
            resolve(sino);
          }
        }
        // setTimeout(() => {
        //   resolve(sino);
        // }, 300);
      });
    }
    async function test() {
      try {
        //把await及获取它的值的操作放在try里
        let n = await 摇色子("大");
        console.log("赢了" + n);
      } catch (error) {
        //失败的操作放在catch里
        console.log("输了" + error);
      }
    }
    test();
```



# 七、时间



## 1、获取当前时间

+ 格式
  + 2021-01-12T17:09:36

```js
 var d = new Date();
        var vYear = d.getFullYear();
        var vMon = d.getMonth() + 1;
        var vDay = d.getDate();
        var h = d.getHours();
        var m = d.getMinutes();
        var se = d.getSeconds();
        let s 
        s =
          vYear +
          "-" +
          (vMon < 10 ? "0" + vMon : vMon) +
          "-" +
          (vDay < 10 ? "0" + vDay : vDay) +
          "T" +
          (h < 10 ? "0" + h : h) +
          ":" +
          (m < 10 ? "0" + m : m) +
          ":" +
          (se < 10 ? "0" + se : se);
        return s;
```



## 2、时间转换

```js
#方法
function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}	


#调用
let date = new Date()
dateFormat("YYYY-mm-dd HH:MM", date)
>>> 2019-06-06 19:45`
```



# 八、简易输入框防抖必修改

```js
    var timer = null;
          // element.input = function () {
          clearTimeout(timer); // 每次进来的时候都将之前的清除掉，如果还没到一秒的时候就将之前的清除掉，这样就不会触发之前setTimeout绑定的事件， 如果超过一秒，之前的事件就会被触发下次进来的时候同样清除之前的timer
          timer = setTimeout(function () {
            console.log(value);
            // 在这里进行我们的操作  这样就不会频繁的进行我们这里面的操作了
          }, 1000);
          // };
```



# 九、简易回调函数



+ 获取数组中符合条件的某个对象

```js
  let arr = [
      {
        name: "aaa",
        children: [
          {
            name: "ccc",
          },
        ],
      },
      {
        name: "bbb",
        children: [
          {
            name: "ddd",
            children: [
              {
                name: "eee",
              },
            ],
          },
        ],
      },
    ];
    text = {
      testThis: 789,
    };
    function event(arrParams, callbackObj, callback) {
      for (const item of arrParams) {
        // console.log(item);
       
        if (item.name === "eee") {
          // console.log(this.text.testThis);
          callbackObj.testThis = 666;
          // console.log(callbackObj);
          // 如果符合条件就callback抛出
          callback(callbackObj, arrParams);
        } else {
          // 否则调用本身
          if (item.children) {
            event(item.children,callbackObj, callback);
          }
        }
      }
    }
    event(arr, text, function (res1,res2) {
      console.log(res1);
      console.log(res2);
      this.testThis = 123;
      console.log(this.text);
    });
```

# 十、this指向

+ https://mp.weixin.qq.com/s/hYm0JgBI25grNG_2sCRlTA



# 十一、window操作



## 1、父页面监听iframe子页面消息

+ 父页面写入

```js
//监听值
window.addEventListener("message", this.handleMessage);
//监听到回调方法
 handleMessage(event) {
      console.log(event.data);
      if (this.flag === "microApp") {
        if (event.data === "wyy") {
          wx.navigateTo({
            url: "../index/index",
          });
        }
      }
      if (this.flag === "microServe") {
        if (event.data === "456") {
          wx.navigateTo({
            url: "../index/index",
          });
        }
      }
    },
 #别忘记移除事件
 window.removeEventListener("message", this.handleMessage);
```

+ 子页面写入

```js
//发给父页面 一个值,第二个参数为发给谁  
postMessage("发送的消息","发给谁(http://www.baidu.com)")
window.parent.postMessage('wyy', '*');
//页面关闭时执行
window.onbeforeunload = function (e) {
    console.log("微应用返回");
      window.parent.postMessage('wyy', '*');
    };
```

### 碰到的问题

+ 在**ios**中**onbeforeunload**失效，发送不出来事件
  + 原因是ios中淘汰了**onbeforeunload**事件
    + 可以使用pagehide

```js
   window.addEventListener('pagehide', () => {
  
   })
   window.onpagehide=function(){
      
   }
```


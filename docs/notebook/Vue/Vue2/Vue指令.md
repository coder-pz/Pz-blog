# 一、动态控制属性

## 1.1 、v-bind:||:基础使用

### 	实例

#### 			作用

+ 动态绑定，
  + 使用场景
    + 哪个属性需要动态绑定，哪个属性前边加上v-bind

```js

<img v-bind:src="imgURL" alt="">
    #语法糖
<a :href="aHref">百度一下</a>

 data: {
      message: '你好啊',
      imgURL: 'https://img11.360buyimg.com/mobilecms/s350x250_jfs/t1/20559/1/1424/73138/5c125595E3cbaa3c8/74fc2f84e53a9c23.jpg!q90!cc_350x250.webp',
      aHref: 'http://www.baidu.com'
    }
```



## 1.2、动态控制类（对象语法）

### 语法

+ :class="{ key (calss)	：布尔值}"

#### 实例

```js
 <h2 class="title" v-bind:class="{active: isActive, line: isLine}">{{message}}</h2>
	//	:calss动态控制class line和active都是动态添加的类
  <h2 class="title" v-bind:class="getClasses()">{{message}}</h2>
	// 	
  <button v-on:click="btnClick">按钮</button>

  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊',
      isActive: true, //真假
      isLine: true    //真假
    },
    methods: {
      btnClick: function () {
        this.isActive = !this.isActive
        //这个的isActive = 这个的isActive取反
      },
      getClasses: function () {
        return {active: this.isActive, line: this.isLine}
        //返回 active=this.isAction,line = this.isLine
      }
    }
  })
```



## 1.3、动态控制类(数组语法)

### 实例

```js
 <h2 class="title" :class="[active, line]">{{message}}</h2>
//这里的active类=aaa
//line类=bbb
  <h2 class="title" :class="getClasses()">{{message}}</h2>
//这个函数返回active,line 也就是aaa,bbb


 const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊',
      active: 'aaa',
      line: 'bbb'
    },
    methods: {
      getClasses: function () {
        return [this.active, this.line]
      }
    },
    
  })
```



## 1.4、动态控制属性(style)	(对象语法)

### 语法

+ :style="{ key(属性名color...)	:	value(属性值' red...' ) }"
+ 如果不把属性值做成一个变量，那么这里属性值记得用 ‘ ’ 圈起来要不然系统会以为是变量

#### 实例

```js
<!-- 第一种方法偏长 -->
  <h2 :style="{fontSize: finalSize + 'px', backgroundColor: finalColor}">{{message}}</h2>
  <!-- 第二种封装 -->
  <h2 :style="getStyles()">{{message}}</h2>
</div>

<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊',
      finalSize: 100,
      finalColor: 'red',
    },
    methods: {
      getStyles: function () {
        return {fontSize: this.finalSize + 'px', backgroundColor: this.finalColor}
      }
    }
  })
</script>
```

## 1.5、动态控制属性(style)	(数组语法)

### 语法

+ ：style “【变量1，变量2】”
+ 变量1：{backgroundColor: 'red'},
+ 变量2： {fontSize: '100px'},

```js
//第一种方法数组展示，偏长
<div id="app">
  <h2 :style="[baseStyle, baseStyle1]">{{message}}</h2>
//第二种方法封装展示
<h2 :style="style()">{{message}}</h2>
</div>

const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊',
      baseStyle: {backgroundColor: 'red'},
      baseStyle1: {fontSize: '100px'},
    },
    methods: {
      style(){
        return [this.baseStyle,this.baseStyle1]
      }
  })
```



### 1.5.1、多条件动态判断绑定style(三目运算符)

```js
:style="{'color' : (isColor ? '#999':'#000')}"
 :style="item2.three.length!==0 ? 'border-bottom:1px solid #bfbfbf' : 'flex:1' "
:style="item2 .three.length <3 ? 'width: 50%;' :(item2.three.length == 4 ?'width: 50%;':'width: 33.3%;') "
```













# 二、插值操作



## 2.1、V-for	循环遍历数组

### 实例

```js
<div id="app">
    <ul>
        <li v-for="item in movies">{{item}}</li>
	//把movies中的数据遍历给item,之后每一个item === movies中的每一个数据
		//li中加入v-for循环数据到li中
    </ul>
</div>

<script src="../js/vue.js"></script>
<script>
    const app = new Vue({
        el: '#app',
        data: {
            message: '你好啊',
            movies: ['星际穿越', '大话西游', '少年派', '盗梦空间']
        }
    })
</script>
```

#### 	

#### 文本说明

+ 把movies中的数据遍历给item,之后就会每一个数据一个li
+ 





## 2.2、V-for 循环遍历对象

### 实例

```js
<div id="app">
  <!--1.在遍历对象的过程中, 如果只是获取一个值, 那么获取到的是value-->
  <ul>
    <li v-for="item in info">{{item}}</li>
  </ul>


  <!--2.获取key和value 格式: (value, key) -->
  <ul>
    <li v-for="(value, key) in info">{{value}}-{{key}}</li>
  </ul>


  <!--3.获取key和value和index 格式: (value, key, index) -->
  <ul>
    <li v-for="(value, key, index) in info">{{value}}-{{key}}-{{index}}</li>
  </ul>
</div>

  const app = new Vue({
    el: '#app',
    data: {
      info: {
        name: 'why',
        age: 18,
        height: 1.88
      }
    }
  })
```



#### 文本说明

+ 如果只传入一个参数，那么优先渲染对象中的value
+  **key** 参数会获取到对象中的属性 例如：name，age什么的
+ **index** 参数会获取到对象中的下标，索引值
+ **value** 参数就是属性值









## 2.3、v-on：|| @	绑定事件

### 实例

```js
#v-on:
<button v-on:click="sub">-</button>
#@	//俗称语法糖
<button @click="sub">-</button>
```



## 2.4、v-once	移除响应式

### 实例

```js
#这里的h2继续响应式
<h2>{{message}}</h2>
#这里的h2移除响应式
<h2 v-once>{{message}}</h2>
```



## 2.5、v-html	返回html或文本

### 实例

#### 	作用

+ 可以将传进来的数据转化成HTML

```js
<div id="app">
  <h2>{{url}}</h2>	//这里只能返回<a href="h...>百度一下</a>
  <h2 v-html="url"></h2> //这里会返回html可以点击的a标签
</div>

<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊',
      url: '<a href="http://www.baidu.com">百度一下</a>'
    }
  })
</script>
```



## 2.6、v-text	返回文本	

### 实例

#### 	作用

+ 单纯返回数据中的文本
  + 缺点：
    + 会把html中的文本覆盖

```js
<h2 v-text="message">, 李银河!</h2>
//返回	你好啊 会把以前文本覆盖
 data: {
      message: '你好啊'
    }
```



## 2.7、v-pre	获取不解析的内容	

### 实例

#### 	作用

+ 不解析内容直接返回

```js
<h2 v-pre>{{message}}</h2>
//返回	{{message}}
  data: {
      message: '你好啊'
    }
```



## 2.8、v-cloak	防止页面闪动

### 实例

#### 	作用

+ 防止进入页面时候，一些资源没有加载完，客户看到源码

```js
 <style>
    [v-cloak] {
      display: none;
    }
  </style>

<div id="app" v-cloak>
  <h2>{{message}}</h2>
</div>

<script>
  // 在vue解析之前, div中有一个属性v-cloak
  // 在vue解析之后, div中没有一个属性v-cloak
      
  setTimeout(function () {	
      ###延迟一秒解析,解析之后v-cloak自动就没了
    const app = new Vue({
      el: '#app',
      data: {
        message: '你好啊'
      }
    })
  }, 1000)
</script>
```



# 三、事件监听

## 语法

+ v-on:事件 = ""	||	语法糖（ @事件 = "" ）

# 3.1、v-on修饰符



+ 1、.stop<!-- 阻止冒泡行为 -->

```js
<div @click="divClick">
    aaaaaaa
    <button @click.stop="btnClick">按钮</button>  
		<!-- #阻止冒泡行为 -->
	//这样只有单独点击divClick时候才会响应bthClick
  </div>
  btnClick() {
        console.log("btnClick");
      },
   divClick() {
        console.log("divClick");
      },
```



+ 2、.prevent<!-- 阻止默认行为 -->

```js
  <form action="baidu">
    <input type="submit" value="提交" @click.prevent="submitClick"><!-- 阻止默认行为 -->
  </form>

	//这里会阻止表单的默认提交行为

submitClick() {
        console.log('submitClick');
      },
```



+ 3、@keyup.(键)="keyUp" <!--监听某个键盘的键帽的点击-->

```js
  <input type="text" @keyup.enter="keyUp">
      
  //<!-- 键盘松开.回车="keyUp" 键盘松开回车时调用方法 -->

       keyUp() {
        console.log('keyUp');
      },
```



+ 4、.once<!-- 只触发一次函数方法 -->

```js
  
<button @click.once="btn2Click">按钮2</button>
	
//<!-- 点击只触发一次方法 -->

 btn2Click() {
        console.log('btn2Click');
      }

```

# 3.2、条件判断 v-if && v-show

## v-if

## 语法

+ v-if=" " 	如果
+ v-else-if =" " 第二个条件
+ v-else-if =" " 第N个条件
+ v- else=""   否则

### 实例

+ 复杂

```js
 <h2 v-if="score>=90">优秀</h2>
  <h2 v-else-if="score>=80">良好</h2>
  <h2 v-else-if="score>=60">及格</h2>
  <h2 v-else>不及格</h2>

 data: {
      score: 99	//给他换值来判断上边哪个显示
    },
```

+ 简要方法

```js
<h1>{{result}}</h1>

    data: {
      score: 99
    },
    computed: {	//计算属性
      result() {
        let showMessage = '';
        if (this.score >= 90) {
          showMessage = '优秀'
        } else if (this.score >= 80) {
          showMessage = '良好'
        } else if (this.score >=60){
          showMessage = '及格'
        }else{
          showMessage = '不及格'
        }

        // ...
        return showMessage
      }
    }
```

## 3.3、v-show

**使用场景**

+ 较少
+ 但是在切换频繁时可以使用

```js
<div id="app">
  <!--v-if: 当条件为false时, 包含v-if指令的元素, 根本就不会存在dom中-->
  <h2 v-if="isShow" id="aaa">{{message}}</h2>

  <!--v-show: 当条件为false时, v-show只是给我们的元素添加一个行内样式: display: none-->
  <h2 v-show="isShow" id="bbb">{{message}}</h2>
</div>

<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊',
      isShow: true
    }
  })
</script>
```



# 四、v-model的使用



## 1、v-model实现数据的双向绑定

### 应用实例

```js

<div id="app">
  <!--<input type="text" v-model="message">-->
      
  <input type="text" :value="message" @input="valueChange">
      
  <!-- <input type="text" :value="message" @input="message = $event.target.value"> -->
      
  <h2>{{message}}</h2>
</div>


  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊'
    },
    methods: {
      valueChange(event) {//通过event参数来获取，可不传
        this.message = event.target.value;//让这个message===当前发生改变的对象的value
        console.log(event.target.value)//获取到当前发生改变的对象的value
      }
    }
  })
```

## 2、v-model结合单选框（radio）类型

```js
 <label for="male">
    <input type="radio" id="male" value="男" v-model="sex">男
//表单中有name或者v-model都会互斥，只能显示一个

  </label>
  <label for="female">
    <input type="radio" id="female" value="女" v-model="sex">女

  </label>
  <h2>您选择的性别是: {{sex}}</h2>


const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊',
      sex: '女'//这里会默认选择女
    }
  })
```



## 3、v-model多选与同意协议小案例

### 应用实例

```js
<div id="app">
    <label for="abc">
        <!-- <input type="checkbox" id="abc" v-model="message">同意协议</input> -->
        <!-- <h2>您的选择：{{message}}</h2> -->
        <!-- <button :disabled='!message'>下一步</button> -->
	//这里的disabled来控制下一步可不可以点
	//只有勾选了同意才能下一步

        <input type="checkbox" value="篮球"  v-model="hobbies">篮球</input>
//这里必须有value
        <input type="checkbox" value="足球"  v-model="hobbies">足球</input>
        <input type="checkbox" value="乒乓球"  v-model="hobbies">乒乓球</input>
        <input type="checkbox" value="羽毛球"  v-model="hobbies">羽毛球</input>

            <h2>您的爱好是{{hobbies}}</h2>
		//获取到选择的复选框
        
    </label>
</div>


<script>
    const app = new Vue({
        el:"#app",
        data:{
            message:false,//模板双向绑定，布尔值获取单选框状态
            hobbies:[],//模板双向绑定，数组获取复选框数据
        }
    })
```





## 4、v-model的修饰符

### 应用实例

```js
<div id="app">
  <!--1.修饰符: lazy-->
  <input type="text" v-model.lazy="message">
  <h2>{{message}}</h2>


  <!--2.修饰符: number-->
  <input type="number" v-model.number="age">
  <h2>{{age}}-{{typeof age}}</h2>

  <!--3.修饰符: trim-->
  <input type="text" v-model.trim="name">
  <h2>您输入的名字:{{name}}</h2>
</div>

  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊',
      age: 0,
      name: ''
    }
  })
```

### 文本说明

+ 第一个lazy，懒加载修饰符
  + 去除了实时更新模板变化，当他失去焦点时候，才会去更新模板变化
+ 第二个number，转化成number类型
+ 第三个trim去除掉用户输入的大量空格


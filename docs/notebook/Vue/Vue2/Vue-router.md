# 一、更改URL页面不刷新

## 页面不刷新的作用

+ 通过页面不刷新，可以通过url去请求其他组件来渲染页面



## 1.0、通过修改 location.hash 



1. 实例

```js
#假设当前url为 http://localhost:8080/#/
		这时利用hash来修改url
   location.hash = 'aaa/bbb'
#设置完之后变成 http://localhost:8080/#/aaa/bbb
```



## 2.0、通过修改HTML5的history 模式的 pushState ( ) 



### 注意点：可以返回

1. history.pushState ( ) 参数问题
   + 第一个参数是一个对象
     + 可不传 { }
   + 第二个参数是一个title
     + 也可不传 ' '
   + 第二个参数是url
     + 主要为了url，需要传



2. 实例

```js
#假设当前url为 http://localhost:8080/#/
history.pushState({},'','home')
#设置完之后变成 http://localhost:8080/home
history.pushState({},'','about')
#设置完之后变成 http://localhost:8080/about

这时输入history.back (可不传参)//后退一步
会后退到 http://localhost:8080/home
(和页面上的前后按钮一个道理)
history.forward (可不传参)//向前一步

history.go(-1)后退一步
history.go(-2)后退两步
history.go(2)前进两步
```



3. history.pushState ( )描述功能
   + 它是传一个放在栈底一个，往外边拿需要依照先进后出的拿
   + 可以通过 history.back (可不传参) 一步一步一步退



<img src="C:\Users\刘培志\Desktop\note book\VUE\img\栈结构.jpg"  />



## 3.0、通过修改HTML5的history 模式的 replaceSate

### 注意点：不可以返回



1. history. replaceSate ( ) 参数问题
   + 第一个参数是一个对象
     + 可不传 { }
   + 第二个参数是一个title
     + 也可不传 ' '
   + 第二个参数是url
     + 主要为了url，需要传



2. 和 pushState ( ) 一个道理，区别在于pushState ( ) 会保存访问过的，但是 replaceSate（）直接就是替换掉，不可以返回，没有记录



## 4.0、页面的前进与后退

```js
输入history.back (可不传参)//后退一步
history.forward (可不传参)//向前一步

#(和页面上的前后按钮一个道理)

history.go(-1)后退一步
history.go(-2)后退两步
history.go(2)前进两步
```



## 5.0、更改router模式去掉 # 号

```js
export default new Router({
    //修改路由模式为history
    mode:'history'
    )}
```



# 二、vue-router



## 1.0、vue-router基本使用



1. 需要先安装vue-router
   + 有两种安装方式，一种是初始化配置项目时安装router选yes
   + 还有一种是npm安装

```js
#上传时依赖
npm install vue-router --save
```



2. 需要在src/router文件夹下创建一个index.js
   + 在这里配置子组件的与路由的映射关系
   + 创建router实例
   + 导入子组件

```js
//配置路由的相关信息
import VueRouter from 'vue-router'//引入路由
import Vue from 'vue'//引入vue
//导入子组件
import Home from '../components/Home'
import About from '../components/About'

//1.通过Vue.use使用(插件)，安装插件
Vue.use(VueRouter)

//2.1//配置路由和组件的映射关系
const routes = [
    //如果访问的是根目录, 那么直接重定向到/home
  { path: '/', redirect: '/home' },
    
    //path代表url呈现/home时,就显示组件 ：Home
  { path: '/home', component: Home },
  { path: '/about', component: About }
  
]
//2.创建VueRouter实例对象
const router = new VueRouter({
  
    routes, //配置路由和组件的映射关系
    mode:'history'//设置url模式,html5的history
})

//3.导出路由
export default router
```



3. 在入口文件main.js下导入一下路由，并且挂载到Vue实例上

```js
import Vue from 'vue'
import App from './App'//最大父组件
import router from './router'//导入路由//这里其实导入的是,./router/index.js,默认去寻找文件夹下边的index

Vue.config.productionTip = false//构建信息查看


new Vue({
  el: '#app',
  router,//挂载路由 router: router
  render: h => h(App)//将App的内容渲染出来
})
```



4. 使用路由和子组件，在App.vue中
   + <router-link to="/home">首页</router-link>
     + 是vue-router的内置组件，会被渲染成a标签。to是连接url
   + <router-view></router-view>
     + 该标签会根据当前的路径, 动态渲染出不同的组件.

```js
<template>
  <div id="app">
    <router-link to="/home">首页</router-link>
    <router-link to="/about">关于</router-link>
    <router-view></router-view>///这个在下边，内容就显示下边，在上边就内容就显示上边
  </div>
</template>
```



## 2.0、设置访问URL的模式



1. 把URL的hash值模式改为，HTML5的history

```js
#需要在router实例中配置默认模式
const router = new VueRouter({
    //配置路由和组件的映射关系
    routes,
    mode:'history'//设置url模式,html5的history
    //默认是hash值模式
})
```



## 3.0、router-link标签



1. router-link标签属性



+ tag属性，可以改变标签状态

```js
<router-link to="/home" tag="button">首页</router-link>
```



+ replace属性，不可以来回后退
  + 初次不好使，需要重启页面

```js
<router-link to="/home" tag="button" replace>首页</router-link>
```



## 4.0、通过代码改变路由跳转



1. 可以设置两个按钮然后绑定点击事件

```js
 <router-view></router-view>
<button @click="homeClick">首页</button>
<button @click="aboutClick">关于</button>
```



2. 在点击事件代码中改变路由走向
   + vue-router 中 有一个$router来控制路由
     + 加上 history 的 push 或者 replace 

```js
export default {
  name: 'App',
  methods: {
    //通过代码修改路由路径 vue-router
    homeClick(){
      //this.$router.push('/home')//可返回
      this.$router.replace('/home')//不可返回
      console.log('homeClick');
      
    },
    aboutClick(){
      //this.$router.push('/about')//可返回
      this.$router.replace('/about')//不可返回
      console.log('aboutClick');
    }
  },
}
```



## 5.0、动态路由路径

1. 创建一个新的user子组件并把它导出
2. 在路由的index.js中导入,并且在所有路由中加上子组件路由

```js
#绑定user路径并且后边动态跟上一个Id
{ path: '/user/:Id', component: User }
```



3. 在父组件App.vue使用子组件路由



4. 在父组件App.vue中加入一个值

```js
 data () {
    return {
      userid : 'lisi'
    }
  },
```



5. 动态绑定user组件url

```js
<router-link  :to="'/user/'+userid"  replace>用户</router-link>
#注意这里是:to=" ' /user/ ' + userid "
```



6. 想获取到相应的Id信息显示在子组件的 h2 标签中

   + 在子组件使用

   + this.$route.params.Id   //  获取到 这个 路由 的 参数 id
     + 这里的Id是导入路由时，index.js中动态绑定的Id

```js
<template>
  <div>
      <h2>我是用户界面</h2>
      <p>我是用户相关信息,嘿嘿嘿</p>
      <h2>{{userId}}</h2>
  </div>
</template>

export default {
  name:"User",
  computed: {
    userId(){
      return this.$route.params.Id
      //这里返回的是，所有路由中最活跃的那一个,这里的Id是所有路由模块中的其中一个模板定义的URL中的Id
    }
  }
   
}
```



## 6.0、路由的懒加载

+ 当打包构建应用时，Javascript 包会变得非常大，影响页面加载。
+ 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了



### 6.1、懒加载大意与作用：



1. 大意：
   + 就是把业务代码，例如首页，购物车，分类，等页面分开来加载
   + 用到时加载，没用到就先不加载
2. 作用：
   + 可以让页面转化更快，并且防止切换时出现一小段时间的白屏
   + 打包之后，明确分工，每一个懒加载页面都有自己的单独的打包后 js文件



### 6.2、懒加载实现



+ 在路由的index.js中将直接导入改为动态导入

```js
// import Home from '../components/Home'
// import About from '../components/About'
// import User from '../components/User'

#直接导入改为动态导入

const Home = () => import('../components/Home')
const About = () => import('../components/About')
const User = () => import('../components/User')
```



## 7.0、路由的嵌套



1. 创建两个组件当作主页的子组件

```js
HomeNews.vue 和 HomeMessage.vue
```



2. 把这两个子组件路由动态导入到路由的inde.js中

```js
//两个Home的子路径
  const HomeNews = () => import('../components/HomeNews')
  const HomeMessage = () => import('../components/HomeMessage')
```



3. 把子组件路由放在路由映射对象中
   + 这里因为是Home的子路由，那么需要放在Home路由中
   + 路由中有一个 children 属性，用来放置子路由

```js
  { path: '/home', component: Home,
  //子路径在父路径的里边
  children:[
    { path: '', redirect: 'news'},//这里设置默认打开news路由路径
    { path: 'news', component: HomeNews },
    { path: 'message', component: HomeMessage }
  ]

  },
```



4. 实例标签使用在Home组件中
   + 因为这两个组件是Home的子组件路由

```js
 <div>
      <h2>我是首页</h2>
      <p>我是首页内容</p>

     //<!-- 这里的router-view是Home的两个子路径 -->
      <router-link to="/home/news">新闻</router-link>
       <router-link to="/home/message">消息</router-link>
      //<!-- 这里的router-view是Home的两个子路径数据放置位置 -->
      <router-view></router-view>
  </div>
```



## 8.0、传递参数



### 8.1、通过query传递参数



1. 创建组件并且在路由的index.js文件中动态导入，路由映射配置

```js
const Profile = () => import('../components/Profile')

 { path: '/profile', component: Profile },
```





2. 之后在总父组件App.vue中使用

```js
<button @click="profileClick">档案</button>

methods: {
    profileClick(){
      this.$router.push({
        path:'/profile',//这里设置URL路径
        query:{ //这里的query可以设置值，拼接在URL后边，???get请求???
          name:'刘培志',
          age:'20岁',
        }
      })
    }
}
```



3. 在这个档案 Profile 组件中使用 $router.query

```js
	<div>
        <h2>我是Profile组件</h2>
        <h2>{{$route.query}}</h2>///获取到整体query显示
        <h2>{{$route.query.name}}</h2>///获取query.name显示
        <h2>{{$route.query.age}}</h2>///获取query.age显示
    </div>
```



### 8.2、通过params传递参数



+ $router.params
  + 路由实例的参数
+ .$route.params
  + 当前活跃的路由参数



+ router/index.js

```js
  {
          path: "/user/profile:id:name",//传递两个参数
          name: "Profile",
          component: Profile,
           props:true
        },
```

+ 容器

```js
//name地址,params传递参数
//在后边传递一个id参数和一个那么参数
<router-link :to="{name:'Profile',params:{id:1,name:'刘培志'}}">个人信息</router-link>
```

+ Profile组件

```js
<template>
<div>
    <h1>个人信息</h1>
    //<!-- {{$route.params.id}} -->
    {{id}}
    {{name}}
</div>

</template>

<script>
export default {
    props:['id','name']//传两个参数

}
</script>
```









## 9.0、导航守卫

1. 全局导航守卫
2. 路由独享守卫
3. 组件类守卫



+ 官网文档

https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E7%BB%84%E4%BB%B6%E5%86%85%E7%9A%84%E5%AE%88%E5%8D%AB



+ vue-router提供的导航守卫主要用来监听监听路由的进入和离开的.
+ vue-router提供了beforeEach和afterEach的钩子函数, 它们会在路由即将改变前和改变后触发.



1. 案例需求
   + 把每一个页面的 title 改成自己相应的



2. 实现

   + 在路由 (index.js) 中完成

   + 步骤

     + 1.、利用 meta对象 给每一个组件路由添加各自的 title
     + meta : 元数据(描述数据的数据)

     ```js
     meta: { title:'首页' },
     ```

     

     + 2.、之后使用前置守位（）实现

```js
//前置守卫(guard)
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  //必须调用next()不然页面不可以下一步，会报错
  next()
  //从from到转到to
  document.title = to.matched[0].meta.title
  console.log(to)
})
```







# 三、$router 和 $route 区别



| $router                                                      | $route                                                       |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| console.log：                                                | console.log：                                                |
| 打印出来的是一个router实例                                   | 打印出来的是一个最活跃的单个路由                             |
| $router为VueRouter实例，想要导航到不同URL，则使用$router.push方法 | $route为当前router跳转对象里面可以获取name、path、query、params等 |



# 四、vue-router-keep-alive



## 1.0、keep-alive作用

+ keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染。



1. 主要是为了离开某一个组件时，不要频繁销毁，需要保留住



2. 并且，这两个钩子函数需要和keep-alive一起用

+ activated ()  { } //处于活跃状态

+ deactivated ()  { } //处于不活跃状态

  ```js
  //这两个活跃与不活跃要和keep-alive一起用不然无效
      activated() {//处于活跃状态
         console.log('Home activated活跃的')
         this.$router.push(this.path)
      },
      deactivated() {//处于不活跃状态
         console.log('Home deactivated 不活跃的')
        // console.log( this.$route.path)
        // this.path = this.$route.path
      },
  ```



1. 应用keep-alive

```js
#在App.vue中把渲染包裹上
<keep-alive>
        <router-view></router-view>
</keep-alive>
```

# 五、组件路由守卫



```js
     beforeRouteEnter (to, from, next) {//进入这个路由之前调用
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    console.log('将要去的页面');
     console.log(to);
        console.log('当前页面');
        console.log(from);
         next()
  },
//   beforeRouteUpdate (to, from, next) {
//     // 在当前路由改变，但是该组件被复用时调用
//     // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
//     // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
//     // 可以访问组件实例 `this`
//      console.log(to);
//     console.log(from);
//   },
  beforeRouteLeave (to, from, next) {//离开当前路由之前
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    // console.log(this.lll);//当前页面的lll
    console.log('将要去的页面');
        console.log(to);
        console.log('当前页面');
        console.log(from);
        next()
  },
      
      
  '如果想在路由守卫中获取vue那么就在next定义一个参数来代表vue'
if (from.path !== "/xinwenxq_copy") {
      next(vue => {
        vue.$store.commit("update_path", from.path);
        // console.log(vue.$store);
      });
    }
```


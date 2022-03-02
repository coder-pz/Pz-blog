# 一、组件的基本步骤

组件的使用分成三个步骤

1.	创建组件的基本步骤

```js
  // 1.创建组件构造器
  const cpn = Vue.extend({
    template: `
      <div>
        <h2>组件标题</h2>
        <p>我是组件的内容</p>
      </div>
    `
  })
```



2.1	注册全局组件

```js
  // 2.注册组件(全局注册)
  Vue.component('my-cpn', cpn)
  //需要传两个参数, Vue.component('组件的标签名',组件构造器)
```

+ 全局组件只要是使用全局组件的标签名，就可以用
  + 不是当前的vue实例也可以用



2.2	注册局部组件

```js
 const app = new Vue({
    el: '#app',
    components: {//注册局部组件
    	'cpn': cpn//第一个是组件标签名:组件构造器
    }
  })
```

+ 局部组件只能在当前Vue实例中使用



3.	使用组件

```js
<div id="app">
  <cpn></cpn>//这里是注册时起的组件标签名
</div>
```



# 1.0、父子组件的基本使用

1.	创建一个子组件

```js
 const cpn1 = Vue.extend({
    template: `
      <div>
        <h2>我是cpn1的标题</h2>
        <p>我是cpn1的内容,哈哈哈</p>
      </div>
    `
  })
```



2. 创建一个父组件，并且把子组件注册引入

```js
  const cpn2 = Vue.extend({
	  template: `
      <div>
        <h2>我是cpn2的标题</h2>
        <p>我是cpn2的内容,哈哈哈</p>
        <cpn1></cpn1>     <!--注意这里引入子组件标签名-->
      </div>
    `,
    components: {//在父组件中注册子组件
	  	cpn1: cpn1//子组件的标签名:子组件构造器
    }
  })
```



3.	注册局部父组件，父组件中包含子组件

```js
  const app = new Vue({
    el: '#app',
    components: {
    	'cpn2': cpn2//父组件的标签名,父组件的构造器
    }
  })
```

4. 使用组件

```js
<div id="app">
  <cpn2></cpn2>//这里使用父组件
</div>
```

+ 这里使用了父组件，因为子组件在父组件中注册过了
  + 所以子组件已经在父组件中了
  + 并且 子组件的 div在 父组件的 div中



## 全局组件与局部组件的语法糖



1.直接 创建与注册 全局组件的语法糖

```js
	/**
   * 1.注册全局组件的语法糖
	 */
  Vue.component('cpn', {
	  template: `
      <div>
        <h2>我是cpn1的标题</h2>
        <p>我是cpn1的内容,哈哈哈</p>
      </div>
    `
  })
```

+  Vue.component(组件标签名,{template：div..........}



2. 直接 创建与注册 局部组件的语法糖

```js
	/**
   * 2.注册局部组件的语法糖
	 */
	const app = new Vue({
    el: '#app',
    components: {
    	'cpn2': {
		    template: `
          <div>
            <h2>我是cpn1的标题</h2>
            <p>我是cpn1的内容,呵呵呵</p>
          </div>
        `
      }
    }
  })
```

+ components:{ 组件标签名:{ template: div..........  } }



## 模板分离写法

+ 模板分离两种方法

  1.利用 script 标签、 类型 与他的 id

```js
<script type="text/x-template" id="cpn1">
<div>
  <h2>cpn1标题</h2>
  <p>我是cpn1的内容</p>
</div>
</script>
```

+ 这种方法script标签中的类型不要写错
  + type="text/x-template"



2. 利用 template 标签 与他的id

```js
<template id="cpn2">
  <div>
    <h2>cpn2标题</h2>
    <p>我是cpn2的内容</p>
  </div>
</template>
```



+ 全局调用

```js
  Vue.component('cpn', {
	  template: '#cpn1'
  })
```



+ 局部调用

```js
  const app = new Vue({
    el: '#app',
    components: {
    	'cpn1': {
    		template: '#cpn1'
      },
      'cpn2': {
    		template: '#cpn2'
      }
    }
  })
```

# 2.0、父子组件通信

+ 父传子 通过props传递数据
+ 子传父 通过自定义事件发送消息

## 父传子props

+ 父组件

```js
     <div id="app">
        <cpn :cmovies="movies" :cmessage="message"></cpn>
//这里不支持驼峰标识，如果定义的就是驼峰，那么就改成c-movies="movies"
        <!-- 绑定子级定义的参数="父级的模板" -->
    </div>


const app = new Vue({
        el:'#app',
        data:{
            message:'你好啊',
            movies:['海王','海贼王','海尔兄弟']
        },
        components:{
            'cpn':cpn
            //这里可以直接用一个cpn显示，就代表'cpn':cpn
        }
    })
```

+ 这里需要注意父组件中的子组件标签名，需要v-bind：动态绑定



+ 子组件

```js
<template id="cpn">
        <div>//子组件模板标签的外边，必须有一个根包围着，div就可以
            <p>{{cmessage}}</p>
            <!-- 这子级引入时需要使用子级自己的变量 -->
            <ul>
                <li v-for="item in cmovies">{{item}}</li>
            </ul>
            <h2>{{cmovies}}</h2>//这里驼峰没影响cMovies
        </div>
    </template>


 //父传子：props
    const cpn = {
        template:'#cpn',
        // props:['cmovies','cmessage'],//props可以是很多类型
        props: {
            //1.类型限制
            //cmovies:Array,//要求cmovies必须是数组
            //cmessage:String//要求cmessage必须是字符串类型

            //2.可以类型限制,提供一些默认值
            cmessage:{
                type:String,//设置cmessage的类型
                default:'aaa',//设置cmessage默认值,如果不给他传数据他就是aaa
                required:true//设置必传值，cmessage必须传不然报错
            },
            cmovies:{//如果这里参数是‘cMovies’驼峰式，那么上边组件模板就需要改一下'c-movies'用-分隔开
                type:Array,//设置cmovies的类型
            }
        },

        data() {
            return {
                
            }
        },
    }
```



## 子传父亲 自定义事件 $emit



+ 父子模板

```js
   <!-- 父组件模板 -->
    <div id="app">
        <cpn @add-bth="click" @minus-bth="click"></cpn>
        <!-- 绑定子组件自定义事件=父组件的接受事件 -->
        <h2>计数:{{sum}}</h2>
        <!--  -->
    </div>


    <!-- 子组件模板 -->
    <template id="cpn">
        <div>
            <button @click="add">+</button>
            <button @click="minus">-</button>
        </div>
      </template>
```



+ 父子组件

```js
//父组件  
const app = new Vue({
        el: '#app',
        data: {
            sum: 0
        },
        methods: {
            click(counter) {//这里接收子组件的参数
                this.sum = counter
                //让这个父组件的sum=子组件传的参数counter
            }
        },
      //子组件
        components: {
            'cpn': {
                template: '#cpn',
                data() {
                    return {
                        counter: 0
                    }
                },
                methods: {
                    add() {
                        this.counter++
                        this.$emit('add-bth', this.counter)
                        //子组件发射事件('自定义事件名称',自定义事件的参数)

                    },
                    minus() {
                        this.counter--
                        this.$emit('minus-bth', this.counter)
                        //子组件发射事件('自定义事件名称',自定义事件的参数)
                    }
                },
            },
        }
    })
```



# 3.0、父子组件访问



## 父访问子 $children || $refs

+ 父访问子$children

```js
  <!-- 父模板 -->
<div id="app">
  <cpn></cpn>
  <cpn></cpn>
  <button @click="btnClick">按钮</button>
  <!-- 这个按钮来调用子组件的方法 -->
</div>

<!-- 子模板 -->
<template id="cpn">
  <div>我是子组件</div>
</template>


  //父组件
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊'
    },
    methods: {
      btnClick() {
        // 1.$children
        console.log(this.$children);
        for (let c of this.$children) {//这是循环让c===所有子组件
          console.log(c.name);
          c.showMessage();
        }
        console.log(this.$children[1].name);//这里打印第一个子组件中的name
      }
    },
    //子组件
    components: {
      cpn: {
        template: '#cpn',
        data() {
          return {
            name: '我是子组件的name'
          }
        },
        methods: {
          showMessage() {
            console.log('showMessage');
          }
        }
      },
    }
  })

```

### $children文本说明

+ 注意点
  + 这个获取子组件时，如果多的话要利用索引值
  + 如果子组件多了，不适合精确控制某一个
+ 语法
  + console.log(this.$children[1].name);
  + 获取到这个第一个子组件的name



+ 父访问子$refs

```js
  <!-- 父模板 -->
<div id="app">
  <cpn></cpn>
  <cpn></cpn>
  <cpn ref="aaa"></cpn>
  <!-- 这里需要给想要的子组件标签加上ref="aaa" -->
  <button @click="btnClick">按钮</button>
  <!-- 这个按钮来调用子组件的方法 -->
</div>

<!-- 子模板 -->
<template id="cpn">
  <div>我是子组件</div>
</template>

//父组件
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊'
    },
    methods: {
      btnClick() {
        // 2.$refs => 对象类型, 默认是一个空的对象 ref='bbb'
        console.log(this.$refs.aaa.name);
      }
    },
    //子组件
    components: {
      cpn: {
        template: '#cpn',
        data() {
          return {
            name: '我是子组件的name'
          }
        },
        methods: {
          showMessage() {
            console.log('showMessage');
          }
        }
      },
    }
  })
```

### $refs文本说明

+ 注意点
  + 在需要的子组件标签上边加上**ref="aaa"**以便于精确找到其中一个子组件
+ 语法
  + console.log(this.$refs.aaa.name);
  + 获取到这个**ref="aaa"**的子组件name



## 子访问父 $parent && 访问根组件  $root

```js
  <!-- Vue实例 根组件模板 -->
<div id="app">
  <cpn></cpn>
</div>
<!-- 子组件模板 -->
<template id="cpn">
  <div>
    <h2>我是cpn组件</h2>
    <ccpn></ccpn>
  </div>
</template>
<!-- 子组件的子组件模板 -->
<template id="ccpn">
  <div>
    <h2>我是子组件</h2>
    <button @click="btnClick">按钮</button>
  </div>
</template>




// Vue实例根组件
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊'
    },
    // 子组件
    components: {
      cpn: {
        template: '#cpn',
        data() {
          return {
            name: '我是cpn组件的name'
          }
        },
        // 子组件的子组件
        components: {
          ccpn: {
            template: '#ccpn',
            methods: {
              btnClick() {
                // 1.访问父组件$parent
                  //这里访问的时cpn组件
                // console.log(this.$parent);
                //console.log(this.$parent.name);

                // 2.访问根组件$root
                  //这里访问的是Vue实例根组件
                console.log(this.$root);
                console.log(this.$root.message);
              }
            }
          }
        }
      }
    }
  })
```

### 文本说明

+ 不常用
+ 但是要分清、根组件 => 子组件 => 子组件中还有一个子组件



# 二、组件化高级  插槽

## 1.0、基本使用

```js
//父模板
<div id="app">
  <!-- 这里都是插槽的默认值 -->
  <cpn></cpn>

   <!-- 这里把插槽默认值替换,并且插入一个span -->
  <cpn><span>哈哈哈</span></cpn>

  <!-- 这里把插槽默认值替换,并且插入多条 -->
  <cpn>
    <i>呵呵呵</i>
    <div>我是div元素</div>
    <p>我是p元素</p>
  </cpn>

<!-- 这里都是插槽的默认值 -->
  <cpn></cpn>
</div>

//子模板
<template id="cpn">
  <div>
    <h2>我是组件</h2>
    <p>我是组件, 哈哈哈</p>
    <slot><button>按钮</button></slot>
    <!-- 这里设置一个插槽并且给他一个default值 -->
  </div>
</template>

<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊'
    },
    components: {
      cpn: {
        template: '#cpn'
      }
    }
  })
</script>
```

### 文本说明

+ 在子模版中设置插槽，并且设置默认值，也可不设置默认值

  + ```js
    <slot><button>按钮</button></slot>
    ```

  + 如果不想用默认值可以在父组件调用子组件标签时替换

## 2.0、具名插槽

```js
<div id="app">
 // <!-- 根据slot获取到子组件模板name名称,并且替换相应的插槽 -->
  <cpn><span slot="center">标题</span></cpn>
  <cpn><button slot="left">返回</button></cpn>
</div>


<template id="cpn">
  <div>
   // <!-- 利用name给每一个都定义相应的名字 -->
    <slot name="left"><span>左边</span></slot>
    <slot name="center"><span>中间</span></slot>
    <slot name="right"><span>右边</span></slot>
  </div>
</template>

<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊'
    },
    components: {
      cpn: {
        template: '#cpn'
      }
    }
  })
</script>
```

### 文本说明

+ 主要实现：替换掉相应的插槽

  + 根据**name**和**slot**替换相应的**slot**插槽

+ 利用子模板的**slot**插槽**name**值和父模板插入标签的slot值相等

+ 语法

  + ```js
    #子模板 
    //利用name给每一个子模板插槽都定义相应的名字 
    <slot name="center"><span>中间</span></slot>
    ```

  + ```js
    #父模板
    //父模板根据slot获取到子组件模板name名称,并且替换相应的插槽
      <cpn><span slot="center">标题</span></cpn>
    ```



## 3.0、作用域插槽



```html
<div id="app">
  <cpn></cpn>

  <cpn>
    <!--目的是获取子组件中的pLanguages-->
    <!-- 这里slot-scope是固定的="一个自定义事件来接收子组件数据" -->
    <template slot-scope="slot">
      <!--<span v-for="item in slot.data"> - {{item}}</span>-->
      <!-- 在这里数据用 - 来连接 -->
      <span>{{slot.data.join(' - ')}}</span>
    </template>
  </cpn>

  <cpn>
    <!--目的是获取子组件中的pLanguages-->
     <!-- 这里slot-scope是固定的="一个自定义事件来接收子组件数据" -->
    <template slot-scope="slot">
      <!--<span v-for="item in slot.data">{{item}} * </span>-->
      <!-- 在这里数据用 * 来连接 -->
      <span>{{slot.data.join(' * ')}}</span>
    </template>
  </cpn>
</div>

<template id="cpn">
  <div>
    <!-- 动态绑定一个自定义名称="遍历的数据" -->
    <slot :data="pLanguages">
      <ul>
        <li v-for="item in pLanguages">{{item}}</li>
      </ul>
    </slot>
  </div>
</template>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊'
    },
    components: {
      cpn: {
        template: '#cpn',
        data() {
          return {
            pLanguages: ['JavaScript', 'C++', 'Java', 'C#', 'Python', 'Go', 'Swift']
          }
        }
      }
    }
  })
</script>
```

### 文本说明

+ 主要实现内容在子组件中，父组件告诉我们怎么显示
+ 并且设置了数据之间连接的方式
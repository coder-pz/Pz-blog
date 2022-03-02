# 一、数组的遍历



## 1、filter 过滤函数

### 案例思想

+ 这个函数他会去遍历当前数组，条件是 return 出一个布尔值
  + 遍历第一个 10 
    + renturn 10<100 所以返回true 那么之后这个true数据就会存到接受数据的数组中
  + 遍历第三个 111 时
    + return 111<100 所以返回false 那么之后这个false数据就会被抛弃

```js
const nums = [10, 20, 111, 222, 444, 40, 50]

let newNums = nums.filter(function (n) {
  return n < 100//返回小于100的数
})
 console.log(newNums);

#结果返回 newNums【10，20，40，50】

```



```js
array = [{id:"刘"},{id:"培"},{id:"志"}]

array.find(function(item, index, arr)
{
    return arr[index].id === "刘"
})

{id: "刘"}
```



### 文本说明

+ 　filter()方法主要用来筛选数组中符合条件的所有元素，并且放在一个新数组中，如果没有，返回一个空数组

+ 　三个参数
   + item当前项
   + index当前索引
   + arr当前数组

+ 　filter函数会过滤掉不要的函数，或者过滤出来一个需要的数组
+ 　filter中的回调函数有一个要求: 必须返回一个boolean值(布尔值)
+ 　true: 当返回true时, 函数内部会自动将这次回调的n加入到新的数组中
+ 　false: 当返回false时, 函数内部会过滤掉这次的n



## 2、map映射一对一

### 案例思想

+ map回调函数会遍历当前数组，并且对他的条件执行，然后返回相应的数组
+ 遍历第一个 20 ，
  + return 20*2 所以把结果40返回给相应的数组
+ 遍历第二个40
  + return 40*2 所以把结果80返回给相应数组

```js
let	newNums = 【10，20，40，50】

let new2Nums = newNums.map(function (n) {
  return n * 2//遍历这个数组，并且在这里设置条件，条件计算完成返回给相应的数组
})

#结果返回  new2Nums [20, 40, 80, 100]
```

### 文本说明

+ map函数会给你返回一个根据条件处理过的新数组
+ map中的回调函数中放入你的条件



## 3、reduce汇总函数



### 案例思想

+ 第一次遍历
  + 20+40
+ 第二次遍历
  + 60+80
+ 依次往下遍历执行，直至执行完

```js
let  new2Nums = [20, 40, 80, 100]

let result=new2Nums.reduce(function(tmp,item,index){
      //tmp 上次结果，item当前数，index第几次计算次数1开始
           return tmp+item
        })
#结果返回  new2Nums = 240
```

### 文本说明

+ 可用于汇总与平均

+ 有三个参数
  + 第一个是上次结果
  + 第二个是当前要遍历的
  + 第三个是index索引值



### 3.1reduce汇总第二种说法

### 案例思想

+ 让books数组中的每一个对象的price和count相乘
  + 因为第二个参数是要遍历books中的数据，所以 book.price 和  book.count 
  + 就可以取到books数组中每一个对象的 price 和 count 



```js
 
return this.books.reduce(function (preValue, book) {
     //preValue是上一次结果，book是this.books中的每一项
     
        return preValue + book.price * book.count
     
     //这句话返回了0+book.price * book.count
     
      }, 0)//这里的0定义了preValue上一次结果为0
```



## 4、forEach循环遍历数组

#### 文本说明

+ 　forEach()方法也是用于对数组中的每一个元素执行一次回调函数，但它没有返回值（或者说它的返回值为undefined，即便我们在回调函数中写了return语句，返回值依然为undefined）
   + 注意： 如果forEach里有两个参数，则第一个参数为该集合里的元素，第二个参数为集合的索引; 若只有一个参数则该参数就是遍历数组中的一项; 不能 使用 return false 终止循环 只是终止了本次循环

+ 　value当前对象
+ 　index当前索引
+ 　array当前数组

```js
  arr.forEach(function(value,index,array){
    // console.log(value);//数组中的每一个对象
    // console.log(index);//对象的每一个对象的索引值
    // console.log(array);//这个数组
    // 如果这个数组中的index个对象的code == edit_form_row.code
      
      //array[index] === value//如果array[index]这样写那么，他两个相等
    if(array[index].code == edit_form_row.code){
      // 这个对象=edit_form_row
      // console.log(value);//这里是想要的对象（未更改的）
      // value = edit_form_row//让未更改的等于更改的
      // console.log(value);//等于之后那么他就更改了
      //数组中的index个对象赋值给这个对象
      // console.log(array[index]);
      // 彻底改变这个数组中的符合条件的对象
      console.log(array[index]);//这里也是想要的对象（未更改的）
      array[index] =  edit_form_row//让未更改的等于传过来的
      // console.log(value);
      console.log(array[index]);
    }
});
```



## 5、find循环遍历数组



### 文本说明

+ find()方法主要用来返回数组中符合条件的第一个元素（没有的话，返回undefined）

+ currentValue为当前项
+ index为当前索引
+ arr为当前数组

```js
array = [{id:"刘"},{id:"培"},{id:"志"}]

array.find(function(currentValue, index, arr)
{
    return arr[index].id === "刘"
})

{id: "刘"}

其中currentValue为当前项，index为当前索引，arr为当前数组
```



## 6、some()根据条件遍历arr的everyObj是否符合条件

```js
    #some()方法  判断数据中的每一个对象是否符合条件,有一个符合则返回true
        #全都不符合那么就返回false
          //检查是否有数组元素大于等于10：
      function isBigEnough(element, index, array) {
        return element >= 10;
      }

      var passed = [2, 5, 8, 1, 4];
      console.log(passed.some(isBigEnough));//false
      
      var arr = [12, 5, 8, 1, 4]
      console.log(arr.some(isBigEnough))//true
```



## 7、every()查看arr中的每一个是否都符合条件

```js
  //测试是否所有数组元素都大于等于10：

      function isBigEnough(element, index, array) {
        return element >= 10;
      }
      var passed = [12, 5, 8, 130, 44].every(isBigEnough);
      console.log(passed);
      // passed is false
      passed = [12, 54, 18, 130, 44].every(isBigEnough);
      console.log(passed);
      // passed is true
```

## 8、indexOf() 查找符合条件的索引

```js
  //查找符合条件的元素位于的索引：

      var array = [2, 5, 9];
      var index = array.indexOf(2);
      console.log(index);
      // index is 0
      index = array.indexOf(7);
      console.log(index);
// index is -1
```





## 数组函数链式编程

```js
let arrs=nums.filter(n=> n<=100).map(n=>n*2).reduce((n,a,index)=>n+a)
#结果返回 240
```



## 9、sort数组排序

+ **sort** 直接调用返回的是根据字母排序
+ 也可根据数字大小排序
  + 请先以下操作

```js
  let cc = ["12","2","6","1"]
  // ["1", "2", "6", "12"]
  
  #根据某个值排序
  let arr = [
        {id:5},
        {id:3},
        {id:6},
        {id:2},
        {id:9},
        {id:7},
    ]
 arr.sort((a,b)=>{//根据对象中的某一个值排序
   return a.id-b.id
})
//[{id: 2},{id: 3},{id: 5},{id: 6},{id: 7},{id: 9},]
```









# 二、数组操作



## 1、push()	在最后面添加元素

```js
this.letters.push('aaa')
	//添加几个参数那么就在最后边添加几个元素
this.letters.push('aaaa', 'bbbb', 'cccc')
```



## 2、unshift()  在最前面添加元素

```js
this.letters.unshift()
	//添加几个参数那么就在最前边添加几个元素
this.letters.unshift('aaa', 'bbb', 'ccc')
```



## 3、pop() 删除最后一个元素

```js
this.letters.pop();
```



## 4、shift() 删除第一个元素

```js
this.letters.shift();
```





## 5、splice() 删除元素，替换元素，插入元素

```js
//  第一个参数都是从哪里开始
        // 删除元素: 第二个参数传入你要删除几个元素(如果没有传,就删除后面所有的元素)
        // 替换元素: 第二个参数, 表示我们要替换几个元素, 后面是用于替换前面的元素,传多少都可以
        // 插入元素: 第二个参数, 传入0, 并且后面跟上要插入的元素
 this.letters.splice(1, 3, 'm', 'n', 'l', 'x')
//从第一个开始，替换三个，替换上后边这 4 个
 this.letters.splice(1, 0, 'x', 'y', 'z')
//从1索引的0开始
//从第一个开始，插入这三个元素
```



## 6、sort() 数组排序

```js
this.letters.sort()
```



## 7、reverse() 数组反转

```js
this.letters.reverse()
```



## 8、Vue.set()修改数组中的某一个

+ 响应式

```js
        // set(要修改的对象, 索引值, 修改后的值)
	Vue.set(this.letters, 0, 'bbbbbb')
	//// set(要修改的对象, 字符串,字符串等于什么 )
Vue.set(state.info,'address','洛杉矶')
```



# 三、多个数组操作



## 1、数组中的数据叠加(合并)



```js
let arr1 = [1,2];
let arr2 = [5,6];
let newArr = [20];
//es5 旧写法
newArr = newArr.concat(arr1).concat(arr2); //[20,1,2,5,6]
console.log(newArr);
//es6 使用扩展运算符
newArr = [20,...arr1,...arr2];  //[20,1,2,5,6]
console.log(newArr);

```




- [1.TypeScript 介紹](#1typescript-介紹)
    - [TypeScript 為什麼要為 JS 添加類型支持](#typescript-為什麼要為-js-添加類型支持)
- [2.TypeScript 安裝](#2typescript-安裝)
    - [2-1.TypeScript 安裝 TS 工具包](#2-1typescript-安裝-ts-工具包)
    - [2-2.編譯並運行 TS 代碼](#2-2編譯並運行-ts-代碼)
    - [2-3.簡化運行 TS 步驟](#2-3簡化運行-ts-步驟)
- [3.TypeScript 常用類型](#3typescript-常用類型)
    - [3-1.類型註解](#3-1類型註解)
    - [3-2.常用基礎類型概述](#3-2常用基礎類型概述)
    - [3-3.原始類型](#3-3原始類型)
    - [3-4.數組類型](#3-4數組類型)
    - [3-5.類型別名](#3-5類型別名)
    - [3-6.函數類型](#3-6函數類型)
    - [3-7.對象類型](#3-7對象類型)
    - [3-8.接口(介面)](#3-8接口介面)
    - [3-9.元組](#3-9元組)
    - [3-10類型推論](#3-10類型推論)
    - [3-11.類型斷言](#3-11類型斷言)
    - [3-12.字面量類型](#3-12字面量類型)
    - [3-13.枚舉](#3-13枚舉)
    - [3-14.any類型](#3-14any類型)
    - [3-15.typeof](#3-15typeof)
- [4.TypeScript高級類型](#4typescript高級類型)
    - [4-1.class類](#4-1class類)
    - [4-2.類型兼容性](#4-2類型兼容性)
    - [4-3.交叉類型](#4-3交叉類型)
    - [4-4.泛型](#4-4泛型)
    - [4-5.索引簽名類型](#4-5索引簽名類型)
    - [4-6.映射類型](#4-6映射類型)
- [5.TypeScript類型聲明文件](#5typescript類型聲明文件)
    - [5-1.TS中的兩種文件類型](#5-1ts中的兩種文件類型)
    - [5-2.類型聲明文件的使用說明](#5-2類型聲明文件的使用說明)

---

# 1.TypeScript 介紹

TypeScript 是 JS 的超集(JS 有的 TS 都有)  
TypeScript = Type + JavaScript(在 JS 基礎之上，為 JS 添加了類型支持)  
TypeScript 是微軟開發的開源編程語言，可以在任何運行 JS 的地方運行

### TypeScript 為什麼要為 JS 添加類型支持

背景:JS 的類型系同存在'先天缺陷'，JS 代碼中絕大部分錯誤都是類型錯誤(UncaughtTypeError)  
從編成語言的動靜區分，TS 屬於靜態類型，JS 屬於動態類型

- 靜態類型:編譯期做類型檢查
- 動態類型:執行期做類型檢查

---

# 2.TypeScript 安裝

### 2-1.TypeScript 安裝 TS 工具包

- Node.js/瀏覽器，只認識 JS 代碼，不認識 TS，需要先將 TS 轉化成 JS 然後才能運行
- 安裝命令:npm install -g typescript
- typescript 包:用來編譯 TS 代碼的包，提供 tsc 命令，實現 TS->JS 轉化
- 驗證是否安裝成功:tsc -v(查看 typescript 的版本)

---

### 2-2.編譯並運行 TS 代碼

- 創建.ts 文件
- 將 TS 編譯文 JS:在終端機輸入命令，tsc hello.ts(此時，在同級目錄中會出現一個同名的 JS 文件)
- 執行 JS 代碼:在終端中輸入命令，node hello.js

**說明**:所有合法的 JS 代碼都是 TS 代碼，有 JS 基礎只需要學習 TS 類型即可  
**注意**:由 TS 編譯生成的 JS 文件，代碼中就沒有類型信息了

---

### 2-3.簡化運行 TS 步驟

- 簡化方式:使用 ts-node 包,直接在 hode.js 中執行 TS 代碼
- 安裝命令:npm i -g ts-node(**版本過高會無法執行-npm i -g ts-node@8.5.4**)
- 使用方式:ts-node hello.ts

**解釋**:ts-node 命令會在內部將 TS->JS,然後在運行 JS 代碼

---

# 3.TypeScript 常用類型

概述:

- TypeScript 是 JS 的超集，TS 提供了 JS 所有功能，並且額外增加 類型系統
- JS 有類型(比如 number,string 等)，但 JS 不會檢查變量類型是否變化，TS 會檢查

---

### 3-1.類型註解
`let age: number = 19`
**說明**:代碼中的:number就是類型註解
作用:為變量添加類型約束，比如上述代碼中，約定變量age的類型為number(數值類型)
**解釋**:約定了什麼類型，就只能給變量賦值該類型的值

---

### 3-2.常用基礎類型概述
可以將TS中常用的基礎類型細分為兩類
- **1.JS已有類型**
    - 原始類型:**number / string / boolean / null / undefined / symbol**
    - 對象類型:**object**(包括對象,數組,函數等)  
- **2.TS新增類型**
    - 聯合類型,自定義類型(類型別名),接口,元組,字面量類型,枚舉,void,any等

---

### 3-3.原始類型
特點:簡單 這些類型完全按照JS中類型的名稱來書寫
```typescript
//EX:
let age: number = 18
let myName: string = '123'
let isLoading: boolean = true
let a: null = null
let b: undefined = undefined
let s: symbol = Symbol()
```

---
### 3-4.數組類型
對象類型:object(包括對象,數組,函數等)
特點:對象類型，在TS中更加細化，每個具體的對象都有自己的類型語法
數組類型的兩種語法(推薦使用number[]寫法)
```typescript
//EX:
let number: number[] = [1, 2, 3]
let strArr: string[] = ['a', 'b', 'c']
let numArr: Array<number> = [1, 2, 3]
let string: Array<string> = ['a', 'b', 'c']
```
需求:數組中既有number又有string類型
添加小括號,表示arr首先是數組,然後數組內能夠出現number或string類型的元素
```typescript 
//EX:
let arr: (string | number)[] = [1, 'a', 3, 'b']
```

不添加小括號,表示arr既可以是number類型,又可以是string[]類型
```typescript
//EX:
let arr1: number | string[] = 123
let arr2: number | string[] = ['a', 'b', 'c']
```
- **解釋**: | (豎線)在TS中叫做 聯合類型(由兩個或多個其他類型組成的類型,表示可以是這些類型中的任意一種)
- **注意**:這是TS中聯合類型的語法,只有一根豎線
---
### 3-5.類型別名
類型別名(自定義類型):為任意類型起別名
使用場景:當同一種類型(複雜)被多次使用時，可以通過類型別名，簡化該類型的使用
```typescript
//EX:
type CustonArray = (number | string)[]
let arr3: CustonArray = [1, 'a', 3, 'b']
let arr4: CustonArray = [2, 'x', 4, 'y']
```
**解釋**:
 - 1.使用type關鍵字來創建類型別名
 - 2.類型別名,可以是任何合法的變量名稱
 - 3.創建類型別名後,直接使用該類型別名作為變量的類型名稱即可
---
### 3-6.函數類型
函數類型實際上指的是:函數參數和返回值的類型
為函數指定類型的兩種方式:
 - 1.單獨指定參數,返回值的類型
    ```typescript
    //EX:
    function add(num1: number, num2: number): number {
    return num1 + num2
    }
    const add1 = (num1: number, num2: number): number => {
    return num1 + num2
    }
    ```
 - 2.同時指定參數,返回值的類型
    ```typescript
    //EX:
    const add3: (num1: number, num2: number) => number = (num1, num2) => {
    return num1 + num2
    }
    ```
**解釋**:當函數作為表達式時,可以通過類似箭頭函數形式的語法來為函數添加類型
**注意**:這種形式只適用於函數表達式


若函數沒有返回值,那麼函數返回值類型為:void
```typescript
//EX:
function greet(name: string): void {
  console.log(name);
}
```
使用函數時線某個功能時,參數可以傳也可以不傳,這種情況下,給函數參數指定類型時,就用到 可選參數
比如,數組的slice方法,可以slice(),也可以slice(1)或者slice(1,3)
```typescript
EX:
function mySlice(start?: number, end?: number): void {
  console.log('起始:', start, '結束:', end);
}
```
可選參數:在可傳可不傳的參數名稱後面添加?(問號)
**注意**:可選參數只能出現在參數列表的最後，也就是說可選參數後面不能再出現必選參數

---
### 3-7.對象類型
JS中的對象是由屬性和方法構成的,而TS中對象的類型就是在描述對象的結構(有什麼類型的屬性和方法)
對象類型的寫法:
```typescript
let person: { name: string; age: number; sayHi(): void } = {
  name: 'jack',
  age: 18,
  sayHi() { }
}
```
**解釋**:
 - 1.直接使用{}來描述對象結構，屬性採用 屬性名:類型 的形式,方法採用 方法名():返回值類型 的形式
 - 2.如果方法有參數,就在方法名後面的小括號中指定參數類型(比如:sayHi(name:string):void)
 - 3.在一行代碼中指定一個對象的多個類型時,使用;(分號)來分隔

如果一行代碼只指定一個屬性類型(通過換行來分隔多個屬性類型),可以去掉;(分號)
方法的類型也可以使用箭頭函數形式(比如:{sayHi:()=>:void})
```typescript
//EX:
let person1: {
  name: string
  age: number
  sayHi: (name?: string) => void
} = {
  name: 'jack',
  age: 18,
  sayHi() { }
}
```
對象中的屬性或方法,也是可選的，此時就用到 可選屬性
比如:在使用axios({...})時,如果發送GET請求,method屬性就可以省略
```typescript
//EX:
function myAxios(config: {
  url: string
  method?: string
}) {
  console.log(config);
}
```
可選屬性的語法與函數可選參數的語法一致,都使用?(問號)來表示

---
### 3-8.接口(介面)
當一個對象類型被多次使用時,一般會使用接口(interface)來描述對象類型,達到復用的目的
```typescript
//EX:
interface Iperson {
  name: string
  age: number
  sayHi(): void
}

let person2: Iperson = {
  name: 'Jack',
  age: 19,
  sayHi() { }
}
```
**解釋**:
- 1.使用interface關鍵字來聲明接口
- 2.接口名稱,可以是任意合法的變量名稱
- 3.聲明接口後,直接使用接口名稱作為變量類型
- 4.因為每一行只有一個屬性類型,因此屬性類型後沒有;(分號)

**interface接口 與 type類型別名 對比:**
- 相同點:都可以給對象指定類型
- 不同點:
    - 接口:只能為對象指定類型
    - 類型別名:不僅可以為對象指定類型,實際上可以為任意類型指定別名
    ```typescript
    interface:
    interface Iperson1 {
    name: string
    age: number
    sayHi(): void
    }
    type
    type Iperson2 = {
    name: string
    age: number
    sayHi(): void
    }
    ```
**接口繼承**
如果兩個接口之間有相同的屬性或方法,可以將公共的屬性或方法抽離出來,通過繼承來實現復用
比如:這兩個接口都有x,y兩個屬性
```typescript
interface Point2D { x: number; y: number }
interface Point3D { x: number; y: number; z: number }
```
使用繼承的方式
```typescript
interface Point3D extends Point2D { z: number }
```
**解釋**:
- 1.使用extends(繼承)關鍵字實現了接口Point3D繼承Point2D
- 2.繼承後,Point3D就有了Point2D的所有屬性和方法(此時Point3D同時擁有x,y,z三個屬性)

---
### 3-9.元組
場景:該數組只有兩個元素，並且這兩個元素都是數值類型
```typescript
let position: number[] = [39, 116]
```
使用number[]的缺點:不嚴謹,因為該類型的數組中可以出現任意多個數字

**使用元組(Tuple)**
元組類型是另一種類型的數組,他確切知道包含多少元素,以及特定索引對應的類型
```typescript
let position1: [number, number] = [39, 116]
```
**解釋**:
- 1.元組類型可以確切的標記出有多少個元素,以及每個元素的類型
- 2.該示例中,元素有兩個元素,每個元素的類型都是number

---
### 3-10類型推論
TS中,某些沒有明確指出類型的地方,TS的類型推論機制會幫助提供類型
由於類型推論的存在,這些地方,類型註解可以省略不寫
發生類型推論的2種常見場景:
- 1.變量聲明並初始化時
    ```typescript
    let age1 = 18   //TS自動推斷出變量age1為number類型
    age1 = 20      //鼠標移入變量名稱age
    ```
- 2.決定函數返回值時
    ```typescript
    function add4(num1: number, num2: number) {
    return num1 + num2
    }
    ```
**注意**:這兩種情況下，可以省略不寫

---
### 3-11.類型斷言
類型斷言用來指定更具體的類型
比如:getElementById方法返回值的類型是HTMLElement,該類型包含所有標籤公共的屬性或方法,不包含a標籤特有的href屬性
因此這個類型太寬泛(不具體),無法操作href等a標籤特有的屬性或方法
使用類型斷言:
```typescript
const aLink = document.getElementById('link') as HTMLAnchorElement
```
**解釋**:
- 1.使用as關鍵字實現類型斷言
- 2.關鍵字as後面的類型是一個更加具體的類型(HTMLAnchorElement是HTMLElement的子類型)

---
### 3-12.字面量類型
```typescript
let str1 = 'hello ts'
const str2 = 'hello ts'
```
通過TS類型推論機制,可以得到答案
- 1.變量str1類型為string
- 2.變量str2類型為hello ts

**解釋**:
- 1.str1是一個變量(let),他的值可以是任意字符串,所以類型為:string
- 2.str2是一個常量(const),他的值不能變化只能是hello ts,所以它的類型為:hello ts

**注意**:此處的'hello ts',就是一個字面量類型,也就是說某個特定的字符串也可以作為TS中的類型,除字符串外,任意JS字面量(比如:對象,數字等)都可以作為類型使用

使用模式:字面量類型配合聯合類型一起使用
使用場景:用來表示一組明確的可選值列表
比如,在貪吃蛇遊戲中,遊戲方向可選值只能是上,下,左,右中的任意一個
```typescript
function changeDirection(direction: 'up' | 'down' | 'left' | 'right') {
  console.log(direction);
}
```
**解釋**:參數direction的值只能是up/down/lwft/right中的任意一個
優勢:相比於string類型,使用字面量類型更加精確,嚴謹

---
### 3-13.枚舉
枚舉的功能類似於字面量類型+聯合類型組合的功能,也可以表示一組明確的可選值
枚舉:定義一組命名常量,它描述一個值,該值可以是這謝命名常量中的一個
```typescript
//EX:
enum Direction { Up, Down, Left, Right }
function changeDirection1(direction: Direction) {
  console.log(direction);
}
```
**解釋**:
- 1.使用enum關鍵字定義枚舉
- 2.約定枚舉名稱,枚舉中的值以大寫字母開頭
- 3.枚舉中的多個值之間通過,(逗號)分隔
- 4.定義好枚舉後,直接使用枚舉名稱作為類型注解

**注意**:形參direction的類型為枚舉Direction,那麼時參的值就應該是枚舉Direction成員的任意一個
訪問枚舉成員:
```typescript
changeDirection1(Direction.Up)
```
**解釋**:類似於JS中的對象,直接通過.(點)語法訪問枚舉成員

問題:把枚舉成員作為函數的實參,他的值是什麼
**解釋**:通過鼠標移入Direction.Up,可以看到枚舉成員Up的值為0
**注意**:枚舉成員是有值的,默認為:從0開始自增的數值

**枚舉成員的值為數字的枚舉,稱為:數字枚舉**

也可以給枚舉中的成員初始化值
```typescript
//EX:
enum Direction2 { Up = 10, Down, Left, Right }
Down->11,Left->12,Right->13
enum Direction3 { Up = 2, Down = 4, Left = 6, Right = 8 }
```
字符串枚舉:枚舉成員的值是字符串
```typescript
enum Direction4 {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right'
}
```
**注意**:字符串枚舉沒有自增長行為,因此,字符串中的每個成員必須有初始值

枚舉是TS為數不多的非JS類型級擴展(不僅僅是類型)的特性之一
因為:其他類型僅被當作類型,而枚舉不僅用作類型,還提供值(枚舉成員都是有值的)
也就是說,其他類型會在編譯為JS代碼時自動移除,而枚舉類型會被編譯為JS代碼
```typescript
 //TS EX:
  enum Direction {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right'
}
```
```javascript
//JS EX:
  var Direction;
  (function(Direction){
      Dirction["Up"]="Up";
      Dirction["Down"]="Down";
      Dirction["Left"]="Left";
      Dirction["Right"]="Right";
  })(Direction || (Direction={}))
```
**說明**:枚舉 與 字面量類型+聯合類型組合 的功能類似,都是用來表示一組可選值列表
一般情況下,推薦使用 字面量類型+聯合類型組合 ,因為相比枚舉,更加直觀,簡潔,高效

---
### 3-14.any類型
原則:不推薦使用any(失去TS類型保護優勢)
因為當類型為any時,可以對該直進行任意操作,並且不會有代碼提示
```typescript
let obj: any = { x: 0 }
obj.bar = 100
obj()
const n: number = obj
```
**解釋**:以上操作都不會有任何類型錯誤提示,即使可能存在錯誤
盡可能地避免使用any類型,除非臨時使用來"避免"書寫很長,很複雜的類型
其他隱式具有any類型的情況:
- 1.聲明變量不提供類型也不提供默認值
- 2.函數參數不加類型

**注意**:因為不推薦any類型,所以這兩種情況都應該提供類型

---
### 3-15.typeof
TS也提供typeof操作符,可以在類型上下文中引用變量或屬性的類型(類型查詢)
使用場景:根据已有變量的值,獲取該值的類型,來簡化類型書寫
```typescript
//EX:
let p = { x: 1, Y: 2 }
function formatPoint(point: { x: number; y: number }) { }
function formatPoint2(point: typeof p) { }
```
**解釋**:使用typeof操作符來獲取變量p的類型,結果與第一種(對象字面量形式的類型)相同
typeof出現在類型註解的位置(參數名稱的冒號後面)所處的環境就在類型上下文(區別於JS代碼)
**注意**:typeof只能用來查詢變量或鼠性的類型,無法查詢其他形式的類型(比如,函數調用的類型)

# 4.TypeScript高級類型
**概述**:TS中的高級類型有很多,重點學習以下高級類型:
- 1.class類
- 2.類型兼容性
- 3.交叉類型
- 4.泛型和keyof
- 5.索引簽名類型和索引查詢類型
- 6.映射類型

---
### 4-1.class類
TS全面支持ES2015中引入的class關鍵字,並為其添加類型註解和其他語法(比如,可見性修飾符等)
class基本使用:
```typescript
class Person { }
const p = new Person()
```
 **解釋**:
- 1.根据TS中的類型推斷,可以知道Person類的實例對象p的類型是Person
- 2.TS中的class,不僅提供class語法功能,也作為一種類型存在

實例屬性初始化:
```typescript
class Person1 {
  age: number
  gender = '男'
}
```
**解釋**:
- 1.聲明成員age,類型為number(沒有初始值)
- 2.聲明成員gender,並設置初始值,此時可省略類型註解(TS類型推論為string類型)

實例屬性
```typescript
class Point1 {
  age: number
  gender: string
  constructor(age: number, gender: string) {
    this.age = age
    this.gender = gender
  }
}
```
**解釋**:
- 1.成員初始化(比如,age:number)後,才可以通過this.age來訪問實例對象
- 2.需要為構造函數指定類型註解,否則會被隱式推斷為any
- 3.構造函數不需要返回值類型

**實例方法**:方法的類型註解(參數與返回值)與函數用法相同
```typescript
class Point2 {
  x = 10
  y = 10
  scale(n: number): void {
    this.x *= n
    this.y *= n
  }
}
```
**類的繼承**
類繼承有兩種方式
- 1.extends(繼承父類)
- 2.implement(實現接口)
**說明:JS中只有extends,而implements是TS提供**
```typescript
//EX1:
class Animal {
  move() {
    console.log('走兩步');
  }
}

class Dog extends Animal {
  name = '二哈'
  bark() {
    console.log('旺旺!');

  }
}
const d = new Dog()
d.move()
d.name
d.bark()
```
**解釋**:
- 1.通過extends關鍵字實現繼承
- 2.子類Dog繼承父類Animal,則Dog的實例對象d就同時具有父類Animal和子類Dog的所有屬性和方法
```typescript
EX2:
interface Singable {
  name: string
  sing(): void
}

class Person4 implements Singable {
  name: 'Jack'
  sing(): void {
    console.log('唱歌');
  }
}
```
**解釋**:
- 1.通過implements關鍵字讓class實現接口
- 2.Person類實現接口Singable,意味著Person類中必須提供Singable接口中指定的所有方法和屬性

**類成員的可見性**
可以使用TS來控制class的方法或屬性對於class外的代碼是否可見
可見性修飾符包括
- 1.public(公有的)
- 2.protected(受保護的)
- 3.private(私有的)
```typescript
// EX(public):
// public:表示公有的,公開的,公有成員可以被任何地方訪問,默認可見性
class Animal1 {
  public move() {
    console.log('Moving along!');
  }
}
```
**解釋**:
- 1.在類屬性或方法前面添加public關鍵字,用來修飾該屬性或方法是共有的
- 2.因為public是默認可見的,所以可以省略
```typescript
// EX(protected):
// protected:表示受保護的,僅對其聲明所在的類和子類中(非實例對象)可見
class Animal2 {
  protected move() {
    console.log('Moving along!');
  }
}
class Dog1 extends Animal2 {
  bark() {
    console.log('汪!');
    this.move()
  }
}
```
**解釋**:
- 1.在類屬性或方法前面添加protected關鍵字,用來修飾該屬性或方法是受保護的
- 2.在子類的方法內部可以通過this來訪問父類中受保護的成員,但是,對實例不可見
```typescript
// EX(private):
// private:表示私有的,只在當前類中可見,對實例對象以及子類也是不可見的
class Animal3 {
  private move() {
    console.log('Moving along!');
  }
  walk() {
    this.move()
  }
}
```
**解釋**:
- 1.在類屬性或方法前面添加private關鍵字,用來修飾該屬性或方法是私有的
- 2.私有的屬性或方法只在當前類中可見,對子類和實例對象也都是不可見的

**readonly(只讀修飾符)**
除了可見性修飾符之外,還有一個常見修飾符是:redonly
readonly:表示只讀,用來防止在構造函數之外對屬性進行賦值
```typescript
class Person5 {
  readonly age: number = 18
  readonly age2 = 18
  constructor(age: number) {
    this.age = age
  }
//   在構造函數外不可修改readonly屬性
}
```
**解釋**:
- 1.使用readonly關鍵字修飾該屬性是只讀的,**注意**只能修飾屬性不能修飾方法
- 2.**注意**:屬性age後面的類型註解(比如此處的number)如果不加,則age的類型為18(字面量類型)
- 3.接口或者{}表示的對象類型,也可以使用readonly
```typescript
// EX:
interface IPerson {
  readonly name: string
}
let obj: IPerson = {
  name: 'Jack'
}
```

---
### 4-2.類型兼容性
**兩種類型系統:**
- 1.Structural Type System(結構化類型系統)
- 2.Nominal Type System(標明類型系統)

TS採用的是結構化類型系統,也叫做duck typing(鴨子類型),類型檢查關注的是值所具有的形狀
也就是說,在結構類型系統中,如果兩個對象具有相同的形狀,則認為它們屬於同一類型
```typescript
// EX:
class Point3 { x: number; y: number }
class Point2D { x: number; y: number }
const p1: Point3 = new Point2D()
```
**解釋**:
- 1.Point3和Point2D是兩個不同名稱的類
- 2.變量p1的類型被顯示標注為Point3類型,但是,他的值卻是Point2D的實例,並且沒有類型錯誤
- 3.因為TS是結構化類型系統,只檢查Point和Point2D的結構是否相同(相同,都具有x和y兩個屬性,屬性類型也相同)
- 4.但是,如果在Nominal Type System中(比如,C#,Java等),他們是不同的類,類型無法兼容

**注意**:在結構化類型系統中,如果兩個對象具有相同的形狀,則認為他們屬於同一類型,這種說法並不準確
更準確的說法:對於對象類型來說,y的成員至少與x相同,則x兼容y(成員多的可以賦值給少的)
```typescript
class Point4 { x: number; y: number }
class Point3D { x: number; y: number; z: number }
const p2: Point4 = new Point3D
```
**解釋**:
- 1.Point3D的成員至少與Point4相同,則Point兼容Point3D
- 2.所以成員多的Point3D可以賦值給成員少的Point4

除了class之外,TS中的其他類型也存在著互相兼容的情況,包括:1.接口兼容性,2.函數兼容性 等
接口之間的兼容性,類似於class
```typescript
interface PointA { x: number; y: number }
interface PointB { x: number; y: number }
interface PointC { x: number; y: number; z: number }
let pA: PointA
let pB: PointB = { x: 0, y: 0 }
let pC: PointC
pA = pB;
// class和interface之間也可以兼容
class PointD { x: number; y: number }
let pD: PointA = new PointD
```
**函數兼容性**
函數之間兼容性比較複雜,需要考慮1.參數個數,2.參數類型,3.返回值類型
- 1.參數個數:參數多的兼容參數少的(或者說,參數少的可以賦值給多的)
  ```typescript
  // EX:
  type F1 = (a: number) => void
  type F2 = (a: number, b: number) => void
  let f1: F1 = (a) => { }
  let f2: F2 = f1
  ```
  **解釋**:
  - 1.參數少的可以賦值給參數多的,所以f1可以賦值給f2
  - 2.數組forEach方法的第一個參數是回調函數,該示例中類型為:(value: string , index: number , array: string[]) => void
  - 3.在JS中省略用不到的函數參數實際上是很常見的,這樣的使用方式,促成TS中函數類型之間的兼容性
  - 4.並且因為回調函數是有類型的,所以TS會自動推導出參數item,index,array的類型
  <br>
- 2.參數類型:相同位置的參數類型要相同(原始類型)或兼容(對象類型)
  ```typescript
  // EX:
  type F3 = (a: number) => string
  type F4 = (a: number) => string
  let f3: F3 = (a) => { return '' }
  let f4: F4 = f3
  ```
  **解釋**:函數類型F2兼容函數類型F1,因為F1和F2的第一個參數類型相同
  ```typescript
  // EX:
  interface A1 { x: number; y: number }
  interface A2 { x: number; y: number; z: number }
  type F5 = (p: A1) => void
  type F6 = (p: A2) => void
  let f5: F5 = () => { }
  let f6: F6 = f5
  ```
  **解釋**:
  - 1.**注意**:此處與接口兼容性衝突
  - 2.技巧:將對象拆開,把每個屬性看做一個個參數,則參數少的可以賦值給參數多的
  <br>
- 3.返回值類型:只須關注返回值類型本身即可
  ```typescript
  // EX:
  type F7 = () => string
  type F8 = () => string
  let f7: F7 = () => { return '' }
  let f8: F8 = f7
  // EX2:
  type F9 = () => { name: string }
  type F10 = () => { name: string; age: number }
  let f9: F9
  let f10: F10 = () => { return { name: '', age: 0 } }
  f9 = f10
  ```
  **解釋**:
  - 1.如果返回值類型是原始類型,此時兩個類型要相同
  - 2.如果返回值類型是個對象類型,此時成員多的可以賦值給成員少的

---
### 4-3.交叉類型
功能類似於接口繼承(extends),用於組合督個類型為一個類型(常用於對象類型)
```typescript
// EX:
interface Person6 { name: string }
interface Contact { phone: string }
type PersonDetail = Person6 & Contact
let obj1: PersonDetail = {
  name: 'Jack',
  phone: '123...'
}
```
**解釋**:使用交叉類型後,新的類型PersonDetail就同時具備了Person和Contact的所有屬性類型
相當於
```typescript
type PersonDetail = { name: string; number: string }
```
交叉類型(&)和接口類型(extends)的對比:
- 1.相同點:都可以實現對象類型的組合
- 2.不同點:兩種方式實現類型組合時,對於同名屬性之間,處裡類型衝突方式不同
```typescript
// EX:
interface A {
  fn: (value: number) => string
}
interface B extends A {
  fn: (value: string) => string
}

type C = A & B
```
說明:以上代碼,接口繼承會報錯(類型不兼容);交叉類型沒有報錯,可以簡單理解為:
```typescript
fn: (valur: string | number) => string
```

---
### 4-4.泛型 
泛型是可以在保證類型安全前提下,讓函數等與多種類型一起工作,從而實現復用,常用於:函數,接口,class中
EX:(需求:創建個id函數,傳入什麼數據就返回數據本身)
```typescript
function id(value: number): number { return value }
```
id(10)調用以上函數就會直接返回10本身,但是該函是只接受數值類型,無法用於其他類型
為了能讓函數能夠接受任意類型,可以將參數類型修改為any,但是這樣就失去TS類型保護,類型不安全
```typescript
function id1(value: any): any { return value }
```
泛型在保證類型安全(不丟失類型訊息)的同時,可以讓函數等與多種不同的類型一起工作,靈活可復用
實際上,在C#和Java等編程語言,泛型都是用來實現可復用組件功能的主要工具之一

**創建泛型函數:**
```typescript
function id2<Type>(value: Type): Type { return value }
```
**解釋**
- 1.語法:在函數名稱的後面添加<>(尖括號),尖括號中添加類型變量,比如此處的Type
- 2.類型變量Tpye,是一種特殊類型的變量,它處理類型而不是值
- 3.該類型變量相當於一個類型容器,能夠捕獲該用戶提供的類型(具體是什麼類型由用戶調用該函數時指定)
- 4.因為Type是類型,因此可以將其作為函數參數和返回值的類型,表示參數和返回值具有相同的類型
- 5.類型變量Type,可以是任意合法的變量名稱
  
**調用泛型函數**:
```typescript
const num = id2<number>(10)
const str = id2<string>('a')
```
**解釋**:
- 1.語法:在函數名稱的後面添加<>(尖括號),尖括號中指定具體的類型,比如此處的number
- 2.傳入類型number後,這個類型就會被函數聲明時指定類型變量Type捕獲到
- 3.此時,Type的類型就是number,所以函數id2參數和返回值的類型也都是number,同樣,如果傳入類型string,函數id2參數和返回值的類型就都是string,這樣,通過泛型就做到了讓id函數與多種不同的類型一起工作,實現了復用的同時保證類型安全

**簡化調用泛型函數**:
```typescript
let num1 = id2(10)
let str1 = id2('10')
```
**解釋**:
- 1.在調用泛型函數十,可以省略<類型>來簡化泛型函數的調用
- 2.此時,TS內部會採用一種較類型參數推斷的機制,來根據傳入實參自動推斷類型變量Type的類型
- 3.比如傳入實參10,TS會自動推斷變量num的類型number,並作為Type的類型

**泛型約束**:
默認情況下,泛型函數的類型變量Type可以代表多個類型,這導致無法訪問任何屬性
比如,id('a')調用函數實獲取參數的長度
```typescript
function id3<Type>(value: Type): Type {
  console.log(value.length)
  return value
}
```
**解釋**:Type可以代表任意類型,無法保證一定存在length屬性,比如number類型就沒有length
此時,就需要為泛型添加約束來收縮類型(縮窄類型取值範圍)
添加泛型約束收縮類型,主要有以下兩種方式:
- 1.指定更加具體的類型
  ```typescript
  EX:
  function id4<Type>(value: Type[]): Type[] {
    console.log(value.length);
    return value
  }
  ```
  比如將類型修改為Type[](Type類型的數組),因為只要是數組就有length屬性,因此就可以訪問

- 2.添加約束
  ```typescript
  interface Ilength { length: number }
  function id5<Type extends Ilength>(value: Type): Type {
    console.log(value.length)
    return value
  }
  id5(['a', 'b'])
  id5('111')
  ```
  **解釋**:
  - 1.創建描述約束的接口Ilength,該接口要求提供length屬性
  - 2.通過extends關鍵字使用該接口,為泛型(類型變量)添加約束
  - 3.該約束表示:傳入的類型必須具有length屬性
  **注意**:傳入的實參(比如,數組)只要有length屬性即可,也符合接口的類型兼容性

泛型的類型變量可以有多個,並且類型變量之間還可以約束(比如,第二個類型變量是第一個類型變量約數)
比如創建一個函數來獲取對象中屬性的值
```typescript
function grtProp<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key]
}
grtProp({ name: 'jack', age: 18 }, 'name')
grtProp(18, 'toFixed')
grtProp('abc', 'split')
grtProp('abc', 1) // 1 表示索引
```
**解釋**:
- 1.添加第二個類型變量Key,兩個類型變量之間使用(,)逗號分隔
- 2.keyof關鍵字接受一個對象類型,生成其鍵名稱(可能是字符串或數字)的聯合類型
- 3.本示例中keyof Type實際上獲取的是對象所有鍵的聯合類型,也就是:'name'|'age'
- 4.類型變量Key受Type約束,可以理解為:K只能是Type所有鍵中的任意一個,或者說只能訪問對象中存在的屬性

泛型接口:
接口也可以配合泛型來使用,以增加其靈活性,增強復用性
```typescript
// EX:
interface IdFunc<Type> {
  id: (value: Type) => Type,
  ids: () => Type[]
}

let obj2: IdFunc<number> = {
  id(value) { return value },
  ids() {
    return [1, 2, 3
    ]
  }
}
```
**解釋**:
- 1.接口名稱的後面添加<類型變量>,這個接口就變成泛型接口
- 2.接口的類型變量,對街口中其他成員可見,也就是接口中所有成員都可以使用類型變量
- 3.使用泛型接口時,需要顯式指定具體類型(比如,此處的Idfunc<number>)
- 4.此時id方法的參數和返回值類型都是number;ids方法返回值類型是number[]

**泛型類**:
創建泛型類:
```typescript
class GenericNumber<NumType> {
  defaulValue: NumType
  add: (x: NumType, y: NumType) => NumType
}
```
**解釋**:
- 1.類似於泛型接口,在class名稱後面添加<類型變量>,這個類就變成了泛型類
- 2.此處得add方法,採用箭頭函數型式的類型書寫方式
```typescript
const myNum = new GenericNumber<number>()
myNum.defaulValue = 10
```
類似於泛型接口,在創建class實例時,在類名後面通過<類型>來指定明確的類型

**泛型工具類型**:
TS內置一些常用的工具類型,來簡化TS中一些常見的操作
說明:它們都是基於泛型實現的(泛型適用於多種類型,更加通用),並且都是內置,可以直接在代碼中使用
主要學習:
- 1.Partial\<Type>
- 2.Readonly\<Type>
- 3.Pick<Type,keys>
- 4.Record<keys,Type>

-------------------------------------------------------------
1.Partial\<Type>-用來構造(創建)一個類型,將Type的所有類型設置為可選
```typescript
// EX:
interface Props {
  id: string
  children: number[]
}
type PartialProps = Partial<Props>

let p3: Props = {
  id: '',
  children: [1]
}
let p4: PartialProps = {
  id: ''
}
```
**解釋**:構造出來的新類型PartialProps結構和Props相同,但所有屬性都變為可選的

-------------------------------------------------------------
 2.Readonly\<Type>-用來構造一個類型,將Type的所有屬性都設置為readonly(只讀)
 ```typescript
// EX:
interface Props1 {
  id: string
  children: number[]
}
type ReadonlyProps = Readonly<Props1>
**解釋**:構造出來的新類型ReadonlyProps結構和Props相同,但所有屬性都變為只讀的
let readonlyProps: ReadonlyProps = {
  id: '1',
  children: [1]
}
readonlyProps.id = '2'
```
當重新給id屬性賦值時,就會報錯:因為 'id' 為唯讀屬性，所以無法指派至 'id'

-------------------------------------------------------------
 3.Pick<Type,keys>-從Type中選擇一組屬性來構造新類型
```typescript
// EX:
interface Props2 {
  id: string
  title: string
  children: number[]
}
type PickProps = Pick<Props2, 'id' | 'title'>
```
**解釋**:
- 1.Pick工具類型有兩個類型變量:1.表示選擇誰的屬性,2.表示選擇哪幾個屬性
- 2.其中第2個類型變量,如果只選擇一個則只傳入該屬性名即可
- 3.第二個類型變量傳入的屬性只能式第一個類型變量中存在的屬性
- 4.構造出來的新類型PickProps,只有id和title兩個屬性類型

-------------------------------------------------------------
 4.Record<keys,Type>-構造一個對象類型,屬性鍵為Keys,屬性類型為Type
 ```typescript
// EX:
type RecordObj = Record<'a' | 'b' | 'c', string[]>
let obj3: RecordObj = {
  a: ['1'],
  b: ['2'],
  c: ['3']
}
```
**解釋**:
- 1.Record工具類型有兩個類型變量:1.表示對象有哪些屬性,2.表示對象屬性的類型
- 2.購鍵的新對象類型RecordObj表使:這個對象有三個屬性分別為a/b/c,屬性值的類型都是string[]

---
### 4-5.索引簽名類型
絕大多數情況下,我們都可以在使用對象前就確定對象的結構,並為對象添加準確的類型
使用的場景:當無法確定對象中有那些屬性(或者說對象中可以出現任意多個屬性),此時就用到索引簽名類型
```typescript
// EX:
interface AnyObject {
  [key: string]: number | string
}
let obj4: AnyObject = {
  a: 1,
  b: 2,
  c: 'a'
}
```
**解釋**:
- 1.使用[key:string]來約束該接口中允許出現的屬性名稱,表示只要式string類型的屬性名稱,都可以出現在對象中
- 2.這樣,對象obj4中就可以出現任意多個屬性(比如,a,b等)
- 3.key只是一個佔位符,可以換成任意合法的變量名稱
- 4.隱藏的前置知識:JS中對象({})的鍵式string類型的

---
### 4-6.映射類型
基於舊類型創建新類型(對象類型),減少重複,提升開發效率
比如,類型PropKeys有x/y/z,另一個類型Type1中也有x/y/z並且類型相同
```typescript
// EX:
type ProppKeys = 'x' | 'y' | 'z'
type Type1 = { x: number; y: number; z: number }
使用映射類型來進行簡化
type Type2 = { [Key in ProppKeys]: number }
```
**解釋**:
- 1.映射類型式基於索引簽名類型的,所以該語法類似於索引簽名類型,也使用了[]
- 2.Key in PropKeys表示Key可以是PropKeys聯合類型中的任意一個,類似於forin(let k in obj)
- 3.使用映射類型創建的新對象類型Type2和類型Type1結構完全相同
- 4.**注意**:映射類型只能在類型別名中使用,不能在接口中使用

映射類型除了根據聯合類型創建新類型外,還可以根據對象類型來創建:
```typescript
type Props3 = { a: number; b: string; c: boolean }
type Type3 = { [key in keyof Props3]: number }
```
**解釋**:
- 1.先執行keyof Props3獲取到對象類型Props3中所有鍵的聯合類型即'a'|'b'|'c'
- 2.key in 就表示key可以是Props3中所有鍵名稱中的任意一個

**索引查詢(訪問)類型**
作用:用來查詢屬性的類型
```typescript
type Props4 = { a: number; b: string; c: boolean }
type TypeA = Props4['a']
```
**解釋**:Props['a']表示查詢類型Props中屬性'a'對應的類型number,所以TypeA的類行為number
**注意**:[]中的屬性必須存在於被查詢類型中,否則會報錯

索引查詢類型的其他使用方式:同時查詢多個索引的類型
```typescript
type Props5 = { a: number; b: string; c: boolean }
type TypeAB = Props5['a' | 'b']
```
**解釋**:使用字符串字面量的聯合類型,獲取屬性a和b對應的類型,結果為string|number
```typescript
type TypeC = Props5[keyof Props5]
```
**解釋**:使用keyof操作符獲取Props5中所有鍵對應的類型,結果為string|number|boolean


#  5.TypeScript類型聲明文件
**概述**:類型聲明文件:用來位已存在的JS庫提供類型聲明文件,這樣在TS項目中使用這些庫時,就像用TS一樣就會有代碼提示,類型保護等機制
- 1.TS的兩種文件類型
- 2.類型聲明文件的使用說明

---
### 5-1.TS中的兩種文件類型
- 1.(.ts)文件:
  - 1.既包含類型信息有可以執行代碼
  - 2.可以被編譯成.js文件,然後執行代碼
  - 3.用途:編寫程序代碼
- 2.(.d.ts)文件:
  - 1.只包含類型信息的類型聲明文件
  - 2.不會生成.js文件,警用於提供類型信息
  - 3.用途:為js提通類型信息
    
總結:.ts是implementation(代碼實現文件);.d.ts是declaration(類型聲明文件)
如果要為JS庫提供類型信息,要使用.d.ts文件
    
---
### 5-2.類型聲明文件的使用說明
使用已有的類型聲明文件:
- 1.內置類型聲明文件
- 2.第三方庫類型聲明文件
    
1.內置聲明文件:TS為JS運行時可用的縮有標準化內置API都提供了聲明文件
比如,在使用數組時,數組所有方法都會有對應的代碼提示以及類型信息
```typescript
(method)Array<number>.forEach(callbackfn: (value: number, index: 
number, array: number[]) => void, thisArg ?: any): void
```
實際上這都是TS提供的內置聲明文件
可以通過ctrl+鼠標左鍵來查看內置類型聲明文件內容
比如,查看forEach方法的類型聲明,在VSCode中會自動跳轉到lib.es5.d.ts類型聲明文件中
當然,像window,document等BOM,DOM API也都有相應的類型聲明(lib.dom.d.ts)
    
2.第三方庫類型聲明文件:目前,幾乎所有常用的第三方庫都有相應的類型聲明文件
第三方庫的類型聲明文件有兩種存在形式:
- 1.庫自帶類型聲明文件
- 2.由DefinitelyTyped提供

1.庫自帶類型聲明文件,比如:Axios
正常情況下導入該庫,TS就會自動加在庫自己的類型聲明文件,以提供該庫的類型聲明

2.由DefinitelyTyped提供
DefinitelyTyped是一個github倉庫,用來提供高質量TypeScript類型聲明
可以通過npm/yarn來下載該倉庫提供的TS類型聲明包,這些包的名稱格是為:@types/*
比如:@types/react,@types/lodash等
說明:在實際項目開發時,如果你使用的第三方庫沒有自帶聲明文件,VSCode會給出明確的提示
解釋:當安裝@types/*類型聲明包後,TS也會自動加載該類聲明包,以提供該庫的類型聲明
    
**創建自己的類型聲明文件**:
- 1.項目內共享類型
    如果多個.ts文件中都用到同一個類型,此時可以創鍵.d.ts文件提供該類型,時線類型共享
    操作步驟:
    - 1.創建index.d.ts類型聲明文件(名稱自取)
    - 2.創建需要共享的類型,並使用export導出(TS中的類型也可以使用import/export實現模塊化功能)
    - 3.在需要使用共享類型的.ts文件中,通過import導入即可(.d.ts後綴號導入時,直接省略)
      ```typescript
      // EX:
      // 導出
      type Props = { x: number; y: number }
      export { Props }
      // 導入
      import { Props } from ./index
      ```
- 2.為已有的JS文件提供類型聲明
    說明:TS項目中也可以使用.js文件,在導入.js文件時,TS會自動加載與.js同名的.d.ts文件,以提供類型聲明
    **declare關鍵字**:用於類型聲明,為其他地方(比如,.js文件)以存在的變量聲明類型,而不是創鍵一個新的變量
    - 1.對於type,interface等這些明確就是TS類型的(只能在TS中使用的),可以省略   declare關鍵字
    - 2.對於let,functio等具有雙重含義(在JS,TS中都能使用),應該使用declare關鍵字,明確指定此處用於類型聲明
```javascript
// JS
let count = 10
let songName = '痴心絕對'
let position = {
  x: 0,
  y: 0
}

function add(x, y) {
  return x + y
}

function changeDirection(direction) {
  console.log(direction)
}

const fomarPoint = point => {
  console.log('當前座標:', point)
}

export { count, songName, position, add, changeDirection, fomarPoint }
```
```typescript
// TS
declare let count: number
declare let songName: string
interface Point {
  x: number
  y: number
}
declare let position: Point
declare function add(x: number, y: number): number
declare function changeDirection(
  direction: 'up' | 'down' | 'left' | 'right'
): void

type FomarPoint = (point: Point) => void
declare const fomarPoint:FomarPoint

export { count, songName, position, add, changeDirection, fomarPoint }
```
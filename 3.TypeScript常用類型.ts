/*
  3-1.TypeScript常用類型
    概述:
      TypeScript是JS的超集，TS提供了JS所有功能，並且額外增加 類型系統
      JS有類型(比如number,string等)，但JS不會檢查變量類型是否變化，TS會檢查

--------------------------------------------------------------------------------------------------
    3-1.類型註解
      EX:let age: number = 19
      說明:代碼中的:number就是類型註解
      作用:為變量添加類型約束，比如上述代碼中，約定變量age的類型為number(數值類型)
      解釋:約定了什麼類型，就只能給變量賦值該類型的值

--------------------------------------------------------------------------------------------------
  3-2.常用基礎類型概述
    可以將TS中常用的基礎類型細分為兩類
      1.JS已有類型
        原始類型:number/string/boolean/null/undefined/symbol
        對象類型:object(包括對象,數組,函數等)
        
      2.TS新增類型
        聯合類型,自定義類型(類型別名),接口,元組,字面量類型,枚舉,void,any等
*/


// --------------------------------------------------------------------------------------------------
// 3-3.原始類型:number/string/boolean/null/undefined/symbol
// 特點:簡單 這些類型完全按照JS中類型的名稱來書寫
// EX:
let age: number = 18
let myName: string = '123'
let isLoading: boolean = true
let a: null = null
let b: undefined = undefined
let s: symbol = Symbol()


// --------------------------------------------------------------------------------------------------
// 3-4.數組類型
// 對象類型:object(包括對象,數組,函數等)
// 特點:對象類型，在TS中更加細化，每個具體的對象都有自己的類型語法
// 數組類型的兩種語法(推薦使用number[]寫法)
// EX:
let number: number[] = [1, 2, 3]
let strArr: string[] = ['a', 'b', 'c']
let numArr: Array<number> = [1, 2, 3]
let string: Array<string> = ['a', 'b', 'c']
// 需求:數組中既有number又有string類型
// EX:
// 添加小括號,表示arr首先是數組,然後數組內能夠出現number或string類型的元素
let arr: (string | number)[] = [1, 'a', 3, 'b']
// 不添加小括號,表示arr既可以是number類型,又可以是string[]類型
let arr1: number | string[] = 123
let arr2: number | string[] = ['a', 'b', 'c']
// 解釋: | (豎線)在TS中叫做 聯合類型(由兩個或多個其他類型組成的類型,表示可以是這些類型中的任意一種)
// 注意:這是TS中聯合類型的語法,只有一根豎線


// --------------------------------------------------------------------------------------------------
// 3-5.類型別名
// 類型別名(自定義類型):為任意類型起別名
// 使用場景:當同一種類型(複雜)被多次使用時，可以通過類型別名，簡化該類型的使用
// EX:
type CustonArray = (number | string)[]
let arr3: CustonArray = [1, 'a', 3, 'b']
let arr4: CustonArray = [2, 'x', 4, 'y']
// 解釋:
//  1.使用type關鍵字來創建類型別名
//  2.類型別名,可以是任何合法的變量名稱
//  3.創建類型別名後,直接使用該類型別名作為變量的類型名稱即可


// --------------------------------------------------------------------------------------------------
// 3-6.函數類型
// 函數類型實際上指的是:函數參數和返回值的類型
// 為函數指定類型的兩種方式:
//  1.單獨指定參數,返回值的類型
// EX:
function add(num1: number, num2: number): number {
  return num1 + num2
}
const add1 = (num1: number, num2: number): number => {
  return num1 + num2
}

//  2.同時指定參數,返回值的類型
// EX:
const add3: (num1: number, num2: number) => number = (num1, num2) => {
  return num1 + num2
}
// 解釋:當函數作為表達式時,可以通過類似箭頭函數形式的語法來為函數添加類型
// 注意:這種形式只適用於函數表達式

// 若函數沒有返回值,那麼函數返回值類型為:void
// EX:
function greet(name: string): void {
  console.log(name);
}
// 使用函數時線某個功能時,參數可以傳也可以不傳,這種情況下,給函數參數指定類型時,就用到 可選參數
// 比如,數組的slice方法,可以slice(),也可以slice(1)或者slice(1,3)
// EX:
function mySlice(start?: number, end?: number): void {
  console.log('起始:', start, '結束:', end);
}
// 可選參數:在可傳可不傳的參數名稱後面添加?(問號)
// 注意:可選參數只能出現在參數列表的最後，也就是說可選參數後面不能再出現必選參數


// --------------------------------------------------------------------------------------------------
// 3-7.對象類型
// JS中的對象是由屬性和方法構成的,而TS中對象的類型就是在描述對象的結構(有什麼類型的屬性和方法)
// 對象類型的寫法:
let person: { name: string; age: number; sayHi(): void } = {
  name: 'jack',
  age: 18,
  sayHi() { }
}
// 解釋:
//  1.直接使用{}來描述對象結構，屬性採用 屬性名:類型 的形式,方法採用 方法名():返回值類型 的形式
//  2.如果方法有參數,就在方法名後面的小括號中指定參數類型(比如:sayHi(name:string):void)
//  3.在一行代碼中指定一個對象的多個類型時,使用;(分號)來分隔
//    如果一行代碼只指定一個屬性類型(通過換行來分隔多個屬性類型),可以去掉;(分號)
//    方法的類型也可以使用箭頭函數形式(比如:{sayHi:()=>:void})
//    EX:
let person1: {
  name: string
  age: number
  sayHi: (name?: string) => void
} = {
  name: 'jack',
  age: 18,
  sayHi() { }
}

// 對象中的屬性或方法,也是可選的，此時就用到 可選屬性
// 比如:在使用axios({...})時,如果發送GET請求,method屬性就可以省略
// EX:
function myAxios(config: {
  url: string
  method?: string
}) {
  console.log(config);
}
// 可選屬性的語法與函數可選參數的語法一致,都使用?(問號)來表示


// --------------------------------------------------------------------------------------------------
// 3-8.接口(介面)
// 當一個對象類型被多次使用時,一般會使用接口(interface)來描述對象類型,達到復用的目的
// EX:
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
// 解釋:
//  1.使用interface關鍵字來聲明接口
//  2.接口名稱,可以是任意合法的變量名稱
//  3.聲明接口後,直接使用接口名稱作為變量類型
//  4.因為每一行只有一個屬性類型,因此屬性類型後沒有;(分號)

// interface接口 與 type類型別名 對比:
//  相同點:都可以給對象指定類型
//  不同點:
//    接口:只能為對象指定類型
//    類型別名:不僅可以為對象指定類型,實際上可以為任意類型指定別名
// interface:
interface Iperson1 {
  name: string
  age: number
  sayHi(): void
}
// type
type Iperson2 = {
  name: string
  age: number
  sayHi(): void
}

// 接口繼承
// 如果兩個接口之間有相同的屬性或方法,可以將公共的屬性或方法抽離出來,通過繼承來實現復用
// 比如:這兩個接口都有x,y兩個屬性
interface Point2D { x: number; y: number }
//interface Point3D { x: number; y: number; z: number }
// 使用繼承的方式
interface Point3D extends Point2D { z: number }
// 解釋:
//  1.使用extends(繼承)關鍵字實現了接口Point3D繼承Point2D
//  2.繼承後,Point3D就有了Point2D的所有屬性和方法(此時Point3D同時擁有x,y,z三個屬性)


// --------------------------------------------------------------------------------------------------
// 3-9.元組
// 場景:該數組只有兩個元素，並且這兩個元素都是數值類型
let position: number[] = [39, 116]
// 使用number[]的缺點:不嚴謹,因為該類型的數組中可以出現任意多個數字

// 使用元組(Tuple)
// 元組類型是另一種類型的數組,他確切知道包含多少元素,以及特定索引對應的類型
let position1: [number, number] = [39, 116]
// 解釋:
//  1.元組類型可以確切的標記出有多少個元素,以及每個元素的類型
//  2.該示例中,元素有兩個元素,每個元素的類型都是number


// --------------------------------------------------------------------------------------------------
// 3-10類型推論
// TS中,某些沒有明確指出類型的地方,TS的類型推論機制會幫助提供類型
// 由於類型推論的存在,這些地方,類型註解可以省略不寫
// 發生類型推論的2種常見場景:
//  1.變量聲明並初始化時
let age1 = 18   //TS自動推斷出變量age1為number類型
age1 = 20      //鼠標移入變量名稱age

//  2.決定函數返回值時
function add4(num1: number, num2: number) {
  return num1 + num2
}
// 注意:這兩種情況下，可以省略不寫


// --------------------------------------------------------------------------------------------------
// 3-11.類型斷言
// 類型斷言用來指定更具體的類型
// 比如:getElementById方法返回值的類型是HTMLElement,該類型包含所有標籤公共的屬性或方法,不包含a標籤特有的href屬性
// 因此這個類型太寬泛(不具體),無法操作href等a標籤特有的屬性或方法
// 使用類型斷言:
const aLink = document.getElementById('link') as HTMLAnchorElement
// 解釋:
//  1.使用as關鍵字實現類型斷言
//  2.關鍵字as後面的類型是一個更加具體的類型(HTMLAnchorElement是HTMLElement的子類型)


// --------------------------------------------------------------------------------------------------
// 3-12.字面量類型
let str1 = 'hello ts'
const str2 = 'hello ts'
// 通過TS類型推論機制,可以得到答案
//  1.變量str1類型為string
//  2.變量str2類型為hello ts
// 解釋:
//  1.str1是一個變量(let),他的值可以是任意字符串,所以類型為:string
//  2.str2是一個常量(const),他的值不能變化只能是hello ts,所以它的類型為:hello ts
// 注意:此處的'hello ts',就是一個字面量類型,也就是說某個特定的字符串也可以作為TS中的類型,除字符串外,任意JS字面量(比如:對象,數字等)都可以作為類型使用

// 使用模式:字面量類型配合聯合類型一起使用
// 使用場景:用來表示一組明確的可選值列表
// 比如,在貪吃蛇遊戲中,遊戲方向可選值只能是上,下,左,右中的任意一個
function changeDirection(direction: 'up' | 'down' | 'left' | 'right') {
  console.log(direction);
}
// 解釋:參數direction的值只能是up/down/lwft/right中的任意一個
// 優勢:相比於string類型,使用字面量類型更加精確,嚴謹


// --------------------------------------------------------------------------------------------------
// 3-13.枚舉
// 枚舉的功能類似於字面量類型+聯合類型組合的功能,也可以表示一組明確的可選值
// 枚舉:定義一組命名常量,它描述一個值,該值可以是這謝命名常量中的一個
// EX:
enum Direction { Up, Down, Left, Right }
function changeDirection1(direction: Direction) {
  console.log(direction);
}
// 解釋:
//  1.使用enum關鍵字定義枚舉
//  2.約定枚舉名稱,枚舉中的值以大寫字母開頭
//  3.枚舉中的多個值之間通過,(逗號)分隔
//  4.定義好枚舉後,直接使用枚舉名稱作為類型注解

// 注意:形參direction的類型為枚舉Direction,那麼時參的值就應該是枚舉Direction成員的任意一個
// 訪問枚舉成員:
changeDirection1(Direction.Up)
// 解釋:類似於JS中的對象,直接通過.(點)語法訪問枚舉成員

// 問題:把枚舉成員作為函數的實參,他的值是什麼
changeDirection1(Direction.Up)
// 解釋:通過鼠標移入Direction.Up,可以看到枚舉成員Up的值為0
// 注意:枚舉成員是有值的,默認為:從0開始自增的數值
// 枚舉成員的值為數字的枚舉,稱為:數字枚舉

// 也可以給枚舉中的成員初始化值
// EX:
enum Direction2 { Up = 10, Down, Left, Right }
// Down->11,Left->12,Right->13
enum Direction3 { Up = 2, Down = 4, Left = 6, Right = 8 }

// 字符串枚舉:枚舉成員的值是字符串
enum Direction4 {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right'
}
// 注意:字符串枚舉沒有自增長行為,因此,字符串中的每個成員必須有初始值

// 枚舉是TS為數不多的非JS類型級擴展(不僅僅是類型)的特性之一
// 因為:其他類型僅被當作類型,而枚舉不僅用作類型,還提供值(枚舉成員都是有值的)
// 也就是說,其他類型會在編譯為JS代碼時自動移除,而枚舉類型會被編譯為JS代碼
/*
 TS EX:
  enum Direction {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right'
}

JS EX:
  var Direction;
  (function(Direction){
      Dirction["Up"]="Up";
      Dirction["Down"]="Down";
      Dirction["Left"]="Left";
      Dirction["Right"]="Right";
  })(Direction || (Direction={}))
*/
// 說明:枚舉 與 字面量類型+聯合類型組合 的功能類似,都是用來表示一組可選值列表
// 一般情況下,推薦使用 字面量類型+聯合類型組合 ,因為相比枚舉,更加直觀,簡潔,高效


// --------------------------------------------------------------------------------------------------
// 3-14.any類型
// 原則:不推薦使用any(失去TS類型保護優勢)
// 因為當類型為any時,可以對該直進行任意操作,並且不會有代碼提示
let obj: any = { x: 0 }
obj.bar = 100
obj()
const n: number = obj
// 解釋:以上操作都不會有任何類型錯誤提示,即使可能存在錯誤
// 盡可能地避免使用any類型,除非臨時使用來"避免"書寫很長,很複雜的類型
// 其他隱式具有any類型的情況:
//  1.聲明變量不提供類型也不提供默認值
//  2.函數參數不加類型
// 注意:因為不推薦any類型,所以這兩種情況都應該提供類型


// --------------------------------------------------------------------------------------------------
// 3-15.typeof
// TS也提供typeof操作符,可以在類型上下文中引用變量或屬性的類型(類型查詢)
// 使用場景:根据已有變量的值,獲取該值的類型,來簡化類型書寫
// EX:
let p = { x: 1, Y: 2 }
function formatPoint(point: { x: number; y: number }) { }
function formatPoint2(point: typeof p) { }
// 解釋:使用typeof操作符來獲取變量p的類型,結果與第一種(對象字面量形式的類型)相同
// typeof出現在類型註解的位置(參數名稱的冒號後面)所處的環境就在類型上下文(區別於JS代碼)
// 注意:typeof只能用來查詢變量或鼠性的類型,無法查詢其他形式的類型(比如,函數調用的類型)
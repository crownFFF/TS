/*
  4.TypeScript高級類型
    概述:TS中的高級類型有很多,重點學習以下高級類型:
      1.class類
      2.類型兼容性
      3.交叉類型
      4.泛型和keyof
      5.索引簽名類型和索引查詢類型
      6.映射類型
*/

// ------------------------------------------------------------------------------------------------
// 4-1.class類
// TS全面支持ES2015中引入的class關鍵字,並為其添加類型註解和其他語法(比如,可見性修飾符等)
// class基本使用:
class Person { }
const p = new Person()
//  解釋:
//    1.根据TS中的類型推斷,可以知道Person類的實例對象p的類型是Person
//    2.TS中的class,不僅提供class語法功能,也作為一種類型存在

// 實例屬性初始化:
class Person1 {
  age: number
  gender = '男'
}
// 解釋:
//  1.聲明成員age,類型為number(沒有初始值)
//  2.聲明成員gender,並設置初始值,此時可省略類型註解(TS類型推論為string類型)

// 實例屬性
class Point1 {
  age: number
  gender: string
  constructor(age: number, gender: string) {
    this.age = age
    this.gender = gender
  }
}
// 解釋:
//  1.成員初始化(比如,age:number)後,才可以通過this.age來訪問實例對象
//  2.需要為構造函數指定類型註解,否則會被隱式推斷為any
//  3.構造函數不需要返回值類型

// 實例方法:方法的類型註解(參數與返回值)與函數用法相同
class Point2 {
  x = 10
  y = 10
  scale(n: number): void {
    this.x *= n
    this.y *= n
  }
}

// 類的繼承
// 類繼承有兩種方式
//  1.extends(繼承父類)
//  2.implement(實現接口)
// 說明:JS中只有extends,而implements是TS提供
// EX1:
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
// 解釋:
//  1.通過extends關鍵字實現繼承
//  2.子類Dog繼承父類Animal,則Dog的實例對象d就同時具有父類Animal和子類Dog的所有屬性和方法

// EX2:
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
// 解釋:
//  1.通過implements關鍵字讓class實現接口
//  2.Person類實現接口Singable,意味著Person類中必須提供Singable接口中指定的所有方法和屬性

// 類成員的可見性
// 可以使用TS來控制class的方法或屬性對於class外的代碼是否可見
// 可見性修飾符包括
//  1.public(公有的)
//  2.protected(受保護的)
//  3.private(私有的)

// EX(public):-------------------------------------
// public:表示公有的,公開的,公有成員可以被任何地方訪問,默認可見性
class Animal1 {
  public move() {
    console.log('Moving along!');
  }
}
// 解釋:
//  1.在類屬性或方法前面添加public關鍵字,用來修飾該屬性或方法是共有的
//  2.因為public是默認可見的,所以可以省略

// EX(protected):-------------------------------------
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
// 解釋:
//  1.在類屬性或方法前面添加protected關鍵字,用來修飾該屬性或方法是受保護的
//  2.在子類的方法內部可以通過this來訪問父類中受保護的成員,但是,對實例不可見

// EX(private):-------------------------------------
// private:表示私有的,只在當前類中可見,對實例對象以及子類也是不可見的
class Animal3 {
  private move() {
    console.log('Moving along!');
  }
  walk() {
    this.move()
  }
}
// 解釋:
//  1.在類屬性或方法前面添加private關鍵字,用來修飾該屬性或方法是私有的
//  2.私有的屬性或方法只在當前類中可見,對子類和實例對象也都是不可見的

// readonly(只讀修飾符)
// 除了可見性修飾符之外,還有一個常見修飾符是:redonly
// readonly:表示只讀,用來防止在構造函數之外對屬性進行賦值
class Person5 {
  readonly age: number = 18
  readonly age2 = 18
  constructor(age: number) {
    this.age = age
  }
  // 在構造函數外不可修改readonly屬性
}
// 解釋:
//  1.使用readonly關鍵字修飾該屬性是只讀的,注意只能修飾屬性不能修飾方法
//  2.注意:屬性age後面的類型註解(比如此處的number)如果不加,則age的類型為18(字面量類型)
//  3.接口或者{}表示的對象類型,也可以使用readonly
// EX:
interface IPerson {
  readonly name: string
}
let obj: IPerson = {
  name: 'Jack'
}

// --------------------------------------------------------------------------------------------------
// 4-2.類型兼容性
// 兩種類型系統:
//  1.Structural Type System(結構化類型系統)
//  2.Nominal Type System(標明類型系統)
// TS採用的是結構化類型系統,也叫做duck typing(鴨子類型),類型檢查關注的是值所具有的形狀
// 也就是說,在結構類型系統中,如果兩個對象具有相同的形狀,則認為它們屬於同一類型
// EX:
class Point3 { x: number; y: number }
class Point2D { x: number; y: number }
const p1: Point3 = new Point2D()
// 解釋:
//  1.Point3和Point2D是兩個不同名稱的類
//  2.變量p1的類型被顯示標注為Point3類型,但是,他的值卻是Point2D的實例,並且沒有類型錯誤
//  3.因為TS是結構化類型系統,只檢查Point和Point2D的結構是否相同(相同,都具有x和y兩個屬性,屬性類型也相同)
//  4.但是,如果在Nominal Type System中(比如,C#,Java等),他們是不同的類,類型無法兼容

// 注意:在結構化類型系統中,如果兩個對象具有相同的形狀,則認為他們屬於同一類型,這種說法並不準確
// 更準確的說法:對於對象類型來說,y的成員至少與x相同,則x兼容y(成員多的可以賦值給少的)
class Point4 { x: number; y: number }
class Point3D { x: number; y: number; z: number }
const p2: Point4 = new Point3D
// 解釋:
//  1.Point3D的成員至少與Point4相同,則Point兼容Point3D
//  2.所以成員多的Point3D可以賦值給成員少的Point4

// 除了class之外,TS中的其他類型也存在著互相兼容的情況,包括:1.接口兼容性,2.函數兼容性 等
// 接口之間的兼容性,類似於class
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

// 函數兼容性
// 函數之間兼容性比較複雜,需要考慮1.參數個數,2.參數類型,3.返回值類型
// 1.參數個數:參數多的兼容參數少的(或者說,參數少的可以賦值給多的)
// EX:
type F1 = (a: number) => void
type F2 = (a: number, b: number) => void
let f1: F1 = (a) => { }
let f2: F2 = f1
// 解釋:
//  1.參數少的可以賦值給參數多的,所以f1可以賦值給f2
//  2.數組forEach方法的第一個參數是回調函數,該示例中類型為:(value: string , index: number , array: string[]) => void
//  3.在JS中省略用不到的函數參數實際上是很常見的,這樣的使用方式,促成TS中函數類型之間的兼容性
//  4.並且因為回調函數是有類型的,所以TS會自動推導出參數item,index,array的類型

// 2.參數類型:相同位置的參數類型要相同(原始類型)或兼容(對象類型)
// EX:
type F3 = (a: number) => string
type F4 = (a: number) => string
let f3: F3 = (a) => { return '' }
let f4: F4 = f3
// 解釋:函數類型F2兼容函數類型F1,因為F1和F2的第一個參數類型相同

// EX:
interface A1 { x: number; y: number }
interface A2 { x: number; y: number; z: number }
type F5 = (p: A1) => void
type F6 = (p: A2) => void
let f5: F5 = () => { }
let f6: F6 = f5
// 解釋:
//  1.注意:此處與接口兼容性衝突
//  2.技巧:將對象拆開,把每個屬性看做一個個參數,則參數少的可以賦值給參數多的

// 3.返回值類型:只須關注返回值類型本身即可
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
// 解釋:
//  1.如果返回值類型是原始類型,此時兩個類型要相同
//  2.如果返回值類型是個對象類型,此時成員多的可以賦值給成員少的


// --------------------------------------------------------------------------------------------------
// 4-3.交叉類型
// 功能類似於接口繼承(extends),用於組合督個類型為一個類型(常用於對象類型)
// EX:
interface Person6 { name: string }
interface Contact { phone: string }
type PersonDetail = Person6 & Contact
let obj1: PersonDetail = {
  name: 'Jack',
  phone: '123...'
}
// 解釋:使用交叉類型後,新的類型PersonDetail就同時具備了Person和Contact的所有屬性類型
// 相當於
// type PersonDetail = { name: string; number: string }

// 交叉類型(&)和接口類型(extends)的對比:
//  1.相同點:都可以實現對象類型的組合
//  2.不同點:兩種方式實現類型組合時,對於同名屬性之間,處裡類型衝突方式不同
// EX:
interface A {
  fn: (value: number) => string
}
interface B extends A {
  // fn: (value: string) => string
}

type C = A & B
// 說明:以上代碼,接口繼承會報錯(類型不兼容);交叉類型沒有報錯,可以簡單理解為:
// fn: (valur: string | number) => string


// --------------------------------------------------------------------------------------------------
// 4-4.泛型 
// 泛型是可以在保證類型安全前提下,讓函數等與多種類型一起工作,從而實現復用,常用於:函數,接口,class中
// EX:(需求:創建個id函數,傳入什麼數據就返回數據本身)
function id(value: number): number { return value }
// id(10)調用以上函數就會直接返回10本身,但是該函是只接受數值類型,無法用於其他類型
// 為了能讓函數能夠接受任意類型,可以將參數類型修改為any,但是這樣就失去TS類型保護,類型不安全
function id1(value: any): any { return value }
// 泛型在保證類型安全(不丟失類型訊息)的同時,可以讓函數等與多種不同的類型一起工作,靈活可復用
// 實際上,在C#和Java等編程語言,泛型都是用來實現可復用組件功能的主要工具之一

// 創建泛型函數:
function id2<Type>(value: Type): Type { return value }
// 解釋
//  1.語法:在函數名稱的後面添加<>(尖括號),尖括號中添加類型變量,比如此處的Type
//  2.類型變量Tpye,是一種特殊類型的變量,它處理類型而不是值
//  3.該類型變量相當於一個類型容器,能夠捕獲該用戶提供的類型(具體是什麼類型由用戶調用該函數時指定)
//  4.因為Type是類型,因此可以將其作為函數參數和返回值的類型,表示參數和返回值具有相同的類型
//  5.類型變量Type,可以是任意合法的變量名稱

// 調用泛型函數:
const num = id2<number>(10)
const str = id2<string>('a')
// 解釋:
//  1.語法:在函數名稱的後面添加<>(尖括號),尖括號中指定具體的類型,比如此處的number
//  2.傳入類型number後,這個類型就會被函數聲明時指定類型變量Type捕獲到
//  3.此時,Type的類型就是number,所以函數id2參數和返回值的類型也都是number
// 同樣,如果傳入類型string,函數id2參數和返回值的類型就都是string
// 這樣,通過泛型就做到了讓id函數與多種不同的類型一起工作,實現了復用的同時保證類型安全

// 簡化調用泛型函數:
let num1 = id2(10)
let str1 = id2('10')
// 解釋:
//  1.在調用泛型函數十,可以省略<類型>來簡化泛型函數的調用
//  2.此時,TS內部會採用一種較類型參數推斷的機制,來根據傳入實參自動推斷類型變量Type的類型
//  3.比如傳入實參10,TS會自動推斷變量num的類型number,並作為Type的類型

// 泛型約束:
// 默認情況下,泛型函數的類型變量Type可以代表多個類型,這導致無法訪問任何屬性
// 比如,id('a')調用函數實獲取參數的長度
function id3<Type>(value: Type): Type {
  // console.log(value.length)
  return value
}
// 解釋:Type可以代表任意類型,無法保證一定存在length屬性,比如number類型就沒有length
// 此時,就需要為泛型添加約束來收縮類型(縮窄類型取值範圍)
// 添加泛型約束收縮類型,主要有以下兩種方式:
//  1.指定更加具體的類型
// EX:
function id4<Type>(value: Type[]): Type[] {
  console.log(value.length);
  return value
}
// 比如將類型修改為Type[](Type類型的數組),因為只要是數組就有length屬性,因此就可以訪問

//  2.添加約束
interface Ilength { length: number }
function id5<Type extends Ilength>(value: Type): Type {
  console.log(value.length)
  return value
}
id5(['a', 'b'])
id5('111')
// 解釋:
//  1.創建描述約束的接口Ilength,該接口要求提供length屬性
//  2.通過extends關鍵字使用該接口,為泛型(類型變量)添加約束
//  3.該約束表示:傳入的類型必須具有length屬性
// 注意:傳入的實參(比如,數組)只要有length屬性即可,也符合接口的類型兼容性

// 泛型的類型變量可以有多個,並且類型變量之間還可以約束(比如,第二個類型變量是第一個類型變量約數)
// 比如創建一個函數來獲取對象中屬性的值
function grtProp<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key]
}
grtProp({ name: 'jack', age: 18 }, 'name')
grtProp(18, 'toFixed')
grtProp('abc', 'split')
grtProp('abc', 1)  // 1 表示索引
// 解釋:
//  1.添加第二個類型變量Key,兩個類型變量之間使用(,)逗號分隔
//  2.keyof關鍵字接受一個對象類型,生成其鍵名稱(可能是字符串或數字)的聯合類型
//  3.本示例中keyof Type實際上獲取的是對象所有鍵的聯合類型,也就是:'name'|'age'
//  4.類型變量Key受Type約束,可以理解為:K只能是Type所有鍵中的任意一個,或者說只能訪問對象中存在的屬性

// 泛型接口:
// 接口也可以配合泛型來使用,以增加其靈活性,增強復用性
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
// 解釋:
//  1.接口名稱的後面添加<類型變量>,這個接口就變成泛型接口
//  2.接口的類型變量,對街口中其他成員可見,也就是接口中所有成員都可以使用類型變量
//  3.使用泛型接口時,需要顯式指定具體類型(比如,此處的Idfunc<number>)
//  4.此時id方法的參數和返回值類型都是number;ids方法返回值類型是number[]

// 泛型類:
// 創建泛型類:
class GenericNumber<NumType> {
  defaulValue: NumType
  add: (x: NumType, y: NumType) => NumType
}
// 解釋:
//  1.類似於泛型接口,在class名稱後面添加<類型變量>,這個類就變成了泛型類
//  2.此處得add方法,採用箭頭函數型式的類型書寫方式
const myNum = new GenericNumber<number>()
myNum.defaulValue = 10
// 類似於泛型接口,在創建class實例時,在類名後面通過<類型>來指定明確的類型

// 泛型工具類型:
// TS內置一些常用的工具類型,來簡化TS中一些常見的操作
// 說明:它們都是基於泛型實現的(泛型適用於多種類型,更加通用),並且都是內置,可以直接在代碼中使用
// 主要學習:
//  1.Partial<Type>
//  2.Readonly<Type>
//  3.Pick<Type,keys>
//  4.Record<keys,Type>

// -------------------------------------------------------------
// 1.Partial<Type>-用來構造(創建)一個類型,將Type的所有類型設置為可選
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
// 解釋:構造出來的新類型PartialProps結構和Props相同,但所有屬性都變為可選的

// -------------------------------------------------------------
//  2.Readonly<Type>-用來構造一個類型,將Type的所有屬性都設置為readonly(只讀)
// EX:
interface Props1 {
  id: string
  children: number[]
}
type ReadonlyProps = Readonly<Props1>
// 解釋:構造出來的新類型ReadonlyProps結構和Props相同,但所有屬性都變為只讀的
let readonlyProps: ReadonlyProps = {
  id: '1',
  children: [1]
}
// readonlyProps.id = '2'
// 當重新給id屬性賦值時,就會報錯:因為 'id' 為唯讀屬性，所以無法指派至 'id'

// -------------------------------------------------------------
//  3.Pick<Type,keys>-從Type中選擇一組屬性來構造新類型
// EX:
interface Props2 {
  id: string
  title: string
  children: number[]
}
type PickProps = Pick<Props2, 'id' | 'title'>
// 解釋:
//  1.Pick工具類型有兩個類型變量:1.表示選擇誰的屬性,2.表示選擇哪幾個屬性
//  2.其中第2個類型變量,如果只選擇一個則只傳入該屬性名即可
//  3.第二個類型變量傳入的屬性只能式第一個類型變量中存在的屬性
//  4.構造出來的新類型PickProps,只有id和title兩個屬性類型

// -------------------------------------------------------------
//  4.Record<keys,Type>-構造一個對象類型,屬性鍵為Keys,屬性類型為Type
// EX:
type RecordObj = Record<'a' | 'b' | 'c', string[]>
let obj3: RecordObj = {
  a: ['1'],
  b: ['2'],
  c: ['3']
}
// 解釋:
//  1.Record工具類型有兩個類型變量:1.表示對象有哪些屬性,2.表示對象屬性的類型
//  2.購鍵的新對象類型RecordObj表使:這個對象有三個屬性分別為a/b/c,屬性值的類型都是string[]


// --------------------------------------------------------------------------------------------------
// 4-5.索引簽名類型
// 絕大多數情況下,我們都可以在使用對象前就確定對象的結構,並為對象添加準確的類型
// 使用的場景:當無法確定對象中有那些屬性(或者說對象中可以出現任意多個屬性),此時就用到索引簽名類型
// EX:
interface AnyObject {
  [key: string]: number | string
}
let obj4: AnyObject = {
  a: 1,
  b: 2,
  c: 'a'
}
// 解釋:
//  1.使用[key:string]來約束該接口中允許出現的屬性名稱,表示只要式string類型的屬性名稱,都可以出現在對象中
//  2.這樣,對象obj4中就可以出現任意多個屬性(比如,a,b等)
//  3.key只是一個佔位符,可以換成任意合法的變量名稱
//  4.隱藏的前置知識:JS中對象({})的鍵式string類型的


// --------------------------------------------------------------------------------------------------
// 4-6.映射類型
// 基於舊類型創建新類型(對象類型),減少重複,提升開發效率
// 比如,類型PropKeys有x/y/z,另一個類型Type1中也有x/y/z並且類型相同
// EX:
type ProppKeys = 'x' | 'y' | 'z'
type Type1 = { x: number; y: number; z: number }
// 使用映射類型來進行簡化
type Type2 = { [Key in ProppKeys]: number }
// 解釋:
//  1.映射類型式基於索引簽名類型的,所以該語法類似於索引簽名類型,也使用了[]
//  2.Key in PropKeys表示Key可以是PropKeys聯合類型中的任意一個,類似於forin(let k in obj)
//  3.使用映射類型創建的新對象類型Type2和類型Type1結構完全相同
//  4.注意:映射類型只能在類型別名中使用,不能在接口中使用

// 映射類型除了根據聯合類型創建新類型外,還可以根據對象類型來創建:
type Props3 = { a: number; b: string; c: boolean }
type Type3 = { [key in keyof Props3]: number }
// 解釋:
//  1.先執行keyof Props3獲取到對象類型Props3中所有鍵的聯合類型即'a'|'b'|'c'
//  2.key in 就表示key可以是Props3中所有鍵名稱中的任意一個

// 索引查詢(訪問)類型
// 作用:用來查詢屬性的類型
type Props4 = { a: number; b: string; c: boolean }
type TypeA = Props4['a']
// 解釋:Props['a']表示查詢類型Props中屬性'a'對應的類型number,所以TypeA的類行為number
// 注意:[]中的屬性必須存在於被查詢類型中,否則會報錯

// 索引查詢類型的其他使用方式:同時查詢多個索引的類型
type Props5 = { a: number; b: string; c: boolean }
type TypeAB = Props5['a' | 'b']
// 解釋:使用字符串字面量的聯合類型,獲取屬性a和b對應的類型,結果為string|number
type TypeC = Props5[keyof Props5]
// 解釋:使用keyof操作符獲取Props5中所有鍵對應的類型,結果為string|number|boolean
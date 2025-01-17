/*
  5.TypeScript類型聲明文件
    概述:
      類型聲明文件:用來位已存在的JS庫提供類型聲明文件
      這樣在TS項目中使用這些庫時,就像用TS一樣就會有代碼提示,類型保護等機制
        1.TS的兩種文件類型
        2.類型聲明文件的使用說明

    
    5-1.TS中的兩種文件類型
      1.(.ts)文件:
        1.既包含類型信息有可以執行代碼
        2.可以被編譯成.js文件,然後執行代碼
        3.用途:編寫程序代碼

      2.(.d.ts)文件:
        1.只包含類型信息的類型聲明文件
        2.不會生成.js文件,警用於提供類型信息
        3.用途:為js提通類型信息
      
      總結:.ts是implementation(代碼實現文件);.d.ts是declaration(類型聲明文件)
      如果要為JS庫提供類型信息,要使用.d.ts文件
      
      
      5-2.類型聲明文件的使用說明
      使用已有的類型聲明文件:
      1.內置類型聲明文件
      2.第三方庫類型聲明文件
      
      1.內置聲明文件:TS為JS運行時可用的縮有標準化內置API都提供了聲明文件
        比如,在使用數組時,數組所有方法都會有對應的代碼提示以及類型信息
        (method)Array<number>.forEach(callbackfn: (value: number, index: number, array: number[]) => void, thisArg ?: any): void
        
        實際上這都是TS提供的內置聲明文件
        可以通過ctrl+鼠標左鍵來查看內置類型聲明文件內容
        比如,查看forEach方法的類型聲明,在VSCode中會自動跳轉到lib.es5.d.ts類型聲明文件中
        當然,像window,document等BOM,DOM API也都有相應的類型聲明(lib.dom.d.ts)
      
      2.第三方庫類型聲明文件:目前,幾乎所有常用的第三方庫都有相應的類型聲明文件
        第三方庫的類型聲明文件有兩種存在形式:
          1.庫自帶類型聲明文件
          2.由DefinitelyTyped提供

        1.庫自帶類型聲明文件,比如:Axios
          正常情況下導入該庫,TS就會自動加在庫自己的類型聲明文件,以提供該庫的類型聲明

        2.由DefinitelyTyped提供
          DefinitelyTyped是一個github倉庫,用來提供高質量TypeScript類型聲明
          可以通過npm/yarn來下載該倉庫提供的TS類型聲明包,這些包的名稱格是為:@types/*
          比如:@types/react,@types/lodash等
          說明:在實際項目開發時,如果你使用的第三方庫沒有自帶聲明文件,VSCode會給出明確的提示
          解釋:當安裝@types/*類型聲明包後,TS也會自動加載該類聲明包,以提供該庫的類型聲明

      
      創建自己的類型聲明文件:
        1.項目內共享類型
          如果多個.ts文件中都用到同一個類型,此時可以創鍵.d.ts文件提供該類型,時線類型共享
          操作步驟:
            1.創建index.d.ts類型聲明文件(名稱自取)
            2.創建需要共享的類型,並使用export導出(TS中的類型也可以使用import/export實現模塊化功能)
            3.在需要使用共享類型的.ts文件中,通過import導入即可(.d.ts後綴號導入時,直接省略)
            // EX:
            // 導出
            type Props = { x: number; y: number }
            export { Props }

            // 導入
            import { Props } from ./index

        2.為已有的JS文件提供類型聲明
          說明:TS項目中也可以使用.js文件,在導入.js文件時,TS會自動加載與.js同名的.d.ts文件,以提供類型聲明
          declare關鍵字:用於類型聲明,為其他地方(比如,.js文件)以存在的變量聲明類型,而不是創鍵一個新的變量
            1.對於type,interface等這些明確就是TS類型的(只能在TS中使用的),可以省略   declare關鍵字
            2.對於let,functio等具有雙重含義(在JS,TS中都能使用),應該使用declare關鍵字,明確指定此處用於類型聲明
*/
// JS
// let count = 10
// let songName = '痴心絕對'
// let position = {
//   x: 0,
//   y: 0
// }

// function add(x, y) {
//   return x + y
// }

// function changeDirection(direction) {
//   console.log(direction)
// }

// const fomarPoint = point => {
//   console.log('當前座標:', point)
// }

// export { count, songName, position, add, changeDirection, fomarPoint }

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
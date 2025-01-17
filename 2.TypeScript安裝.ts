/*
  2-1.TypeScript安裝TS工具包
    Node.js/瀏覽器，只認識JS代碼，不認識TS，需要先將TS轉化成JS然後才能運行
    安裝命令:npm install -g typescript
    typescript包:用來編譯TS代碼的包，提供tsc命令，實現TS->JS轉化
    驗證是否安裝成功:tsc -v(查看typescript的版本)

  2-2.編譯並運行TS代碼
    2-2-1.創建.ts文件
    2-2-2.將TS編譯文JS:在終端機輸入命令，tsc hello.ts(此時，在同級目錄中會出現一個同名的JS文件)
    2-2-3.執行JS代碼:在終端中輸入命令，node hello.js
    說明:所有合法的JS代碼都是TS代碼，有JS基礎只需要學習TS類型即可
    注意:由TS編譯生成的JS文件，代碼中就沒有類型信息了

  2-3.簡化運行TS步驟
    簡化方式:使用ts-node包,直接在hode.js中執行TS代碼
    安裝命令:npm i -g ts-node(版本過高會無法執行-npm i -g ts-node@8.5.4)
    使用方式:ts-node hello.ts
    解釋:ts-node命令會在內部將TS->JS,然後在運行JS代碼
*/

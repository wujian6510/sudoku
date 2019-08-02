const Toolkit = require('../core/toolkit');
const Generators = require('../core/generator');
const Checker = require('../core/checker');
const Sudoko = require('../core/suduko');

class Grid{
    constructor(container){
       this._$container = container;
    }

    build(){
       // const matrix =Toolkit.matrix.makeMatrix();   
       const sudoko = new Sudoko();
       sudoko.make();
       const matrix =sudoko.puzzleMatrix;

       const rowGroupClasses = ["row-g-top","row-g-middle","row-g-bottom"];
       const colGroupClasses = ["col-g-left","col-g-middle","col-g-right"];
       const $cells = matrix.map(rowValues => rowValues.map((cellValue,colIndex)=>{
           return $("<span>")
                   .addClass(colGroupClasses[colIndex % 3])
                   .addClass(cellValue ?  "fixed" : "empty")
                   .text(cellValue);
       }));

       const $divArray = $cells.map(($spanArray,rowIndex) => {
           return $("<div>")
               .addClass("row")
               .addClass(rowGroupClasses[rowIndex % 3])
               .append($spanArray);
       });

       this._$container.append($divArray);
    }

    layout(){
       const width = $("span:first",this._$container).width();
       $("span").height(width).css({
           'line-height':`${width}px`,
           'font-size': width < 32 ? `${width /2}px`: ""
       });
    }

    bindPopup(popupNumbers){
        this._$container.on("click","span",e=>{
            const $cell = $(e.target);
            if($cell.is(".fixed")){
                return;
            }
            popupNumbers.pupup($cell);
        });
    }

    check(){

        //取页面上的数据
        const $rows = this._$container.children();
        const data = $rows.map((rowIndex,div) => {
            return $(div).children().map((colIndex,span) => {
                return parseInt($(span).text() || 0);
            });
        })
        .toArray()
        .map($data => $data.toArray());

        const $row = this._$container.children(data);
        const checker = new Checker(data);
        if(checker.check()){
            return true;
        }

        //检查不成功，进行标记
        const marks = checker.matrixMarks;
        this._$container.children().each((rowIndex,div) => {
            $(div).children().each((colIndex,span) => {
                const $span = $(span);
                if($span.hasClass("fixed") || marks[rowIndex][colIndex]){
                    $(span).removeClass("error");
                }else{
                    $(span).addClass("error");
                }
            });
        });


    }

    /**
     * 重建游戏到初始化状态
     */
    reset(){
        this._$container.find("span:not(.fixed)")
            .removeClass("error mark1 mark2")
            .addClass("empty")
            .text(0);
    }

    /**
     * 清除错误标记
     */
    clear(){
        this._$container.find("span.error")
            .removeClass("error");
        this._$container.find("span.mark1")
            .removeClass("mark1");
            this._$container.find("span.mark2")
            .removeClass("mark2");
    }

    rebuild(){
        this._$container.empty();
        this.build();
        this.layout();
    }
}

module.exports = Grid;
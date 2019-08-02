//检查数独的方法

function checkArray(arr){
    const length = arr.length;
    const marks = new Array(length);
    marks.fill(true);
    for(let i=0;i<length-1;i++){
        const v = arr[i];
        if(!marks[i]){
            continue;
        }
        // 0 无效
        if(!v){
            marks[i] = false;
            continue;
        }
        // 重复的无效
        for(let j=i+1;j<length;j++){
            if(v === arr[j]){
                marks[i] = marks[j] = false;
            }
        }
    }
    return marks;
}

const Toolkit = require('./toolkit');
/**
 * 检查数独
 */
class Checker {
    constructor(matrix){
        this._matrix = matrix;
        this._matrixMarks = Toolkit.matrix.makeMatrix(true);
    }

    get matrixMarks() {
        return this._matrixMarks;
    }

    get isSuccess(){
        return this._success;
    }
    check(){
        this.checkRows();
        this.checkCols();
        this.checkBoxs();

        //
        this._success = this._matrixMarks.every(row => row.every(mark => mark));
        return this._success;
    }

    checkRows(){
        for(let rowIndex=0;rowIndex<9;rowIndex++){
            const row = this._matrix[rowIndex];
            const marks = checkArray(row);

            for(let colIndex=0;colIndex<marks.length;colIndex++){
                if(!marks[colIndex]){
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }

    checkCols(){
        for(let colIndex=0;colIndex<9;colIndex++){
            const col = [];
            for(let rowIndex=0;rowIndex<9;rowIndex++){
                col[rowIndex] = this._matrix[rowIndex][colIndex];
            }

            const marks = checkArray(col);
            for(let rowIndex=0;rowIndex<marks.length;rowIndex++){
                if(!marks[rowIndex]){
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }

    checkBoxs(){
        for(let boxIndex=0;boxIndex<9;boxIndex++){
            const box = Toolkit.box.getBoxCells(this._matrix,boxIndex);

            const marks = checkArray(box);
            for(let cellIndex=0;cellIndex<marks.length;cellIndex++){
                if(!marks[cellIndex]){
                    const {rowIndex,colIndex} = Toolkit.box.converFromBoxIndex(boxIndex,cellIndex);
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }
}

module.exports = Checker;
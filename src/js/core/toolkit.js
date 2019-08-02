/**
 * 矩阵和数组相关工具
 */
const matrixToolkit = {
     makeRow(v = 0){
        const array =  new Array(9);
        array.fill(v);
        return array;
    },
    
    makeMatrix(v= 0){
        return Array.from({length:9},() => this.makeRow(v));
    },
    
    /**
     * Fisher-Yetes算法
     */
    shuffle(array){
        const endIndex = array.length -2;
        for(let i=0;i<=endIndex;i++){
            const j = i + Math.floor(Math.random() * (array.length -i));
            [array[i],array[j]] = [array[j],array[i]];
        }
        return array;
    },

    /**
     * 检查指位置是否可以填
     */
    checkFillable(matrix,n,rowIndex,colIndex){
        const row = matrix[rowIndex];
        const column =  this.makeRow().map((v,i) => matrix[i][colIndex]);
        const { boxIndex } = boxToolkit.converToBoxIndex(rowIndex,colIndex);
        const box = boxToolkit.getBoxCells(matrix,boxIndex);

        for(let i=0;i<9;i++){
            if(row[i] === n || column[i] === n || box[i] === n){
                return false;
            }
        }
        return true;
    }
}

/**
 * 宫坐标系工具
 */

 const boxToolkit ={

    /**
     * 根据矩阵的横纵坐标取宫的坐标
     */
    converToBoxIndex(rowIndex,colIndex){
        return{ 
            boxIndex: Math.floor(rowIndex/3) * 3 + Math.floor(colIndex/3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3,
        }
    },

    converFromBoxIndex(boxIndex,cellIndex){
        return{
            rowIndex: Math.floor(boxIndex/3) * 3 + Math.floor(cellIndex/3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3,
        }
    },
    getBoxCells(matrix,boxIndex){
        const startRowIndex = Math.floor(boxIndex / 3) * 3;
        const startCollIndex = boxIndex % 3 * 3;
        const result = [];
        for(let i = 0;i < 9;i ++){
            const rowIndex = startRowIndex  + Math.floor(i/3);
            const cellIndex = startCollIndex + i % 3; 
            result.push(matrix[rowIndex][cellIndex]);
        }
        return result;
     }
 }

module.exports = class Toolkit{
    static get matrix(){
        return matrixToolkit;
    }

    static get box(){
        return boxToolkit;
    }
};
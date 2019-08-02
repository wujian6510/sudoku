const Toolkit = require("./toolkit");

class Generators{

    generate(){
        while(!this.internalgenerate()){
            console.log('try again...');
        }
        return this.matrix;
    }
    internalgenerate(){
        this.matrix = Toolkit.matrix.makeMatrix();
        this.orders = Toolkit.matrix.makeMatrix()
            .map(row => row.map((v,i) => i))
            .map(row => Toolkit.matrix.shuffle(row));

        for(let n=1;n<=9; n++){
            if(!this.fillNumber(n)){
                return false;
            }
        }

        return true;
    }

    /**
     * 给矩阵每行都填充一个数字n
     */
    fillNumber(n){
        return this.fillRow(n,0);
    }

    /**
     * 递归的给每行填充一个数字 n
     */
    fillRow(n,rowIndex){
        if(rowIndex > 8){
            return true;
        }
        const row = this.matrix[rowIndex];
        //随机选个列
        const orders = this.orders[rowIndex]


        for(let i=0;i<9;i++){   
            const colIndex = orders[i];

            //如果这个位置有数字 跳过
            if(row[colIndex]){
                continue
            }
            //检查这个位置是否可以填入
            if(!Toolkit.matrix.checkFillable(this.matrix,n,rowIndex,colIndex)){
                continue
            }
            row[colIndex] = n;
            if(!this.fillRow(n,rowIndex + 1)){
                row[colIndex] = 0;
                continue;
            }

            return true;
        }

        return false;

    }
}

module.exports = Generators;
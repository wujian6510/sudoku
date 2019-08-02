//生成数独游戏


//1.生成完整的解决方案

//2.随机去除部分：按比例

const Generator = require('./generator');

module.exports = class Soduko{
    constructor(){
        const generator = new Generator();
        generator.generate();
        //完整的数独
        this.solutionMatrix = generator.matrix;
    }
    /**
     * 
     * @param {*} level 游戏难度级别 
     */
    make(level = 6){
        //const shoud
        this.puzzleMatrix = this.solutionMatrix.map(row => {
            return row.map(cell =>{
                return Math.random() * 9 < level ? 0 : cell;
            });
        });
    }
}
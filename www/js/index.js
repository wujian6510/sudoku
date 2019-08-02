!function(e){var n={};function r(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=n,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)r.d(t,a,function(n){return e[n]}.bind(null,a));return t},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="",r(r.s=2)}([function(e,n,r){"use strict";var t=function(){function e(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(n,r,t){return r&&e(n.prototype,r),t&&e(n,t),n}}();var a={makeRow:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=new Array(9);return n.fill(e),n},makeMatrix:function(){var e=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return Array.from({length:9},function(){return e.makeRow(n)})},shuffle:function(e){for(var n=e.length-2,r=0;r<=n;r++){var t=r+Math.floor(Math.random()*(e.length-r)),a=[e[t],e[r]];e[r]=a[0],e[t]=a[1]}return e},checkFillable:function(e,n,r,t){for(var a=e[r],o=this.makeRow().map(function(n,r){return e[r][t]}),u=i.converToBoxIndex(r,t).boxIndex,c=i.getBoxCells(e,u),s=0;s<9;s++)if(a[s]===n||o[s]===n||c[s]===n)return!1;return!0}},i={converToBoxIndex:function(e,n){return{boxIndex:3*Math.floor(e/3)+Math.floor(n/3),cellIndex:e%3*3+n%3}},converFromBoxIndex:function(e,n){return{rowIndex:3*Math.floor(e/3)+Math.floor(n/3),colIndex:e%3*3+n%3}},getBoxCells:function(e,n){for(var r=3*Math.floor(n/3),t=n%3*3,a=[],i=0;i<9;i++){var o=r+Math.floor(i/3),u=t+i%3;a.push(e[o][u])}return a}};e.exports=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e)}return t(e,null,[{key:"matrix",get:function(){return a}},{key:"box",get:function(){return i}}]),e}()},function(e,n,r){"use strict";var t=function(){function e(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(n,r,t){return r&&e(n.prototype,r),t&&e(n,t),n}}();var a=r(0),i=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e)}return t(e,[{key:"generate",value:function(){for(;!this.internalgenerate();)console.log("try again...");return this.matrix}},{key:"internalgenerate",value:function(){this.matrix=a.matrix.makeMatrix(),this.orders=a.matrix.makeMatrix().map(function(e){return e.map(function(e,n){return n})}).map(function(e){return a.matrix.shuffle(e)});for(var e=1;e<=9;e++)if(!this.fillNumber(e))return!1;return!0}},{key:"fillNumber",value:function(e){return this.fillRow(e,0)}},{key:"fillRow",value:function(e,n){if(n>8)return!0;for(var r=this.matrix[n],t=this.orders[n],i=0;i<9;i++){var o=t[i];if(!r[o]&&a.matrix.checkFillable(this.matrix,e,n,o)){if(r[o]=e,this.fillRow(e,n+1))return!0;r[o]=0}}return!1}}]),e}();e.exports=i},function(e,n,r){"use strict";r(0);var t=r(3),a=r(6),i=new t($("#container"));i.build(),i.layout();var o=new a($("#popupNumbers"));i.bindPopup(o),$("#check").on("click",function(e){i.check()&&alert("您真棒！")}),$("#reset").on("click",function(e){i.reset()}),$("#clear").on("click",function(e){i.clear()}),$("#rebuild").on("click",function(e){i.rebuild()})},function(e,n,r){"use strict";var t=function(){function e(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(n,r,t){return r&&e(n.prototype,r),t&&e(n,t),n}}();r(0),r(1);var a=r(4),i=r(5),o=function(){function e(n){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this._$container=n}return t(e,[{key:"build",value:function(){var e=new i;e.make();var n=e.puzzleMatrix,r=["row-g-top","row-g-middle","row-g-bottom"],t=["col-g-left","col-g-middle","col-g-right"],a=n.map(function(e){return e.map(function(e,n){return $("<span>").addClass(t[n%3]).addClass(e?"fixed":"empty").text(e)})}).map(function(e,n){return $("<div>").addClass("row").addClass(r[n%3]).append(e)});this._$container.append(a)}},{key:"layout",value:function(){var e=$("span:first",this._$container).width();$("span").height(e).css({"line-height":e+"px","font-size":e<32?e/2+"px":""})}},{key:"bindPopup",value:function(e){this._$container.on("click","span",function(n){var r=$(n.target);r.is(".fixed")||e.pupup(r)})}},{key:"check",value:function(){var e=this._$container.children().map(function(e,n){return $(n).children().map(function(e,n){return parseInt($(n).text()||0)})}).toArray().map(function(e){return e.toArray()}),n=(this._$container.children(e),new a(e));if(n.check())return!0;var r=n.matrixMarks;this._$container.children().each(function(e,n){$(n).children().each(function(n,t){$(t).hasClass("fixed")||r[e][n]?$(t).removeClass("error"):$(t).addClass("error")})})}},{key:"reset",value:function(){this._$container.find("span:not(.fixed)").removeClass("error mark1 mark2").addClass("empty").text(0)}},{key:"clear",value:function(){this._$container.find("span.error").removeClass("error"),this._$container.find("span.mark1").removeClass("mark1"),this._$container.find("span.mark2").removeClass("mark2")}},{key:"rebuild",value:function(){this._$container.empty(),this.build(),this.layout()}}]),e}();e.exports=o},function(e,n,r){"use strict";var t=function(){function e(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(n,r,t){return r&&e(n.prototype,r),t&&e(n,t),n}}();function a(e){var n=e.length,r=new Array(n);r.fill(!0);for(var t=0;t<n-1;t++){var a=e[t];if(r[t])if(a)for(var i=t+1;i<n;i++)a===e[i]&&(r[t]=r[i]=!1);else r[t]=!1}return r}var i=r(0),o=function(){function e(n){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this._matrix=n,this._matrixMarks=i.matrix.makeMatrix(!0)}return t(e,[{key:"check",value:function(){return this.checkRows(),this.checkCols(),this.checkBoxs(),this._success=this._matrixMarks.every(function(e){return e.every(function(e){return e})}),this._success}},{key:"checkRows",value:function(){for(var e=0;e<9;e++)for(var n=a(this._matrix[e]),r=0;r<n.length;r++)n[r]||(this._matrixMarks[e][r]=!1)}},{key:"checkCols",value:function(){for(var e=0;e<9;e++){for(var n=[],r=0;r<9;r++)n[r]=this._matrix[r][e];for(var t=a(n),i=0;i<t.length;i++)t[i]||(this._matrixMarks[i][e]=!1)}}},{key:"checkBoxs",value:function(){for(var e=0;e<9;e++)for(var n=a(i.box.getBoxCells(this._matrix,e)),r=0;r<n.length;r++)if(!n[r]){var t=i.box.converFromBoxIndex(e,r),o=t.rowIndex,u=t.colIndex;this._matrixMarks[o][u]=!1}}},{key:"matrixMarks",get:function(){return this._matrixMarks}},{key:"isSuccess",get:function(){return this._success}}]),e}();e.exports=o},function(e,n,r){"use strict";var t=function(){function e(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(n,r,t){return r&&e(n.prototype,r),t&&e(n,t),n}}();var a=r(1);e.exports=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e);var n=new a;n.generate(),this.solutionMatrix=n.matrix}return t(e,[{key:"make",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:6;this.puzzleMatrix=this.solutionMatrix.map(function(n){return n.map(function(n){return 9*Math.random()<e?0:n})})}}]),e}()},function(e,n,r){"use strict";var t=function(){function e(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(n,r,t){return r&&e(n.prototype,r),t&&e(n,t),n}}();e.exports=function(){function e(n){var r=this;!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this._$span=n.hide().removeClass("hidden"),this._$span.on("click","span",function(e){var n=r._$targetCell,t=$(e.target);t.hasClass("mark1")?n.hasClass("mark1")?n.removeClass("mark1"):n.removeClass("mark2").addClass("mark1"):t.hasClass("mark2")?n.hasClass("mark2")?n.removeClass("mark2"):n.removeClass("mark1").addClass("mark2"):t.hasClass("empty")?n.text(0).addClass("empty"):n.removeClass("empty").text(t.text()),r.hide()})}return t(e,[{key:"pupup",value:function(e){this._$targetCell=e;var n=e.position(),r=n.left,t=n.top;this._$span.css({left:r+"px",top:t+"px"}).show()}},{key:"hide",value:function(){this._$span.hide()}}]),e}()}]);
//# sourceMappingURL=index.js.map
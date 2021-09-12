<template>
    <div id="calculator">
        <!-- 简易计算器主体 -->
        <div class="calculator" ref="calculator-simple">
            <div class="navigationBar">
                <!-- 右上角 -->
                <!-- 窗口功能区 -->
                <button class="quit" @click="quit()">×</button>
                <button class="minimize" @click="minimize()">‒</button>
                <button class="pin" ref="pin" @click="pinOnTop()">📌</button>

                <!-- mode切换 -->

                <button class="help" @click="alertError('develop')">©</button>
                <button class="simple" @click="changeMode($event.target, 0)">❖</button>
                <button class="math" @click="changeMode($event.target, 1)">𝝿</button>
                <button
                    class="science"
                    @click="alertError('develop')/*changeMode($event.target, 2)*/"
                >Ω</button>
                <button class="finance" @click="changeMode($event.target, 3)">$</button>
                <button class="terminal" @click="changeMode($event.target, 4)">☐</button>
            </div>
            <!-- 结果显示栏 -->
            <div class="result" style="grid-area: result">
                <div class="display iconfont">{{ equation }}</div>
            </div>
            <!-- 功能按键 -->
            <button style="grid-area: ac" @click="clear">AC</button>
            <button style="grid-area: plus-minus" @click="calculateToggle">±</button>
            <button style="grid-area: percent" @click="calculatePercentage">%</button>
            <button ref="+" style="grid-area: add" @click="append('+')">+</button>
            <button ref="-" style="grid-area: subtract" @click="append('-')">-</button>
            <button ref="÷" style="grid-area: divide" @click="append('÷')">÷</button>
            <button ref="×" style="grid-area: multiply" @click="append('×')">×</button>
            <button ref="=" style="grid-area: equal" @click="calculate">=</button>
            <!-- 数字按键 -->
            <button ref="1" style="grid-area: number-1" @click="append(1)">1</button>
            <button ref="2" style="grid-area: number-2" @click="append(2)">2</button>
            <button ref="3" style="grid-area: number-3" @click="append(3)">3</button>
            <button ref="4" style="grid-area: number-4" @click="append(4)">4</button>
            <button ref="5" style="grid-area: number-5" @click="append(5)">5</button>
            <button ref="6" style="grid-area: number-6" @click="append(6)">6</button>
            <button ref="7" style="grid-area: number-7" @click="append(7)">7</button>
            <button ref="8" style="grid-area: number-8" @click="append(8)">8</button>
            <button ref="9" style="grid-area: number-9" @click="append(9)">9</button>
            <button ref="0" style="grid-area: number-0" @click="append(0)">0</button>

            <!-- 小数点 -->
            <button ref="." style="grid-area: dot" @click="append('.')">.</button>
        </div>
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>
</template>
<script>
import { addKeyActiveEvent, setTheWindowSize } from '@/utils/windowEvent.js'
import { calculate, priority } from '@/utils/calculate.js'

export default {
    data () {
        return {
            // 模式切换
            mode: 0,// 0 普通 1 数学 2物理 3货币 4终端
            currentActive: "",
            overflow: "hidden",// 样式 hidden or visible
            paddingLeft: '0px',
            changed: 0,
            // 计算逻辑
            equation: "0",
            isOperatorAdded: false,
            isPointAdded: false,
            lastCharcter: ''
        }
    },
    provide () {
        return {
            // 给math的
            'delete': this.delete,
            'pushMath': this.pushMath
        }
    },

    methods: {
        //#region 计算方法begin
        // Check if the character is + / - / × / ÷
        isOperator (character) {
            return priority(character) != 0;
        },
        // When pressed Operators or Numbers
        append (character) {
            this.addActiveClass(this.$refs[character]);
            // Start
            if (this.equation === "0" && !this.isOperator(character)) {
                if (character === '.') {
                    this.equation += '' + character;
                } else {//if Number
                    if (character === '0')
                        this.equation = " 0";
                    else {
                        this.equation = '' + character;
                    }
                }
                this.lastCharcter = character;
                return;
            }

            // If Number or "."
            if (!this.isOperator(character)) {
                if (character === '.') {
                    if (this.isPointAdded)//如果添加过
                        return;
                    if (this.isOperator(this.lastCharcter) || this.lastCharcter === '.')
                        return;
                    this.equation += '.';
                    this.isPointAdded = true;

                }
                else { //if Number
                    this.equation += "" + character;
                }
                this.lastCharcter = character;
                return;
            }

            // If Operator
            if (this.isOperator(character)) {
                if (this.isOperator(this.lastCharcter) || this.lastCharcter === '.')
                    return;
                else {
                    this.isOperatorAdded = true;
                    this.equation += '' + character;
                }
                this.lastCharcter = character;
                return;
            }
        },
        // When pressed '='
        calculate () {
            this.addActiveClass(this.$refs["="]);
            if (this.isOperator(this.lastCharcter))
                return;
            // 利用正则替换×，÷ ，π
            let result = this.equation
                .replace(/×/g, "*")
                .replace(/÷/g, "/");
            console.log("the equation is:", result);
            let ans = calculate(result, this.changed);
            this.equation = String(ans);
            this.isOperatorAdded = false;
            this.isPointAdded = false;
            this.lastCharcter = '';
        },
        // When pressed '+/-'
        calculateToggle () {
            if (this.isOperatorAdded) {
                return;
            }
            if (this.equation === "0")
                return;
            this.equation = (eval(this.equation + "* -1")).toString();
        },
        // When pressed '%'
        calculatePercentage () {
            if (this.isOperatorAdded) {
                this.equation += "×0.01"
                return;
            }
            this.equation = eval(this.equation + "*0.01");
        },
        // When pressed 'AC'
        clear () {
            this.equation = "0";
            this.isPointAdded = false;
            this.isOperatorAdded = false;
            this.lastCharcter = '';
        },
        //When pressed 'backspace'
        delete () {
            if (this.equation.trim().length == 1) {
                this.clear();
                return;
            }
            if (/[Ee]rror/.test(this.equation)) {
                this.clear();
                return;
            }
            let deleted = this.equation[this.equation.length - 1];
            this.equation = this.equation.slice(0, this.equation.length - 1);
            this.lastCharcter = this.equation[this.equation.length - 1];
            if (deleted === '.')
                this.isPointAdded = false;
        },
        //#endregion 计算区域方法end
        // #region -------------------------- MathMethod-------------------------
        pushMath (operator) {
            if (this.isOperator(operator)) {
                this.append(operator);
                return;
            }
            if (this.equation === "0") {
                this.equation = ""
            }
            // if (operator == '(' || operator == ')')
            //     this.equation += '' + operator;
            this.equation += '' + operator;


        },
        //#endregion --------------------------  --------------------------
        // add className active
        addActiveClass (element, permanent) {
            if (element == undefined) return;
            let primary = element.className;
            if (!primary.includes("active"))
                element.className = primary + " active";
            if (permanent === undefined)
                setTimeout(() => {
                    //这里面用定时器，尽量用箭头函数
                    // console.log(this);
                    element.className = primary;
                }, 50);
        },
        //When clicked '📌'
        pinOnTop () {
            window.Electron.changeAlwaysOnTop();

            let element = this.$refs["pin"];
            if (element.className.includes("active"))
                element.className = "pin";
            else
                element.className = "pin active"
        },
        // ‒ When clicked ‘‒’ 
        minimize () {
            window.Electron.minimize();
        },
        // When pressed 'Escape' or clicked '❌'
        quit () {
            // window.Electron.closeALL();
            window.close();
        },

        // Set the window size
        setTheWindowSize (size) {

            setTheWindowSize(size);
        },
        // developer Error
        alertError (errorMsg) {
            if (errorMsg === "develop")//develop error
                window.alert(`Thanks for your support.
                This function has not been developed yet.
                But you can commit to this project on the Github or add the developer\`s QQ1730214056.
                Look forward to your contributions.
                ©️copyright.
                `)
        },
        changeMode (element, modeNum) {
            const primary = this.$refs["calculator-simple"].className;
            const changeStyle = () => {
                if (primary.includes("mode1"))
                    this.$refs["calculator-simple"].className = primary.replace(" mode1", "");
                else
                    this.$refs["calculator-simple"].className += " mode1";
            }
            // Set the window size
            const incresedWin = 250;
            if (modeNum == this.mode)
                return;
            //从 默认模式 修改
            if (this.mode === 0) {
                this.changed++;
                changeStyle();
                this.setTheWindowSize(incresedWin);
                this.overflow = "visible";
            }
            //即将更改为 默认模式
            if (modeNum === 0) {
                changeStyle();
                this.overflow = "hidden";
                setTimeout(() => {
                    this.setTheWindowSize(-incresedWin);
                }, 500);
            }
            // active样式
            if (this.currentActive.className != undefined)
                this.currentActive.className = this.currentActive.className.replace(" active", "");
            this.currentActive = element;
            this.mode = modeNum;
            this.$router.push({ name: element.className })
            element.className = element.className + " active";
        }
    },
    mounted () {
        addKeyActiveEvent.call(this);//绑定键盘事件

    },
}
</script>


<style lang="scss" scoped>
@import "~@/assets/scss/extraFont.scss";
//大主体
#calculator {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
    width: 100vw;
    -webkit-app-region: drag;
}

.calculator {
    position: relative;
    // z-index: 1;
    .navigationBar {
        width: 100%;

        //定位
        position: absolute;
        top: 0;
        //flex布局;
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-start;
        // 边框 内外边距
        padding: 4px;
        padding-top: 0;
        box-sizing: border-box;
        > button {
            background-color: #eee;
            width: 15px;
            height: 15px;
            // 文字
            color: grey;
            font-size: 13px;
            text-align: center;
            line-height: 15px;
            transition: all 0.5s;
            // 指针
            cursor: pointer;
        }
        //#region mode模式切换区

        .terminal {
            font-weight: 900;
            &:hover,
            &.active {
                color: rgb(87, 0, 65);
                background-color: rgb(158, 0, 150);
            }
        }
        .finance {
            &:hover,
            &.active {
                color: rgb(0, 102, 0);
                background-color: rgb(0, 255, 85);
            }
        }
        .science {
            &:hover,
            &.active {
                color: rgb(140, 95, 0);
                background-color: rgb(255, 189, 64);
            }
        }
        .math {
            &:hover,
            &.active {
                color: rgb(33, 0, 151);
                background-color: rgb(0, 121, 191);
            }
        }
        .simple {
            &:hover,
            &.active {
                color: rgb(0, 0, 0);
                background-color: rgb(163, 163, 163);
            }
        }
        //#endregion
        //#region 窗口右上角
        .help {
            &:hover,
            &.active {
                color: rgb(0, 0, 0);
                // background-color: rgb(56, 56, 56);
            }
        }
        .pin {
            margin-left: 20px;
            font-size: 9px;
            &:hover {
                font-size: 12px;
                background-color: rgb(255, 36, 36);
            }
            &.active {
                font-size: 13px;
                background-color: rgb(255, 36, 36);
            }
        }
        .minimize {
            font-size: 20px;
            &:hover,
            &.active {
                color: rgb(182, 114, 29);
                background-color: rgb(255, 189, 64);
            }
        }
        .quit {
            &:hover,
            &.active {
                color: rgb(129, 10, 12);
                background-color: rgb(255, 95, 89);
            }
        }
        //#endregion
    }
}

// 简易计算器主体
.calculator {
    --button-width: 60px;
    --button-height: 50px;

    //grid布局
    display: grid;
    grid-template-areas:
        "result result result result"
        "ac plus-minus percent divide"
        "number-7 number-8 number-9 multiply"
        "number-4 number-5 number-6 subtract"
        "number-1 number-2 number-3 add"
        "number-0 number-0 dot equal";
    //grid布局，共4列 ，6行
    grid-template-columns: repeat(4, var(--button-width));
    grid-template-rows: repeat(6, var(--button-height));

    // 玻璃风格
    padding: 20px;
    background: rgba($color: #eee, $alpha: 0.9);
    border-radius: 20px;
    &.mode1 {
        padding-left: 0px;
        border-radius: 0px 20px 20px 0px;
    }

    // 所有按钮 拟态效果
    button {
        user-select: none;
        margin: 4px;
        padding: 0;
        border: 0;
        display: block;
        outline: none;
        border-radius: calc(var(--button-height) / 2);
        font-size: 24px;
        font-family: Helvetica;
        font-weight: normal;
        color: rgb(125, 125, 125);
        background: linear-gradient(
            135deg,
            rgba(230, 230, 230, 0.7) 0%,
            rgba(246, 246, 246, 0.4) 100%
        );
        box-shadow: -4px -4px 10px -8px rgba(255, 255, 255, 1),
            4px 4px 10px -8px rgba(0, 0, 0, 0.5);

        &.active,
        &:active {
            box-shadow: -4px -4px 15px -8px rgba(255, 255, 255, 1) inset,
                4px 4px 10px -8px rgba(0, 0, 0, 0.5) inset;
        }
    }
    & > button {
        &:nth-of-type(-n + 8) {
            background-color: rgba(255, 229, 182, 0.4);
        }
        &:nth-of-type(-n + 3) {
            background-color: rgba(199, 199, 199, 0.7);
        }
    }
}
//输入框
.result {
    // 结构样式
    padding-right: 20px;
    //文本样式
    white-space: nowrap;
    overflow: v-bind(overflow);
    text-align: right;
    line-height: var(--button-height);
    font-size: 30px;
    font-family: Helvetica;

    color: rgb(57, 57, 57);
    z-index: 1;
    .display {
        position: relative;
        float: right;
    }
}
</style>
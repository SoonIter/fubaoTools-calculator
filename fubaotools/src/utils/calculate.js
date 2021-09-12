const math = require('mathjs')
var mode = 0;
/**
 * @class 栈类
 */
class Stack extends Array {
    constructor() {
        super();
    }
    top() {
        return this[this.length - 1]
    }
    isEmpty() {
        return this.length === 0
    }
    size() {
        return this.length
    }
    clear() {
        this.length = 0
    }
    print() {
        console.log(this.toString())
    }
}

/**
 * @function判断opearation优先级,代替map
 * @param {string} operator 
 * @return {number} priority 
 * @description 如果是运算符返回优先级，如果不是返回0
 */
export function priority(operator) {
    let priority = 0; //优先级 
    switch (operator) {
        case '^': //乘方
            // case '√': //开方
            priority = 6;
            break;
        case '×':
        case '*':
        case '÷':
        case '/':
            priority = 5;
            break;
        case '+':
        case '-':
            priority = 4;
            break;
    }
    return priority;
}
const f = priority; //起别名
/**
 *  计算二元方程式
 * @param {string} op 
 * @param {number} Num1 
 * @param {number} Num2 
 * @returns 
 */
function binaryCalc(op, Num1, Num2) {
    switch (op) {
        case '+':
            return Num1 + Num2;
        case '-':
            return Num1 - Num2;
        case '*':
        case '×':
            return Num1 * Num2;
        case '/':
        case '÷':
            return Num1 / Num2;
        case '^':
            return Num1 ** Num2;
    }
}

function pretreatment(equation) {
    //预处理 空格 × ÷
    equation = equation.replaceAll(' ', '').replaceAll('×', '*').replaceAll('÷', '/'); //去掉空格
    //预处理 ⅟
    equation = equation.replaceAll("⅟", "1/");
    //预处理 ²
    equation = equation.replace(/([0-9]+\.?[0-9]*)²/g, "$1^2")
    //预处理根号.  ^√     ³√    √
    equation = equation.replace(/([0-9]+\.[0-9]*)\^√([0-9]+\.?[0-9]*)/g, "($1^(1/($2)))")
        .replace(/³√([0-9]+\.?[0-9]*)/g, `($1^(1/3))`)
        .replace(/√([0-9]+\.?[0-9]*)/g, `($1^(1/2))`);
    //预处理㏑㏒
    equation = equation.replace(/㏑\((.+?)\)/g, "log($1)")
        .replace(/㏒\((.+?)\)/g, "log10($1)")
    // 预处理sin cos tan
    equation = equation.replace(/sin\((.+?)\)/g, "sin($1)")
    equation = equation.replace(/\((.+?)\)/g, "cos($1)")
    equation = equation.replace(/\((.+?)\)/g, "tan($1)")
    //预处理阶乘 !
    equation = equation.replace(/\d+\!/g, (word) => {
        return math.evaluate(word);
    })
    //预处理 π
    equation = equation.replace(/π/g, math.pi);
    //预处理°
    equation = equation.replace(/°/g, "deg");

    console.log("预处理后的结果为", equation);
    //下面尝试一次计算
    try {
        equation = math.evaluate(equation);
        return equation;
    } catch (err) {
        console.error(' Error:第一次计算错误 ', err);
        // //预处理e
        equation = equation.replace(/e/g, math.e.toFixed(8));
        equation = equation.replace(/π/g, math.pi.toFixed(8));


        //再尝试计算一次
        try {
            equation = math.evaluate(equation);
            equation = Number(equation).toFixed(8);
            return equation;
        } catch (e) {
            console.error(' Error: 第二次计算错误', e)
        }

    }

}
/**
 * @function  计算方程式
 * @description  中缀转后缀
 * @param {string} equation 进入一个Infix方程字符串
 * @return {string[]} postfix
 */
function calculate_helper_inToPost(equation) {
    // 创建一个栈
    let stack = new Stack()

    // 表示缓存数据区
    let list = new Array()

    function getList(str) {
        let tempStr = '';
        for (let i = 0; i < str.length; i++) {
            // 只要是数字直接缓存区
            if (str[i] >= '0' && str[i] <= '9' || str[i] === '.') {
                tempStr += '' + str[i];
                if (f(str[i + 1]) != 0 || str[i + 1] === '(' || str[i + 1] === ')' || i == str.length - 1) {
                    list.push(Number(tempStr))
                    tempStr = '';
                }
            }
            //
            else if (f(str[i]) != 0) {
                let ESlintSB = true
                while (ESlintSB) {
                    if (stack.isEmpty() || stack.top() == '(') {
                        stack.push(str[i])
                        break
                    } else if (f(str[i]) > f(stack.top())) { //当前运算符优先级大于s1栈顶运算符优先级 
                        stack.push(str[i]);
                        break;
                    } else { //小于等于 
                        let cc = stack.top();
                        stack.pop();
                        list.push(cc);
                    }
                }
            } else {
                if (str[i] == '(') {
                    stack.push(str[i]);
                } else {
                    while (stack.top() != '(') {
                        let ccc = stack.top();
                        stack.pop();
                        list.push(ccc);
                    }
                    stack.pop();
                }
            }
        }

        // 将剩下的全部追加在后面
        while (!stack.isEmpty()) {
            let cccc = stack.top();
            list.push(cccc);
            stack.pop();
        }
    }
    getList(equation)
    return list;
}

/**
 * 后缀求值
 * @param {string[]} postEquation 进入一个postfix方程字符串
 * @return {number} value
 */
function calculate_helper_postToValue(postEquation) {
    let st = new Stack();
    st.push(0);
    while (postEquation.length != 0) {
        let x = postEquation.shift();
        if (f(x) != 0) { //若为运算符则计算
            let num2 = st.pop();
            let num1 = st.pop();
            st.push(binaryCalc(x, num1, num2))
        } else { //若为数字则存储
            st.push(x);
        }
    }
    return st.top();
}

// (function test() {
//     let testList = [
//         /*
//         已跑数据——合格区
//         "1+1",
//         "2+9*1",
//         "10+5",
//         "10/50+50",
//         "50+80*40-60/50",
//         "(50+80)*6-60",
//         "-(10*41)*10+50",
//         "1.8+10-5*1.1"
//         */
//         "1+1",
//         "1+5*10+60"
//     ]
//     testList.forEach((item) => {
//         let myNum = calculate(item);
//         let evalNum = eval(item);
//         console.log(`计算的方程式:${item},\t\t我的计算:${myNum},\t\teval为:${evalNum},\t\t结果:`, myNum == evalNum);
//     })

// })();


/**
 * 
 * @param {string} equation 需要是一个 / * 的中缀表达式
 * @return {number} value
 * @description 目前支持的运算符有 + - * / ^
 */
export function calculate(equation, modeChanged) {
    let value;
    mode = modeChanged;
    if (mode >= 1) {
        value = pretreatment(equation);
        if (isNaN(value) || value === undefined) {
            console.error(value);
            return "Error"
        }
        return value;
    }
    if (/[^\d\(\(\*\s\+\-\/\^\.\×\÷]/.test(equation))
        return "Error:Can`t handle";
    let list = calculate_helper_inToPost(equation);
    // console.log("中缀转后缀结果为", list);
    value = calculate_helper_postToValue(list);
    console.log("postToValue后缀求值为", value);

    if (isNaN(value) || value === undefined) {
        console.error(value);
        return "Error"
    }
    return value;
}
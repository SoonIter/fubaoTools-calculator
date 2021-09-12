import {
    debounce
} from "./debounce";

/**
 * @func 给窗口绑定计算器的键盘事件
 */
export function addKeyActiveEvent() {
    console.log('绑定键盘事件已触发');
    let that = this;
    const keydown = debounce(function (event) {
        if (event.defaultPrevented) {
            return; // 如果事件已经在进行中，则不做任何事。
        }
        if (0 <= Number(event.key) && Number(event.key) <= 9) {
            that.append(Number(event.key))
            return;
        }
        // console.log(event.key);
        switch (event.key) {
            case "+":
            case "-":
            case ".":
                that.append(event.key)
                break;
            case "*":
                that.append('×');
                break;
            case "/":
                that.append('÷');
                break;
            case "Enter":
                that.calculate();
                break;
            case "Backspace":
                that.delete();
                break;
            case "Escape":
                that.quit();
                break;
            default:
                return; // 什么都没按就退出吧。
        }

        // 取消默认动作，从而避免处理两次。
        event.preventDefault();
    }, 50);
    window.addEventListener("keydown", keydown);
}
/**
 * @func 修改窗口尺寸
 * @param {number} size ‘’px
 */
export function setTheWindowSize(size) {
    window.resizeBy(size, 0)
    window.moveBy(-1 * size, 0);

}


/**
 * @func 添加临时的active类名 
 * @param {object} element 一个dom结点
 * @param { number | any} duration 持续时间
 */
export function addActiveClass(element, delay) {
    let primary = element.className;
    if (!primary.includes("active"))
        element.className = primary + " active";
    if (delay === undefined) {
        setTimeout(() => {
            element.className = primary;
        }, 50);
        return;
    }
    if (!isNaN(delay)) {
        setTimeout(() => {
            element.className = primary;
        }, Number(delay));
        return;
    }
}
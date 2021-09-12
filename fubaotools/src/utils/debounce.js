/**
 * 无初始延时的 防抖函数
 * @func 需要进行防抖的函数
 * @delay 防抖的延迟时间
 */
export const debounce = (func, delay = 500) => {
    let timer;
    return function () {
        if (timer) clearTimeout(timer); //如果已经有了，就再设置一个新的
        else func.apply(this, arguments); //如果没有，则立即执行，并设置一个
        timer = setTimeout(() => {
            timer = null
        }, delay);
    }
}
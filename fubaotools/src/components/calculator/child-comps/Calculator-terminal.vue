<template>
    <!-- 科学补充计算器主体 -->
    <div class="calculator">
        <div id="commandline">
            <div class="cle">
                <div class="top-panel">
                    <div class="results" ref="results">
                        <!-- 终端对话显示 -->
                        <TerminalItem v-for="(item) in terminalItems" :QandA="item"></TerminalItem>
                    </div>
                    <button class="fullscreen" style="top: 8px; right: 23px;" @click="clearHistory"></button>
                </div>
                <div class="bottom-panel">
                    <div class="input-left">
                        <!-- 输入框 -->
                        <input
                            class="input"
                            ref="hello"
                            placeholder="Enter an expression"
                            v-model="input"
                            @keydown.stop
                            @keydown.enter="evaluate"
                        />
                    </div>
                    <div class="input-right">
                        <button class="eval" ref="Evaluate" @click="evaluate">Evaluate</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { reactive, ref } from "@vue/reactivity";
import { getCurrentInstance, nextTick, onMounted } from "@vue/runtime-core";
import { addActiveClass } from "@/utils/windowEvent.js"
import TerminalItem from "./terminal.vue";


const math = require('mathjs')

const that = getCurrentInstance();


// mathjs parser 和 终端历史初始化
let parser = math.parser();
const terminalItems = reactive([]);
onMounted(() => {
    const local = JSON.parse(window.localStorage.getItem("terminalItems"));
    const localParserMap = JSON.parse(window.localStorage.getItem("parser"));
    if (local != undefined) {
        terminalItems.push(...local);
    } else {
        let ans = parser.evaluate('16+9/5');
        terminalItems.push({
            question: '16+9/5',
            answer: ans
        });
        return;
    }
    if (localParserMap != undefined) {
        for (let key in localParserMap) {
            const item = localParserMap[key];
            parser.set(key, item);
        }
    }

})
function clearHistory () {
    if (window.confirm("Do you want to delete all the history?").valueOf() == true) {
        window.localStorage.removeItem("terminalItems");
        window.localStorage.removeItem("parser");
        terminalItems.length = 0;
        parser.clear();
    }
}



// 输入框
let input = ref("");
onMounted(() => {
    that.refs["hello"].focus();
})
// 填入信息
async function evaluate () {
    const button = that.refs["Evaluate"]
    const results = that.refs["results"]
    //添加active类名
    addActiveClass(button, 100);
    terminalItems.push({
        question: input.value,
        answer: parser.evaluate(input.value)
    })
    input.value = "";
    window.localStorage.setItem("terminalItems", JSON.stringify(terminalItems));
    window.localStorage.setItem("parser", JSON.stringify(parser.getAll()));
    await nextTick();
    results.scrollTop = results.scrollHeight;
}

</script>


<style lang="scss" scoped>
.fullscreen {
    transition: all 0.2s;
    &:hover {
        transform: scale(1.2);
        background-color: black;
    }
}
@import "~@/assets/scss/commandline.scss";
//大主体
.calculator {
    position: relative;
    border-radius: 20px 0px 0px 20px;
    margin-left: 0;
}

// 简易计算器主体
.calculator {
    margin-left: 0;
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
        "number-0 number-10 dot equal";
    //grid布局，共4列 ，6行
    grid-template-columns: repeat(4, var(--button-width));
    grid-template-rows: repeat(6, var(--button-height));

    // 玻璃风格
    padding: 20px;
    padding-right: 0px;
    border-radius: 20px 0px 0px 20px;
    background: rgba($color: #eee, $alpha: 0.9);

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
        background-color: rgba(167, 167, 167, 0.7);
    }
}
</style>
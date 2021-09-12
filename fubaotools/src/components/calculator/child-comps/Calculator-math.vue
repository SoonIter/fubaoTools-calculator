<template>
    <!-- 数学补充计算器主体 -->
    <div class="calculator">
        <!-- 空余的结果显示栏 -->
        <div class="result" style="grid-area: result"></div>
        <!-- 功能按键 -->
        <button style="grid-area: ac" @click="pushTheEquation('(')">(</button>
        <button style="grid-area: plus-minus" @click="pushTheEquation(')')">)</button>
        <button style="grid-area: percent" @click="pushTheEquation('^')">^</button>
        <button style="grid-area: add" @click="pushTheEquation('e')">e</button>
        <button style="grid-area: subtract" @click="pushTheEquation('⅟')">⅟</button>
        <button style="grid-area: divide" ref="enter" @click="deleteTheEquation">⬅</button>
        <button style="grid-area: multiply" @click="pushTheEquation('e^')">eⁿ</button>
        <button style="grid-area: equal" @click="pushTheEquation('π')">𝞹</button>
        <!-- 功能按键 -->
        <button style="grid-area: number-1" @click="pushTheEquation('°')">°</button>
        <button style="grid-area: number-2" @click="pushTheEquation('㏒(')">㏒</button>
        <button style="grid-area: number-3" @click="pushTheEquation('㏑(')">㏑</button>
        <button style="grid-area: number-4" @click="pushTheEquation('√')">√x</button>
        <button style="grid-area: number-5" @click="pushTheEquation('³√')">³√x</button>
        <button style="grid-area: number-6" @click="pushTheEquation('^√')">ⁿ√x</button>
        <button style="grid-area: number-7" @click="pushTheEquation('²')">x²</button>
        <button style="grid-area: number-8" @click="pushTheEquation('!')">x!</button>
        <button style="grid-area: number-9" @click="pushTheEquation('2^')">2ⁿ</button>
        <button style="grid-area: number-10" @click="pushTheEquation('cos(')" class="iconfont cos"></button>

        <button style="grid-area: number-0" @click="pushTheEquation('sin(')" class="iconfont sin"></button>
        <button style="grid-area: dot" @click="pushTheEquation('tan(')" class="iconfont tan"></button>
    </div>
</template>
<script>
export default {
    setup (props) {
        props;

    },
    inject: ['delete', 'pushMath'],

    methods: {
        // add className active
        addActiveClass (element, permanent) {
            let primary = element.className;
            if (!primary.includes("active"))
                element.className = primary + " active";
            if (permanent === undefined)
                setTimeout(() => {
                    element.className = primary;
                }, 50);
        },
        deleteTheEquation () {
            this.delete();
        },
        pushTheEquation (operation) {
            this.pushMath(operation)
        }
    },
    mounted () {

    },

}

</script>


<style lang="scss" scoped>
@import "~@/assets/scss/extraFont.scss";

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
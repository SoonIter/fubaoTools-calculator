<template>
    <!-- 科学补充计算器主体 -->
    <div class="calculator"></div>
</template>
<script setup>

</script>


<style lang="scss" scoped>
.calculator {
    position: relative;
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
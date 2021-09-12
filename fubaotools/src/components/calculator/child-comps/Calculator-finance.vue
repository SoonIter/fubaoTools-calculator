<template>
    <div class="calculator" @keydown.stop>
        <div class="userInput">
            <input
                class="userAmountInput"
                v-model="userAmount"
                placeholder="请输入金额"
                @change="change"
            />
            <el-select
                size="small"
                v-model="userSelectedCurrency"
                filterable
                placeholder="请选择货币"
                class="currencySelect"
            >
                <el-option
                    size="small"
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
        </div>
        <!-- 展示区域 格式为 货币：金额 -->
        <div class="showBoard">
            <table>
                <ul v-for="(item) in nationCurrency">
                    <div class="tableDataItem">
                        <span class="key">{{ item.key }}:</span>
                        <span class="value">{{ item.value }}</span>
                    </div>
                </ul>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ElSelect, ElOption } from 'element-plus'
import { computed, reactive, ref } from '@vue/reactivity';
import fx from '@/utils/money.js'

let keys = Object.keys(fx.rates);
const options = keys.map((item) => {
    return {
        value: item,
        label: item
    }
})


/**
 * 用户输入的金额
 */
const userAmount = ref("100");
/**
 * 用户所选的货币
 */
const userSelectedCurrency = ref("人民币");
const nationCurrency = reactive([]);
for (let key in fx.rates) {
    nationCurrency.push({
        key: key,
        value: computed(() => fx(Number(userAmount.value)).from(userSelectedCurrency.value).to(key))
    })
}



</script>


<style lang="scss" scoped>
//#region 主体
.userInput {
    width: 200px;
    height: 50px;
    text-align: left;

    .userAmountInput {
        width: 100%;
        height: 30px;
        font-size: large;
        padding-left: 10px;
        border-radius: 20px;
        outline: none;
    }
    .currencySelect {
        width: 150px;
        height: 20px;
        border-radius: 20px;
        padding-left: 25px;
    }
}
.showBoard {
    // 定位和布局
    top: 90px;
    margin-left: 15px;

    padding: 15px;
    position: absolute;
    width: 200px;
    // 背景
    background-color: rgba($color: rgb(106, 255, 144), $alpha: 0.2);
    border-radius: 20px;
    box-shadow: 4px 4px 10px -6px #005403,
        -4px -4px 10px -6px rgb(255, 255, 255);
    // 文字
    font-size: large;
    text-align: left;
    transition: all 0.2s;
    &:hover {
        box-shadow: 4px 4px 15px -8px #000000,
            -4px -4px 15px -8px rgb(255, 255, 255);
    }
    .tableDataItem {
        width: 200px;
        overflow: hidden; //超出部分隐藏
        white-space: nowrap; //表示不换行
        text-overflow: ellipsis; //加省略号
        line-height: 25px;
        & > .key {
            font-weight: 900;
            text-shadow: #776c6c;
            color: #00300c;
            // &:hover {
            //     color: red;
            // }
        }
        & > .value {
            color: #545353;
            transition: all 0.2s;
            &:hover {
                color: black;
                background-color: #fff;
                user-select: text;
            }
        }
    }
}
// 简易计算器主体
.calculator {
    // 玻璃风格
    padding: 20px;
    padding-right: 0px;
    border-radius: 20px 0px 0px 20px;
    background: rgba($color: #eee, $alpha: 0.9);
    //布局
    // display: flex;
    // flex-direction: column;
}
//#endregion 大主体
</style>
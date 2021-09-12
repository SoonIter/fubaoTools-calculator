<template>
    <pre class="expr">{{ QandA.question }}</pre>
    <pre class="res">{{ QandA.answer }}</pre>
</template>
<script setup>
const props = defineProps({
    QandA: {
        question: String,
        answer: String
    }
});
</script>
<style lang="scss">
.res {
    color: #dc3912;
    font-size: 12px;
    &::before {
        content: ">> ";
    }
}
</style>
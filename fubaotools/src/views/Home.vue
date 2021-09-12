<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <Calculator />
  </div>
</template>

<script>
// @ is an alias to /src
import Calculator from '@/components/calculator/Calculator.vue'

export default {
  name: 'Home',
  components: {
    Calculator
  }
}
</script>

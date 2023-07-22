<template lang="pug">
button.btn.btn-sm.btn-primary(@click="refresh") refresh
template(v-if="!msg") server time: {{time}}
div(v-else).red this is is client message: {{msg}}
</template>

<script>
export {default} from './index.js' 
</script>

<style scoped>
@import "./style.css";
</style>

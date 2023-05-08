<template>
    <a-color-picker input v-model="colors" ></a-color-picker>
</template>
<script lang="ts" setup>
import {  ref } from 'vue';
import ColorPicker from './ColorPicker'
const colors = ref() 
</script>
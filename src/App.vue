<template>
    <a-color-picker   v-model="colors" ></a-color-picker>
</template>
<script lang="ts" setup>
import { defineComponent, ref } from 'vue';
import AColorPicker from './ColorPicker'
const AColorPicker3=defineComponent({
    setup(){
        return ()=>'33'
    }
})
const colors = ref()
</script>
<template>
    <color-picker   v-model="colors" ></color-picker>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import ColorPicker from './ColorPicker.vue'

const colors = ref()
</script>
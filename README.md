# 说明

`antdv-color-picker` 是 Ant Design Icons Vue的颜色选择组件（非官方）。
 

## 生成流程  

安装依赖

```bash
pnpm install

```

编译

```bash
pnpm run build
```

测试
```bash
pnpm run dev
```
## 使用  
 
```bash
pnpm i @elonmuscle/antdv-color-picker

```
### 全局引入
```typescript
import ColorPicker from '@elonmuscle/antdv-color-picker'
import '@elonmuscle/antdv-color-picker/dist/style.css';
createApp(App).use(ColorPicker)
```
 
### 按需引入
```vue
<template>
    <a-color-picker v-model="color"/></a-color-picker>
</template>
<script>
import AColorPicker from '@elonmuscle/antdv-color-picker'
import {ref} from 'vue'
import '@elonmuscle/antdv-color-picker/dist/style.css';
const color=ref('#AABBCC')
</script>
```
### 样式引入说明
如引入了了antd样式,即如下代码:

```script
import 'ant-design-vue/dist/antd.css';
```
 或:
```script
import 'ant-design-vue/lib/input/style/index.css'
import 'ant-design-vue/lib/button/style/index.css'
import 'ant-design-vue/lib/popover/style/index.css'
 ```
可不用引入本组件样式

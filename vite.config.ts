import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
 
export default defineConfig({
  define: {
    'process.env': {}
  },
  plugins:[
    vue(), 
    vueJsx()
  ],
  server: {
    host: true,
    https: false,  
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "AColorPicker",
      fileName: (format) => `antdv-color-picker.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});

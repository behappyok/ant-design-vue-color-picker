import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue'
import path from 'path'
 
 
export default defineConfig({
  define: {
    'process.env': {}
  },
  plugins:[
    vue(), 
  ],
  server: {
    host: true,
    https: false,  
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
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

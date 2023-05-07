import ColorPicker from "./ColorPicker";
console.log(ColorPicker.name)
ColorPicker.install = function (app) {
  console.log(ColorPicker.name)
  app.component(ColorPicker.name, ColorPicker);
  return app;
};

  
 
export { ColorPicker };
 
export default ColorPicker;

 
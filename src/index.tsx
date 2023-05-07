import ColorPicker from "./ColorPicker";
ColorPicker.install = function (app) {
  app.component(ColorPicker.name, ColorPicker);
  return app;
};

  
 
export { ColorPicker };
 
export default ColorPicker;

 
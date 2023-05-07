import ColorPicker from "./ColorPicker.vue";

ColorPicker.install = function (app) {
  app.component(ColorPicker.name, ColorPicker);
  return app;
};

export default ColorPicker;

import type {
  AnyColorFormat,
  ColorPickerResult,
  ColorPickerTypes,
  ColorPickerValue,
} from "./ColorPicker.vue";
import type { ColorPickerProps } from "./types";
export type {
  ColorPickerProps,
  ColorPickerTypes,
  ColorPickerValue,
  ColorPickerResult,
  AnyColorFormat,
};

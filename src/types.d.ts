export interface HSLColor {
  a?: number | undefined;
  h: number;
  l: number;
  s: number;
}

export interface RGBColor {
  a?: number | undefined;
  b: number;
  g: number;
  r: number;
}

export type Color = string | HSLColor | RGBColor;

export interface ColorResult {
  hex: string;
  hex8: string;
  hsl: HSLColor;
  rgb: RGBColor;
  rgba: RGBColor;
}


export type ColorPickerProps = {
  lowerHex?:boolean,
  valueFormat?: string,
  hexSign?: boolean,
  input?: boolean,
  popup?: boolean
  modelValue?: AnyColorFormat
  onChange?: (value: any) => void
  onChangeComplete?: (value: any) => void
  onColorResult?: (color: ColorPickerResult) => AnyColorFormat
  blockStyles?: CSSProperties
  pickerStyles?:CSSProperties
  picker?: ColorPickerTypes
  popoverProps?: any
}

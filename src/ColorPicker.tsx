
import { defineComponent, computed, ref } from 'vue';
import type { AnyColorFormat, Color, ColorPickerProps, ColorPickerResult, ColorPickerTypes, ColorResult } from './types'
import { Input, Popover, InputGroup } from 'ant-design-vue'
import PropTypes from 'vue-types'
import tinycolor from 'tinycolor2'
import {
  Chrome,
  Compact,
  Grayscale,
  Material,
  Photoshop,
  Sketch,
  Slider,
  Swatches,
  Twitter,
} from '@ckpack/vue-color'
import 'ant-design-vue/lib/input/style/css'
import 'ant-design-vue/lib/popover/style/index.css'

interface HSVColor {
  a?: number | undefined
  h: number
  s: number
  v: number
}


const getPicker = (pickerType: ColorPickerProps['picker']) => {
  switch (pickerType?.toLowerCase()) {
    case 'chrome':
      return Chrome
    case 'compact':
      return Compact
    case 'grayscale':
      return Grayscale
    case 'material':
      return Material
    case 'photoshop':
      return Photoshop
    case 'slider':
      return Slider
    case 'swatches':
      return Swatches
    case 'twitter':
      return Twitter
  }
  return Sketch
}

const formatColor = (color?: AnyColorFormat) => {
  return color !== undefined && typeof color !== 'string'
    ? tinycolor(
      'hsl' in color
        ? color['hsl']
        : 'hsv' in color
          ? color['hsv']
          : 'rgb' in color
            ? color['rgb']
            : 'hex' in color
              ? color['hex']
              : color,
    )
    : tinycolor(color)
}

const prepareValue = (value: AnyColorFormat | undefined) => {
  const decimalToHex = (alpha: number) =>
    alpha === 0 ? '00' : Math.round(255 * alpha).toString(16)
  const formatted = formatColor(value)
  const _propIn = `${formatted.toHexString()}${decimalToHex(formatted.getAlpha())}`

  return _propIn
}
const getBackgroundBlockColor = (color?: AnyColorFormat) => {
  const formatted = formatColor(color)
  const rgba = formatted.toRgb()
  return color
    ? `rgba(
        ${rgba?.r ?? 0}, ${rgba?.g ?? 0}, ${rgba?.b ?? 0}, ${rgba?.a ?? 100}
      )`
    : ''
}
export default defineComponent({
  name: 'AColorPicker',
  inheritAttrs: false,
  props: {
    valueFormat: PropTypes.oneOf(['hex', 'hex8', 'rgba', 'rgb', 'hsl', 'hsla', 'rgbObj', 'hslObj']),
    hexSign: PropTypes.bool.def(undefined),
    input: PropTypes.bool.def(true),
    popup: PropTypes.bool.def(false),
    lowerHex: PropTypes.bool.def(false),
    modelValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChange: PropTypes.func,
    onChangeComplete: PropTypes.func,
    onColorResult: PropTypes.func,
    blockStyles: PropTypes.object.def({}),
    popoverProps: PropTypes.object.def({}),
    pickerStyles: PropTypes.object.def({}),
    picker: PropTypes.oneOf([
      'Chrome',
      'Compact',
      'Grayscale',
      'Material',
      'Photoshop',
      'Sketch',
      'Slider',
      'Swatches',
      'Twitter',
    ]).def('Sketch'),
    pickerProps: PropTypes.object,
  },
  emits: {
    'update:modelValue': (val?: number) => true,
  },
  setup(props, { attrs, emit, }) {
    const isHex8 = ref(false)
    const isRgb = ref(false)
    const isRgba = ref(false)
    const isHsl = ref(false)
    const isHsla = ref(false)
    const isRgbObj = ref(false)
    const isHslObj = ref(false)

    const readAbleModelValue = computed(() => {
   
      if (typeof props.modelValue === 'string')
        return props.modelValue
      return JSON.stringify(props.modelValue)
    })

    const innerPickerProps = computed(() => {
      return {
        ...{ disableAlpha: true },
        ...props.pickerProps
      }
    })

    const emitValueFormat = computed(() => {
      if (props.valueFormat)
        return props.valueFormat
      else if (isHex8.value)
        return 'hex8'
      else if (isRgb.value)
        return 'rgb'
      else if (isRgba.value)
        return 'rgba'
      else if (isHsl.value)
        return 'hsl'
      else if (isHsla.value)
        return 'hsla'
      else if (isRgbObj.value)
        return 'rgbObj'
      else if (isHslObj.value)
        return 'hslObj'
    })

    const hasPop = computed(() => {
      return props.input || props.popup
    })

    const innerPickerStyles = computed(() => {
      return {
        ...hasPop.value ? {
          boxShadow: 'none',
          padding: 0,
          ...props.picker?.toLowerCase() === 'material' ? { boxSizing: 'content-box' } : {}
        } : {}, ...props.pickerStyles
      }
    })
 
    const innerState = computed({
      get: () => {
        const getQualifiedColorFromString = () => {
          const _splitModelValue = props.modelValue?.split(',')
          if (_splitModelValue.length == 3 || _splitModelValue.length == 4) {
            const [_first, _second, _third, _fourth] = _splitModelValue
            if (Number(_first) >= 0 && Number(_second) < 1 && Number(_third) < 1) {
              isHsl.value = true
              isHsla.value = !!_fourth && true
              return { hsl: { h: _first, s: _second, l: _third, a: _fourth ?? 1 } }
            } else {
              isRgb.value = true
              isRgba.value = !!_fourth && true
              return { rgb: { r: _first, g: _second, b: _third, a: _fourth ?? 1 } }
            }
          }
          if (props.modelValue?.replace('#', '').length === 8) {
            isHex8.value = true
          }
          return { hex: props.modelValue }
        }
        let _qualifiedColor
        if (typeof props.modelValue === 'string') {
          _qualifiedColor = getQualifiedColorFromString() as unknown as AnyColorFormat;
        } else {
          if (props.modelValue && 'r' in props.modelValue && 'g' in props.modelValue && 'b' in props.modelValue) {
            isRgbObj.value = true
            _qualifiedColor = { rgb: props.modelValue } as unknown as AnyColorFormat;
          }
          if (props.modelValue && 'h' in props.modelValue && 's' in props.modelValue && 'l' in props.modelValue) {
            isHslObj.value = true
            _qualifiedColor = { hsl: props.modelValue } as unknown as AnyColorFormat;
          }
        }      
        return prepareValue(_qualifiedColor)
      },

      set: (_value: unknown) => {
        const getEmitV = () => {
          if (typeof _value === 'string')
            return _value
          const v = _value as unknown as ColorResult
          const { r: _r, g: _g, b: _b, a: _a } = v.rgba
          const { h: _h, s: _s, l: _l, a: _a2 } = v.hsl
          switch (emitValueFormat.value) {
            case 'hsl':
              return [_h, _s, _l].join(',')
            case 'hsla':
              return [_h, _s, _l, _a2].join(',')
            case 'rgb':
              return [_r, _g, _b].join(',')
            case 'rgba':
              return [_r, _g, _b, _a].join(',')
            case 'rgbObj':
              return v.rgba
            case 'hslObj':
              return v.hsl
          }
          let vhex
          if (emitValueFormat.value === 'hex') {
            vhex = v.hex
          }
          else if (emitValueFormat.value === 'hex8') {
            vhex = v.hex8
          } else {
            vhex = (!isHex8.value) && innerPickerProps.value?.disableAlpha ? v.hex : v.hex8
          }
          if (props.lowerHex) {
            vhex = vhex.toLowerCase()
          }
          if (props.hexSign === true) {
            return vhex
          }
          else if (props.hexSign === false) {
            return vhex.split('#')[1]
          }
          else if (props.modelValue?.startsWith('#'))
            return vhex
          else if (props.modelValue && (!props.modelValue?.startsWith('#'))) {
            return vhex.split('#')[1]
          }
          else {
            return vhex
          }
        }
        const _emitV = getEmitV()       
        emit('update:modelValue', _emitV)
      }
    })
    const triggerOnChange = (color: ColorPickerResult) => {
      const colorValue = props.onColorResult ? props.onColorResult(color) : color
      props.onChange?.(colorValue)
    }

    const triggerOnChangeComplete = (color: ColorPickerResult) => {
      const colorValue = props.onColorResult ? props.onColorResult(color) : color
      props.onChangeComplete?.(colorValue)
    }

    const blStyles = computed(() => {

      const background = getBackgroundBlockColor(innerState.value)
      return {
        ...{
          padding: '12px',
          width: '50px',
        }, ...props.blockStyles,
        ...  { background }
      }
    })

    const Picker = computed(() => {
      return getPicker(props.picker as unknown as ColorPickerTypes)
    })
    const inputGroupStyle = computed(() => {
      const _parentStyle = attrs.style as object
      return { ..._parentStyle, display: 'flex' }
    })

    return () => {
      return (
        <>
          {hasPop.value ? <Popover trigger='click' v-bind={props.popoverProps}>
            {{
              content: () => (<Picker.value style={innerPickerStyles.value} v-model={[innerState.value, 'modelValue']} on-change={triggerOnChange}
                on-change-complete={triggerOnChangeComplete}  {...innerPickerProps.value} />),
              default: !props.popup ? <InputGroup compact style={inputGroupStyle.value}>
                <Input value={readAbleModelValue.value} readonly>
                  {{
                    addonAfter: (<div style={blStyles.value}></div>)
                  }}
                </Input>
              </InputGroup> :
                <div style={blStyles.value}></div>
            }}
          </Popover>
            : (<Picker.value style={innerPickerStyles.value} v-model={[innerState.value, 'modelValue']} on-change={triggerOnChange}
              on-change-complete={triggerOnChangeComplete} {...innerPickerProps.value} />)}
        </>
      )
    };
  }
})

export const dropdownProp = {}

export const dropdownItemProp = {
  position: {
    type: String, // 'bottom', 'right', 'top', 'left'
    default: 'bottom',
    validator: (position: string) => ['bottom', 'right', 'top', 'left'].includes(position),
  },
  width: {
    type: [Number, String],
    default: 150,
    validator: (position: string | number) => (typeof position === 'string' ? true : position > 0),
  },
}

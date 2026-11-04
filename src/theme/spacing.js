// Neo-Brutalist Layout & Spacing Tokens
export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  huge: 48,
};

export const layout = {
  screenPadding: 16,
  cardRadius: 14,
  cardRadiusLg: 18,
  cardRadiusSm: 10,
  buttonRadius: 12,
  pillRadius: 999,
  borderWidth: 2.5,
  borderWidthThin: 2,
  borderWidthThick: 3,
  shadowOffset: 4,
  shadowOffsetSm: 2,
  shadowOffsetLg: 6,
  minTouchSize: 48,
};

// Hard Neo-Brutalist shadow presets (pure black, zero blur, sharp offset)
export const neoShadows = {
  sm: {
    boxShadow: '2px 2px 0px #121212',
    shadowColor: '#121212',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  md: {
    boxShadow: '4px 4px 0px #121212',
    shadowColor: '#121212',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  lg: {
    boxShadow: '6px 6px 0px #121212',
    shadowColor: '#121212',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  pressed: {
    boxShadow: '1px 1px 0px #121212',
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 1,
  },
};

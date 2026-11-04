import { Platform } from 'react-native';

const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

export const typography = {
  h1: {
    fontFamily,
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
    letterSpacing: -0.6,
  },
  h2: {
    fontFamily,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
    letterSpacing: -0.4,
  },
  h3: {
    fontFamily,
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    letterSpacing: -0.2,
  },
  subtitle: {
    fontFamily,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
  },
  body: {
    fontFamily,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
  },
  bodyBold: {
    fontFamily,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
  },
  caption: {
    fontFamily,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  captionSmall: {
    fontFamily,
    fontSize: 11,
    fontWeight: '800',
    lineHeight: 14,
    letterSpacing: 0.5,
  },
  button: {
    fontFamily,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  sticker: {
    fontFamily,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
};

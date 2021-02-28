import { PixelRatio } from 'react-native';

export const FONT = {
  TITLE: 'Arial',
  CONTENT: 'Arial',
};

export const transparentize = (color: string, opacity: number) => {
  const val = color.split(',');
  val[3] = String(opacity);
  return val.join(',') + ')';
  // const length = color.length;
  // const val = color;
  // val
  //   .split('')
  //   .splice(length - 2, 1, opacity.toString())
  //   .join('');
  // return val;
};

// COLORS
export const COLORS = {
  BLACK: 'rgba(0, 0, 0, 1)',
  CARBON: 'rgba(41, 41, 41, 1)',
  BROWN: 'rgba(84, 84, 84, 1)',
  GRANITE: 'rgba(168, 169, 170, 1)',
  GREY: 'rgba(198, 200, 202, 1)',
  SILVER: 'rgba(240, 241, 241, 1)',
  WHITE: 'rgba(255, 255, 255, 1)',
  CORAL: '#b3072e',
};

// GRADIENTS
export const GRADIENTS = {
  OVERLAY: {
    colors: [transparentize(COLORS.BLACK, 0.35), transparentize(COLORS.BROWN, 0.1 * 0.35)],
  },
  HEADER: {
    colors: [transparentize(COLORS.BLACK, 0.64), transparentize(COLORS.BLACK, 0.32)],
  },
};

// DIMENSIONS
export const PADDING = 24;
export const RADIUS = 10;
export const POPUP = {
  WIDTH: 240,
  OPTION_HEIGHT: 48,
};

export const CARD_HEIGHT = {
  TALL: 480,
  REGULAR: 380,
};

export const MATERIAL_HEIGHT = 42;

export const SIDEBAR_RATIO = 0.265;

export const HEADER_HEIGHT = 160;
export const MIN_HEADER_HEIGHT = 100;

export const PIXELS_PER_CM = 26.15 * PixelRatio.get();

export const FILTER_OPTION_HEIGHT = 42;

// Keys
export const CONFIG_KEY = `@config-${__DEV__ ? 'DEV' : 'PROD'}-v1`;
export const USER_KEY = `@user-${__DEV__ ? 'DEV' : 'PROD'}-v1`;
export const MATERIALS_KEY = `@materials-${__DEV__ ? 'DEV' : 'PROD'}-v1`;
export const CACHE_KEY = `@materials-__KEY__-__VARIABLES__-${__DEV__ ? 'DEV' : 'PROD'}-v1`;

// SHADOWS
export const SHADOWS = {
  SOFT: {
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: PADDING / 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: PADDING / 2,
  },
};

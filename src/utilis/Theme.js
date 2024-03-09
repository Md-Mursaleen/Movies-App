import { Dimensions, PixelRatio } from 'react-native';

export const ScreenWidth = Dimensions.get('window').width;
export const ScreenHeight = Dimensions.get('window').height;

const scale = ScreenWidth / 375;
const scaleHeight = ScreenHeight / 812;

export const normalize = (size, forHeight = false) => {
    const newSize = size * (forHeight ? scaleHeight : scale);
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

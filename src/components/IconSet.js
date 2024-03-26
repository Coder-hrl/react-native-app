import createIconSet from 'react-native-vector-icons/lib/create-icon-set';
import fontConfig from '../assets/fonts/iconfont.json';
let glyphMap = {};

fontConfig.glyphs.forEach(item => {
  glyphMap[item.font_class] = item.unicode_decimal;
});

const IconSet = createIconSet(glyphMap, 'iconfont', 'iconfont.ttf');

export default IconSet;

import truncateText from './truncateText';
import removeUnwantedNewLines from './removeUnwantedNewLines';
import makeStringReplacements from './makeStringReplacements';

export default (str) => {
  str = truncateText(str, 45);
  str = makeStringReplacements(str);
  const results = str.split('\n');
  return removeUnwantedNewLines(results);
}

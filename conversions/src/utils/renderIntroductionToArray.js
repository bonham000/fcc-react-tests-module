import truncateText from './truncateText';
import removeUnwantedNewLines from './removeUnwantedNewLines';
import makeStringReplacements from './makeStringReplacements';

export default (str) => {
  let results = [];
  str = truncateText(str, 38);
  str = makeStringReplacements(str);

  const bqMatches = str.match(/<blockquote>/g);

  /* NOTE: if challengeText contains <blockquote>'s
  split description text except for <blockquote> */

  if (bqMatches) {
    for (let i = 0; i < bqMatches.length; i++) {
      const start = str.indexOf('<blockquote>');
      const end = str.indexOf('</blockquote>') + 13;
      const splitText = str.slice(0, start).split('\n');
      const blockquote = str.slice(start, end).replace(/\n/g, '<br>');
      results.push(splitText, [blockquote]);
      str = str.slice(end);
    }
    results = results.reduce((res, arr) => res.concat(arr), []);
  } else {
    results = str.split('\n');
  }

  return removeUnwantedNewLines(results);
}

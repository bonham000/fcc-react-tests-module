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

      // slice until blockquote occurence and split
      const splitText = str.slice(0, start).split('\n');

      // leave substring enclosed in <blockquote> tags intact
      // and replace \n with <br> for propper fcc formatting
      const blockquote = str.slice(start, end).replace(/\n/g, '<br>');

      // push both sets of strings on to results array
      results.push(splitText, blockquote);

      // slice at end of blockquote and repeat
      str = str.slice(end);
    }

    // push any text remaining after loop completes
    results.push(str.split('\n'));

    // flatten 2d array
    results = results.reduce((res, arr) => res.concat(arr), []);
  } else {

    // if no <blockquote>'s just split
    results = str.split('\n');
  }

  return removeUnwantedNewLines(results);
}

import truncateText from './truncateText';

export default (str) => {
  str = truncateText(str, 39)
    .replace(/<pre>\s*<code class="codeBlock">/g, '<blockquote>')
    .replace(/<\/code>\s*<\/pre>/g, '</blockquote>')
    .replace(/<br><br>/g, '')
    .replace(/<br \/><br \/>/g, '')
    .replace(/<br>|<br \/>/g, '');
    // ^^ replace single <br> or <br /> with single space
    // and double <br><br> or <br /><br /> with single space
    // NOTE: these regex can prob be consolidated into 1 .replace()

  const bqMatches = str.match(/<blockquote>/g);

  /* NOTE: if challengeText contains <blockquote>'s
  split description text except for <blockquote> */

  if (bqMatches) {
    const subStrings = [];
    for (let i = 0; i < bqMatches.length; i++) {
      const start = str.indexOf('<blockquote>');
      const end = str.indexOf('</blockquote>') + 13;
      const splitText = str.slice(0, start).split('\n');
      const blockquote = str.slice(start, end).replace(/\n/g, '<br>');
      subStrings.push(splitText, [blockquote]);
      str = str.slice(end);
    }
    return subStrings.reduce((res, arr) => res.concat(arr), []);
  } else {
    return str.split('\n');
  }
}

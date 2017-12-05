export default (str) => {
  // replace single <br> or <br /> with single space
  // replace double <br><br> or <br /><br /> with space
  // blockquote replacements are only for introduction text
  // NOTE: these regex can prob be consolidated into 1 .replace()
  return str
    .replace(/<pre>\s*<code class="codeBlock">\n*/g, '<blockquote>')
    .replace(/<\/code>\s*<\/pre>\n*/g, '</blockquote>')
    .replace(/<br><br>\n/g, '')
    .replace(/<br \/><br \/>\n/g, '')
    .replace(/<br>|<br \/>\n/g, '');
}

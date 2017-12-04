// account for different challenge instruction styles
// see React_02, vs React_04, vs React_08
export default (text, i) => {
  if (/\s/.test(text[i])) {
    if (/\s/.test(text[i+1])) {
      text = text.slice(i+2);
    } else {
      text = text.slice(i+1);
    }
  } else {
    text = text.slice(i);
  }
  return text;
}

import truncateText from './truncateText';

export default (str) => {
  return truncateText(str, 46)
    .replace(/<br>|<br \/>/g, '')
    .split('\n');
}

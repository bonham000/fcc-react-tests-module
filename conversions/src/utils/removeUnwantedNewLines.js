export default (results) => {
  // remove repeating new lines
  for (let i = 0; i < results.length; i++) {
    if (!results[i] && !results[i+1] && !results[i+2]) {
      results.splice(i, 2);
    } else if (!results[i] && !results[i+1]) {
      results.splice(i, 1);
    }
  }

  // remove trailing new line
  if (!results[results.length-1]) {
    results = results.slice(0, results.length);
  }

  return results;
}

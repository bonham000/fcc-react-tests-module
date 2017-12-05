export default (arr) => {
  const results = [];
  // remove empty lines
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      results.push(arr[i]);
    }
  }

  // concat 2 lines lines that are a single sentence
  for (let i = 0; i < results.length - 1; i++) {
    let firstChar = results[i+1][0];
    let lastCharPrevLine = results[i][results[i].length - 1];
    if (/[a-z]/.test(firstChar) && !/[.?!:]/.test(lastCharPrevLine)) {
      results[i] = results[i] += ' ' + results[i+1];
      results.splice(i+1, 1);
    }
  }

  return results;
}

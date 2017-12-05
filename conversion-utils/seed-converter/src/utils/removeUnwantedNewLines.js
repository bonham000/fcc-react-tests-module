export default (arr) => {
  // save this for now in case we do want new lines
  // in the seed later for some reason:

  // remove repeating new lines
  // for (let i = 0; i < results.length; i++) {
  //   if (!results[i] && !results[i+1] && !results[i+2]) {
  //     results.splice(i, 2);
  //   } else if (!results[i] && !results[i+1]) {
  //     results.splice(i, 1);
  //   }
  // }
  //
  // // remove trailing new line
  // if (!results[results.length-1]) {
  //   results = results.slice(0, results.length);
  // }

  // updated solution removes all lines that contain nothing:
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

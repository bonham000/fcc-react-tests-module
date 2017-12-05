// deep copy of challengeTemplate
export default (template) => {
  return JSON.parse(JSON.stringify(template));
}

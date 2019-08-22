// Converts a string to an html id suitable for use in an anchor link
function toHtmlId(phrase: string) {
  return phrase.replace(/\s+/g, '-').toLowerCase()
}

export default toHtmlId;

// Converts a string to an html id suitable for use in an anchor link
function toHtmlId(phrase: string) {
  return phrase
    .replace(/^[^a-zA-Z]+/, '') // Ensure id starts with a letter
    .replace(/\s+/g, '-')
    .replace(/[^\w-_'?!()*]+/g, '')
}

export default toHtmlId;

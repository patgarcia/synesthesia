const slugify = str => str.toLowerCase().replace(/[^\x61-\x7A \s]/g, "").split(' ').join('-');

const asciiLower = () => [...Array(26)].map((_, i) => String.fromCharCode(97 + i));

const getQueryParamStr = queryParams => {
  if(!queryParams) return ''
  return Object.entries(queryParams).map(
    ([key, val]) => `${key}=${val}`
    ).join('&');
}

export {
  slugify, 
  getQueryParamStr, 
  asciiLower
};
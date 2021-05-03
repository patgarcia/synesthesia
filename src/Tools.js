const slugify = str => str.toLowerCase().replace(/[^\x61-\x7A \s]/g, "").split(' ').join('-');

const asciiLower = () => [...Array(26)].map((_, i) => String.fromCharCode(97 + i));

const getQueryParamStr = queryParams => {
  if(!queryParams) return ''
  return Object.entries(queryParams).map(
    ([key, val]) => `${key}=${val}`
    ).join('&');
}


// Creating image buffer with Axios
// USES CORS PROXY: https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141#43881141

// const proxy = null // replace with heroku CORS proxy in account

const axios = require('axios').default;
delete axios.defaults.headers.common["Authorization"];

// "imgURL" replace with the resource locator
// const getImage = async () => {
//   let image = await axios.get(proxy + "imgURL", {responseType: 'arraybuffer',  'Access-Control-Allow-Methods' : 'GET'});
//   let returnedB64 = Buffer.from(image.data).toString('base64');
//   console.log("LOGGING IMAGE", returnedB64);
// }

const RGBAToHSLA = (r, g, b, a) => {
  const [h, s, l] = RGBToHSL(r, g, b);
  return [h, s, l, a]
}

const RGBToHSL = (r, g, b) => {
  /* 
  Return h,s,l values from r,g,b
  Pseudo code from https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
   */

  // Normalize RGB values
  r /= 255;
  g /= 255;
  b /= 255;

  // Find the min and max
  let min = Math.min(r, g, b);
  let max = Math.max(r, g, b);

  let maxMinusMin = max - min;
  let maxPlusMin = max + min;

  // Luminace
  let l = maxPlusMin / 2;

  // Saturation and Hue
  let s, h;

  if (maxMinusMin !== 0) {
      s = l <= 0.5 ? maxMinusMin / maxPlusMin : maxMinusMin / (2.0 - maxMinusMin)

      if (r === max) {
          h = (g - b) / maxMinusMin
      } else if (g === max) {
          h = 2.0 + (b - r) / maxMinusMin
      } else {
          h = 4.0 + (r - g) / maxMinusMin
      }
  } else {
      s = h = 0;
  }

  // convert Hue to degrees
  h = Math.round(h * 60);

  // if Hue negative add 360°
  h = h < 0 ? h + 360 : h;

  return [h, s, l]
}




// getImage();

export {
  slugify, 
  getQueryParamStr, 
  asciiLower,
  RGBAToHSLA
};
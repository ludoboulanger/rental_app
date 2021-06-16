/**
 * Take a param object and return the string representing theses params for appending it to a URL
 * @param params
 * @returns URIEncoded params
 */
export function getURIEncodedParams(params){
  if (params == null){
    return "";
  }

  const keyValues = Object.entries(params).map(([key, value])=> {
    return encodeURIComponent(key) + "=" + encodeURIComponent(value);
  });
  return "?" + keyValues.join("&");
}

export function getURLWithParams(path, params){
  return path + getURIEncodedParams(params);
}

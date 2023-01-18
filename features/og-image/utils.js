export function getParamValue(searchParams, paramName) {
  const hasParam = decodeURIComponent(searchParams.has(paramName));
  return hasParam ? searchParams.get(paramName) : undefined;
}

export function getOGUrl(layout, params) {
  const host = getHostUrl();
  const searchParams = new URLSearchParams(params).toString();
  return host + "/api/og/" + layout + "?" + searchParams;
}

export function getHostUrl() {
  const PUBLIC_URL_WITH_PROTOCOL = process?.env?.NEXT_PUBLIC_VERCEL_URL_WITH_PROTOCOL;
  const PUBLIC_URL = process?.env?.NEXT_PUBLIC_VERCEL_URL;

  if (PUBLIC_URL_WITH_PROTOCOL) return PUBLIC_URL_WITH_PROTOCOL;
  
  if (PUBLIC_URL) return `https://${PUBLIC_URL}`;

  return "";
}
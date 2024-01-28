import { ApiEndpoints } from "./constants";

/**
 * Returns the full route to a certain endpoint
 * @param base URL, usually ends with '/api'
 * @param endpoint ApiEndpoints class
 */
export function getRouteUrl(base: string, endpoint: ApiEndpoints): string {
  return `${base}${endpoint}`;
}
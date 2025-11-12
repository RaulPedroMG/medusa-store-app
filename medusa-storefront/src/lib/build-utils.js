/**
 * Utility functions for build time vs runtime behavior
 */

/**
 * Determines if we're in a build/SSG environment where we should skip data fetching
 * @returns {boolean} true if we should skip data fetching during build
 */
export const isBuildTime = () => {
  return process.env.SKIP_BUILD_STATIC_GENERATION === "true";
};

/**
 * Wrapper for fetch that returns empty data during build time
 * @param {string} url - URL to fetch
 * @param {object} options - Fetch options
 * @param {any} fallbackData - Data to return during build time
 * @returns {Promise<any>} - Fetch result or fallback data
 */
export const safeFetch = async (url, options = {}, fallbackData = null) => {
  if (isBuildTime()) {
    console.log(`[Build] Skipping fetch to ${url} during build`);
    return fallbackData;
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error fetching ${url}: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    if (fallbackData !== null) {
      console.log(`[Runtime] Using fallback data for ${url}`);
      return fallbackData;
    }
    throw error;
  }
};

/**
 * Empty data structures for common data types
 */
export const EMPTY_PRODUCT = {
  id: "build-time-placeholder",
  title: "Product",
  handle: "product",
  thumbnail: "",
  description: "This is a placeholder during build time.",
  variants: [],
};

export const EMPTY_COLLECTION = {
  id: "build-time-placeholder",
  title: "Collection",
  handle: "collection",
  products: [],
};

export const EMPTY_PRODUCTS_LIST = {
  products: [],
  count: 0,
};

export const EMPTY_COLLECTIONS_LIST = {
  collections: [],
  count: 0,
};

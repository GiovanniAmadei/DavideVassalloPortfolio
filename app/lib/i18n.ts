/**
 * Returns the localized value from a TinaCMS data object.
 * If locale is 'en', it prefers the `field_en` variant, falling back to `field`.
 * If locale is 'it', it uses `field` directly.
 */
export function loc(data: any, field: string, locale: string): string | undefined {
  if (!data) return undefined
  if (locale === 'en') {
    return data[`${field}_en`] || data[field] || undefined
  }
  return data[field] || undefined
}

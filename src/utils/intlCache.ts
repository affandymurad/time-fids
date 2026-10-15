// Creating Intl.DateTimeFormat is expensive; formatters are immutable, so reuse them.
const cache = new Map<string, Intl.DateTimeFormat>();

export function cachedDtf(locale: string, options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
  const key = `${locale}|${JSON.stringify(options)}`;
  let dtf = cache.get(key);
  if (!dtf) {
    dtf = new Intl.DateTimeFormat(locale, options);
    cache.set(key, dtf);
  }
  return dtf;
}

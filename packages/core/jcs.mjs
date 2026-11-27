export const DOMAIN_SEPARATION_V1 = 'ARKHE-PCS-V1\n';
export function canonicalizeJCS(value) {
  if (value === null || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number') return Object.is(value, -0) ? '0' : JSON.stringify(value);
  if (typeof value === 'string') return JSON.stringify(value);
  if (Array.isArray(value)) return '[' + value.map(v => v === undefined ? 'null' : canonicalizeJCS(v)).join(',') + ']';
  if (typeof value === 'object') {
    const keys = Object.keys(value).sort();
    return '{' + keys.filter(k => value[k] !== undefined).map(k => JSON.stringify(k) + ':' + canonicalizeJCS(value[k])).join(',') + '}';
  }
  throw new Error('Tipo no soportado');
}

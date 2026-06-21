export const formatPrice = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value)

export const pluralize = (count, singular, plural) =>
  `${count} ${count === 1 ? singular : plural ?? `${singular}s`}`

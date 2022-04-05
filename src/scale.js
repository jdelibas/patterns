const scaleLinear = ({ domain, range }) => (value) =>  {
  const [min, max] = range
  const [minDomain, maxDomain] = domain
  const domainDiff = maxDomain - minDomain
  const rangeDiff = max - min
  const scale = domainDiff / rangeDiff
  const newVal = minDomain + scale * (value - min)
  if (newVal <= 0) return minDomain
  return newVal
}

module.exports = {
  scaleLinear,
}

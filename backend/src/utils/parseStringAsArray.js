module.exports = function parseStringAsArray(ArrAsString) {
  return ArrAsString.split(',').map(tech => tech.trim());
}
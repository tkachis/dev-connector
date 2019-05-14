function filterFields(obj) {
  for (prop in obj) {
    if (!obj[prop]) delete obj[prop];
    if (prop === "skills")
      obj[prop] = obj[prop].split(",").map(skill => skill.trim());
  }
  return obj;
}

module.exports = { filterFields };

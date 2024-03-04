
/***********************HELPER FUNCTIONS */
// converts camel case to snake case

const camelToSnakeCase = (str) => {
  return str.replace(/[A_Z]/g, (c) => `_${c.toLowerCase()}`);
};


module.exports = {camelToSnakeCase};
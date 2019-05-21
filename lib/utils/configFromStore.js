const configFromStore = store => (value, def = undefined) => (
  store.flags.includes(value) ? value : def
);

module.exports = configFromStore;

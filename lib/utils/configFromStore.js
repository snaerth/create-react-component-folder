const configFromStore = store => (value, def = undefined) => (store.includes(value) ? value : def);

module.exports = configFromStore;

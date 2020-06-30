const CONFIG_KEY = Symbol.for('crcf.config');
const globalSymbols = Object.getOwnPropertySymbols(global);

if (!globalSymbols.indexOf(CONFIG_KEY) > -1) {
  global[CONFIG_KEY] = {
    flags: [],
    values: {},
  };
}

const store = {};
Object.defineProperty(store, 'flags', {
  get: () => global[CONFIG_KEY].flags,
  set: (flags) => { global[CONFIG_KEY].flags = flags; },
});

Object.defineProperty(store, 'values', {
  get: () => global[CONFIG_KEY].values,
  set: (values) => { global[CONFIG_KEY].values = values; },
});

Object.freeze(store);

const config = {
  mergeFlags: (flags = []) => { store.flags = [...store.flags, ...flags]; },
  hasFlag: (flag) => store.flags.includes(flag),
  getValue: (prop, def = null) => store.values[prop] || def,
  setValue: (prop, value) => { config.mergeValues({ [prop]: value }); },
  mergeValues: (values) => { store.values = { ...store.values, ...values }; },
  mergeAll: (toMerge) => {
    const mergeObject = { ...toMerge };
    if (mergeObject.flags) {
      config.mergeFlags(mergeObject.flags);
      delete mergeObject.flags;
    }

    config.mergeValues(mergeObject);
  },
};

Object.freeze(config);

module.exports = config;

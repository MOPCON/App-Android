Object.defineProperty(Object.prototype, 'getNestedValue', {
  value: function (props) {
    return props.reduce((acc, val) => (acc && acc[val]) ? acc[val] : undefined, this);
  },
  enumerable: false
});

Object.defineProperty(Object.prototype, 'setNestedValue', {
  value: function (keyArr, value) {
    lastKey = keyArr.pop();
    keyArr.reduce((acc, key) => {
      if (acc[key] === undefined) { acc[key] = {}; }
      return acc[key];
    }, this)[lastKey] = value;
  },
  enumerable: false
});

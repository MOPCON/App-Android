Object.defineProperty(Object.prototype, 'getNestedValue', {
  value: function(props) {
    return props.reduce((acc, val) => (acc && acc[val]) ? acc[val] : undefined, this);
  },
  enumerable: false
});
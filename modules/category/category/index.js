module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Category',
    pluralLabel: 'Categories'
  },
  fields: {
    add: {
      _products: {
        type: 'relationshipReverse',
        withType: 'product',
        reverseOf: '_categories'
      }
    },
    group: {}
  }
};

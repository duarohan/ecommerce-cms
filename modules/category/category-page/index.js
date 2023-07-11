module.exports = {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'Category Page',
    pluralLabel: 'Categories Page',
    pieceModuleName: 'category',
    perPage: 8,
    sort: {
      date: -1,
      lastPublishedAt: -1
    }
  },
  fields: {
    add: {},
    group: {}
  }
};

// This configures the @apostrophecms/page module to add a "home" page type to the
// pages menu

module.exports = {
  options: {
    quickCreate: false,
    types: [
      {
        name: 'default-page',
        label: 'Default'
      },
      {
        name: '@apostrophecms/home-page',
        label: 'Home'
      },
      {
        name: 'product-page',
        label: 'Product-Index'
      },
      {
        name: 'category-page',
        label: 'Category-Index'
      }
    ]
  }
};

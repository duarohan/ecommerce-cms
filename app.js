require('apostrophe')({
  shortName: 'ecommerce-cms',
  nestedModuleSubdirs: true,
  modules: {
    localization: {},
    '@apostrophecms/seo': {},
    '@apostrophecms/rich-text-widget': {
      options: {
        className: 'bp-rich-text'
      }
    },
    '@apostrophecms/image-widget': {
      options: {
        className: 'bp-image-widget'
      }
    },
    '@apostrophecms/video-widget': {
      options: {
        className: 'bp-video-widget'
      }
    },
    // `asset` supports the project's webpack build for client-side assets.
    asset: {},
    // The project's first custom page type.
    'default-page': {},
    product: {},
    'product-page': {},
    'product-widget': {},
    category: {},
    'category-page': {}
  }
});

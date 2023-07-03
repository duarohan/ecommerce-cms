module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Product',
    publicApiProjection: {
      title: 1,
      slug: 1,
      _url: 1,
      _categories: 1,
      main: 1,
      thumbnail: 1
    }
  },
  fields: {
    add: {
      name: {
        type: 'string',
        label: 'Product Name',
        required: true
      },
      description: {
        type: 'string',
        label: 'Description'
      },
      _categories: {
        label: 'category',
        type: 'relationship',
        withType: 'category',
        max: 1
      },
      launchDate: {
        type: 'date',
        label: 'Launch Date'
      },
      price: {
        type: 'integer',
        label: 'price'
      },
      brand: {
        type: 'string',
        label: 'Brand'
      },
      color: {
        type: 'string',
        label: 'Color'
      },
      size: {
        type: 'string',
        label: 'Size'
      },
      image: {
        label: 'Image',
        type: 'area',
        options: {
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      }
    },
    group: {
      general: {
        label: 'General',
        fields: [ 'name', 'description', 'price', 'image', 'launchDate' ]
      },
      details: {
        label: 'Details',
        fields: [ 'brand', '_categories' ]
      },
      attributes: {
        label: 'Attributes',
        fields: [ 'color', 'size' ]
      }
    }
  },
  columns: {
    add: {
      lastPublishedAt: {
        label: 'Published',
        component: 'AposCellDate'
      },
      launchDate: {
        label: 'Launch Date',
        component: 'AposCellDate'
      }

    }
  },
  filters: {
    add: {
      belowAverage: {
        label: 'belowAverage'
      }
    },
    remove: [ 'archived', 'visibility' ]
  },
  components(self) {
    return {
      async recommended(req, data) {
        const { category, price } = data;
        const products = await self.find(req, {
          categoriesIds: category,
          price: { $lte: parseFloat(price) }
        }).limit(5).sort({ createdAt: -1 }).toArray();
        const categoryTitle = products[0]._categories[0].title;
        return {
          products,
          price,
          categoryTitle
        };
      }
    };
  },
  methods(self) {
    return {
      async averagePrice(req) {
        let sum = 0;
        const products = await self.find(req).toArray();
        if (!products.length) {
          return 0;
        }
        for (const product of products) {
          sum += product.price;
        }
        return sum / products.length;
      }
    };
  },
  queries(self, query) {
    return {
      builders: {
        // This builder can be used to filter products in a query like this one:
        // await self.apos.product.find(req, {}).belowAverage(true).toArray();
        belowAverage: {
          def: false,
          async finalize() {
            // Make sure this filter was actually invoked first
            if (query.get('belowAverage')) {
              const average = await self.averagePrice(query.req);

              query.and({
                price: { $lt: average }
              });
            }
          },
          // The builder can also be invoked via the module's REST API as a
          // query string parameter, e.g. `?belowAverage=1`. Use the launder
          // utility to ensure the proper data format for the database request.
          launder(value) {
            return self.apos.launder.boolean(value);
          },
          // Always provides these two choices when requested, even if no docs
          // match either value.
          choices() {
            return [
              {
                value: '0',
                label: 'No'
              },
              {
                value: '1',
                label: 'Yes'
              }
            ];
          }
        }
      }
    };
  }
};

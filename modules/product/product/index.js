module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Product'
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
  }
};

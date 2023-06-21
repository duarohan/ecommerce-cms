module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Recommended Products',
    description: 'Display a list of recommended products',
    icon: 'text-subject'
  },
  fields: {
    add: {
      category: {
        type: 'select',
        label: 'Category',
        choices: 'getCategories'
      },
      price: {
        type: 'select',
        label: 'Price Range',
        choices: [
          {
            label: '>20000',
            value: '20000'
          },
          {
            label: '>50000',
            value: '50000'
          },
          {
            label: '>80000',
            value: '80000'
          }
        ]
      }
    }
  },
  methods(self) {
    return {
      async getCategories(req) {
        const categories = await self.apos.modules.category.find(req).project({
          title: 1,
          _id: 1
        }).toArray();
        const choices = [];
        categories.forEach(el => {
          choices.push({
            label: el.title,
            value: (el._id).replace(/:en:(draft|published)/, '')
          });
        });
        return choices;
      }
    };
  }
};

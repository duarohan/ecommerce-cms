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
        choices: [
          {
            label: 'Electronics',
            value: 'clj43s8260007s4u51070bh1b'
          }
        ]
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
  }
};

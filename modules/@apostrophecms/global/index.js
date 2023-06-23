module.exports = {
  fields: {
    add: {
      githubUrl: {
        type: 'url',
        label: 'Github organization url'
      },
      dateFormat: {
        type: 'string',
        label: 'Date Format'
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [ 'githubUrl', 'dateFormat' ]
      }
    }
  }
};

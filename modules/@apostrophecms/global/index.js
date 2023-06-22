module.exports = {
  fields: {
    add: {
      githubUrl: {
        type: 'url',
        label: 'Github organization url'
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [ 'githubUrl' ]
      }
    }
  }
};

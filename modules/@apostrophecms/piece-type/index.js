module.exports = {

  handlers(self) {
    return {
      afterPublish: {
        logPublish(req, data) {
          console.log(`Published ${data.published.title}`);
        }
      }
    };
  }
};

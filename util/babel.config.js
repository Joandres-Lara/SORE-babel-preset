module.exports = (api) => {
 api.cache(false);

 return {
  presets: [
   require('../index')
  ]
 };
}

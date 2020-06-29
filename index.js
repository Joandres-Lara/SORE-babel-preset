module.exports = (options) => {
 return {
  presets: [{
   plugins: [require('./src/plugins/magic-constants')]
  }]
 };
}

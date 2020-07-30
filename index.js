module.exports = (options) => {
 return {
  presets: [{
   plugins: [
    require('./src/plugins/magic-constants'),
    require('./src/plugins/circleci-fix-promise-module')
   ]
  }]
 };
}

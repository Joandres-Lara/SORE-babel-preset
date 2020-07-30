const babel = require('@babel/core');
const circleCIFixPromiseModule = require('../src/plugins/circleci-fix-promise-module');

const TEST_TRANSFORM_CODE_WITH_DECLARATION = `
const Promise = require('Promise');
const otherVar = false;

module.exports = function promised(){
 return new Promise((resolve) => {
  return resolve(true);
 });
}
`;

const TEST_TRANSFORM_CODE_WITHOUT_DECLARATION = `
module.exports = function fnWithoutPromiseDeclaration(){
 if(promisedWithNew){
  return new Promise((resolve, reject) => {
   return resolve(true);
  });
 }

 if(promisedWithStaticCalled){
  return Promise.resolve(true);
 }
}
`;

const TEST_TRANSFORM_CODE_WITHOUT_NEED = `
module.exports = function fnNotNeed(){
 return false;
}
`;

describe('Insert promise declaration', () => {

 it('Replace declaration', () => {
  const { code: codeWithDeclaration } = babel.transform(TEST_TRANSFORM_CODE_WITH_DECLARATION, { plugins: [circleCIFixPromiseModule] })
  expect(codeWithDeclaration).toMatchSnapshot();
 });

 it('Declare when is need', () => {
  const { code: codeWithoutDeclaration } = babel.transform(TEST_TRANSFORM_CODE_WITHOUT_DECLARATION, { plugins: [circleCIFixPromiseModule] });
  expect(codeWithoutDeclaration).toMatchSnapshot();
 })

 it('Ignore if not need', () => {
  const { code: codeNotNeedDeclaration } = babel.transform(TEST_TRANSFORM_CODE_WITHOUT_NEED, { plugins: [circleCIFixPromiseModule] });
  expect(codeNotNeedDeclaration).toMatchSnapshot();
 })
})

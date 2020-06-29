const babel = require('@babel/core');
const magicConstantsPlugin = require('../plugins/magic-constants');

const TEST_TRANSFORM_CODE = `
console.log([__TEST__,__DEV__]);
`;

test('insert __TEST__ expresion', () => {
 const { code } = babel.transform(TEST_TRANSFORM_CODE, { plugins: [magicConstantsPlugin] });
 expect(code).toMatchSnapshot();
});

const types = require('@babel/types');

const PROCESS_ENV =  types.memberExpression(
 types.memberExpression(
  types.identifier('process'),
  types.identifier('env'),
  false
 ),
 types.identifier('NODE_ENV'),
 false
);
/**
 * __DEV__ in process.env.NODE_ENV !== 'production'
 */
const DEV_EXPRESSION = types.binaryExpression(
 '!==', PROCESS_ENV, types.stringLiteral('production')
);
/**
 * Solo considera el valor para test, si algunos de los entornos
 * en el match están establecidos.
 */
const TEST_MATCH = types.binaryExpression(
 '===', PROCESS_ENV, types.stringLiteral('test')
);
const TESTING_MATCH = types.binaryExpression(
 '===', PROCESS_ENV, types.stringLiteral('testing')
);

const TESTING_EXPRESSION = types.logicalExpression(
 '||', TEST_MATCH, TESTING_MATCH
);

module.exports = {
 __DEV__: DEV_EXPRESSION,
 __TEST__: TESTING_EXPRESSION
};

const types = require('@babel/types');


function createExpresionAssignOfPromise(requireString){
 return (
  types.expressionStatement(
   types.assignmentExpression('=', types.identifier('Promise'),
   types.callExpression(types.identifier('require'), [types.stringLiteral(requireString)]))
  )
 );
}

const MODULE_FALLBACK_PROMISE = module.exports.MODULE_FALLBACK_PROMISE = 'core-js-pure/features/promise';

const makeDeclaration = module.exports.makeDeclaration = function makeDeclarationWithDeclarator(declarator){
 return [
  types.variableDeclaration('let', [types.variableDeclarator(types.identifier('Promise'))]),
  types.tryStatement(
   types.blockStatement([
    createExpresionAssignOfPromise('Promise')
   ]),
   types.catchClause(
    types.identifier('e'),
    types.blockStatement([
     types.expressionStatement(
      types.callExpression(
       types.memberExpression(
        types.identifier('console'),
        types.identifier('warn')
       ),
       [types.stringLiteral('Module native promise not found, try obtain of babel polyfill configuration')]
      )
     ),
     createExpresionAssignOfPromise(MODULE_FALLBACK_PROMISE)
    ])
   )
  )
 ]
}

module.exports.declaration = makeDeclaration();

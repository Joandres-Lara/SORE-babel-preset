const types = require('@babel/types');
const { MODULE_FALLBACK_PROMISE } = require('./declaration');

const isPromiseFallbackExpresion = module.exports.isPromiseFallbackExpresion = function(expression){
 const { right, left } = expression;
 return (
  types.isIdentifier(left) && left.name === 'Promise'
 ) && (
  types.isCallExpression(right) && types.isIdentifier(right.callee) &&
  right.callee.name === 'require' && right.arguments.find((arg) => {
   return types.isStringLiteral(arg) && arg.value === MODULE_FALLBACK_PROMISE;
  }) !== undefined
 );
}

module.exports.searchDeclarationPromiseFallback = (node) => {

 if(!types.isTryStatement(node)){
  return false;
 }

 const { handler } = node;

 if(!types.isCatchClause(handler)){
  return false;
 }

 if(!types.isBlockStatement(handler.body)){
  return false;
 }

 const { body } = handler.body;

 for(let nodeBlock of body){
  if(types.isExpressionStatement(nodeBlock)){
   if(types.isAssignmentExpression(nodeBlock.expression)){
    if(isPromiseFallbackExpresion(nodeBlock.expression)){
     return true;
    }
   }
  }
 }
}

module.exports.isPromiseDeclaration = function isPromiseDeclaration(node){
 const declarationFinded = node.declarations.find((node) => node.id.name === 'Promise');
 return declarationFinded !== undefined && node.kind === 'const';
}

const types = require('@babel/types');
const {
 searchDeclarationPromiseFallback,
 isPromiseFallbackExpresion
} = require('./is-promise-declaration');

module.exports = function needDeclaration(path){
 let need = false, finded = null;

 function findedPromiseIdentifier(node){

  if(node === undefined || node === null){
   return false;
  }

  if(types.isIdentifier(node)){
   need = node.name == 'Promise';
   return need;
  }

  if(types.isBlockStatement(node)){
   return node.body.find(findedPromiseIdentifier) !== undefined;
  }

  if(types.isExpressionStatement(node)){
   return findedPromiseIdentifier(node.expression.right);
  }

  if(types.isFunctionExpression(node)){
   return findedPromiseIdentifier(node.body);
  }

  if(types.isIfStatement(node)){
   return findedPromiseIdentifier(node.consequent) || findedPromiseIdentifier(node.alternate);
  }

  if(types.isReturnStatement(node)){
   return findedPromiseIdentifier(node.argument);
  }

  if(types.isNewExpression(node)){
   return findedPromiseIdentifier(node.callee);
  }

  return need;
 }

 for(let node of path.node.body){
  // Revisa si existe una declaración previa
  // para el fallback de la promesa
  if(searchDeclarationPromiseFallback(node)){
   break;
  }
  // El primer identificador con el nombre de las promesas
  // hace que se inserté el código anterior.
  if(findedPromiseIdentifier(node)){
   break;
  }
 }
 return need;
}

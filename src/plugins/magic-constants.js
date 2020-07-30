'use strict';

const constants = require('./magic-constants/constants');
const types = require('@babel/types')
/**
 * Cambia las constantes mágicas para el archivo.
 *
 * @return {object}
 */
module.exports = function magicConstants(){
 return {
  name: 'magic-constants',
  visitor: {
   Program: {
    exit(path){
     for(const key in constants){
      // Ignore constants
      // If file set
      if(path.scope.hasBinding(key)) continue;
      const expression = types.variableDeclarator(types.identifier(key),constants[key]);
      const declaration = types.variableDeclaration('const', [expression]);
      path.node.body.unshift(declaration);
     }
    }
   }
  }
 }
}

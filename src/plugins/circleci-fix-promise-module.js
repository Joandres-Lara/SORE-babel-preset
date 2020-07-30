'use strict';

const { declaration, makeDeclaration } = require('./circleci-fix-promise-module/declaration');
const needDeclaration = require('./circleci-fix-promise-module/need-declaration');
const { isPromiseDeclaration } = require('./circleci-fix-promise-module/is-promise-declaration');

module.exports = function circleCIFixPromiseModule(){
 return {
  name: 'circle-ci-fix-promise-module',
  visitor: {
   VariableDeclaration(path){

    if(!isPromiseDeclaration(path.node)){
     return;
    }

    path.replaceWithMultiple(makeDeclaration(path.node));
   },
   Program: {
    exit(path){

     if(!needDeclaration(path)){
      return;
     }

     path.node.body = declaration.concat(path.node.body);
    }
   }
  }
 }
}

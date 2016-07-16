/**
 * UserProxy.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
'use strict';
module.exports = {

  attributes: {
    userName:{
      type:'string'
    },

    proxyHost:{
      type:'string'
    },

    proxyPort:{
      type:'string'
    }
  }
};


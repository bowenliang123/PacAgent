/**
 * UserProxy.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
'use strict';
module.exports = {

  attributes: {
    //名称
    name: {
      type: 'string'
    },

    /**
     * 路由规则
     */
    rules:{
      collection:'rule',
      via:'owner'
    },

    //创建
    createTime: {
      type: 'datetime'
    },

    // 更新时间
    updateTime: {
      type: 'datetime'
    },
  }
};
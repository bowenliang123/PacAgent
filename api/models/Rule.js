/**
 * Rule.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        //代理地址(如localhost:8888)
        proxyPath: {
            type: 'string'
        },

        //是否启用
        isEnabled: {
            type: 'boolean'
        },

        //创建时间
        createTime: {
            type: 'datetime'
        },


        // 指向所属proxy
        owner: {
            model: 'proxy'
        }
    },
};


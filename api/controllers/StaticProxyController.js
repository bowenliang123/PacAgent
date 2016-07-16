/**
 * ProxyController
 *
 * @description :: Server-side logic for managing Proxies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';

module.exports = {
    /**
     * 提供直接设定proxy地址的方法
     * @param req
     * @param res
     */
    staticProxy: function (req, res) {
        let proxyPath = req.param('proxyPath').split(':');
        let host = proxyPath[0];
        let port = proxyPath[1];
        return res.view('proxy', {proxyHost: host, proxyPort: port});
    }
}
;


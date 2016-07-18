/**
 * PacController
 *
 * @description :: Server-side logic for managing Pacs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';

/**
 * 渲染PAC文件
 * @param res
 * @param viewName
 * @param proxy
 */
let renderPac = (res, viewName, proxy)=> {
    if (!res) {
        return;
    }

    //使用模板进行渲染, 显式要求不使用layout
    if (!proxy) {
        return res.view('default-pac', {layout: ''});
    } else {
        return res.view('pac', {layout: '', proxy: proxy});
    }
};

module.exports = {
    /**
     * 返回指定用户的PAC文件
     * @param req
     * @param res
     */
    pac: (req, res)=> {
        let name = req.param('name');

        Proxy.findOne({
            name: name
        })
            .populate('rules')
            .exec((err, proxy)=> {
                if (err) {
                    return res.negotiate(err);
                }

                console.log(JSON.stringify(proxy));

                //渲染PAC文件
                return renderPac(res, 'pac', proxy);
            });
    },


    /**
     * 返回指定用户的PAC文件
     * @param req
     * @param res
     */
    set: (req, res)=> {
        let name = req.param('name');
        let proxyPath = req.param('proxyPath');

        let newRule = {
            proxyPath: proxyPath,
            isEnabled: true,
            createTime: new Date()
        };

        Proxy.findOne({
            name: name
        })
            .populate('rules')
            .exec((err, proxy)=> {
                    if (err) {
                        return res.negotiate(err);
                    }
                    if (!proxy) {
                        //not found, create a new proxy info
                        let newProxy = {
                            name: name,
                            rules: [newRule],
                            createTime: new Date(),
                            updateTime: new Date(),
                        };

                        Proxy.create(newProxy)
                            .exec((err, created) => {
                                if (err) {
                                    return res.negotiate(err);
                                }

                                return res.send(created);
                            });
                    } else {
                        // found, update the proxy info
                        let newProxy = {
                            name: name,
                            rules: [newRule],
                            updateTime: new Date(),
                        };

                        Proxy.update({name: name}, newProxy)
                            .exec((err, updated) => {
                                if (err) {
                                    return res.negotiate(err);
                                }

                                return res.send(updated);
                            });
                    }
                }
            );
    }

};
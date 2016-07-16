/**
 * PacController
 *
 * @description :: Server-side logic for managing Pacs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';
module.exports = {
    /**
     * 返回指定用户的PAC文件
     * @param req
     * @param res
     */
    pac: function (req, res) {
        let userName = req.param('userName');

        UserProxy.findOne({
            userName: userName
        }).exec(function (err, userProxy) {
            if (err) {
                return res.negotiate(err);
            }
            if (!userProxy) {

                UserProxy.create({
                    userName: userName,
                    proxyHost: '1.2.3.4',
                    proxyPort: '9999'
                }).exec(function createCB(err, created) {

                    //渲染PAC文件
                    let host = created.proxyHost;
                    let port = created.proxyPort;
                    return res.view('pac', {userName: created.userName, proxyHost: host, proxyPort: port});
                });
            } else {


                //渲染PAC文件
                let host = userProxy.proxyHost;
                let port = userProxy.proxyPort;
                return res.view('pac', {userName: userName, proxyHost: host, proxyPort: port});
            }
        });
    },


    /**
     * 返回指定用户的PAC文件
     * @param req
     * @param res
     */
    set: function (req, res) {
        let userName = req.param('userName');

        let proxyPath = req.param('proxyPath').split(':');
        let proxyHost = proxyPath[0];
        let proxyPort = proxyPath[1];

        UserProxy.findOne({
            userName: userName
        }).exec(function (err, userProxy) {
                if (err) {
                    return res.negotiate(err);
                }
                if (!userProxy) {

                    UserProxy.create({
                        userName: userName,
                        proxyHost: proxyHost,
                        proxyPort: proxyPort
                    }).exec(function createCB(err, created) {
                        if (err) {
                            return res.negotiate(err);
                        }

                        return res.send('created ' + JSON.stringify(created));
                    });
                } else {
                    UserProxy.update({
                            userName: userName
                        },
                        {
                            userName: userName,
                            proxyHost: proxyHost,
                            proxyPort: proxyPort
                        }
                    ).exec(function createCB(err, updated) {
                        if (err) {
                            return res.negotiate(err);
                        }

                        return res.send('updated ' + JSON.stringify(updated));
                    });
                }
            }
        )
        ;
    }

}
;


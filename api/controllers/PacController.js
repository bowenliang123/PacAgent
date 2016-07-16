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
 * @param userProxy
 */
let renderPac = (res, viewName, userProxy)=> {
    if (!res) {
        return;
    }
    return res.view(viewName, {userProxy: userProxy});
};

module.exports = {
    /**
     * 返回指定用户的PAC文件
     * @param req
     * @param res
     */
    pac: (req, res)=> {
        let userName = req.param('userName');

        UserProxy.findOne({
            userName: userName
        }).exec((err, userProxy)=> {
            if (err) {
                return res.negotiate(err);
            }

            //渲染PAC文件
            return renderPac(res, 'pac', userProxy);
        });
    },


    /**
     * 返回指定用户的PAC文件
     * @param req
     * @param res
     */
    set: (req, res)=> {
        let userName = req.param('userName');

        let proxyPath = req.param('proxyPath').split(':');
        let proxyHost = proxyPath[0];
        let proxyPort = proxyPath[1];

        UserProxy.findOne({
            userName: userName
        }).exec((err, userProxy)=> {
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


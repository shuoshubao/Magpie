/*
 * @Author: fangt11
 * @Date:   2021-07-05 14:35:18
 * @Last Modified by:   fangt11
 * @Last Modified time: 2021-11-12 14:27:34
 */

import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import RouterConfig from './config';

const dealRouter = () => {
    const ret = [];
    RouterConfig.forEach(v => {
        const { children = [] } = v;
        if (children.length) {
            children.forEach(v2 => {
                ret.push({ ...v2, categoryName: v.name });
            });
        } else {
            ret.push({ ...v, categoryName: null });
        }
    });
    return ret;
};

const RouterConfigList = dealRouter();

export const RenderRouter = () => {
    return (
        <HashRouter>
            <Switch>
                {RouterConfigList.map((item, index) => {
                    const { path, to, exact } = item;
                    const key = [index, path, item.from, to].join('_');
                    if (to) {
                        // 重定向
                        if (item.from) {
                            return <Redirect key={key} from={item.from} to={to} exact={exact} />;
                        }
                        // 默认页面
                        return <Redirect key={key} to={to} />;
                    }
                    const Component = item.component;
                    const component = () => {
                        return <Component routes={item.routes} redirect={item.redirect} />;
                    };
                    return <Route path={path} key={key} exact={exact} render={component} />;
                })}
            </Switch>
        </HashRouter>
    );
};

export { RouterConfig };

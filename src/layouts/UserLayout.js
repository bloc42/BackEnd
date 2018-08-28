import React, { Fragment } from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';
import { getRoutes, getPageQuery, getQueryPath } from '../utils/utils';

function getLoginPathWithRedirectPath() {
  const params = getPageQuery();
  const { redirect } = params;
  return getQueryPath('/user/login', {
    redirect,
  });
}

class UserLayout extends React.PureComponent {
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'Bloc42';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - Bloc42`;
    }
    return title;
  }

  render() {
    const { routerData, match } = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>Bloc42</span>
                </Link>
              </div>
              <div className={styles.desc}>Bloc42 是最具深度的中文区块链社区</div>
            </div>
            <Switch>
              {getRoutes(match.path, routerData).map(item => (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              ))}
              <Redirect from="/user" to={getLoginPathWithRedirectPath()} />
            </Switch>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;

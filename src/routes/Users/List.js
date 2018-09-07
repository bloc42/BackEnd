import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Card,
  Table
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect(({ list, loading }) => ({
  list,
  loading: loading.effects['list/fetchUsersList'],
}))
export default class List extends Component {
  state = {
    cursor:"",
    limit:100
  };
  componentDidMount() {
    const { cursor,limit } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetchUsersList',
      payload: {
        cursor,
        limit
      }
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetchUsersList',
      payload: {
        cursor,
        limit
      }
    });
  }

  render() {
    const { list, loading } = this.props;
    const {
      userlist,
    } = list;
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
      },
      {
        title: '用户名',
        dataIndex: 'user',
        key: 'user',
        render: text => <a href="/">{text}</a>,
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '帖子数',
        dataIndex: 'postcount',
        key: 'postcount',
      },
      {
        title: '评论数',
        dataIndex: 'commentcount',
        key: 'commentcount',
      },
      {
        title: '综合得分',
        dataIndex: 'rank',
        key: 'rank',
      }
    ];
    return (
      <PageHeaderLayout title="用户列表">
      <Card>
        <Table
          rowKey={record => record.index}
          size="small"
          loading={loading}
          columns={columns}
          dataSource={userlist}
        />
      </Card>
      </PageHeaderLayout>
    );
  }
}

import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Card,
  Table
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect(({ list, loading }) => ({
  list,
  loading: loading.effects['list/fetchPostsList'],
}))
export default class List extends Component {
  state = {
    cursor:"",
    limit:100
  };
  componentDidMount() {
    const { dispatch } = this.props;
    const channel = this.props.match.params[0]
    dispatch({
      type: 'list/fetchPostsList',
      payload: {
        sort: 'time',
        channel:channel
      }
    });
  }
  componentDidUpdate (prevProps) {
    // 当 url 参数参数发生改变时，重新进行请求
    let oldurl = prevProps.match.url;
    let newurl = this.props.match.url;
    if (newurl !== oldurl) this.handleSortByTime();
}
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/clear'
    });
  }
  handleSortByComment(){
    const { dispatch } = this.props;
    const channel = this.props.match.params[0]
    return {
      onClick: () => {
        dispatch({
          type: 'list/fetchPostsList',
          payload: {
            sort: 'comment',
            channel:channel
          }
        })
      }
    }
  }
  handleSortByTime(){
    const { dispatch } = this.props;
    const channel = this.props.match.params[0]
    return {
      onClick: () => {
        dispatch({
          type: 'list/fetchPostsList',
          payload: {
            sort: 'time',
            channel:channel
          }
        })
      }
    }
  }
  handleSortByClick(){
    const { dispatch } = this.props;
    const channel = this.props.match.params[0]
    return {
      onClick: () => {
        dispatch({
          type: 'list/fetchPostsList',
          payload: {
            sort: 'click',
            channel:channel
          }
        })
      }
    }
  }
  render() {
    const { list, loading } = this.props;
    const {
      postlist,
    } = list;
    const columns = [
        {
          title: '序号',
          dataIndex: 'index',
          key: 'index',
        },
        {
          title: '帖子',
          dataIndex: 'post',
          key: 'post',
          render: text => <a href="/">{text}</a>,
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: true,
            onHeaderCell: row => this.handleSortByTime(row)
          },
        {
          title: '评论数',
          dataIndex: 'commentcount',
          key: 'commentcount',
          sorter: true,
          onHeaderCell: row => this.handleSortByComment(row)
        },
        {
          title: '点击数',
          dataIndex: 'clickcount',
          key: 'clickcount',
          sorter: true,
          onHeaderCell: row => this.handleSortByClick(row)
        },
        {
          title: '发帖人',
          dataIndex: 'author',
          key: 'author'
        },
        {
            title: '最后读者',
            dataIndex: 'lastReader',
            key: 'lastReader',
            align: 'right',
          }
      ];
    return (
      <PageHeaderLayout title="帖子列表">
      <Card>
        <Table
          rowKey={record => record.index}
          size="small"
          loading={loading}
          columns={columns}
          dataSource={postlist}
        />
      </Card>
      </PageHeaderLayout>
    );
  }
}

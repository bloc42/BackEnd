import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Tabs,
  Table,
  DatePicker,
} from 'antd';
import {
  Bar,
  TimelineChart,
} from 'components/Charts';
import { getTimeDistance } from '../../utils/utils';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Analysis.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['/fetchPostsData'],
}))
export default class Analysis extends Component {
  state = {
    currentTabKey: 'bartab',
    rangePickerValue: getTimeDistance('year'),
    dateType: 'today'
  };

  componentDidMount() {
    const { currentTabKey, rangePickerValue,dateType } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchPostsData',
      payload: {
        dateType,
        currentTabKey,
        rangePickerValue
      }
    });
    dispatch({
      type: 'chart/fetchHotPostsData',
      payload: {
        sort: 'comment'
      }
    })
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };

  handleRangePickerChange = rangePickerValue => {
    this.setState({
      rangePickerValue,
    });

    const { currentTabKey, dateType } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchPostsData',
      payload: {
        dateType,
        currentTabKey,
        rangePickerValue
      }
    });
  };

  selectDate = type => {
    const nowvalue = getTimeDistance(type)
    this.setState({
      dateType: type,
      rangePickerValue: nowvalue,
    });
    const { currentTabKey } = this.state;
    const dateType = type;
    const rangePickerValue = nowvalue;
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchPostsData',
      payload: {
        dateType,
        currentTabKey,
        rangePickerValue
      }
    });
  };

  isActive(type) {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
  }

  handleSortByComment(){
    const { dispatch } = this.props;
    return {
      onClick: () => {
        dispatch({
          type: 'chart/fetchHotPostsData',
          payload: {
            sort: 'comment'
          }
        })
      }
    }
  }

  handleSortByClick(){
    const { dispatch } = this.props;
    return {
      onClick: () => {
        dispatch({
          type: 'chart/fetchHotPostsData',
          payload: {
            sort: 'click'
          }
        })
      }
    }
  }

  render() {
    const { rangePickerValue, currentTabKey } = this.state;
    const { chart, loading,dispatch } = this.props;
    const {
      postsData,
      hotPostsData,
      searchData
    } = chart;

    const salesExtra = (
      <div className={styles.salesExtraWrap}>
        <div className={styles.salesExtra}>
          <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>
            今日
          </a>
          <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
            本周
          </a>
          <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
            本月
          </a>
          <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
            全年
          </a>
        </div>
        <RangePicker
          value={rangePickerValue}
          onChange={this.handleRangePickerChange}
          style={{ width: 256 }}
        />
      </div>
    );

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
        key: 'author',
        align: 'right',
      },
    ];

    return (
      <PageHeaderLayout title="帖子分析">
      <Fragment>
        <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
          <div className={styles.salesCard}>
            <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{ marginBottom: 24 }}>
              <TabPane tab="帖子增长明细" key="sales">
                <Row>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar height={295} data={postsData} />
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Card>

        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              bordered={false}
              title="热帖"
              style={{ marginTop: 24 }}
            >
              <Table
                rowKey={record => record.index}
                size="small"
                columns={columns}
                dataSource={hotPostsData}
              />
            </Card>
          </Col>
        </Row>
      </Fragment>
      </PageHeaderLayout>
    );
  }
}

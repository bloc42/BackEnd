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
  loading: loading.effects['chart/fetchUsersData'],
}))
export default class Analysis extends Component {
  state = {
    currentTabKey: 'bartab',
    rangePickerValue: getTimeDistance('week'),
    dateType: 'week'
  };

  componentDidMount() {
    const { currentTabKey, rangePickerValue,dateType } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchUsersData',
      payload: {
        dateType,
        currentTabKey,
        rangePickerValue
      }
    });
    dispatch({
      type: 'chart/fetchHotUsersData',
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
      type: 'chart/fetchUsersData',
      payload: {
        dateType,
        currentTabKey,
        rangePickerValue
      }
    });
  };

  selectDate = type => {
    const nowvalue = getTimeDistance(type)
    console.error(nowvalue)
    this.setState({
      dateType: type,
      rangePickerValue: nowvalue,
    });
    const { currentTabKey } = this.state;
    const dateType = type
    const rangePickerValue = nowvalue
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchUsersData',
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

  render() {
    const { rangePickerValue, currentTabKey } = this.state;
    const { chart, loading } = this.props;
    const {
      usersData,
      hotUsersData,
      salesData,
      searchData,
      offlineData,
      offlineChartData
    } = chart;
    const salesExtra = (
      <div className={styles.salesExtraWrap}>
        <div className={styles.salesExtra}>
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
        title: '用户名',
        dataIndex: 'user',
        key: 'user',
        render: text => <a href="/">{text}</a>,
      },
      {
        title: '发帖数',
        dataIndex: 'postcount',
        key: 'postcount',
        className: styles.alignRight,
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
        align: 'right',
      },
    ];
    return (
      <PageHeaderLayout title="用户分析">
      <Fragment>
        <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
          <div className={styles.salesCard}>
            <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{ marginBottom: 24 }}>
              <TabPane tab="用户增长明细" key="bartab">
                <Row>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar height={295} data={usersData} />
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
              title="活跃用户"
              style={{ marginTop: 24 }}
            >
              <Table
                rowKey={record => record.index}
                size="small"
                columns={columns}
                dataSource={hotUsersData}
              />
            </Card>
          </Col>
        </Row>
      </Fragment>
      </PageHeaderLayout>
    );
  }
}

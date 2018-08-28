import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Tabs,
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
  loading: loading.effects['chart/fetchCommentsData'],
}))
export default class Analysis extends Component {
  state = {
    currentTabKey: 'bartab',
    rangePickerValue: getTimeDistance('today'),
    dateType: 'today'
  };

  componentDidMount() {
    const { currentTabKey, rangePickerValue,dateType } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchCommentsData',
      payload: {
        dateType,
        currentTabKey,
        rangePickerValue
      }
    });
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
    console.log(rangePickerValue[0].toISOString())
    console.log(rangePickerValue[1].toISOString())
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchCommentsData',
      payload: {
        dateType,
        currentTabKey,
        rangePickerValue
      }
    });
  };

  selectDate = type => {
    console.log(type)
    const nowvalue = getTimeDistance(type)
    this.setState({
      dateType: type,
      rangePickerValue: nowvalue,
    });
    const { currentTabKey } = this.state;
    const dateType = type
    const rangePickerValue = nowvalue
    console.log(getTimeDistance(type)[0].toISOString())
    console.log(getTimeDistance(type)[1].toISOString())
    console.log(rangePickerValue[0].toISOString())
    console.log(rangePickerValue[1].toISOString())
    const { dispatch } = this.props;
    console.log(dateType)
    dispatch({
      type: 'chart/fetchCommentsData',
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
    const { rangePickerValue} = this.state;
    const { chart, loading } = this.props;
    const {
      commentsData,
      salesData,
      offlineChartData
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
    return (
      <PageHeaderLayout title="评论分析">
      <Fragment>
        <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
          <div className={styles.salesCard}>
            <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{ marginBottom: 24 }}>
              <TabPane tab="评论增长明细" key="sales">
                <Row>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar height={295} data={commentsData} />
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Card>
      </Fragment>
      </PageHeaderLayout>
    );
  }
}

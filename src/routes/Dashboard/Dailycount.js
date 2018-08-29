import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Tooltip,
} from 'antd';
import numeral from 'numeral';
import {
  ChartCard,
  MiniArea,
  MiniBar,
  Field,
} from 'components/Charts';
import { getTimeDistance } from '../../utils/utils';

import styles from './Dailycount.less';

const { TabPane } = Tabs;

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetchHotPostsData','chart/fetchHotPostsData','chart/fetchTotalPostCountData','chart/fetchTotalPostCountData','chart/fetchTotalCommentCountData'],
}))
export default class Analysis extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const dateTime = new Date().toISOString();
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    const dayStart = new Date(today - 1000 * 60 * 60 * 24).toISOString();
    const dayEnd = new Date(today - 1).toISOString();
    dispatch({
      type: 'chart/fetchHotPostsData',
      payload: {
        'sort': 'comment'
      }
    })
    dispatch({
      type: 'chart/fetchTotalUserCountData',
      payload: {
        dateTime,
        dayStart,
        dayEnd
      }
    })
    dispatch({
      type: 'chart/fetchTotalPostCountData',
      payload: {
        dateTime,
        dayStart,
        dayEnd
      }
    })
    dispatch({
      type: 'chart/fetchTotalCommentCountData',
      payload: {
        dateTime,
        dayStart,
        dayEnd
      }
    })
    dispatch({
      type: 'chart/fetchUsersData',
      payload: {
        dateType:'today',
        rangePickerValue:[new Date(dayStart),new Date(today)]
      }
    })
    dispatch({
      type: 'chart/fetchPostsData',
      payload: {
        dateType:'today',
        rangePickerValue:[new Date(dayStart),new Date(today)]
      }
    })
    dispatch({
      type: 'chart/fetchCommentsData',
      payload: {
        dateType:'today',
        rangePickerValue:[new Date(dayStart),new Date(today)]
      }
    })
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };

  handleRangePickerChange = rangePickerValue => {
    this.setState({
      rangePickerValue,
    });

    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  selectDate = type => {
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchSalesData',
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
    const { chart, loading } = this.props;
    const {
      visitData,
      visitData2,
      usersData,
      postsData,
      commentsData,
      totalUserCountData,
      totalPostCountData,
      totalCommentCountData,
      hotPostsData
    } = chart;
    console.log(hotPostsData)
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    return (
      <Fragment>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="昨日用户注册数"
              loading={loading}
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={totalUserCountData.day}
              footer={<Field label="用户总数" value={totalUserCountData.total} />}
              contentHeight={46}
            >
              <MiniArea color="#975FE4" data={usersData} />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="昨日新增帖子数"
              loading={loading}
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={totalPostCountData.day}
              footer={<Field label="帖子总数" value={totalPostCountData.total} />}
              contentHeight={46}
            >
              <MiniBar data={postsData} />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="昨日新增评论数"
              loading={loading}
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={totalCommentCountData.day}
              footer={<Field label="评论总数" value={totalCommentCountData.total} />}
              contentHeight={46}
            >
              <MiniArea line height={45} data={commentsData} color="#2fc25b" borderColor="#028a2a"/>
            </ChartCard>
          </Col>
        </Row>

        <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
          <div className={styles.salesCard}>
            <Tabs size="large" tabBarStyle={{ marginBottom: 24 }}>
              <TabPane tab="热帖排名" key="sales">
                <Row>
                  <div className={styles.salesRank}>
                    <h4 className={styles.rankingTitle}>最多评论贴排名</h4>
                    <ul className={styles.rankingList}>
                      {hotPostsData.map((item, i) => (
                        <li key={i}>
                          <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                          <a href="https://bloc42.com/post/" target="_blank">{item.post}</a>
                          <span>{item.commentcount}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Card>

      </Fragment>
    );
  }
}

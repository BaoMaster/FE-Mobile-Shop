import 'firebase/auth';
import 'firebase/firestore';

import { Bar, Line } from '@ant-design/charts';
import { Button, Card, DatePicker } from 'antd';
import firebase from 'firebase/app';
import moment from 'moment';
import React, { Component, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import orderService from '../../../redux/order/order.service';
import { useFirestoreQuery } from './hooks';

// function DemoLine() {
class Revenue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataChart: [],
      year: '2021',
    };
  }
  getData = () => {
    const { dataChart, year } = this.state;
    const arrData = [];
    this.props.getOrder().then((result) => {
      console.log('year', year);
      if (result.data.data.length) {
        for (const i of result.data.data) {
          // if(i.createdAt)
          const date = i.createdAt.split('-');
          if (date[0] === year && i.status === 'delivered') {
            console.log('result', i);
            console.log(date[0], '-', date[1], '-', i.orderId);
            // for (const it of i) {
            if (arrData.length) {
              let check = false;
              for (let itArr = 0; itArr < arrData.length; itArr++) {
                if (arrData[itArr].month === parseInt(date[1])) {
                  console.log(arrData[itArr].value, ' +', i.total);
                  const temp = parseInt(arrData[itArr].value) + parseInt(i.total);
                  arrData[itArr].value = temp;
                  check = true;
                }
                // else {
                //   const obj = {
                //     month: date[1],
                //     value: i.total,
                //   };
                //   arrData.push(obj);
                // }
              }
              if (!check) {
                const obj = {
                  month: parseInt(date[1]),
                  value: i.total,
                };
                arrData.push(obj);
              } else {
                check = false;
              }
            } else {
              const obj = {
                month: parseInt(date[1]),
                value: i.total,
              };
              arrData.push(obj);
            }
          }
        }
        console.log('arr', arrData);
        arrData.sort(function (a, b) {
          return a.month - b.month;
        });
        this.setState({ dataChart: arrData });
      }
    });
  };
  componentDidMount = async () => {
    // firebase.initializeApp({
    //   apiKey: 'AIzaSyDufSr8JhJZ_y7s8OU8slFMjuI3tYJaHik',
    //   authDomain: 'fir-testing-72329.firebaseapp.com',
    //   projectId: 'fir-testing-72329',
    //   storageBucket: 'fir-testing-72329.appspot.com',
    //   messagingSenderId: '30676038536',
    //   appId: '1:30676038536:web:c76c176b2381f38bdb803d',
    //   measurementId: 'G-S88RTGCH4L',
    // });

    const config = {
      projectId: 'fir-testing-72329',
      apiKey: '',
      databaseURL: '',
    };

    this.getData();
  };
  changeYear = async (e) => {
    const yearChange = moment(e).format('YYYY');
    await this.setState({ year: yearChange });
    await this.getData();
  };
  data = [
    {
      month: '1',
      value: 3,
    },
    {
      month: '2',
      value: 16,
    },
    {
      month: '3',
      value: 3.5,
    },
    {
      month: '4',
      value: 5,
    },
    {
      month: '5',
      value: 4.9,
    },
    {
      month: '6',
      value: 6,
    },
    {
      month: '7',
      value: 7,
    },
    {
      month: '8',
      value: 9,
    },
    {
      month: '9',
      value: 13,
    },
    {
      month: '10',
      value: 13,
    },
    {
      month: '11',
      value: 13,
    },
    {
      month: '12',
      value: null,
    },
  ];

  render() {
    const config = {
      data: this.state.dataChart,
      yField: 'value',
      xField: 'month',
      tooltip: {
        customContent: (title, items) => {
          return (
            <>
              <h5 style={{ marginTop: 16 }}>{title}</h5>
              <ul style={{ paddingLeft: 0 }}>
                {items?.map((item, index) => {
                  const { name, value, color } = item;
                  return (
                    <li key={item.year} className='g2-tooltip-list-item' data-index={index} style={{ marginBottom: 4, display: 'flex', alignItems: 'center' }}>
                      <span className='g2-tooltip-marker' style={{ backgroundColor: color }}></span>
                      <span style={{ display: 'inline-flex', flex: 1, justifyContent: 'space-between' }}>
                        <span style={{ margiRight: 16 }}>{name}:</span>
                        <span className='g2-tooltip-list-item-value'>{value}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </>
          );
        },
      },
      point: {
        size: 5,
        shape: 'diamond',
        style: {
          fill: 'white',
          stroke: '#2593fc',
          lineWidth: 2,
        },
      },
    };
    return (
      <div>
        <Card
          header={{ title: 'Product' }}
          extra={
            <>
              <div style={{ marginRight: '830px', fontSize: '20px' }}>
                <span style={{ marginRight: '20px' }}>Revenue Chart</span>
                <DatePicker
                  picker='year'
                  defaultValue={moment('2021', 'YYYY')}
                  onChange={(e) => {
                    this.changeYear(e);
                  }}
                />
              </div>
            </>
          }
        >
          <Line {...config} />
        </Card>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  getOrder: () => dispatch(orderService.getOrder()),
});

export default connect(null, mapDispatchToProps)(withRouter(Revenue));

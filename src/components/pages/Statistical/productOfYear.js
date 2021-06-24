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
class ProductYear extends Component {
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
      console.log('result', result);
      if (result.data.data.length) {
        for (const i of result.data.data) {
          // if(i.createdAt)
          const date = i.createdAt.split('-');
          if (date[0] === year && i.status === 'delivered') {
            console.log('result', i);
            console.log(date[0], '-', date[1], '-', i.orderId);
            // for (const it of i) {
            if (arrData.length < 10) {
              if (arrData.length) {
                for (const item of i.productInfo) {
                  for (let itArr = 0; itArr < arrData.length; itArr++) {
                    if (arrData[itArr].productName === item.productname) {
                      arrData[itArr].sales += item.amount;
                    } else {
                      const obj = {
                        productName: item.productname,
                        sales: item.amount,
                      };
                      arrData.push(obj);
                    }
                  }
                }
              } else {
                for (const item of i.productInfo) {
                  if (arrData.length) {
                    for (let iArr = 0; iArr > arrData.length; iArr++) {
                      if (arrData[iArr].productName === item.productname) {
                        const sum = arrData[iArr].sales + item.amount;
                        arrData[iArr].sales = sum;
                      } else {
                        const obj = {
                          productName: item.productname,
                          sales: item.amount,
                        };
                        arrData.push(obj);
                      }
                    }
                  } else {
                    const obj = {
                      productName: item.productname,
                      sales: item.amount,
                    };
                    arrData.push(obj);
                  }
                }
              }
            }
          }
        }
        console.log('arr', arrData);
        this.setState({ dataChart: arrData });
      }
    });
  };
  componentDidMount = async () => {
    this.getData();
  };
  changeYear = async (e) => {
    const yearChange = moment(e).format('YYYY');
    console.log('yearChange', yearChange);
    await this.setState({ year: yearChange });
    await this.getData();
  };
  data = [
    {
      productName: 'Furniture appliances',
      sales: 38,
    },
    {
      productName: 'Cereals, Oils and Non-staple Food',
      sales: 52,
    },
    {
      productName: 'Fresh fruit',
      sales: 61,
    },
    {
      productName: 'Beauty care',
      sales: 145,
    },
    {
      productName: 'Baby Products',
      sales: 48,
    },
    {
      productName: 'Imported food',
      sales: 38,
    },
    {
      productName: 'Food and drink',
      sales: 38,
    },
    {
      productName: 'Home cleaning',
      sales: 38,
    },
  ];

  render() {
    var config = {
      data: this.state.dataChart,
      xField: 'sales',
      yField: 'productName',
      seriesField: 'productName',
      color: function color(_ref) {
        console.log('_ref', _ref);
        var productName = _ref.productName;
        return productName === 'Beauty care' ? '#FAAD14' : '#5B8FF9';
      },
      legend: false,
      meta: {
        productName: { alias: 'Category' },
        sales: { alias: 'Sales' },
      },
    };
    return (
      <div>
        <Card
          header={{ title: 'Product' }}
          extra={
            <>
              <div style={{ marginRight: '830px', fontSize: '20px' }}>
                <span style={{ marginRight: '20px' }}>Best selling products of the year</span>
                <DatePicker
                  picker='year'
                  defaultValue={moment(new Date(), 'YYYY')}
                  onChange={(e) => {
                    this.changeYear(e);
                  }}
                />
              </div>
            </>
          }
        >
          <Bar {...config} />
        </Card>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  getOrder: () => dispatch(orderService.getOrder()),
});

export default connect(null, mapDispatchToProps)(withRouter(ProductYear));

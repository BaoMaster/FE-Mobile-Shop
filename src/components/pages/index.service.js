import React, { Component } from 'react';

export class BEService extends Component {
  constructor() {
    super();
    this.uri = '/api/web/thong-tin-don-hang-xuat';
  }

  getShipmentExportList(query) {
    console.log('que', query);
    // return this.http.post(`${urlSwagger}/order-base-list`, query);
  }
}

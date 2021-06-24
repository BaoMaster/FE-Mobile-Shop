import axios from 'axios';

// import { UserRoles } from 'src/shared/library/helpers/userRoles';

const orderService = {
  getOrder: () => {
    return (dispatch) => {
      return axios.get(`./api/get-order`);
    };
  },
  getOrderDetail: (orderId) => {
    return () => {
      return axios.get(`./api/get-order-by-id/${orderId}`);
    };
  },
  updateOrder: (orderId, data) => {
    return () => {
      return axios.put(`./api/update-order/${orderId}`, data);
    };
  },
};

export default orderService;

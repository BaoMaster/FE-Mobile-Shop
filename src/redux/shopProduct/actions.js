import axios from 'axios';

// import { UserRoles } from 'src/shared/library/helpers/userRoles';

const shopProductActions = {
  getProduct: () => {
    return (dispatch) => {
      return axios.get(`./shop/api/getproduct`);
    };
  },
  sendMail: (data) => {
    return (dispatch) => {
      return axios.post(`./shop/send`, data);
    };
  },
  addOneInCart: (data) => {
    return (dispatch) => {
      return axios.post(`./shop/api/addoneincart`, data);
    };
  },
  cancelOrder: (id) => {
    return (dispatch) => {
      return axios.get(`./shop/api/cancelorder/${id}`);
    };
  },
  subOneInCart: (data) => {
    return (dispatch) => {
      return axios.post(`./shop/api/suboneincart`, data);
    };
  },
  updateOrder: (data) => {
    return (dispatch) => {
      return axios.post(`./shop/api/updateorder`, data);
    };
  },
  baoOrder: (data) => {
    return (dispatch) => {
      // return axios.post(`./shop/api/updateorder`, data);
      console.log('data', data);
    };
  },
  addToHistory: (data) => {
    return (dispatch) => {
      return axios.post(`./shop/api/addtohistory`, data);
    };
  },
  deleteCartByUserid: (data) => {
    return (dispatch) => {
      return axios.delete(`./shop/api/deletecartbyuserid`, { params: data });
    };
  },
  deleteCheckoutByUserid: (data) => {
    return (dispatch) => {
      return axios.delete(`./shop/api/deletecheckoutbyuserid`, {
        params: data,
      });
    };
  },
  createPdf: (data) => {
    return (dispatch) => {
      return axios.post(`./shop/pdf`, data);
    };
  },

  removeFromCart: (data) => {
    return (dispatch) => {
      return axios.delete(`./shop/api/removefromcart`, { params: data });
    };
  },
  sortPrice: (key) => {
    return (dispatch) => {
      return axios.get(`./shop/api/sort/${key}`);
    };
  },
  sortPriceSearch: (obj) => {
    return (dispatch) => {
      return axios.get(`./shop/api/sortonsearch/${obj}`);
    };
  },
  getInfoFromCheckout: (userid) => {
    return (dispatch) => {
      return axios.get(`./shop/api/getinfofromcheckout/${userid}`);
    };
  },
  findBrand: (brand) => {
    return (dispatch) => {
      return axios.get(`./shop/api/findbrand/${brand}`);
    };
  },

  deleteProduct: (productId) => {
    return (dispatch) => {
      return axios.delete(`./products/api/deleteproduct/${productId}`);
    };
  },
  addToCheckout: (product) => {
    return (dispatch) => {
      return axios.post(`./shop/api/addtocheckout`, product);
    };
  },
  searchApi: (keyword) => {
    return (dispatch) => {
      return axios.get(`./shop/api/search/${keyword}`);
    };
  },
  addProductToCart: (product) => {
    return (dispatch) => {
      return axios.post(`./shop/api/addproducttocart`, product);
    };
  },
  updateProduct: (productId, product) => {
    return (dispatch) => {
      return axios.put(`./products/api/update/${productId}`, product);
    };
  },
  getProductById: (productId) => {
    return (dispatch) => {
      return axios.get(`./shop/api/getproductbyid/${productId}`);
    };
  },
};

export default shopProductActions;

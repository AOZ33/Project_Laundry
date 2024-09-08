import { axiosInstance } from "../../lib/axios";

export const getProduct = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("nilai token");
    if (!token) {
      throw new Error("No token found");
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.get("/products", { headers });
    dispatch({
      type: "GET_PRODUCT",
      payload: response.data.data,
    });
  } catch (error) {
    console.log("ERROR FETCHING DATA", error);
  }
};

export const putProduct = (updatedProduct) => async (dispatch) => {
  try {
    const token = localStorage.getItem("nilai token");
    if (!token) {
      throw new Error("No token found");
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.put(
      "/products",
      { headers },
      updatedProduct
    );
    dispatch({
      type: "PUT_PRODUCT",
      payload: response.data.data,
    });
  } catch (error) {
    console.log("ERROR UPDATING DATA", error);
  }
};

export const postProduct = (newProduct) => async (dispatch) => {
  try {
    const token = localStorage.getItem("nilai token");
    if (!token) {
      throw new Error("No token found");
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.post(
      "/products",
      { headers },
      newProduct
    );
    dispatch({
      type: "POST_PRODUCT",
      payload: response.data.data,
    });
    dispatch(getProduct());
  } catch (error) {
    console.log("ERROR POSTING DATA", error);
  }
};

export const delProduct = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("nilai token");
    if (!token) {
      throw new Error("No token found");
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.delete(`/products/${id}`, { headers });
    dispatch({
      type: "DEL_PRODUCT",
      payload: id,
    });
    dispatch(getProduct());
  } catch (error) {
    console.log("ERROR DELETING DATA", error);
  }
};

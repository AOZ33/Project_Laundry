import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

export const getBill = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("nilai token");
    if (!token) {
      throw new Error("No token found");
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.get("/bills", { headers });
    dispatch({
      type: "GET_BILL",
      payload: response.data.data,
    });
  } catch (error) {
    console.log("ERROR FETCHING DATA", error);
  }
};

export const postBill = (newBill) => async (dispatch) => {
  try {
    const token = localStorage.getItem("nilai token");
    if (!token) {
      throw new Error("No token found");
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.post("/bills", newBill, { headers });
    dispatch({
      type: "POST_BILL",
      payload: response.data.data,
    });
    toast.success('Transaksi Berhasil di Tambahkan');
    dispatch(getBill());
  } catch (error) {
    console.log("ERROR POSTING DATA", error);
  }
};

export const getDetailBill = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("nilai token");
    if (!token) {
      throw new Error("No token found");
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.get(`/bills/${id}`, { headers });
    dispatch({
      type: "GET_DETAIL_BILL",
      payload: response.data.data,
    });
  } catch (error) {
    console.log("ERROR FETCHING DATA", error);
  }
};

import axiosInstance from "../axios-instance";
import axios from "axios";

const get_xref = async (code: string | null) => {
  const response = await axiosInstance.get(
    `https://renovaapi-heroku-20.herokuapp.com/bot/xref?article=${code}`
  );
  // console.log("AXIOS", response.data);
  return response.data;
};

const get_sku = async (code: string | null) => {
  const response = await axios.get(
    `https://renovaapi-heroku-20.herokuapp.com/bot/getSpecificArticle?article=${code}`
  );

  return response.data;
};

const get_balance = async (phoneNumber: string | null) => {
  const response = await axios.get(
    `https://renovaapi-heroku-20.herokuapp.com/bot/getBalance?phoneNumber=${phoneNumber}`
  );

  return response.data;
};

const get_client_number_by_phone_number = async (
  phoneNumber: string | null
) => {
  const response = await axios.get(
    `https://renovaapi-heroku-20.herokuapp.com/bot/getClientNumberByPhoneNumber?phoneNumber=${phoneNumber}`
  );

  return response.data;
};

export { get_xref, get_sku, get_balance, get_client_number_by_phone_number };

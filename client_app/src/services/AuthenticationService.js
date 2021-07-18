import axios from "axios";
import { API_ROUTES } from "../utils/enums";

export const sendCreateAccountRequest = async data => {
  const result = await axios.post(API_ROUTES.CREATE_ACCOUNT, data);
  return result.data;
};
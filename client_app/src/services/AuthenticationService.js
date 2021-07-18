import { API_ROUTES } from "../utils/enums";

export const sendCreateAccountRequest = async data => {
  try {
    const jsonResponse = await fetch(API_ROUTES.CREATE_ACCOUNT, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data)
    });
    const response = await jsonResponse.json();
    
    return [response, null];
  } catch (e) {
    console.error(e);
    return [null, e];
  }
};
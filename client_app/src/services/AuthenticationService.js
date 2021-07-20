import { API_ROUTES } from "../utils/enums";

// TODO Extract the boilerpalte code into its own function ?
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

    if (jsonResponse.status !== 201) {
      throw Error(jsonResponse.status);
    }

    const response = await jsonResponse.json();

    return [response, null];
  } catch (e) {
    console.error(e);
    return [null, e];
  }
};

export const verifyPhoneNumber = async data => {
  try {
    const jsonResponse = await fetch(
      API_ROUTES.VERIFY_PHONE.replace(":accountId", data.accountId),
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ code: data.code })
      }
    );

    if (jsonResponse.status !== 201) {
      throw new Error(jsonResponse.status);
    }

    const response = await jsonResponse.json();

    return [ response, null ];
  } catch (e) {
    console.error(e);
    return [ null, e ];
  }
};
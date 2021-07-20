export const ROUTES = {
  SIGN_IN : "/signin",
  SIGN_UP : "/signup",
  WELCOME : "/welcome",
  INIT : "/",
  SETTINGS: "/settings",
  SEARCH: "/search",
  CHAT: "/chat",
  CREATE_LISTING: "/create/listing",
  SAVED_ITEMS: "/saved",
  PROFILE: "/{id}",
  VERIFICATION: "/verification",
};

export const API_ROUTES = {
  // TODO dont hardcode this path RENT-66
  CREATE_ACCOUNT: "http://localhost:8000/api/auth/create-account",
  VERIFY_PHONE: "http://localhost:8000/api/auth//activate-account/:accountId",
};

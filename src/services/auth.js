import { AppApiFetch, AppConstant } from "../utils";

const { login } = AppConstant;

export default async function authApi(url, options) {
  const response = await AppApiFetch(url, options);
  const jsonData = await response.json();
  if (response.ok) {
    return {
      status: true,
      data: jsonData,
    };
  } else {
    return {
      status: false,
      data: null,
      message: jsonData.error,
    };
  }
}

authApi.login = (body) => {
  const options = {
    method: "POST",
    body,
  };
  return authApi(login.api, options);
};

authApi.register = (body) => {
  const options = {
    method: "POST",
    body,
  };
  return authApi(login.register, options);
};

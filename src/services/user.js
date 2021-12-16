import { AppApiFetch, AppConstant } from "../utils";

const { user } = AppConstant;

export default async function userApi(options) {
  let jsonData = {};
  try {
    const response = await AppApiFetch(user.api, options);
    jsonData = await response.json();
    if (response.ok) {
      return {
        status: true,
        data: jsonData.data,
        page: jsonData.page,
        per_page: jsonData.per_page,
        total: jsonData.total,
        total_pages: jsonData.total_pages,
      };
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : jsonData);
  }
}

userApi.get = (page, per_page) => {
  const options = {
    method: "GET",
    queryParams: { page, per_page },
  };
  return userApi(options);
};

userApi.post = (body) => {
  const options = {
    method: "POST",
  };

  return userApi(options);
};

userApi.update = (id, body) => {
  const options = {
    method: "UPDATE",
  };

  return userApi(options);
};

userApi.delete = (id) => {
  const options = {
    method: "DELETE",
  };

  return userApi(options);
};

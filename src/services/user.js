import { AppApiFetch, AppConstant } from "../utils";

const { user } = AppConstant;

export default async function userApi(url, options) {
  let jsonData = {};
  try {
    const response = await AppApiFetch(url, options);
    if (response.ok) {
      switch (response.status) {
        case 200:
          jsonData = await response.json();
          if (jsonData.page) {
            return {
              status: true,
              data: jsonData.data,
              page: jsonData.page,
              per_page: jsonData.per_page,
              total: jsonData.total,
              total_pages: jsonData.total_pages,
            };
          } else {
            return {
              status: true,
              data: jsonData.data,
              message: "Updated.",
            };
          }
        case 201:
          jsonData = await response.json();
          return {
            status: true,
            data: jsonData.id,
            message: "Created.",
          };
        case 204:
          return {
            status: true,
            data: null,
            message: "Deleted.",
          };
        default:
          return {
            status: false,
            data: null,
            message: "Service Error.",
          };
      }
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message);
  }
}

userApi.get = (page, per_page) => {
  const options = {
    method: "GET",
    queryParams: { page, per_page },
  };
  return userApi(user.api, options);
};

userApi.post = (body) => {
  const options = {
    method: "POST",
    body,
  };
  return userApi(user.api, options);
};

userApi.update = (id, body) => {
  const options = {
    method: "PUT",
    body,
  };
  const url = `${user.api}/${id}`;
  return userApi(url, options);
};

userApi.delete = (id) => {
  const options = {
    method: "DELETE",
  };
  const url = `${user.api}/${id}`;
  return userApi(url, options);
};

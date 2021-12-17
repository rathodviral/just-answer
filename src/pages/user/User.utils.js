import { toggleLoader, updateAfterPagination } from "../../reducers";
import { userApi } from "../../services";

export const updateUserWithCurrentPage = async (
  dispatch,
  page,
  istoggleLoader = false
) => {
  if (istoggleLoader) {
    dispatch(toggleLoader(true));
  }
  const response = await userApi.get(page, 5);
  dispatch(updateAfterPagination(response));
};

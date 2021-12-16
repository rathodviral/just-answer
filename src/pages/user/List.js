import React, { useState } from "react";
import { List, makeStyles, Typography } from "@material-ui/core";
import {
  AppCard,
  AppDivider,
  AppEditDialog,
  AppListItem,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  startLoader,
  updateAfterPagination,
  userList,
  userListPageDetail,
} from "../../reducers";
import { Pagination } from "@material-ui/lab";
import { userApi } from "../../services";

const useStyles = makeStyles({
  detail: {
    textAlign: "center",
    fontSize: "0.8rem",
  },
  paginationWrap: {
    marginTop: "1rem",
    justifyContent: "center",
    display: "flex",
  },
});

export default function UserList(props) {
  const classes = useStyles();
  const list = useSelector(userList);
  const dispatch = useDispatch();

  const { total_pages, page } = useSelector(userListPageDetail);

  const [openEditItemDialog, setOpenEditItemDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(page);

  const showEditItemDialog = (id) => {
    const obj = list.find((x) => x.id === id);
    toggleEditItemDialog(true);
    setSelectedItem({ ...obj });
  };

  const toggleEditItemDialog = (flag) => {
    setOpenEditItemDialog(flag);
  };
  const handleChange = async (event, value) => {
    setCurrentPage(value);
    dispatch(startLoader());
    const response = await userApi.get(value, 5);
    dispatch(updateAfterPagination(response));
  };

  return (
    <div>
      <AppCard title={`User List`}>
        <Typography className={classes.detail}>
          (Click to check detail)
        </Typography>
        <AppDivider />
        <List component="div" disablePadding>
          {list.map((item, i) => (
            <AppListItem
              key={i}
              {...item}
              listItemClick={showEditItemDialog}
            ></AppListItem>
          ))}
        </List>
        {total_pages > 0 && (
          <div className={classes.paginationWrap}>
            <Pagination
              count={total_pages}
              shape="rounded"
              page={currentPage}
              onChange={handleChange}
            />
          </div>
        )}
        <AppEditDialog
          dialogStatus={openEditItemDialog}
          toggleDialog={toggleEditItemDialog}
          selectedItem={selectedItem}
        ></AppEditDialog>
      </AppCard>
    </div>
  );
}

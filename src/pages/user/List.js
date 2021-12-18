import React, { useContext, useState } from "react";
import { Grid, List } from "@material-ui/core";
import {
  AppCard,
  AppDivider,
  AppEditDialog,
  AppHintText,
  AppListItem,
  AppUserCard,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { userList, userListPageDetail } from "../../reducers";
import { Pagination } from "@material-ui/lab";
import { updateUserWithCurrentPage } from "./User.utils";
import { AppContext } from "../../contexts";
import { AppConstant } from "../../utils";

export default function UserList(props) {
  const list = useSelector(userList);
  const dispatch = useDispatch();
  const { title, hint } = AppConstant.list;
  const { isSmallScreen } = useContext(AppContext);
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
    updateUserWithCurrentPage(dispatch, value, true);
  };

  return (
    <div>
      {isSmallScreen ? (
        <AppCard title={title}>
          <AppHintText>{hint}</AppHintText>
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
            <div className="app_content--horizontal-center app_margin--top-1">
              <Pagination
                count={total_pages}
                shape="rounded"
                page={currentPage}
                onChange={handleChange}
              />
            </div>
          )}
        </AppCard>
      ) : (
        <Grid
          container
          spacing={3}
          className="app_content--horizontal-center app_margin--top-1"
        >
          {list.map((user, i) => {
            return (
              <Grid item lg={2} md={3} key={i}>
                <AppUserCard {...user} cardClick={showEditItemDialog} />
              </Grid>
            );
          })}
        </Grid>
      )}
      {total_pages > 0 && !isSmallScreen && (
        <div className="app_content--horizontal-center app_margin--top-1">
          <AppDivider />
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
    </div>
  );
}

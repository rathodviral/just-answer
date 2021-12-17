import React, { useContext, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  List,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  AppCard,
  AppDivider,
  AppEditDialog,
  AppHintText,
  AppListItem,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { userList, userListPageDetail } from "../../reducers";
import { Pagination } from "@material-ui/lab";
import { updateUserWithCurrentPage } from "./User.utils";
import { AppContext } from "../../contexts";

const useStyles = makeStyles({
  paginationWrap: {
    marginTop: "1rem",
    justifyContent: "center",
    display: "flex",
  },
  gridPadding: {
    padding: "1rem 0",
  },
});

export default function UserList(props) {
  const classes = useStyles();
  const list = useSelector(userList);
  const dispatch = useDispatch();
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
        <AppCard title={`User List`}>
          <AppHintText>(Click to edit user detail)</AppHintText>
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
      ) : (
        <Grid container spacing={2} className={classes.paginationWrap}>
          {list.map((userData, i) => {
            const { first_name, last_name, avatar, email } = userData;
            return (
              <Grid item xs={2} key={i}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={avatar}
                    alt={email}
                  />
                  <CardContent>
                    <Typography
                      noWrap
                      gutterBottom
                      variant="h6"
                      component="div"
                    >
                      {`${first_name} ${last_name}`}
                    </Typography>
                    <Typography noWrap variant="body2">
                      {email}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
      {total_pages > 0 && !isSmallScreen && (
        <div className={classes.paginationWrap}>
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

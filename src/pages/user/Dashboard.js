import React from "react";
import { makeStyles } from "@material-ui/core";
import {
  AppCard,
  AppButton,
  AppTitleText,
  AppHintText,
} from "../../components";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { userListPageDetail } from "../../reducers";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
  },
});

export default function Dashboard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { total } = useSelector(userListPageDetail);
  const cardList = [{ title: "Number of users", count: total }];

  const Card = (props) => {
    const { title, type, count } = props;
    return (
      <AppCard title={title}>
        <AppTitleText
          count={count}
          type={type}
          onClick={(e) => {
            history.push(`user/list`);
          }}
        ></AppTitleText>
        <AppHintText>(Click to view user list)</AppHintText>
        <AppButton
          onClick={(e) => {
            history.push(`user/add`);
          }}
        >
          Add User
        </AppButton>
      </AppCard>
    );
  };

  return (
    <div className={classes.root}>
      {cardList.map((card, i) => (
        <Card key={i} title={card.title} type={card.type} count={card.count} />
      ))}
    </div>
  );
}

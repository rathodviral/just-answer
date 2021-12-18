import React from "react";
import "./user.css";
import {
  AppCard,
  AppButton,
  AppTitleText,
  AppHintText,
} from "../../components";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { userListPageDetail } from "../../reducers";
import { AppConstant } from "../../utils";

export default function Dashboard(props) {
  const history = useHistory();
  const { total } = useSelector(userListPageDetail);
  const { title, buttonLabel, hint } = AppConstant.dashboard;

  return (
    <div className="dashboard_items--center">
      <AppCard title={title}>
        <AppTitleText
          count={total}
          onClick={(e) => {
            history.push(`user/list`);
          }}
        ></AppTitleText>
        <AppHintText>{hint}</AppHintText>
        <AppButton
          onClick={(e) => {
            history.push(`user/add`);
          }}
        >
          {buttonLabel}
        </AppButton>
      </AppCard>
    </div>
  );
}

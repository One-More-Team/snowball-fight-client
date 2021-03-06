import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { GetSelectedDialogId } from "../../store/selectors/dialog";
import { closeDialog } from "../../store/actions/dialog";
import Profile from "./types/profile/profile";

import styles from "./dialog.module.scss";
import StartWebRTCSession from "./types/start-webrtc-session/start-webrtc-session";

export const DIALOG_ID = {
  PROFILE: "PROFILE",
  START_WEBRTC_SESSION: "START_WEBRTC_SESSION",
};

const getDialog = ({ dialogId, close }) => {
  switch (dialogId) {
    case DIALOG_ID.PROFILE:
      return <Profile close={close} />;

    case DIALOG_ID.START_WEBRTC_SESSION.PROFILE:
      return <StartWebRTCSession close={close} />;

    default:
      return <div />;
  }
};

const Dialog = () => {
  const dispatch = useDispatch();
  const dialogId = useSelector(GetSelectedDialogId);

  const close = () => dispatch(closeDialog());
  const activeDialog = getDialog({ dialogId, close });

  return (
    <div
      className={`${styles.Wrapper} ${dialogId && styles.ActiveWrapper}`}
      onClick={close}
    >
      <div className={`${styles.Content} ${dialogId && styles.ActiveContent}`}>
        <div className={styles.Close} onClick={close}>
          <i className="far fa-times-circle"></i>
        </div>
        {activeDialog}
      </div>
    </div>
  );
};

export default Dialog;

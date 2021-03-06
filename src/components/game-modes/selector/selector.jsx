import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { gameModes } from "../../../enums/enums";
import { initConnection } from "../../../store/actions/common";
import {
  GetGameCurrentUsers,
  GetGameMaxUsers,
  GetGameMode,
} from "../../../store/selectors/websocket";
import Loader from "../../spinner/loader";

import styles from "./selector.module.scss";

const Selector = () => {
  const dispatch = useDispatch();
  const connectAndStart = (mode) => dispatch(initConnection(mode));

  const maxUser = useSelector(GetGameMaxUsers);
  const currentUser = useSelector(GetGameCurrentUsers);
  const currentGameMode = useSelector(GetGameMode);

  const [mode, setMode] = useState("");

  const onClickHandler = (m) => {
    if (currentGameMode !== m) {
      setMode(() => m);
      connectAndStart(m);
    }
  };

  const userList = Array.from({ length: maxUser }).map((i, index) => (
    <div
      key={`index-${index}`}
      className={`${styles.PlayerMarker} ${
        index >= currentUser ? styles.WaitingForPlayer : styles.ConnectedPlayer
      }`}
    >
      <i className="fas fa-user"></i>
      <i className={`fas fa-search ${styles.SearchIcon}`}></i>
    </div>
  ));

  return (
    <div
      className={`${styles.wrapper} ${
        maxUser === currentUser && currentUser > 0 && styles.ReadyForGame
      }`}
    >
      <div className={styles.options}>
        {[
          { label: gameModes.VERSUS, description: "1vs1" },
          { label: gameModes.WINGMAN, description: "2vs2" },
          { label: gameModes.DEATHMATCH, description: "Free for All" },
        ].map((m) => {
          return (
            <div
              key={m.label}
              className={`${styles.Option} ${
                mode === m.label && styles.SelectedOption
              } ${mode !== "" && mode !== m.label && styles.InactiveOption}`}
              onClick={() => {
                onClickHandler(m.label);
              }}
            >
              <i className={`far fa-play-circle ${styles.PlayIcon}`}></i>
              <div className={styles.Label}>
                <FormattedMessage id={m.label} />
              </div>
              <div className={styles.Description}>{m.description}</div>
              {mode === m.label && (
                <div className={styles.GameStatus}>
                  {maxUser === 0 ? (
                    <Loader className={styles.Loader} />
                  ) : (
                    userList
                  )}
                </div>
              )}
              <div className={styles.Stat}>
                <div className={styles.Entry}>Wins: 0</div>
                <div className={styles.Entry}>Looses: 0</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Selector;

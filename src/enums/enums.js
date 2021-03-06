const connectionState = {
  CONNECTION_INITIAL: "CONNECTION_INITIAL",
  CONNECTION_CONNECTING: "CONNECTION_CONNECTING",
  CONNECTION_CONNECTED: "CONNECTION_CONNECTED",
  CONNECTION_HAD_ERROR: "CONNECTION_ERROR",
  CONNECTION_IN_GAME: "CONNECTION_IN_GAME",
};

const gameModes = {
  VERSUS: "VERSUS",
  WINGMAN: "WINGMAN",
  DEATHMATCH: "DEATHMATCH",
};

const ServerMessages = {
  PLAYERNUM: "playerNum",
  READY: "ready",
  COUNTDOWN: "countdown",
  SEND_WEBRTC_OFFER: "sendWebRTCOffer",
  SEND_WEBRTC_ANSWER: "sendWebRTCAnswer",
  RESPAWN: "respawn",
};

export { connectionState, gameModes, ServerMessages };

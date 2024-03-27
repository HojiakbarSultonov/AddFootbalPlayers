export const playersFetching = () => {
  return {
    type: "PLAYERS_FETCHING",
  };
};
export const playersFetched = (players) => {
  return {
    type: "PLAYERS_FETED",
    payload: players,
  };
};
export const playersFetchingError = () => {
  return {
    type: "PLAYERS_FETCHING_ERROR",
  };
};

const initialState = {
  players: [],
  playerLoadingStatus: "success",
  filters: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "PLAYERS_FETCHING":
      return {
        ...state,
        playerLoadingStatus: "loading",
      };

    case "PLAYERS_FETCHED":
      return {
        ...state,
        players: action.payload,
        playerLoadingStatus: "success",
      };
    case "PLAYERS_FETCHING_ERROR":
      return {
        ...state,
        playerLoadingStatus: "error",
      };
    default:
      return state;
  }
};

export default reducer;

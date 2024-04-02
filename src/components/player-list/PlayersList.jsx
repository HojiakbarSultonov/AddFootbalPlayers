import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/useHttp";
import { useCallback, useEffect } from "react";
import {
  playerDeleted,
  playersFetched,
  playersFetching,
  playersFetchingError,
} from "../../actions/index";

import { Error, Spinner, Empty, PlayersListItem } from "../index";

const PlayersList = () => {
  const { filteredPlayers } = useSelector(
    (state) => state
  );

  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(playersFetching());

    request("http://localhost:5000/players")
      .then((data) => dispatch(playersFetched(data)))
      .catch(() => dispatch(playersFetchingError()));
  }, []);

  const onDelete = useCallback(
    (id) => {
      request(`http://localhost:8080/players/${id}`, "DELETE")
        .then((res) => console.log(res, "Successfully deleted"))
        .then(dispatch(playerDeleted(id)))
        .catch((e) => console.log(e));
    },
    [request]
  );



  if (filteredPlayers === "loading") {
    return <Spinner classNames={"w-8 h-8 block mx-auto text-white"} />;
  } else if (filteredPlayers === "error") {
    return <Error />;
  }

  const renderPlayers = () => {
    if (!filteredPlayers.length) {
      return <Empty />;
    }

    return filteredPlayers.map(({ id, ...props }) => (
      <PlayersListItem key={id} {...props} onDelete={() => onDelete(id)} />
    ));
  };

  return <div className="flex flex-col space-y-3">{renderPlayers()}</div>;
};

export default PlayersList;

import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/useHttp";
import { useEffect } from "react";
import {
  activeFilterChanged,
  filtersFetched,
  filtersFetching,
  filtersFetchingError,
} from "../../actions";
import Spinner from "../spinner/Spinner";

function PlayersFilter() {
  const { filters, filtersLoadingStatus, activeFilter } = useSelector(
    (state) => state.filters
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(filtersFetching());
    request("https://8a735faa7c0807a2.mokky.dev/filters")
      .then((data) => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()));
  }, []);

  if (filtersLoadingStatus === "loading") {
    return <Spinner classNames={"w-8 h-8 block mx-auto text-white"} />;
  } else if (filtersLoadingStatus === "error") {
    return (
      <div>
        <span className="text-red-500">Something went wrong </span>
      </div>
    );
  }

  const renderFilters = () => {
    if (!filters.length) {
      return <span className="text-red-500">Filters not found </span>;
    }

    return filters.map(({ id, label, classes }) => (
      <button
        onClick={() => dispatch(activeFilterChanged(label))}
        key={id}
        className={`py-2 px-4  text-white  hover:opacity-90 transition-all ${classes} ${
          activeFilter === label && "text-black font-bold"
        }`}
      >
        {label}
      </button>
    ));
  };

  return (
    <div className="px-4 py-6 bg-white rounded-md shadow-lg bg-gradient-to-b from-cyan-500 to-transparent bg-opacity-10 mt-4 ">
      <h1 className="text-xl font-bold">Filter players by continent</h1>
      <div className="flex mt-2">{renderFilters()}</div>
    </div>
  );
}

export default PlayersFilter;

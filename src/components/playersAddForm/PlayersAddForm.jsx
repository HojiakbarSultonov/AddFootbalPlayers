import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useHttp } from "../../hooks/useHttp";
import { playersCreated } from "../../actions";

function PlayersAddForm() {
  const { filters, filtersLoadingStatus } = useSelector(
    (state) => state.filters
  );
  const dispatech = useDispatch();
  const { request } = useHttp();

  const onSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const country = e.target.country.value;
    const continent = e.target.continent.value;
    const data = {
      id: uuidv4(),
      name,
      country,
      continent,
    };
    request("http://localhost:5000/players", "POST", JSON.stringify(data))
      .then((res) => console.log(res, "succesfully"))
      .then(dispatech(playersCreated(data)))
      .catch((err) => console.log(err));
    console.log(data);
  };

  const renderFilters = () => {
    if (filtersLoadingStatus === "loading") {
      return <option>Loading...</option>;
    } else if (filtersLoadingStatus === "error") {
      return <option>Something went wrong</option>;
    }

    if (filters && filters.length > 0) {
      return filters.map(({ id, label }) => {
        if (id === "all") return;
        return (
          <option key={id} value={label}>
            {label}
          </option>
        );
      });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="px-4 py-6 bg-white rounded-md shadow-lg bg-gradient-to-t from-cyan-500 to-transparent bg-opacity-10">
        <div className="flex flex-col space-y-2">
          <div>
            <label htmlFor="name" className="text-2xl">
              New Footbal player
            </label>
            <input
              type="text"
              className="block w-full py-2 px-4 rounded-md mt-1"
              placeholder="Mohammad Salah"
              name="name"
              required
            />
          </div>
          <div>
            <label htmlFor="country" className="text-2xl">
              Country
            </label>
            <input
              type="text"
              className="block w-full py-2 px-4 rounded-md mt-1"
              placeholder="Egypt"
              name="country"
              required
            />
          </div>
          <div>
            <label htmlFor="continent" className="text-2xl">
              Select player continent
            </label>
            <select
              className="block w-full py-2 px-4 rounded-md mt-1"
              name="continent"
              required
            >
              {renderFilters()}
            </select>
          </div>
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 w-fit rounded-md ml-auto bg-gradient-to-r from-blue-500 to-blue-950 text-white hover:scale-105 transition-all font-medium"
          >
            Add Player
          </button>
        </div>
      </div>
    </form>
  );
}

export default PlayersAddForm;

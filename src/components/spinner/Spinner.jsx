import { FiLoader } from "react-icons/fi";

function Spinner({ classNames }) {
  return <FiLoader className={`animate-spin ${classNames}`} />;
}

export default Spinner;

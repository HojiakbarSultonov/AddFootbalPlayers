import empty from "../../assets/empty.png";

function Error() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <img src={empty} alt="Empty" className="object-cover" />
    </div>
  );
}

export default Error;

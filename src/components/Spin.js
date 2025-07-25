import magnify from "./magnify.gif";

const Spin = () => {
  return (
    <div className="text-center my-4">
      <img
        src={magnify}
        alt="loading"
        style={{ width: "50px", height: "50px" }}
      />
    </div>
  );
};

export default Spin;

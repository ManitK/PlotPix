import {Link} from "react-router-dom";

const Select = () => {
    return (
      <div className="select-genre">
        <h1 className="select-heading">Select Genre</h1>

        <Link to="/genre/Action" className="card text-white bg-primary mb-3" style={{ maxWidth: "20rem" }}>
          <div className="card-body">
            <h4 className="card-title">Action</h4>
          </div>
        </Link>

        <Link to="/genre/Comedy" className="card text-white bg-primary mb-3" style={{ maxWidth: "20rem" }}>
          <div className="card-body">
            <h4 className="card-title">Comedy</h4>
          </div>
        </Link>

        <Link to="/genre/Drama" className="card text-white bg-primary mb-3" style={{ maxWidth: "20rem" }}>
          <div className="card-body">
            <h4 className="card-title">Drama</h4>
          </div>
        </Link>

        <Link to="/genre/Romance" className="card text-white bg-primary mb-3" style={{ maxWidth: "20rem" }}>
          <div className="card-body">
            <h4 className="card-title">Romance</h4>
          </div>
        </Link>

      </div>
    );
  };
  
  export default Select;
  
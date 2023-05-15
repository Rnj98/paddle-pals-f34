import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/authContext";
import "./AddSpots.css";

function AddSpots() {
  const { token, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [park, setPark] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleParkChange = (e) => {
    setPark(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "/spots",
        { title, img, park, location, date, userId },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <form className="addSpots-container">
        <input
          className="input-containter"
          type="text"
          placeholder="Spot Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="input-containter"
          type="text"
          placeholder="Address"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          className="input-containter"
          placeholder="Image URL"
          type="text"
          onChange={(e) => setImg(e.target.value)}
        />
        <input
          className="input-containter"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Enter date"
          style={{
            textAlign: "center",
          }}
        />
        <label className="p-lot">
          <p>Parking lot?</p>
          <div className="yn-display">
            <div className="input-containter">
              <input
                type="radio"
                name="yes"
                value="Yes"
                checked={park === "Yes"}
                onChange={handleParkChange}
              />{" "}
              Yes
              <input
                type="radio"
                name="no"
                value="No"
                checked={park === "No"}
                onChange={handleParkChange}
              />{" "}
              No
            </div>
          </div>
        </label>
        <button type="submit" onClick={handleSubmit} className="addSpot-btn">
          Submit
        </button>
      </form>
    </main>
  );
}

export default AddSpots;

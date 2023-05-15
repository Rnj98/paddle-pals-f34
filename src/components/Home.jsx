import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";
import SpotsCard from "./SpotsCard";
import "./Home.css";


const Home = () => {
  const { userId } = useContext(AuthContext);
  const [spots, setSpots] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const getSpots = () => {
    axios.get(`/spots/${userId}`).then((res) => {
      setSpots(res.data.spots);
    });
  };

  useEffect(getSpots, [userId]);

  return (
    <div className="home-display">
      <input
        placeholder="Search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <section>
      <div className="spotscard-display">
        <SpotsCard
          spots={spots}
          getSpots={getSpots}
          searchInput={searchInput}
          />
      </div>
          </section>
    </div>
  );
};
export default Home;

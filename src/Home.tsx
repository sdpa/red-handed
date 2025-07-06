import Map from "./MapChart";
import { useState } from "react";

const Home = () => {
  
  const [selectedState, setSelectedState] = useState<string>("");
  const [, setSelectedDistrict] = useState<string>("");

    const onSlectedState = (state: string) => {
        setSelectedState(state);
        setSelectedDistrict("");
    }
  
    const onSelectedDistrict = (district: string) => {
        setSelectedDistrict(district);

    }


  return (
    <div>
      <Map selectedState={selectedState} onSelectState={onSlectedState} onSelectDistrict={onSelectedDistrict} />
    </div>
  );
};

export default Home;

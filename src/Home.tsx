import Map from "./MapChart";
import { useState } from "react";
import AddCorruptionDataForm from "./AddCorruptionDataForm";

interface CorruptionFormData {
  state: string;
  district: string;
  amount: string;
  department: string;
  date: string;
}

const Home = () => {
  const [selectedState, setSelectedState] = useState<string>("");
  const [, setSelectedDistrict] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const onSlectedState = (state: string) => {
    setSelectedState(state);
    setSelectedDistrict("");
  };

  const onSelectedDistrict = (district: string) => {
    setSelectedDistrict(district);
  };

  const handleFormSubmit = (data: CorruptionFormData) => {
    console.log("Corruption Data Submitted: ", data);
    setIsFormOpen(false);
  };


  return (
    // .main-container class from App.css handles padding and max-width
    <div className="main-container">
      <div>
        <div>
          <Map
            selectedState={selectedState}
            onSelectState={onSlectedState}
            onSelectDistrict={onSelectedDistrict}
          />
        </div>
    
      </div>

      <AddCorruptionDataForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default Home;

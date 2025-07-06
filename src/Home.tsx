import Map from "./MapChart";
import { useState } from "react";
import DataCard from "./DataCard";
import AddCorruptionDataForm from "./AddCorruptionDataForm";

// Define FormData type if not already defined/imported
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
  const [isFormVisible, setIsFormVisible] = useState(false);

  const onSlectedState = (state: string) => {
    setSelectedState(state);
    setSelectedDistrict("");
  };

  const onSelectedDistrict = (district: string) => {
    setSelectedDistrict(district);
  };

  const handleFormSubmit = (data: CorruptionFormData) => {
    console.log("Corruption Data Submitted: ", data);
    // Here you would typically send data to a backend
    setIsFormVisible(false); // Close form on submit
  };

  // Placeholder data for DataCards
  const totalCorruptionAmount = "₹1,23,45,678";
  const casesReported = "1,500";
  const departmentsAffected = "50";

  const homeStyle: React.CSSProperties = {
    padding: '2rem', // Increased padding for the home page
    display: 'flex',
    flexDirection: 'column', // Stack main content and button vertically
    alignItems: 'center', // Center the button
    gap: '2rem', // Space between map/cards row and the button
    backgroundColor: 'var(--dark-bg)', // Ensure home bg matches theme
    flexGrow: 1, // Make Home content take available space
  };

  const contentRowStyle: React.CSSProperties = {
    display: 'flex',
    width: '100%', // Full width for the row
    gap: '2rem', // Space between map and cards
    alignItems: 'flex-start', // Align items to the top
  };

  const mapContainerStyle: React.CSSProperties = {
    flex: '3', // Map takes more space
    // marginRight: '2rem', // Replaced by gap in contentRowStyle
    backgroundColor: 'var(--dark-bg)', // Map background if needed, or make it transparent
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  };

  const dataCardsContainerStyle: React.CSSProperties = {
    flex: '1', // Cards take less space
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem', // Space between cards
  };

  const addButtonStyle: React.CSSProperties = {
    // Using global button styles from index.css, but can override or extend here
    padding: '12px 24px',
    fontSize: '1.1rem', // Slightly larger font for primary action
    fontWeight: '600',
    // margin: '2rem 0', // Centering is handled by parent's alignItems: 'center'
  };


  return (
    <div style={homeStyle}>
      <div style={contentRowStyle}>
        <div style={mapContainerStyle}>
          <Map
            selectedState={selectedState}
            onSelectState={onSlectedState}
            onSelectDistrict={onSelectedDistrict}
          />
        </div>
        <div style={dataCardsContainerStyle}>
          <DataCard title="Total Corruption Amount" value={totalCorruptionAmount} />
          <DataCard title="Cases Reported" value={casesReported} />
          <DataCard title="Departments Affected" value={departmentsAffected} />
        </div>
      </div>
      <button onClick={() => setIsFormVisible(true)} style={addButtonStyle}>
        Report New Incident
      </button>
      {isFormVisible && (
        <AddCorruptionDataForm
          onClose={() => setIsFormVisible(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default Home;

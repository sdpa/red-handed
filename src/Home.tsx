import Map from "./MapChart";
import { useState } from "react";
import DataCard from "./DataCard";
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

  const totalCorruptionAmount = "₹1,23,45,678";
  const casesReported = "1,500";
  const departmentsAffected = "50";

  // Styles are now more reliant on global CSS and refined variables
  // Inline styles are minimal, focusing on layout rather than appearance

  const homeStyle: React.CSSProperties = {
    // padding is handled by .main-container in App.css
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center the button below the content row
    gap: '2rem', // Space between content row and button
    flexGrow: 1, // Ensure it takes available vertical space
  };

  const contentRowStyle: React.CSSProperties = {
    display: 'flex',
    width: '100%', // Takes full width of .main-container
    gap: '1.5rem', // Adjusted gap for tighter layout
    alignItems: 'flex-start',
  };

  const mapContainerStyle: React.CSSProperties = {
    flex: '2.5',
    backgroundColor: 'var(--light-bg)', // White background
    padding: '1.5rem',
    borderRadius: '8px', // Consistent with DataCard
    border: `1px solid var(--border-color)`, // Subtle border
    boxShadow: '0 1px 2px rgba(0,0,0,0.02), 0 2px 4px rgba(0,0,0,0.02)', // Very subtle shadow
  };

  const dataCardsContainerStyle: React.CSSProperties = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem', // Match DataCard margin
  };

  // addButtonStyle can be removed if default button styling from index.css is sufficient
  // const addButtonStyle: React.CSSProperties = { ... };


  return (
    // .main-container class from App.css handles padding and max-width
    <div style={homeStyle} className="main-container">
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

      <button className="Button primary" onClick={() => setIsFormOpen(true)}>
        Report New Incident
      </button>

      <AddCorruptionDataForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default Home;

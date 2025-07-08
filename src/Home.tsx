import Map from "./MapChart";
import { useState } from "react";
import AddCorruptionDataForm from "./AddCorruptionDataForm";
import { Box, Button, Flex, IconButton } from '@radix-ui/themes'; // Import Radix components
import { PlusIcon } from '@radix-ui/react-icons'; // Example icon

interface CorruptionFormData {
  state: string;
  district: string;
  amount: string;
  department: string;
  date: string;
}

const Home = () => {
  const [selectedState, setSelectedState] = useState<string>("");
  const [, setSelectedDistrict] = useState<string>(""); // Keep if needed for district logic
  const [isFormOpen, setIsFormOpen] = useState(false);

  const onSlectedState = (state: string) => {
    setSelectedState(state);
    setSelectedDistrict(""); // Reset district when a new state is selected
  };

  const onSelectedDistrict = (district: string) => {
    setSelectedDistrict(district);
    // Potentially open a detail view for the district or log it
    console.log("District selected:", district);
  };

  const handleFormSubmit = (data: CorruptionFormData) => {
    console.log("Corruption Data Submitted: ", data);
    setIsFormOpen(false); // Close the form dialog upon submission
  };

  return (
    <Box p="4" style={{ flexGrow: 1, backgroundColor: 'var(--gray-2)' }}> {/* Radix Box for main container */}
      <Flex direction="column" gap="4"> {/* Radix Flex for layout */}
        <Flex justify="end">
          <Button onClick={() => setIsFormOpen(true)} size="3" variant="solid">
            <PlusIcon width="16" height="16" /> Report Incident
          </Button>
        </Flex>

        <Box style={{ position: 'relative', width: '100%', height: 'calc(100vh - 200px)' /* Adjust as needed */ }}>
          <Map
            selectedState={selectedState}
            onSelectState={onSlectedState}
            onSelectDistrict={onSelectedDistrict}
          />
        </Box>
      </Flex>

      <AddCorruptionDataForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default Home;

// src/AddCorruptionDataForm.tsx
import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Form from '@radix-ui/react-form';
import { Cross2Icon } from '@radix-ui/react-icons';
// You might need to create a separate CSS file for form styles or use inline/global styles.
// For this example, we'll rely on global styles in index.css and App.css for Radix components.

interface CorruptionFormData {
  state: string;
  district: string;
  amount: string;
  department: string;
  date: string;
}

interface AddCorruptionDataFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CorruptionFormData) => void;
}

const AddCorruptionDataForm: React.FC<AddCorruptionDataFormProps> = ({ open, onOpenChange, onSubmit }) => {
  const [formData, setFormData] = useState<CorruptionFormData>({
    state: '',
    district: '',
    amount: '',
    department: '',
    date: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => { // Radix Form handles e.preventDefault()
    onSubmit(formData);
    // Optionally reset form:
    // setFormData({ state: '', district: '', amount: '', department: '', date: '' });
    // onOpenChange(false); // Close dialog on submit
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Report Corruption Incident</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Please provide details about the incident. All fields are required.
          </Dialog.Description>

          <Form.Root onSubmit={handleSubmit}>
            <Form.Field className="FormField" name="state">
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <Form.Label className="FormLabel">State</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing">
                  Please enter the state
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input className="FormControl" type="text" value={formData.state} onChange={handleChange} required />
              </Form.Control>
            </Form.Field>

            <Form.Field className="FormField" name="district">
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <Form.Label className="FormLabel">District</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing">
                  Please enter the district
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input className="FormControl" type="text" value={formData.district} onChange={handleChange} required />
              </Form.Control>
            </Form.Field>

            <Form.Field className="FormField" name="amount">
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <Form.Label className="FormLabel">Amount (INR)</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing">
                  Please enter the amount
                </Form.Message>
                 <Form.Message className="FormMessage" match="typeMismatch">
                  Please provide a valid amount
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input className="FormControl" type="number" value={formData.amount} onChange={handleChange} required />
              </Form.Control>
            </Form.Field>

            <Form.Field className="FormField" name="department">
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <Form.Label className="FormLabel">Department</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing">
                  Please enter the department
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input className="FormControl" type="text" value={formData.department} onChange={handleChange} required />
              </Form.Control>
            </Form.Field>

            <Form.Field className="FormField" name="date">
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <Form.Label className="FormLabel">Date of Incident</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing">
                  Please enter the date
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input className="FormControl" type="date" value={formData.date} onChange={handleChange} required />
              </Form.Control>
            </Form.Field>

            <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end', gap: '1rem' }}>
              <Dialog.Close asChild>
                <button type="button" className="Button secondary">Cancel</button>
                {/* Add a .Button.secondary class for cancel: e.g., light grey bg, red text/border */}
              </Dialog.Close>
              <Form.Submit asChild>
                <button className="Button primary">Submit Report</button>
                 {/* Add a .Button.primary class or use default button styles */}
              </Form.Submit>
            </div>
          </Form.Root>

          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddCorruptionDataForm;

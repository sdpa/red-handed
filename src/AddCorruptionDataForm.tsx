// src/AddCorruptionDataForm.tsx
import React, { useState, useEffect } from 'react';
import { Dialog, Button, Flex, Text, TextField, IconButton, Form } from '@radix-ui/themes';
import { Cross2Icon } from '@radix-ui/react-icons';

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

const initialFormData: CorruptionFormData = {
  state: '',
  district: '',
  amount: '',
  department: '',
  date: '',
};

const AddCorruptionDataForm: React.FC<AddCorruptionDataFormProps> = ({ open, onOpenChange, onSubmit }) => {
  const [formData, setFormData] = useState<CorruptionFormData>(initialFormData);

  useEffect(() => {
    // Reset form when dialog opens, if it was closed previously
    if (open) {
      setFormData(initialFormData);
    }
  }, [open]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    onSubmit(formData);
    // onOpenChange(false); // Dialog will be closed by the submit button's Dialog.Close parent
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', inset: 0 }} />
        <Dialog.Content style={{
          backgroundColor: 'white',
          borderRadius: 'var(--radius-3)', // Using Radix radius variable
          boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90vw',
          maxWidth: '450px',
          maxHeight: '85vh',
          padding: 'var(--space-5)', // Using Radix spacing
          overflowY: 'auto'
        }}>
          <Dialog.Title>
            <Text size="5" weight="bold">Report Corruption Incident</Text>
          </Dialog.Title>
          <Dialog.Description size="2" mb="4" color="gray">
            Please provide details about the incident. All fields are required.
          </Dialog.Description>

          <Form.Root onSubmit={handleSubmit}>
            <Flex direction="column" gap="3">
              <Form.Field name="state">
                <Flex direction="column" gap="1">
                  <Form.Label>
                    <Text size="2" weight="medium">State</Text>
                  </Form.Label>
                  <TextField.Input name="state" value={formData.state} onChange={handleChange} placeholder="e.g., Maharashtra" required />
                  <Form.Message match="valueMissing">
                    <Text size="1" color="red">Please enter the state</Text>
                  </Form.Message>
                </Flex>
              </Form.Field>

              <Form.Field name="district">
                <Flex direction="column" gap="1">
                  <Form.Label>
                    <Text size="2" weight="medium">District</Text>
                  </Form.Label>
                  <TextField.Input name="district" value={formData.district} onChange={handleChange} placeholder="e.g., Mumbai" required />
                  <Form.Message match="valueMissing">
                     <Text size="1" color="red">Please enter the district</Text>
                  </Form.Message>
                </Flex>
              </Form.Field>

              <Form.Field name="amount">
                <Flex direction="column" gap="1">
                  <Form.Label>
                    <Text size="2" weight="medium">Amount (INR)</Text>
                  </Form.Label>
                  <TextField.Input name="amount" type="number" value={formData.amount} onChange={handleChange} placeholder="e.g., 50000" required />
                   <Form.Message match="valueMissing">
                     <Text size="1" color="red">Please enter the amount</Text>
                  </Form.Message>
                  <Form.Message match="typeMismatch">
                     <Text size="1" color="red">Please provide a valid amount</Text>
                  </Form.Message>
                </Flex>
              </Form.Field>

              <Form.Field name="department">
                <Flex direction="column" gap="1">
                  <Form.Label>
                    <Text size="2" weight="medium">Department</Text>
                  </Form.Label>
                  <TextField.Input name="department" value={formData.department} onChange={handleChange} placeholder="e.g., Public Works Department" required />
                  <Form.Message match="valueMissing">
                    <Text size="1" color="red">Please enter the department</Text>
                  </Form.Message>
                </Flex>
              </Form.Field>

              <Form.Field name="date">
                <Flex direction="column" gap="1">
                  <Form.Label>
                    <Text size="2" weight="medium">Date of Incident</Text>
                  </Form.Label>
                  <TextField.Input name="date" type="date" value={formData.date} onChange={handleChange} required />
                  <Form.Message match="valueMissing">
                    <Text size="1" color="red">Please enter the date</Text>
                  </Form.Message>
                </Flex>
              </Form.Field>
            </Flex>

            <Flex gap="3" mt="5" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray" type="button"> {/* type="button" is important for non-submit buttons in a form */}
                  Cancel
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <Form.Submit asChild>
                  <Button type="submit">Submit Report</Button>
                </Form.Submit>
              </Dialog.Close>
            </Flex>
          </Form.Root>

          <Dialog.Close>
            <IconButton variant="ghost" color="gray"
              style={{ position: 'absolute', top: 'var(--space-3)', right: 'var(--space-3)' }}
              aria-label="Close"
            >
              <Cross2Icon />
            </IconButton>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddCorruptionDataForm;

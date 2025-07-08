// src/DataCard.tsx
import React from 'react';
import { Card, Text, Heading } from '@radix-ui/themes';

interface DataCardProps {
  title: string;
  value: string;
}

const DataCard: React.FC<DataCardProps> = ({ title, value }) => {
  return (
    <Card
      size="2" // Radix Card size prop
      style={{
        minWidth: '220px',
        // Radix card comes with its own shadow and border, can be customized further if needed
        // transition for hover effects can be managed with Radix's theming or custom CSS if complex
      }}
      // Radix <Card> does not have direct onMouseEnter/Leave props for style changes like this.
      // This would typically be handled by CSS :hover pseudo-classes or by wrapping
      // the Card in a Box and applying event handlers or by using Radix's state attributes if available.
      // For simplicity, we'll rely on default Card styling or global :hover styles if defined.
    >
      <Text as="div" size="1" color="gray" mb="1" transform="uppercase" weight="medium" letterSpacing="1">
        {/* Using Text component for title with Radix props */}
        {title}
      </Text>
      <Heading as="h3" size="6" weight="bold" color="gray">
        {/* Using Heading for value */}
        {value}
      </Heading>
    </Card>
  );
};

export default DataCard;

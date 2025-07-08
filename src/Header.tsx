// src/Header.tsx
import React from 'react';
import { Box, Flex, Heading, Text } from '@radix-ui/themes';

const Header: React.FC = () => {
  return (
    <Box
      style={{
        backgroundColor: 'var(--gray-1)', // Using Radix gray scale
        height: '64px', // Common header height
        borderBottom: `1px solid var(--gray-5)`, // Radix gray for border
        boxSizing: 'border-box',
      }}
      px="4" // Radix spacing scale for padding
    >
      <Flex align="center" justify="between" height="100%">
        <Flex align="center" gap="3">
          <svg
            // className="app-logo" // Class can be removed if not used elsewhere
            width="32"
            height="32"
            viewBox="0 0 100 100"
            aria-label="Application Logo"
          >
            {/* Shield shape using Radix accent color variable */}
            <path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z" fill="var(--accent-9)" />
            {/* Inner symbol in a light gray or white */}
            <circle cx="50" cy="45" r="12" fill="var(--gray-1)" />
            <circle cx="50" cy="45" r="6" fill="var(--accent-9)" />
          </svg>
          <Heading as="h4" size="4" weight="medium" color="gray"> {/* Radix Heading and Text components */}
            Red Handed
          </Heading>
        </Flex>
        {/* Placeholder for potential nav items or user profile icon */}
        {/* <Flex gap="4">
          <Link href="/about" size="2" color="gray">About</Link>
          <Button size="2">Login</Button>
        </Flex> */}
      </Flex>
    </Box>
  );
};

export default Header;

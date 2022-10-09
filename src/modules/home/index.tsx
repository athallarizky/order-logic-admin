import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
const Home: React.FC = () => {
  return (
    <Box className="home-page" h="100vh" w="100%">
      <Flex justifyContent="center" alignItems="center" flexDirection="column" h="100%" w="100%">
        <Text fontSize="xxl" textStyle="robotoBold" color="#FFF">
          Home Page
        </Text>
      </Flex>
    </Box>
  );
};

export default Home;

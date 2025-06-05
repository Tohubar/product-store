import { Container, Flex, HStack, Link as ChakraLink, Text, useColorMode, Button } from '@chakra-ui/react'
import React from 'react'
import { AddIcon, PlusSquareIcon } from '@chakra-ui/icons'
import { Link as RouterLink } from 'react-router-dom'
import { FaStore } from 'react-icons/fa' // 🛍 Store icon from react-icons
import { IoMoon } from 'react-icons/io5'
import { LuSun } from 'react-icons/lu'
const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Container maxW="1140px" px={4}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: "column", sm: "row" }}
      >
        <HStack spacing={2}>
          <FaStore size={24} color="#7928CA" /> {/* Icon next to title */}
          <Text
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize={{ base: "22px", sm: "28px" }}
            fontWeight="extrabold"
            textTransform="uppercase"
            textAlign="center"
          >
            <ChakraLink as={RouterLink} to="/">
              Product Store
            </ChakraLink>
          </Text>
        </HStack>

        <HStack spacing={2} alignItems="center">
          <ChakraLink as={RouterLink} to="/create">
            {/* <AddIcon fontSize="24px" /> */}
            <Button>
                <PlusSquareIcon fontSize={"20px"}></PlusSquareIcon>
            </Button>
          </ChakraLink>
          <Button onClick={toggleColorMode}>
            {colorMode === "light"? <IoMoon size={"18px"} />: <LuSun size={"18px"} />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar

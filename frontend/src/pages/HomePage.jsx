import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product'
import ProductCard from "../components/ProductCard"

const HomePage = () => {
    const { fetchProducts, products } = useProductStore()
    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])
    console.log("Products: ", products)
  return (
    <Container maxW={"container.xl"}>
        <VStack spacing={8}>
            <Text
                fontSize={30}
                fontWeight={"bold"}
                bgGradient={"linear(to-r, cyan.400, blue.500"}
                bgClip={"text"}
                textAlign={"center"}
            >
                Current Products 🚀
            </Text>
            <SimpleGrid
                columns={{
                    base: 1,
                    md: 2, 
                    lg: 3,
                }}
                spacing={10} 
                w={"full"}
                // maxW={'950px'}
                px={10}
            >
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
                {/* {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))} */}
            </SimpleGrid>
            {products.length === 0 && (
                <Text fontSize="xl" fontWeight="bold" textAlign="center" color="gray.500">
                    No product found 😥{" "}
                    <Link to="/create">
                    <Text as="span" color="blue.500" _hover={{ textDecoration: "underline" }}>
                        Create a product
                    </Text>
                    </Link>
                </Text>
            )}
        </VStack>
    </Container>
  )
}

export default HomePage
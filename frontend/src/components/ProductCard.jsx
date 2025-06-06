import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useProductStore } from '../store/product'

const ProductCard = ({product}) => {
    const [ updatedProduct, setUpdatedProduct ] = useState(product)
    const { isOpen, onOpen, onClose } = useDisclosure() // for modal
    const textColor = useColorModeValue('gray.600', 'gray.200')
    const bg = useColorModeValue('white', 'gray.800')
    const { deleteProduct, updateProduct } = useProductStore()
    const toast = useToast()
    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid)
        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true
            })
        }else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true
            })
        }
    }
    const handleProductUpdate = async (pid, uProduct) => {
        const {success, message } = await updateProduct(pid, uProduct)
        toast({
            title: success ? "Updated" : "Failed",
            description: message,
            status: success ? "success" : "error",
            isClosable: true
        })
        if (success) onClose()
    }
  return (
    <Box
        rounded={"lg"}
        shadow={"lg"}
        overflow={"hidden"}
        transition={"all 0.3s"}
        _hover={{transform: "translateY(-5px)", shadow: "xl"}}
        bg={bg}
    >
        <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'}></Image>
        <Box p={4}>
            <Heading as={'h3'} size={'mid'} mb={2}>
                {product.name}
            </Heading>
            <Text fontWeight={'bold'} fontSize={'xl'} color={textColor} mb={4}>
                {'$'+ product.price}
            </Text>
            <HStack spacing={2}>
                <IconButton icon={<EditIcon/>} onClick={onOpen} colorScheme='blue'></IconButton>
                <IconButton icon={<DeleteIcon/>} onClick={() => handleDeleteProduct(product._id)} colorScheme='red'></IconButton>
            </HStack>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <Input placeholder='Product name' name='name' value={updatedProduct.name} 
                            onChange={e => setUpdatedProduct({...updatedProduct, name: e.target.value})}
                        />
                        <Input placeholder='Product price' name='price' value={updatedProduct.price}
                            onChange={e => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                        />
                        <Input placeholder='Product url' name='image' value={updatedProduct.image}
                            onChange={e => setUpdatedProduct({...updatedProduct, image: e.target.value})}
                        />
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => handleProductUpdate(product._id, updatedProduct)}>
                        Update
                    </Button>
                    <Button variant={"ghost"} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
  )
}

export default ProductCard
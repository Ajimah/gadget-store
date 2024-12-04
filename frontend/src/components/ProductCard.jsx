//import React from 'react'
import { Box, Heading, Image, HStack, IconButton, Text, useColorModeValue, useToast, Modal, useDisclosure, VStack, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, ModalFooter, Button } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useProductStore } from '../store/product';
import { useState } from 'react';


const ProductCard = ({ product }) => {
    

    const [updatedProduct , setUpdatedProduct] = useState(product)


    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");


    const { deleteProduct,updateProduct } = useProductStore()
    const toast = useToast()
    const {isOpen, onOpen , onClose} = useDisclosure()



    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid)
        if (!success) {
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 5000,
                isClosable: true,

            })
        } else {
            toast({
                title: 'Success',
                description: message,
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        }
    };

   
    const handleUpdateProduct = async (pid , updatedProduct) => {
    const {success, message}  =  await  updateProduct(pid, updatedProduct)
        onClose();
        if (!success) {
            toast({
                title: 'Error',
                description:"message",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }else{
            toast({
                title: 'success',
                description:"product updated successfully",
                status:'success',
                duration:5000,
                isClosable:true,
            });
        }
    };


    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>
                    {product.name}
                </Heading>
                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                    ${product.price}
                </Text>

                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorschema='blue' />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorschema='red' />
                </HStack>
            </Box>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />

                    <ModalContent>
                        <ModalHeader>Update Product</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <VStack spacing={4}>
                                <Input 
                                placeholder='Product Name'
                                name='name'
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct,name: e.target.value })}
                                />
                                <Input
                                placeholder='price'
                                name='price'
                                type='number'
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct,price : e.target.value })}
                                />
                                <Input
                                placeholder='image URL'
                                name='image'
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                                />
                            </VStack>
                        </ModalBody>
                        <ModalFooter>
                                <Button colorschema='blue' mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
                                    Update
                                </Button>
                                <Button variant='ghost' onClick={onClose}>
                                    Close
                                </Button>
                        </ModalFooter>
                    </ModalContent>

                </Modal>

        </Box>
    )
}

export default ProductCard

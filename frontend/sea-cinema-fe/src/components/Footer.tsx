import { Box, Flex, VStack } from "@chakra-ui/react";

const Footer = () => {

    return (
        <Flex
            width='100%'
            marginTop='auto'
            bg='#F5F5F5'
            paddingLeft='8%'
            paddingTop='10px'
            paddingBottom='14px'
        >
            <VStack
                spacing='-8px'
                align='start'
            >
                <Box fontSize='28px' fontWeight='300' color='#005f85'>
                    SEA Cinema
                </Box>
                <Box fontWeight='300'>
                    by Zhafir Wisam Septiana
                </Box>
            </VStack>
        </Flex>
    )

}

export default Footer;
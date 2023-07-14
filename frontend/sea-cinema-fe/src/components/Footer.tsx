import { Box, Center, Flex, HStack, Spacer, Text, VStack } from "@chakra-ui/react";

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
                    SIX-SIX-an
                </Box>
                <Box fontWeight='300'>
                    by Wisam
                </Box>
                <Box fontWeight='400' color='#BBBBBB' fontSize='8pt' paddingTop='20px'>
                    v0.0-ALPHA
                </Box>
            </VStack>
        </Flex>
    )

}

export default Footer;
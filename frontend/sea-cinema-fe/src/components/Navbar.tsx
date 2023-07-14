import { Box, Button, Center, Flex, FormControl, HStack, Input, Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useState } from "react"
import LoginData from "../interface/LoginData"


const Navbar = (props: LoginData) => {

    const [loginStatus,setLoginStatus] = useState(-1)
    
    const [loginUsername,setLoginUsername] = useState('')
    const [loginPassword,setLoginPassword] = useState('')
    
    const onLoginClose = () => {
        setLoginUsername('')
        setLoginPassword('')
        setLoginStatus(-1)
    }
    
    const handleLogout = () => {
        props.logout()
        window.location.reload()
    }

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:4000/auth/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: loginUsername,
                password: loginPassword
            })})

            if (response.ok) {
                const res = await response.json()
                if (res.success) {
                    const token = res.data.token
                    localStorage.setItem('token',token)
                    props.fetchData()
                    window.location.reload()
                } else setLoginStatus(res.result)
            }

        } catch (error) {
            console.log("Failed")
        }
    }

    // useEffect(() => {
    //     fetchData()
    // }, [])

    return(
        <Flex 
            bgGradient='linear(to-b, #3F3F3F, #1F1F1F)'
            align="center"
            width="100%"
            py='3'
            px='9%'
            justify='space-between'
        >
            <HStack
                as='div'
                spacing='5'
            >
                <Link to='/'>
                    <Box 
                        h='7'
                        color='#BBBBBB'
                        fontSize='14pt'
                        fontWeight='480'
                        _hover={{
                            color:'#EEEEEE'
                        }}
                    >
                        SIX-SIX-an
                    </Box>
                </Link>
            </HStack>
            <HStack
                as='div'
                spacing='5'
            >    
                {props.data() ? (
                        <Flex>
                            <Popover
                                closeOnBlur={false}
                                isLazy
                                placement='auto'
                            >
                                <PopoverTrigger>
                                    <Box
                                        h='7'
                                        color='#BBBBBB'
                                        fontSize='14pt'
                                        fontWeight='480'
                                        _hover={{
                                            color:'#EEEEEE',
                                            cursor: 'pointer'
                                        }}
                                    >
                                    {props.data() ? props.data().username : ""}
                                    </Box>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverCloseButton />
                                    <PopoverHeader textAlign='center'>{props.data() && props.data().username}</PopoverHeader>
                                    <PopoverBody>
                                        <VStack>
                                            <Text>{props.data() && props.data().name}</Text>
                                            <Text>Saldo: Rp. {props.data() && props.data().balance}</Text>
                                            <Link to="/profile">Profil</Link>
                                        </VStack>
                                        <Center paddingTop='8px'>
                                            <Button onClick={handleLogout}>Logout</Button>
                                        </Center>
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                        </Flex>
                    ) : (
                    <Flex>
                        <Popover
                            closeOnBlur={true}
                            isLazy
                            placement='auto'
                            onClose={() => onLoginClose()}
                        >
                            <PopoverTrigger>
                                <Box
                                    color='#FFFFFF'
                                    fontSize='12.5pt'
                                    fontWeight='400'
                                    cursor='pointer'
                                    h='7'
                                >
                                    Login
                                </Box>
                            </PopoverTrigger>
                            <PopoverContent>
                            <PopoverCloseButton />
                            <PopoverHeader textAlign='center'>Login</PopoverHeader>
                            <PopoverBody>
                                {loginStatus == -1 ? null : loginStatus == 0 ? (
                                    <Text>User tidak ditemukan</Text>
                                ) : loginStatus == 2 ? (
                                    <Text>Password salah</Text>
                                ) : null}
                                <FormControl>
                                    <Input value={loginUsername} onChange={(event) => setLoginUsername(event.target.value)} placeholder='Username'/>
                                    <Input value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} placeholder='Password' type='password'/>
                                </FormControl>
                                <Center paddingTop='8px'>
                                    <Button onClick={handleLogin}>Login</Button>
                                </Center>
                                <HStack>
                                    <Text>
                                        Belum punya akun?
                                    </Text>
                                    <Link to="/register">
                                        Register
                                    </Link>
                                </HStack>
                            </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </Flex>
                )}
            </HStack>
        </Flex>
    )

}

export default Navbar
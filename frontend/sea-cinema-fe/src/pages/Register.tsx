import { Button, Center, FormControl, Input, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"

const Register = () => {

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [name,setName] = useState('')
    const [age,setAge] = useState('')

    const [registStatus,setRegistStatus] = useState(-1)

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:4000/auth/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                name: name,
                age: age
            })})

            if (response.ok) {
                const res = await response.json()
                setRegistStatus(res.result)
            }

        } catch (error) {
            console.log("Failed")
        }
    }

    return (
        <Center w='100%' paddingTop='50px' paddingLeft='40%' paddingRight='40%'>
            <VStack>
                <Text fontWeight='bold' fontSize='18pt'>Registrasi</Text>
                {registStatus == -1 ? null : registStatus == 0 ? (
                    <Text>
                        Username tidak tersedia
                    </Text>
                ) : (
                    <Text>
                        Registrasi berhasil!
                    </Text>
                )}
                <FormControl>
                    <Input value={username} onChange={(event) => setUsername(event.target.value)} placeholder='Username'/>
                    <Input value={password} onChange={(event) => setPassword(event.target.value)} placeholder='Password' type='password'/>
                    <Input value={name} onChange={(event) => setName(event.target.value)} placeholder='Nama'/>
                    <Input value={age} onChange={(event) => setAge(event.target.value)} placeholder='Umur' type='number'/>
                </FormControl>
                <Center paddingTop='8px'>
                    <Button onClick={handleRegister}>Register</Button>
                </Center>
            </VStack>
        </Center>
    )

}

export default Register

import { Box, Button, Center, Flex, FormControl, HStack, Input, Text, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import Ticket from "../components/Ticket"

const Profile = ({ data }: any) => {

    function separator(number: number) {
        // Convert the number to a string
        let numberString = number.toString();
      
        // Use a regular expression to insert commas as thousand separators
        numberString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      
        // Return the formatted number string
        return numberString;
      }

    if (!data) {
        return <Navigate to="/" replace />
    }

    const [tix,setTix] = useState<any[]>([])

    const [topupAmount,setTopupAmount] = useState<any>()
    const [withdrawAmount,setWithdrawAmount] = useState<any>()

    const handleTopup = () => {
        try {
            const token = localStorage.getItem('token')
            fetch('http://localhost:4000/topup', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    amount: topupAmount
                })
            }).then(() => window.location.reload())
          } catch (error) {
      
          }
    }

    const handleWithdraw = () => {
        try {
            const token = localStorage.getItem('token')
            fetch('http://localhost:4000/withdraw', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    amount: withdrawAmount
                })
            }).then(() => window.location.reload())
          } catch (error) {
      
          }
    }

    const [showTopup,switchShowTopup] = useState(false)
    const [showWithdraw,switchShowWithdraw] = useState(false)

    useEffect(() => {
        try {
            const token = localStorage.getItem('token')
            fetch('http://localhost:4000/tickets', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => response.json())
            .then(res => {
                if (res.success) {
                    setTix(res.tickets)
                }
            })
          } catch (error) {
      
          }
    }, [])
    
    return (
        <VStack paddingTop='30px'>
            <Text fontSize='15pt' fontWeight='bold'>Halo, {data.name}</Text>
            <Text>Saldo Anda Rp. {separator(data.balance)},-</Text>
            <HStack>
                <Text 
                    onClick={() => {
                        switchShowTopup(!showTopup)
                        switchShowWithdraw(false)
                        setTopupAmount('')
                        setWithdrawAmount('')
                    }}
                    _hover={{
                        color:'#AAAAAA',
                        cursor: 'pointer'
                    }}
                >
                    Topup
                </Text>
                <Text> | </Text>
                <Text 
                    onClick={() => {
                        switchShowWithdraw(!showWithdraw)
                        switchShowTopup(false)
                        setTopupAmount('')
                        setWithdrawAmount('')
                    }}
                    _hover={{
                        color:'#AAAAAA',
                        cursor: 'pointer'
                    }}
                >
                    Withdraw
                </Text>
            </HStack>
            {showTopup ? (
                <VStack>
                    <FormControl width='100%'>
                        <Input value={topupAmount} onChange={(event) => setTopupAmount(event.target.value)} placeholder='Jumlah Topup' type="number"/>
                    </FormControl>
                    <Center paddingTop='8px'>
                        <Button onClick={handleTopup}>Topup</Button>
                    </Center>
                </VStack>
            ) : showWithdraw ? (
                <VStack>
                    <FormControl width='100%'>
                        <Input value={withdrawAmount} onChange={(event) => setWithdrawAmount(event.target.value)} placeholder='Jumlah Withdraw' type="number"/>
                    </FormControl>
                    <Center paddingTop='8px'>
                        <Button onClick={handleWithdraw}>Withdraw</Button>
                    </Center>
                </VStack>
            ) : null}
            <Text fontWeight='bold' fontSize='13pt' paddingTop='25px'>Tiket Anda</Text>
            <Flex w='90%' flexWrap='wrap'>    
                {tix && (tix.length == 0 ? "Anda belum memiliki tiket" : (
                    tix.map((tic,idx) => <Box outline='2px solid black' w='24%' h='200px' margin='5px' padding='5px'>
                        <Ticket key={idx} uuid={tic.uuid} name={tic.booker_name} title={tic.title} seats={tic.seats} cost={tic.cost}  />
                    </Box>)
                ))}
            </Flex>
        </VStack>
    )
}

export default Profile
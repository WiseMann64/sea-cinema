import { useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import { Button, Center, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react"

interface Data {
    loggedIn: boolean
}

const MoviePage = (props: Data) => {

    function separator(number: number) {
        // Convert the number to a string
        let numberString = number.toString();
      
        // Use a regular expression to insert commas as thousand separators
        numberString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      
        // Return the formatted number string
        return numberString;
      }

    const { id } = useParams()

    const [data,setData] = useState<any>()

    const [showOrder,switchShowOrder] = useState(false)
    const [colors,setColors] = useState(Array(64).fill(0))

    const [orderResult,setOrderResult] = useState('')

    const seats = [
        [ 1, 2, 3, 4, 5, 6, 7, 8],
        [ 9,10,11,12,13,14,15,16],
        [17,18,19,20,21,22,23,24],
        [25,26,27,28,29,30,31,32],
        [33,34,35,36,37,38,39,40],
        [41,42,43,44,45,46,47,48],
        [49,50,51,52,53,54,55,56],
        [57,58,59,60,61,62,63,64]
    ]

    const [selectedToOrder,setSelectedToOrder] = useState<number[]>([])

    function handleSeatClick (i: number) {
        if (selectedToOrder.includes(i)) {
            let idx = selectedToOrder.indexOf(i)
            selectedToOrder.splice(idx,1)
        } else if (selectedToOrder.length < 6) selectedToOrder.push(i)
        const buttonColors = [...colors]
        buttonColors[i-1] = selectedToOrder.includes(i) ? 1 : 0
        setColors(buttonColors)
    }

    const handleOrder = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch('http://localhost:4000/order', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                movie_id: data.id,
                seats: selectedToOrder
            })})

            if (response.ok) {
                const res = await response.json()
                if (res.success) {
                    window.location.reload()
                } else {
                    setOrderResult(res.message)
                }
            }
        } catch (error) {
            console.log("Failed")
        }
    }
    
    useEffect(() => {
        fetch("http://localhost:4000/movies/" + id)
            .then(response => response.json())
            .then(res => {
                setData(res)
            })
    },[])    

    return (
        <VStack paddingLeft='10%' paddingTop='15px' paddingRight='10%' paddingBottom='12px'>
            {data && (
                <VStack>
                    <Center fontSize='20pt' fontWeight='bold'>{data.title}</Center>
                    <HStack>
                        <Image src={data.poster_url}/>
                        <Flex>
                            <VStack align='left'>
                                <Text fontSize='18pt' fontWeight='bold'>Deskripsi</Text>
                                <Text>{data.desc}</Text>
                                <Text fontSize='18pt' fontWeight='bold'>Release Date</Text>
                                <Text>{data.release_date}</Text>
                                <Text fontSize='18pt' fontWeight='bold'>Age Rating</Text>
                                <Text>{data.age_rating}</Text>
                                {
                                    data.available_seats.length < 1 ? (
                                        <Center fontSize='15pt' fontWeight='bold'>
                                            Mohon maaf, tiket sudah habis terjual
                                        </Center>
                                    ) : props.loggedIn ? (
                                        <Center
                                            fontSize='18pt' fontWeight='bold'
                                        > 
                                            <Text
                                            onClick={() => {
                                                switchShowOrder(!showOrder)
                                            }}
                                            _hover={{
                                                color:'#777777',
                                                cursor: 'pointer'
                                            }}
                                            >
                                                Pesan Tiket
                                            </Text>
                                        </Center>
                                    ) : (
                                        <Text>
                                            Silakan login untuk memesan tiket
                                        </Text>
                                    )
                                }
                                {
                                    showOrder ? (
                                        <VStack>
                                            <Text>Harga Tiket Satuan: Rp{separator(data.price)}</Text>
                                            <Text>Silakan pilih tempat duduk</Text>
                                            {seats.map((arr,i) => {
                                                return (
                                                    <HStack key={'container'+i}>
                                                        {arr.map(i => {
                                                            const avail = data.available_seats.includes(i)
                                                            return (
                                                                <Button
                                                                    w='40px'
                                                                    h='40px'
                                                                    pointerEvents={avail ? 'auto' : 'none'}
                                                                    bg={colors[i-1] == 1 ? '#00D92D' : avail ? '#D0D4D9' : '#8B8E91'}
                                                                    onClick={() => handleSeatClick(i)}
                                                                    _hover={avail ? {
                                                                        bg: colors[i-1] == 1 ? '#00F533' : '#E2E8F0'
                                                                    } : {}}
                                                                    key={i}
                                                                >
                                                                    {i}
                                                                </Button>
                                                            )
                                                        })}
                                                    </HStack>
                                                )
                                            })}
                                            {selectedToOrder.length == 0 ? null : (
                                                <Text>
                                                    Total Harga: Rp{separator(data.price*selectedToOrder.length)},-
                                                </Text>
                                            )}
                                            {selectedToOrder.length == 0 ? null : (
                                                <Button onClick={handleOrder}>
                                                    Pesan
                                                </Button>
                                            )}
                                            {orderResult == '' ? null : (
                                                <Text>{orderResult}</Text>
                                            )}
                                        </VStack>
                                    ) : null
                                }
                            </VStack>
                        </Flex>
                    </HStack>
                </VStack>
            )}
        </VStack>
    )

}

export default MoviePage
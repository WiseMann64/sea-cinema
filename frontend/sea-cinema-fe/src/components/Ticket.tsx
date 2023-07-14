import { Button, Text, VStack } from "@chakra-ui/react"

interface TicketProps {
    uuid: any,
    name: any,
    title: any,
    seats: any[],
    cost: any
}

const Ticket = (props: TicketProps) => {
    const cancel = () => {
        try {
            const token = localStorage.getItem('token')
            fetch('http://localhost:4000/tickets/cancel', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    id: props.uuid
                })
            }).then(() => window.location.reload())
          } catch (error) {
      
          }
    }

    return (
    <VStack>
        <Text>ID: {props.uuid}</Text>
        <Text>Nama: {props.name}</Text>
        <Text>Film: {props.title}</Text>
        <Text>Bangku: {props.seats.toString()}</Text>
        <Text>Harga: Rp. {props.cost},-</Text>
        <Button onClick={cancel}>Batalkan</Button>
    </VStack>
)}

export default Ticket
import { Button, Text, VStack } from "@chakra-ui/react"

interface TicketProps {
    uuid: any,
    name: any,
    title: any,
    seats: any[],
    cost: any
}

const Ticket = (props: TicketProps) => {

    function separator(number: number) {
        // Convert the number to a string
        let numberString = number.toString();
      
        // Use a regular expression to insert commas as thousand separators
        numberString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      
        // Return the formatted number string
        return numberString;
      }

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
        <Text>Nama Pemesan: {props.name}</Text>
        <Text>Film: {props.title}</Text>
        <Text>Kursi: {props.seats.toString()}</Text>
        <Text>Harga Total: Rp{separator(props.cost)},-</Text>
        <Button onClick={cancel}>Batalkan</Button>
    </VStack>
)}

export default Ticket
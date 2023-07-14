import { Flex, Box, Center, Image } from "@chakra-ui/react"
import { useEffect,useState } from "react"
import { Link } from "react-router-dom"

const Home = () => {

    const [movies,setMovies] = useState<any[]>([])

    const fetchMovies = () => {
        fetch("http://localhost:4000/movies").then(response => {
            return response.json()
        }).then(data => {
            setMovies(data)
        })
    }

    useEffect(() => {
        document.title = "SIX-SIX-an Cuy"
        fetchMovies()
    },[])



    return (
        <Center flexWrap='wrap'>
                {movies && (<Flex paddingLeft='20px' paddingTop='20px' flexWrap='wrap'>
                    {
                        movies.map((mv) => (
                            <Link key={mv.id} to={"movies/" + mv.id}>
                                <Box w='300px' h='470px' outline='4px solid black' padding='10px' margin='10px'>
                                    <Image src={mv.poster_url} outline='2px solid black' w='280px' h='420px'/>
                                    <Center textAlign='center' paddingTop='9px'>{mv.title}</Center>
                                </Box>
                            </Link>                            
                        ))
                    }
                </Flex>)}
        </Center>
    )

}

export default Home
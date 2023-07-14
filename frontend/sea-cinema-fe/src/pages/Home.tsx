import { Flex, VStack } from "@chakra-ui/react"
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
        <Flex paddingLeft='10%' paddingTop='12px'>
            {movies && (<VStack>
                {
                    movies.map((mv) => (
                        <Link key={mv.id} to={"movies/" + mv.id}>{mv.title}</Link>
                    ))
                }
            </VStack>)}
        </Flex>
    )

}

export default Home
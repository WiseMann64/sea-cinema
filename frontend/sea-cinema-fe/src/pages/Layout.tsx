import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginData from "../interface/LoginData";

const Layout = (props: LoginData) => {
    return (
        <Flex
            flexDirection='column'
            minH='100vh'
            maxW='100%'
        >
            <Navbar data={props.data} logout={props.logout} fetchData={props.fetchData}/>

            <Outlet />

            <Footer/>
        </Flex>
    )
}

export default Layout
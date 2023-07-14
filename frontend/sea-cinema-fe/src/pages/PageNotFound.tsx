import { useEffect } from "react"

const PageNotFound = () => {

    useEffect(() => {
        document.title = 'Page Not Found'
    },[]);

    return (
        <>
            Page Not Found :(
        </>
    )
}

export default PageNotFound
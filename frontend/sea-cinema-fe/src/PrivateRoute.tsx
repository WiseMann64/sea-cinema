import { Route, Navigate } from "react-router-dom"

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest}: any) => {
    return (
        <Route 
            {...rest}
            render={(props: any) =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Navigate to="/"/>
                )
            }
        />
    )
}

export default PrivateRoute
import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {

    const {user, loading, roleLoading, userStatus} = useContext(AuthContext)
    
    const location = useLocation()
    

    if(loading || roleLoading){
        return <p>Loading...</p>
    }

    if(!user || !userStatus=='active'){
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }
    
    return children

};

export default PrivateRoute;
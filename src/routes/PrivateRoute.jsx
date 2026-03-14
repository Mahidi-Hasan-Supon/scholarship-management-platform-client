import Loading from '../compunents/Loading/Loading';
import useAuth from '../useHook/useAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user , loading} = useAuth()
    if(loading){
        return <Loading></Loading>
    }
    if(!user){
        return <Navigate to='/login'></Navigate>
    }
    return children
};

export default PrivateRoute;
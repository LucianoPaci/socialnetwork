import jwt_decode from 'jwt-decode'
import setAuthToken from './setAuthToken'
import { setCurrentUser, logoutUser } from '../actions/authActions'

const checkAuthToken = (store) => {
     // Check for token 
    if(localStorage.jwtToken) {
        // Set auth token header 
        setAuthToken(localStorage.jwtToken)
        // Decode token and get user info
        const decoded = jwt_decode(localStorage.jwtToken)
        // Set user and isAuthenticated
        store.dispatch(setCurrentUser(decoded))
    
        // Check for expired token
        const currentTime = Date.now() / 1000
        if(decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser())
        // TODO: Clear current Profile
        // Redirect to login
        window.location.href = '/login'
        }
    }
    
}
export default checkAuthToken
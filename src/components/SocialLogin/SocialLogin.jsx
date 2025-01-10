import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                };
                return axiosPublic.post('/users', userInfo);
            })
            .then(response => {
                console.log('User saved:', response.data);
                navigate('/dashboard');
            })
            .catch(error => {
                if (error.code === 'auth/cancelled-popup-request') {
                    console.error('Only one popup request is allowed at a time.');
                } else if (error.code === 'auth/popup-closed-by-user') {
                    console.error('The popup was closed by the user before completing the sign-in.');
                } else {
                    console.error('Error during Google sign-in:', error);
                }
            });
    };

    return (
        <div className="p-8">
            <div className="divider"></div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn">
                    <FaGoogle className="mr-2"></FaGoogle>
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;
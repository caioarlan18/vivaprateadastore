import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import api from '../../axiosConfig/axios';
export function VerifyToken({ children, rota }) {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        async function verifyToken() {
            const id = localStorage.getItem("id");
            const token = localStorage.getItem("token");
            if (!id || !token) {
                navigate("/login");
            } else {
                try {
                    const response = await api.get(`/auth/logged/${id}`, {
                        headers: {
                            'x-access-token': token
                        }
                    })
                    localStorage.setItem('userdata', JSON.stringify(response.data));
                    setIsAuth(true);

                } catch (err) {
                    navigate("/login");
                }
            }
        }
        verifyToken();
    }, [])
    return isAuth ? children : null

}
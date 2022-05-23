import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('userInfo');
        navigate('/');
    }, [])

    return(
        <>
            <p>Trwa wylogowywanie</p>
        </>
    )
}

export default LogOut;
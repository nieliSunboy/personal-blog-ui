import React, { useEffect } from "react";
import { getToken } from "~/utils/anth";
import { useNavigate } from 'react-router-dom'

interface TokenAuthProps {
    children?: React.ReactNode;
}

const TokenAuth: React.FC<TokenAuthProps> = ({children}) => {
    const routerNavigate = useNavigate();
    useEffect(() => {
        if (!getToken()) {
            console.log('no-token!!!')
            routerNavigate('/login');
        }
    }, []);
    return <>{children}</>
}

export default TokenAuth;
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
        </button>
    );
};

export default Logout;

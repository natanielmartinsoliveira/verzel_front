import React, { useState, useContext } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loading from './Loading'; 

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { getUser, login } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        setLoading(true);
        e.preventDefault();
        try {
            login(email, password);            
        } catch (error) {
            console.error('Erro ao fazer login', error);
        } finally{
            setLoading(false);
        }
    };

    return (
        <div className="container">
            {loading && <Loading />}
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;
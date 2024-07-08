import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom'; 

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  getUser: () => Promise<void>,
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('token');
    if (loggedInUser) {
      getUser();
      localStorage.setItem('token', loggedInUser);
    }

    const responseInterceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };

  }, []);

  const login = async (email: string, password?: string) => {
    const response = await axios.post('/login', { email, password },{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      }})
    .then(response => {
      if (response.data?.access_token?.length > 0) {
        const loggedInUser = response.data?.access_token;
        setUser(loggedInUser);
        localStorage.setItem('token', loggedInUser);    
        history('/');
      } else {
        throw new Error('Invalid email or password');
      }
    }).catch(() => {throw new Error('Invalid email or password')});
    
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    history('/');
  };


  const getUser = async () =>{
    await axios.get(`/user/`).then(response => {
      setIsAuthenticated(true);
      setUser(response.data);
    }).catch(error => {
      console.log(error);
    });
  }

  const register = async (name: string, email: string, password: string) => { //
    await axios.post(`/register`, { name, email, password }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      }
    }).then((response)=>{
        login(email, password);
    }).catch(()=>{ throw new Error('Invalid email or password') }); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
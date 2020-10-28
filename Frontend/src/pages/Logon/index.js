import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import './styles.css';

import api from '../../services/api';

export default function Logon(e) {

    const [login, setLogin] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('session',{login});
            
            localStorage.setItem('loginUser', login);
            localStorage.setItem('nameUser', response.data.nome);
            
            history.push('/profile');
        } catch (error) {
            alert('Falha no login');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input
                        placeholder=" Seu Login "
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>


                    <Link className="back-link" to="/register"><FiLogIn size={16} color="#E02041" /> Nao tenho cadastro</Link>
                </form>
            </section>
        </div>
    );
};
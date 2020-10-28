import React, { useState } from 'react';
import { Link,useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import './styles.css';

import api from '../../services/api';

export default function Register() {
    const [nome, setName] = useState('');
    const [login, setLogin] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        const data = {
            nome,
            login
        };

        try {
            const response = await api.post('users', data);

            alert(`Seu login de acesso: ${response.data.login}`)
            history.push('/')
        } catch (error) {
            alert('Erro no cadastro');
        }

    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <h1>Cadastro</h1>
                    <p>Faça seu Cadastro e entre na plataforma</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" /> Voltar para a home
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="Seu Nome"
                        value={nome}
                        onChange={e => setName(e.target.value)}
                    />
                    <input placeholder="Seu login"
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
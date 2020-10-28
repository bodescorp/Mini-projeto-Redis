import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiDollarSign } from 'react-icons/fi'

import api from '../../services/api';
import './styles.css';

export default function Profile() {
    const [produtos, setProdutos] = useState([]);
    const [quant, setQuant] = useState(1);
    const history = useHistory();

    const nameUser = localStorage.getItem('nameUser');
    const loginUser = localStorage.getItem('loginUser');

    useEffect(() => {
        api.get('produtos').then(response => {
            setProdutos(response.data)
        });
    }, [loginUser]);

    async function handleCarrinho(id, descricao, preco, quantidade,e) {
        try {
            await api.post('/cart', { id, descricao, preco, quantidade, loginUser })
            alert('Add cart');
        } catch (error) {
            alert('Erro ao add ao carrinho');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <span>Bem vindo(a), {nameUser}</span>
                <Link className="button" to="/carrinho">Carrinho</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Nossos Produtos</h1>

            <ul>
                {produtos.map(produtos => (
                    <li key={produtos.id}>
                        <strong>Descrição: </strong>
                        <p>{produtos.descricao}</p>

                        <strong>Valor: </strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produtos.preco)}</p>
                        
                        <button onClick={() => handleCarrinho(produtos.id, produtos.descricao, produtos.preco)} type="button">
                            <FiDollarSign size={20} color="#a8a8b3" />
                        </button>

                    </li>
                ))}
            </ul>
        </div>
    );
}
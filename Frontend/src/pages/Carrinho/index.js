import React, { useEffect, useState } from 'react';
import { FiArrowLeft, FiTrash, FiCheck } from 'react-icons/fi'
import { Link } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';

export default function Carrinho() {
    const [cart, setCart] = useState([]);
    const [val, setVal] = useState(0);

    const nameUser = localStorage.getItem('nameUser');
    const loginUser = localStorage.getItem('loginUser');


    useEffect(() => {
        api.get(`cart/${loginUser}`).then(response => {
            setCart(response.data)
        });
    }, [loginUser]);

    useEffect(() => {
        api.get(`val/${loginUser}`).then(response => {
            setVal(response.data)
        });
    }, [loginUser]);


    return (
        <div className="profile-container">
            <header>
                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={18} color="#E02041" />
                </Link>
                <span>Sua lista de compras, {nameUser}</span>
                <p className="button">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)} </p>
                <button type="button">
                    <FiCheck size={18} color="#E02041" />
                </button>
            </header>

            <h1>Seus Produtos</h1>
            <ul>

                {cart.map(cart => (
                    <li key={cart.id}>
                        <strong>Descrição: </strong>
                        <p>{cart.descricao}</p>
                        <strong>Quantidade:</strong>
                        <p> {cart.quantidade}</p>

                        <strong>Valor: </strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cart.quantidade * cart.preco)}</p>
                        
                    </li>
                ))}
            </ul>
        </div >
    );
}
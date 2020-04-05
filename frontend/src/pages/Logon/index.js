import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from "../../services/api";

import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon() {
    const [id, setID] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();
        //const data = { id };

        await api.post('session', { id })
            .then(response => {

                localStorage.setItem('ongId', id);
                localStorage.setItem('ongName', response.data.name);

                history.push('/profile');
            })
            .catch(err => {
                alert('Falha no Login');
            });
    }

    return (
        <div className="logon-container">
            <div className="card">
                <section className="form">
                    <img src={logoImg} alt="Logo" />

                    <form onSubmit={handleLogin}>
                        <h1>Faça seu Logon</h1>
                        <input type="text" placeholder="Sua ID" value={id} onChange={e => setID(e.target.value)} />
                        <button className="button" type="submit">ENTRAR</button>

                        <Link to="/register">
                            <FiLogIn size={16} color="#e02041" />
                            Não tenho cadastro
                        </Link>
                    </form>
                </section>
                <img src={heroesImg} alt="Heroes" />
            </div>
        </div>
    );
}
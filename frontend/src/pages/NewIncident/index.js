import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from "../../services/api";

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
    const ongId = localStorage.getItem('ongId');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        };

        await api.post('incidents', data, {
            headers: {
                Authorization: ongId
            }
        })
            .then(response => {
                console.log(response);
                alert(`Caso cadastrado com sucesso, id: ${response.data.id}`);
                history.push('/profile');
            }).catch(err => {
                alert('Erro!!!');
                console.log('Erro: ', err);
            });
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo" />
                    <h1>Cadastrar novo Caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver issos.</p>

                    <Link to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                            Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input type="text" placeholder="Titulo do caso" value={title} onChange={e => setTitle(e.target.value)} />
                    <textarea type="text" placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} />
                    <input type="text" placeholder="Valor em reais" value={value} onChange={e => setValue(e.target.value)} />

                    <button className="button" type="submit">CADASTRAR</button>
                </form>
            </div>

        </div>
    );
}
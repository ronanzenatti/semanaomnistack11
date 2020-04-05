import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from "../../services/api";

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {

    const [incidents, setIncidents] = useState([]);
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        })
            .then(response => {
                console.log(response.data);
                setIncidents(response.data);
            })
            .catch(err => {
                alert('Erro buscando dados, entre novamente.');
                history.push('/');
            });
    }, [ongId, history]);

    async function handleDeleteIncident(id) {
        await api.delete(`incidents/${id}`, {
            headers: {
                Authorization: ongId
            }
        })
            .then(response => {
                alert('Cado deletado com sucesso!')
                setIncidents(incidents.filter(incident => incident.id !== id));
            })
            .catch(err => {
                alert('Erro ao deleter o Caso, tente novamente.');
            });
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }


    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Logo" />
                <span>Bem Vinda, <strong>{ongName}</strong>.</span>
                <Link className="button" to="incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>
            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>

                ))}
            </ul>

        </div>
    );
}
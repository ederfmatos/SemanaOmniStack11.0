import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import './styles.scss';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const history = useHistory();

  async function handleNewIncident(event) {
    event.preventDefault();

    const model = { title, description, value };

    try {
      const ongId = localStorage.getItem('ongId');

      await api.post('incidents', model, {
        headers: { Authorization: ongId },
      });

      history.push('/profile');
    } catch (error) {
      alert('Erro ao cadastrar caso, tente novamente');
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The hero" />
          <h1>Cadastro novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso
          </p>

          <Link to="/profile" className="backlink">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            type="text"
            placeholder="Titulo do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required={true}
          />
          <textarea
            placeholder="Descrição"
            id=""
            rows="5"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required={true}
          ></textarea>
          <input
            type="text"
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
            required={true}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

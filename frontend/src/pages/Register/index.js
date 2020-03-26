import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import './styles.scss';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsApp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUF] = useState('');

  const history = useHistory();

  async function handleRegister(event) {
    event.preventDefault();

    const model = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    try {
      const { data } = await api.post('/ongs', model);

      alert(`Seu ID de acesso: ${data.id}`);
      history.push('/');
    } catch (err) {
      alert('Erro no cadastro. tente novamente');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da ONG.
          </p>

          <Link to="/" className="backlink">
            <FiArrowLeft size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}
            required={true}
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required={true}
          />

          <input
            type="tel"
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsApp(e.target.value)}
            required={true}
          />

          <div className="input-group">
            <input
              type="text"
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
              required={true}
            />

            <input
              type="text"
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={e => setUF(e.target.value)}
              required={true}
            />
          </div>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

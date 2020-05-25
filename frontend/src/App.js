import React, { useEffect, useState } from 'react';
import api from './services/api';

import './Global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {
  const [devs, setDevs] = useState([]);
  const [username, setUsername] =  useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);

  useEffect(() => { 
    async function loadDevs(){
      const response = await api.get('/devs');
      setDevs(response.data);
    }

    loadDevs();
  }, [devs]);

  async function handleAddDev(e){
    e.preventDefault();

    const response = await api.post('/devs', {
      github_username: username,
      techs,
      latitude,
      longitude,
    });
    setUsername('');
    setTechs('');

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form>
          <div className="input-block">
            <label htmlFor="github_username">Usuario do Github</label>
            <input 
              name="github_username" 
              id="github_username" 
              required
              value={username} 
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input 
              name="techs" 
              id="techs" 
              required 
              value={techs} 
              onChange={e => setTechs(e.target.value)}
            />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
                type="text" 
                value={latitude} 
                name="latitude" 
                id="latitude" 
                required
                onChange={e => setLatitude(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
                type="text" 
                value={longitude} 
                name="longitude" 
                id="longitude" 
                required 
                onChange={e => setLongitude(e.target.value)}
              />
            </div>
          </div>

          <button onClick={handleAddDev} type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          {devs ? 
            devs.map(dev => (
              <li className="dev-item" key={dev._id}>
                <header>
                  <img src={dev.avatar_url} alt={dev.name}/>
                  <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                  </div>
                </header>
                <p>{dev.bio}</p>
                <a href={`https://github.com/${dev.github_username}`}>
                  Acessar perfil no Github
                </a>
              </li>
            ))
          : ''}
        </ul>
      </main>
    </div>
  );
}

export default App;

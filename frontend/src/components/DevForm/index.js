import React, { useState, useEffect } from 'react';

export default function DevForm({ onSubmit }) {
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

  async function handleSubmit(e) {
    e.preventDefault();
    
    await onSubmit({
      github_username: username,
      techs,
      latitude,
      longitude,
    });
    setUsername('');
    setTechs('');
  }

  return (
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

      <button onClick={handleSubmit} type="submit">Salvar</button>
    </form>
  )
}
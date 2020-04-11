import React from "react";

import "./styles.css";
import { useState, useEffect } from "react";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);
  
  useEffect(() => {
    api.get('/repositories').then (response => {
      setRepositories(response.data);
    });
  }, []);


  async function handleAddRepository() {
    // TODO
    const response = await api.post('/repositories', {
      title: `Novo Repositório ${Date.now()}`,
      url: "www.teste.com",
      techs: "Node, JS, Vara de goiaba"
    });
    const repository = response.data;
    setRepositories([... repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    //alert("entrou na função" + " " + id);
    await api.delete(`repositories/${ id }`);
   // const repository = response.data;
   setRepositories(repositories.filter(repositories => repositories.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => 
          <li key={ repository.id }>
            { repository.title }
            <button onClick={
              () => handleRemoveRepository(repository.id)
              }>
            Remover
            </button>
          </li>)
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

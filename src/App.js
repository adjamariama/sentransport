import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import ListeLignes from './ListeLignes';
import Footer from './Footer';
import StatReseau from './StatReseau';

function App() {
  // 1. Les variables d'état (State)
  const [lignes, setLignes] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [recherche, setRecherche] = useState("");
  const [ligneSelectionnee, setLigneSelectionnee] = useState(null);

  // 2. Charger les données au démarrage (Lab 5)
  useEffect(() => {
    fetch("http://localhost:5000/lignes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur serveur : " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setLignes(data);
        setChargement(false);
      })
      .catch((error) => {
        setErreur(error.message);
        setChargement(false);
      });
  }, []);

  // ==========================================
  // Étape 4 : Gestion des écrans de chargement et d'erreur
  // ==========================================

  // Écran de chargement
  if (chargement) {
    return (
      <div className="App">
        <Header />
        <main className="contenu">
          <p className="message-chargement">
            Chargement des lignes ...
          </p>
        </main>
      </div>
    );
  }

  // Écran d'erreur
  if (erreur) {
    return (
      <div className="App">
        <Header />
        <main className="contenu">
          <div className="message-erreur">
            <p> Impossible de charger les lignes . </p>
            <p className="erreur-detail">{erreur}</p>
            <p> Vérifiez que le serveur Flask est lancé (python api/app.py) . </p>
          </div>
        </main>
      </div>
    );
  }

  // Écran normal : Filtrage dynamique des lignes selon la recherche
  const lignesFiltrees = lignes.filter(ligne => 
    ligne.depart.toLowerCase().includes(recherche.toLowerCase()) ||
    ligne.arrivee.toLowerCase().includes(recherche.toLowerCase()) ||
    ligne.numero.toString().includes(recherche)
  );

  return (
    <div className="App">
      <Header />
      <main className="contenu">
        
        {/* Barre de recherche activée et connectée à l'état */}
        <div style={{ marginBottom: '20px' }}>
          <input 
            type="text" 
            placeholder="🔍 Rechercher une ligne (ex: Parcelles, Yoff, 7...)" 
            value={recherche} 
            onChange={(e) => setRecherche(e.target.value)} 
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxSizing: 'border-box'
            }}
            className="barre-recherche"
          />
        </div>

        {/* On passe les lignes filtrées pour que l'affichage se mette à jour */}
        <StatReseau lignes={lignesFiltrees} />
        <ListeLignes lignes={lignesFiltrees} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import ListeLignes from './ListeLignes';
import StatReseau from './StatReseau';
import Footer from './Footer';
// CORRECTION : On importe 'carte.js' avec son vrai nom en minuscule sur le disque
import Carte from './carte'; 

function App() {
  // 1. Les variables d'état (State)
  const [lignes, setLignes] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [recherche, setRecherche] = useState("");

  // 2. Charger les données au démarrage depuis l'API Flask
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

  // 3. Filtrage dynamique des lignes pour la barre de recherche
  const lignesFiltrees = lignes.filter((l) =>
    l.depart.toLowerCase().includes(recherche.toLowerCase()) ||
    l.arrivee.toLowerCase().includes(recherche.toLowerCase()) ||
    l.numero.toString().includes(recherche)
  );

  // ==========================================
  // Écrans de chargement et d'erreur
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

  // ==========================================
  // Écran principal (Affichage Normal)
  // ==========================================
  return (
    <div className="App">
      <Header />
      <main className="contenu">
        
        {/* CORRECTION : Barre de recherche intégrée directement (pas besoin de fichier Recherche.js) */}
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

        {/* Message dynamique des résultats */}
        <p className="resultat-recherche" style={{ color: '#7f8c8d', marginBottom: '15px' }}>
          {lignesFiltrees.length} ligne{lignesFiltrees.length > 1 ? 's' : ''} trouvée{lignesFiltrees.length > 1 ? 's' : ''}
        </p>

        {/* On affiche tes statistiques et ta liste de lignes */}
        <StatReseau lignes={lignesFiltrees} />
        <ListeLignes lignes={lignesFiltrees} />

        {/* Affichage de la carte Leaflet */}
        <Carte />

      </main>
      <Footer />
    </div>
  );
}

export default App;
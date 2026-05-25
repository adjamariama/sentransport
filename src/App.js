import './App.css';
import Header from './Header';
import ListeLignes from './ListeLignes';
import Footer from './Footer';
import StatReseau from './StatReseau';

function App() {
  const lignes = [
    { id: 1, numero: "1", depart: "Parcelles", arrivee: "Plateau", arrets: 14, couleur: "#e74c3c" },
    { id: 2, numero: "7", depart: "Guediawaye", arrivee: "Place Obé", arrets: 18, couleur: "#3498db" },
    { id: 3, numero: "15", depart: "Pikine", arrivee: "Medina", arrets: 12, couleur: "#f1c40f" },
    { id: 4, numero: "23", depart: "Ouakam", arrivee: "Grand Dakar", arrets: 10, couleur: "#9b59b6" },
    { id: 5, numero: "8", depart: "Almadies", arrivee: "Colobane", arrets: 16, couleur: "#1abc9c" },
    { id: 6, numero: "12", depart: "Yoff", arrivee: "Sandaga", arrets: 11, couleur: "#e67e22" },
    { id: 7, numero: "30", depart: "Fann", arrivee: "Liberté", arrets: 9, couleur: "#7f8c8d" },
    { id: 8, numero: "44", depart: "Médina", arrivee: "HLM", arrets: 7, couleur: "#c0392b" },
    { id: 9, numero: "5", depart: "Dieuppeul", arrivee: "Sicap", arrets: 13, couleur: "#2980b9" },
    { id: 10, numero: "19", depart: "Ouakam", arrivee: "Fann", arrets: 15, couleur: "#27ae60" }
  ];

  return (
    <div className="App">
      <Header />
      <main className="contenu">
        <StatReseau lignes={lignes} />
        <ListeLignes lignes={lignes} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
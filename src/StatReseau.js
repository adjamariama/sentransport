import './StatReseau.css';

function StatReseau({ lignes }) {
  const totalLignes = lignes.length;
  const totalArrets = lignes.reduce((acc, ligne) => acc + ligne.arrets, 0);
  const ligneMax = lignes.reduce((max, ligne) => (ligne.arrets > max.arrets ? ligne : max), lignes[0]);

  return (
    <div className="stat-reseau">
      <div>Total Lignes: {totalLignes}</div>
      <div>Total Arrêts: {totalArrets}</div>
      <div>Ligne la plus longue: {ligneMax.numero} ({ligneMax.arrets} arrêts)</div>
    </div>
  );
}

export default StatReseau;
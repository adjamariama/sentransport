import './LigneBus.css';

function LigneBus({ numero, depart, arrivee, arrets, couleur }) {
  // On crée un style dynamique pour le badge du numéro
  const styleBadge = { backgroundColor: couleur || '#0a6e31' }; 

  return (
    <div className="ligne-bus">
      <div className="ligne-numero" style={styleBadge}>{numero}</div>
      <div className="ligne-info">
        <span className="ligne-trajet">{depart} &rarr; {arrivee}</span>
        <span className="ligne-arrets">{arrets} arrêts</span>
      </div>
    </div>
  );
}

export default LigneBus;

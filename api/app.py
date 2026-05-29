import json
# Ajout de 'request' pour l'exercice 3
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Charger les données des lignes depuis le fichier JSON
with open("api/lignes_ddd.json", "r", encoding="utf-8") as f:
    lignes = json.load(f)

# Charger les données des arrêts géolocalisés (Lab 5 - Étape 3)
with open("api/arrets.json", "r", encoding="utf-8") as f:
    arrets = json.load(f)

@app.route("/")
def accueil():
    return jsonify({
        "message": "Bienvenue sur l’API SenTransport !",
        "endpoints": [
            "/lignes", 
            "/lignes/<id>", 
            "/arrets", 
            "/stats", 
            "/lignes/recherche"
        ]
    })

# Récupérer toutes les lignes de bus
@app.route("/lignes")
def get_lignes():
    return jsonify(lignes)

# Récupérer une ligne spécifique par son ID
@app.route("/lignes/<int:ligne_id>")
def get_ligne(ligne_id):
    ligne = next(
        (l for l in lignes if l["id"] == ligne_id),
        None
    )
    
    if ligne is None:
        return jsonify({"erreur": "Ligne non trouvee"}), 404
        
    return jsonify(ligne)


# =====================================================================
# ENDPOINTS ADAPTÉS ET EXERCICES
# =====================================================================

# Nouvelle version Lab 5 : Liste complète des arrêts avec coordonnées pour Leaflet
@app.route("/arrets")
def get_arrets():
    return jsonify(arrets)


# Exercice 2 : Statistiques de l'application
@app.route("/stats")
def get_stats():
    nombre_total_lignes = len(lignes)
    
    # Somme de tous les arrêts recensés sur les lignes
    somme_total_arrets = sum(ligne["arrets"] for ligne in lignes)
    
    # Recherche de la ligne qui possède le plus d'arrêts
    ligne_max_arrets = max(lignes, key=lambda l: l["arrets"])
    numero_ligne_max = ligne_max_arrets["numero"]
    
    statistiques = {
        "nombre_total_lignes": nombre_total_lignes,
        "somme_total_arrets": somme_total_arrets,
        "ligne_avec_le_plus_d_arrets": numero_ligne_max
    }
    
    return jsonify(statistiques)


# Exercice 3 : Recherche de lignes par départ ou arrivée
@app.route("/lignes/recherche")
def recherche_lignes():
    # Récupérer le paramètre 'q' dans l'URL (ex: ?q=Pikine)
    query = request.args.get("q", "").strip().lower()
    
    if not query:
        return jsonify([])
        
    # Filtrer si le mot-clé est dans le départ ou l'arrivée
    lignes_filtrees = []
    for ligne in lignes:
        depart = ligne["depart"].lower()
        arrivee = ligne["arrivee"].lower()
        
        if query in depart or query in arrivee:
            lignes_filtrees.append(ligne)
            
    return jsonify(lignes_filtrees)

# =====================================================================

if __name__ == "__main__":
    app.run(debug=True, port=5000)
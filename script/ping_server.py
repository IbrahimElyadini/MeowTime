import time
import requests

# === CONFIGURATION ===
url = "https://BACKENDURL/api/feeding/schedule"   # Remplacez par l'URL du serveur à pinger
intervalle = 5 * 60  # Intervalle en secondes (ici 5 minutes)

# === BOUCLE PRINCIPALE ===
while True:
    try:
        print(f"[INFO] Envoi de requête à {url}...")
        reponse = requests.get(url)
        print(f"[SUCCÈS] Code retour : {reponse.status_code}")
        print("[CONTENU] Réponse du serveur :")
        print(reponse.text)
    except Exception as e:
        print(f"[ERREUR] Impossible de contacter le serveur : {e}")
    
    time.sleep(intervalle)
#include <WiFi.h>

// Remplace par tes identifiants Wi-Fi
const char* ssid = "MON_SSID";
const char* password = "MON_MOT_DE_PASSE";

WiFiServer server(80);  // Création du serveur sur le port 80

void setup() {
  Serial.begin(115200);
  delay(1000);

  Serial.println();
  Serial.print("Connexion à ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  // Attente de la connexion
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print("Statut de connexion : ");
    Serial.println(WiFi.status());
  }

  Serial.println();
  Serial.println("✅ Connecté au Wi-Fi !");
  Serial.print("Adresse IP : ");
  Serial.println(WiFi.localIP());

  server.begin();
}

void loop() {
  WiFiClient client = server.accept(); // écoute des clients entrants

  if (client) {
    Serial.println("Client connecté !");
    String request = client.readStringUntil('\r');
    Serial.println(request);
    client.clear();

    // Réponse HTTP simple
    client.println("HTTP/1.1 200 OK");
    client.println("Content-type:text/html");
    client.println();
    client.println("<!DOCTYPE html><html><body><h1>ESP32 connected !</h1></body></html>");
    client.println();
    client.stop();
    Serial.println("Client déconnecté");
  }
  
}

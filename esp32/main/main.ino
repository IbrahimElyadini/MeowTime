#include <WiFi.h>
#include <ESP32Servo.h>
#include <HTTPClient.h>
#include "secrets.h"
// secrets.h devrait être dans le même folder et avoir deux constantes ssid et password respectif à votre réseau

// Serveur sur l'ESP32
WiFiServer server(80);  // Création du serveur sur le port 80

// Servo
#define SERVO_PIN    27
#define OPEN_TIME    5
#define CLOSE_TIME   5

Servo servo1;

// PING VERS SERVEUR EXTERNE
const char* pingUrl = "https://BACKENDURL/api/feeding/schedule";  //Remplacer l'url par celle du backend
unsigned long lastPingTime = 0;
const unsigned long pingInterval = 5 * 60 * 1000;

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

  servo1.attach(SERVO_PIN);

  server.begin();
}

void openThenClose() {
  Serial.println("Ouverture du servo...");
  for (int angle = 0; angle <= 180; angle++) {
    servo1.write(angle);
    delay(OPEN_TIME);
  }

  Serial.println("Fermeture du servo...");
  for (int angle = 180; angle >= 0; angle--) {
    servo1.write(angle);
    delay(CLOSE_TIME);
  }
}

void loop() {
  WiFiClient client = server.accept(); // écoute des clients entrants

  if (client) {
    Serial.println("Client connecté !");
    String request = client.readStringUntil('\r');
    Serial.println("Requête reçue : " + request);
    client.read(); // lecture du \n qui suit

    // --- GESTION REQUÊTE ---
    bool triggered = false;
    if (request.indexOf("POST /feed") >= 0) {
      openThenClose();
      triggered = true;
    }

    // --- REPONSE HTTP ---
    client.println("HTTP/1.1 200 OK");
    client.println("Content-type:text/html");
    client.println("Access-Control-Allow-Origin: *");
    client.println("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    client.println("Access-Control-Allow-Headers: Content-Type");
    client.println();
    if (triggered) {
      client.println("<html><body><h1>Servo active 🐱🍽️</h1></body></html>");
    } else {
      client.println("<html><body><h1>ESP32 operationnel</h1></body></html>");
    }
    client.println();
    client.stop();
    Serial.println("Client déconnecté\n");
  }
  
  // --- Ping périodique vers un serveur externe ---
  if (millis() - lastPingTime > pingInterval) {
    lastPingTime = millis();

    if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;
      http.setTimeout(50000);
      http.begin(pingUrl);

      Serial.println("[PING] Envoi de requête au serveur externe...");
      int httpCode = http.GET();

      if (httpCode > 0) {
        String payload = http.getString();
        Serial.printf("[PING] Code retour: %d\n", httpCode);
        Serial.println("[PING] Contenu :");
        Serial.println(payload);
      } else {
        Serial.printf("[PING] Erreur de requête : %s\n", http.errorToString(httpCode).c_str());
      }

      http.end();
    } else {
      Serial.println("[PING] WiFi déconnecté. Impossible d'envoyer la requête.");
    }
  }
}

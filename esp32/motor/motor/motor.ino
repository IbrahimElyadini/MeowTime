#include <ESP32Servo.h>

#define SERVO_PIN    27       // Broche de commande du servo
#define OPEN_TIME    5        // Temps entre les pas d'ouverture (ms)
#define CLOSE_TIME   5        // Temps entre les pas de fermeture (ms)

Servo servo1;

void setup() {
  Serial.begin(115200);
  servo1.attach(SERVO_PIN);
  Serial.println("Servo prêt !");
}

void loop() {
  openThenClose();  // Lance l'ouverture puis la fermeture du servo
  delay(2000);      // Pause entre deux cycles
}

// --- Fonction qui ouvre le servo puis le referme ---
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

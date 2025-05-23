# MeowTime 🐾

**MeowTime** est une application React permettant de programmer l'alimentation automatique de mon chat via une carte **ESP32**.

## 🚀 Fonctionnement

- L'utilisateur planifie des repas depuis l'interface web.
- À l'heure prévue, l'application envoie une requête HTTP à l'ESP32 via le réseau local ou Internet.
- L'ESP32 actionne un circuit pour distribuer la nourriture à Mimi 🐱.
![Mon chat Mimi](site-web/src/assets/mimi5.png)

## 📦 Technologies

- React (Frontend)
- Node.js (Backend)
- ESP32 (Microcontrôleur Wi-Fi)
- HTTP API pour la communication

## Port Forwarding ⏩
Pour permettre à l’ESP32 de recevoir des requêtes HTTP depuis l’extérieur de votre réseau local, comme celles envoyées par votre site MeowTime (hébergé en ligne ou sur un autre réseau), vous devez configurer le port forwarding sur votre routeur.

Cela redirige les requêtes venant d'Internet vers votre ESP32, qui est connecté à votre réseau local.
Étapes:
    1. Se connecter au routeur via l'addresse de passerelle.
    2. S'authentifier le mot de passe est probablement le numéro de série du routeur.
    3. Trouver l'esp32 et lui attribué une addresse ip statique.
    4. Changer l'un des port externes du routeur et redirigier vers l'esp32 et son port exemple (externe: 80 - interne: 80)
    5. Notez l'adresse public du routeur et la réecrire dans le serveur avec le port externe

## ▶️ Lancer le projet

```bash
npm install
npm start

# MeowTime 🐾

**MeowTime** est une application React permettant de programmer l'alimentation automatique d'un chat via une carte **ESP32**.

## 🚀 Fonctionnement

- L'utilisateur planifie des repas depuis l'interface web.
- À l'heure prévue, l'application envoie une requête HTTP à l'ESP32 via le réseau local ou Internet.
- L'ESP32 actionne un circuit (servo-moteur, relais, etc.) pour distribuer la nourriture à Mimi 🐱.

## 📦 Technologies

- React (Frontend)
- ESP32 (Microcontrôleur Wi-Fi)
- HTTP API locale pour la communication

## ▶️ Lancer le projet

```bash
npm install
npm start

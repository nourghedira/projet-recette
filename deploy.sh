#!/bin/bash

echo "🚀 Démarrage du déploiement..."

docker-compose up -d --build

echo "⏳ Attente démarrage du serveur..."
sleep 5

echo "🧪 Lancement des tests..."
cd backend && npm test

echo "✅ Projet lancé avec succès !"
echo "🌐 Frontend : http://localhost:4200"
echo "⚙️  Backend  : http://localhost:3000"
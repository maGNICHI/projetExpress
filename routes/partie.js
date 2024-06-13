var express = require('express');
// const { render } = require('../app');
const Partie = require('../models/Partie');
var router = express.Router();

// Fonction pour créer une nouvelle partie
async function nouvellePartie(joueur1Id, joueur2Id) {
    try {
        // Récupérer les informations des joueurs depuis la base de données
        const joueur1 = await Joueur.findById(joueur1Id);
        const joueur2 = await Joueur.findById(joueur2Id);

        if (!joueur1 || !joueur2) {
            throw new Error('Joueur(s) non trouvé(s)');
        }

        // Créer une nouvelle partie avec les IDs des joueurs et l'état "en cours"
        const nouvellePartie = new Partie({
            nom: "Nom de la partie", // Vous pouvez ajouter un nom si nécessaire
            joueur_1: joueur1Id,
            joueur_2: joueur2Id,
            etat: "en cours"
        });

        // Enregistrer la nouvelle partie dans la base de données
        await nouvellePartie.save();

        return 'Partie créée avec succès';
    } catch (error) {
        throw new Error(error.message);
    }
}

// Route pour créer une nouvelle partie
router.post('/newPartie/:joueur1Id/:joueur2Id', async (req, res) => {
    try {
        const { joueur1Id, joueur2Id } = req.params;
        const message = await nouvellePartie(joueur1Id, joueur2Id);
        res.json({ message });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
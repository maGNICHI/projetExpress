var express = require('express');
// const { render } = require('../app');
const Joueur = require('../models/Joueur');
var router = express.Router();
// add
router.post('/addJoueur', async(req,res)=>{
    try {
        const newContact = new Joueur({
            pseudo: req.body.pseudo,
            sante: 100, // Initialiser la santé à 100
            score: 0  
        });
        const savedContact = await newContact.save();
        //console.log("Contact saved:", savedContact);
        res.json({ message: 'Joueur added successfully', joueur: savedContact });
    } catch (error) {
        console.error("Error saving contact:", error);
        res.status(500).json({ error: 'Error saving contacsage '});
    }
  })
  router.get('/getalljoueur', async (req, res) => {
    try {
      const Joueurs = await Joueur.find();
      res.json(Joueurs);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération les Joueurs' });
    }
});
router.delete('/DeleteJoueur/:id', async(req,res)=>{
    try {
        const formData = await Joueur.findByIdAndDelete(req.params.id);
  
        if (formData) {
          res.status(200).json('Joueur deleted successfully');  
        } else {
            res.status(404).json({ message: 'Internship form not found' });  
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  });
  router.get('/:id', async (req, res) => {
    try {
        // Récupérer l'ID du joueur à partir des paramètres de la requête
        const joueurId = req.params.id;

        // Rechercher le joueur dans la base de données en utilisant son ID
        const joueur = await Joueur.findById(joueurId);

        // Vérifier si le joueur existe
        if (!joueur) {
            // Si le joueur n'est pas trouvé, renvoyer une réponse avec un statut 404 (Not Found)
            return res.status(404).json({ message: 'Joueur non trouvé' });
        }

        // Si le joueur est trouvé, renvoyer une réponse avec le joueur trouvé
        res.json({ joueur });
    } catch (error) {
        // Gérer les erreurs
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
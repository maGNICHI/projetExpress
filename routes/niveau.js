var express = require('express');
// const { render } = require('../app');
const Niveau = require('../models/Niveau');
var router = express.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
    Niveau.find(async function (err, data) { res.send("Niveaux") });
});
// add
router.post('/addNiveau', async (req, res) => {
    try {
        const newNiveau = new Niveau({
            FullName: req.body.FullName,
            Phone: req.body.Phone
        });
        const savedNiveau = await newNiveau.save();
        console.log("Niveau saved:", savedNiveau);
        res.json({ message: 'Niveau added successfully', Niveau: savedNiveau });
    } catch (error) {
        console.error("Error saving Niveau:", error);
        res.status(500).json({ error: 'Error saving Niveau' });
    }
});
router.get('/add', (req, res) => {
    // Rendre le formulaire pour ajouter un Niveau
    res.render('Niveaus');
});
//update
router.post("/update", function (req, res) {
    var id = req.body.id;
    Niveau.findById({ _id: id }, function (err, doc) {
        doc.FullName = req.body.fullname;
        doc.Phone = req.body.phone;
        doc.save();
        console.log(doc)
    });
});
//delete
router.get("/delete/:id", function (req, res, next) {
    var id = req.body.id;
    Niveau.findOneAndDelete({ _id: id }, function (err) {
        if (err) throw err;
        console.log("supprimer un Niveau");
    });
});

module.exports = router;

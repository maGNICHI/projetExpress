var express = require('express');
// const { render } = require('../app');
const Batiment = require('../models/Batiment');
var router = express.Router();

/* GET Batiment listing. */
router.get('/getallbatiment', function (req, res, next) {
    Contact.find(async function (err, data) { res.send("Batiments") });
});
// add
router.post('/addBatiment', async (req, res) => {
    try {
        const newBatiment = new Batiment({
            nom: req.body.FullName,
            nbr_niveau : 0,
            description: req.body.description,
            adresse: req.body.adresse
        });
        const savedBatiment = await newBatiment.save();
        console.log("Batiment saved:", savedBatiment);
        res.json({ message: 'Batiment added successfully', Batiment: savedBatiment });
    } catch (error) {
        console.error("Error saving contact:", error);
        res.status(500).json({ error: 'Error saving Batiment' });
    }
});
router.post("/update", function (req, res) {
    var id = req.body.id;
    Batiment.findById({ _id: id }, function (err, doc) {
        doc.FullName = req.body.fullname;
        doc.Phone = req.body.phone;
        doc.save();
        console.log(doc)
    });
});

router.get("/delete/:id", function (req, res, next) {
    var id = req.body.id;
    Batiment.findOneAndDelete({ _id: id }, function (err) {
        if (err) throw err;
        console.log("supprimer un Batiment");
    });
});

module.exports = router;

var express = require('express');
// const { render } = require('../app');
const Contact = require('../models/contact');


var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  Contact.find(async function(err,data)
  {
   res.send("conatcts")

  });
 
});

// add
router.post('/addp', async (req, res) => {
    try {
        const newContact = new Contact({
            FullName: req.body.FullName,
            Phone: req.body.Phone
        });
        const savedContact = await newContact.save();
        console.log("Contact saved:", savedContact);
        res.json({ message: 'Contact added successfully', contact: savedContact });
    } catch (error) {
        console.error("Error saving contact:", error);
        res.status(500).json({ error: 'Error saving contact' });
    }
  });
  
  router.get('/add', (req, res) => {
    // Rendre le formulaire pour ajouter un contact
    res.render('contacts');
  });

router.post("/update",function(req,res)
{
var id=req.body.id;
Contact.findById({_id:id},function(err,doc)
{
doc.FullName=req.body.fullname;
doc.Phone=req.body.phone;
doc.save();
console.log(doc)
});
});

router.get("/delete/:id",function(req,res,next){
var id= req.body.id;
Contact.findOneAndDelete({_id:id},function(err)
{
if(err) throw err ; 
console.log("supprimer un contact");
});
});

module.exports = router;

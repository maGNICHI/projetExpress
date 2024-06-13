const mongoose=require('mongoose');
var Schema=mongoose.Schema;

var Batiment = new Schema({
    nom :string,
    nbr_niveau : number,
    description :string,
    adresse :string

});

module.exports=mongoose.model('Batiment',Batiment);
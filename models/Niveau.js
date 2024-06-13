const mongoose=require('mongoose');
var Schema=mongoose.Schema;

var Niveau = new Schema({
    nom :string,
    nbr_chambre :number,
	etat_construction  :boolean,
	id_batiment :string,

});

module.exports=mongoose.model('Niveau',Niveau);
module.exports = mongoose => {
  const Schema = mongoose.Schema;

  let RecetteSchema = new Schema({
    nom:         { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: [String], default: [] },
    etapes:      { type: String, required: true },
    duree:       { type: Number, required: true },
    difficulte:  { type: String, enum: ['Facile', 'Moyen', 'Difficile'], default: 'Facile' },
    image:       { type: String, default: '' },
    categorie:   { type: Schema.Types.ObjectId, ref: 'Categorie', required: true }
  }, {
    timestamps: true
  });

  RecetteSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Recette = mongoose.model('Recette', RecetteSchema);
  return Recette;
};
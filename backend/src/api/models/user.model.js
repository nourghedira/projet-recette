module.exports = mongoose => {
  const Schema = mongoose.Schema;

  let UserSchema = new Schema({
    nom:      { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true }
  }, {
    timestamps: true
  });

  UserSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model('User', UserSchema);
  return User;
};
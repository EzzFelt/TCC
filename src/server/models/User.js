import mongoose from 'mongoose'; 


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  lessonsCompleted: {
    type: Number,
    default: 0, // Adiciona valor padrão para novos usuários
  },
  profilePicture: {
    type: String,
    default: "/imgs/pfp.jpg", // Valor padrão para a foto de perfil
  },
});

const User = mongoose.model("User", userSchema);

export default User;

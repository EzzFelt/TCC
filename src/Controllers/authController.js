import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../server/models/User.js';

dotenv.config();

// Função para registrar um usuário
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: 'Usuário já existe!' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ msg: 'Chave secreta não definida no ambiente!' });
    }

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ msg: 'Usuário registrado com sucesso!', token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Erro no servidor.', error: error.message });
  }
};

// Função para autenticar o usuário
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Usuário não encontrado!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Senha inválida!' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      msg: 'Login bem-sucedido!',
      name: user.name,
      token,
      lessonsCompleted: user.lessonsCompleted,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro no servidor.' });
  }
};

// Função para obter os dados do usuário
export const getUserData = async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ msg: 'Token não fornecido.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado.' });
    }

    res.status(200).json({
      name: user.name,
      lessonsCompleted: user.lessonsCompleted,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Erro ao buscar dados do usuário.', error: error.message });
  }
};

// Função para validar o código
export const validateCode = (req, res) => {
  const { code, testCase } = req.body;

  console.log("Código recebido:", code);
  console.log("TestCase recebido:", testCase);

  try {
    const func = new Function('return ' + code); // Cria uma função a partir do código
    const result = func(); // Executa a função

    // Testa o resultado esperado para o caso 1 (exemplo)
    if (testCase === 1 && result === 4) {
      return res.status(200).json({ message: 'Código correto!', result });
    } else {
      return res.status(400).json({ message: 'Código incorreto', result: `Esperado: 4, obtido: ${result}` });
    }
  } catch (error) {
    return res.status(400).json({ message: 'Erro ao executar o código', error: error.message });
  }
};

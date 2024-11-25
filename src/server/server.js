import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import authRoutes from './routes/auth.js'; // Rota de autenticação
import User from './models/User.js';

dotenv.config({ path: './src/.env' });

console.log('JWT_SECRET:', process.env.JWT_SECRET);

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Para lidar com JSON no corpo da requisição

// Middleware de autenticação com JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtém o token do cabeçalho Authorization

  if (!token) {
    console.log('Token não fornecido');
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  // Verifica o token usando a chave secreta
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token inválido');
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = user;  // Adiciona o usuário decodificado na requisição
    next();  // Passa para o próximo middleware ou rota
  });
};

// Nova rota para validar o código
app.post('/api/validateCode', authenticateToken, (req, res) => {
  const { code, testCase } = req.body;

  // Verifica se o código e o testCase foram fornecidos
  if (!code || testCase === undefined) {
    return res.status(400).json({ message: 'Faltando parâmetros' });
  }

  try {
    // Cria a função a partir do código recebido
    const userFunction = new Function('return ' + code)();

    // Funções de teste
    const testCases = [
      { input: [2, 2], expected: 4 },
      { input: [10, 5], expected: 15 },
      { input: [-1, 1], expected: 0 }
    ];

    for (let testCase of testCases) {
      const { input, expected } = testCase;
      const result = userFunction(...input);
      if (result !== expected) {
        return res.json({ message: `Erro: O teste falhou para input ${input}. Esperado: ${expected}, recebido: ${result}` });
      }
    }

    res.json({ message: "Parabéns! Você completou o exercício com sucesso! 🚀" });
  } catch (error) {
    console.error('Erro ao processar o código:', error.message);
    res.status(500).json({ message: 'Erro ao processar o código fornecido. Verifique a sintaxe.' });
  }
});

// Rota protegida (requere autenticação com token)
app.get('/api/user', authenticateToken, async (req, res) => {
  console.log("Requisição recebida para /api/user");

  try {
    const user = await User.findById(req.user.userId); // Garante que está buscando pelo ID correto
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Monta o objeto com os dados do usuário
    const userData = {
      name: user.name,
      token: req.headers['authorization']?.split(' ')[1],
      lessonsCompleted: user.lessonsCompleted, // Valor padrão caso esteja ausente
      profilePicture: user.profilePicture, // Adiciona a foto de perfil
    };

    console.log("Dados do usuário encontrados:", userData);
    res.json(userData); // Envia os dados do usuário
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error.message);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Conectar ao banco de dados MongoDB
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/TCC'; // Se MONGO_URI não estiver definido, usa localhost como fallback

mongoose.connect(dbURI)
  .then(() => {
    console.log('Banco de dados conectado com sucesso');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err.message); // Mostra o erro detalhado
  });

// Usar as rotas de autenticação com o prefixo correto '/api/auth'
app.use('/api/auth', authRoutes);

// Iniciar o servidor
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

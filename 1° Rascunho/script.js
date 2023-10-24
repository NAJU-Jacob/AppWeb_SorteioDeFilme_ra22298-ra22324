const express = require('express');
const mysql = require('mysql2/promise'); // Use 'mysql2' para lidar com as consultas ao MySQL.

const app = express();

const dbConfig = {
    host: 'seu-host',
    user: 'seu-usuario',
    password: 'sua-senha',
    database: 'seu-banco-de-dados'
};

// Rota para obter os títulos dos filmes do banco de dados.
app.get('/filmes', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT titulo FROM filmes');
        connection.end();
        const titulosDeFilmes = rows.map(row => row.titulo);
        res.json(titulosDeFilmes);
    } catch (error) {
        console.error('Erro ao obter títulos de filmes do MySQL:', error);
        res.status(500).json({ error: 'Erro ao buscar títulos de filmes.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

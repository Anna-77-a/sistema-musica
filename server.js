const express = require("express");
const cors = require("cors");
const conexao = require("./db.js");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API de músicas funcionando!");
});

app.get("/artistas", (req, res) => {
    conexao.query("SELECT * FROM artistas", (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json(resultado);
    });
});

app.get("/artistas/:id", (req, res) => {
    const id = req.params.id;

    conexao.query("SELECT * FROM artistas WHERE id = ?", [id], (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json(resultado);
    });
});

app.post("/artistas", (req, res) => {
    const { nome, genero, pais } = req.body;

    const sql = "INSERT INTO artistas (nome, genero, pais) VALUES (?, ?, ?)";

    conexao.query(sql, [nome, genero, pais], (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json({ mensagem: "Artista cadastrado com sucesso!" });
    });
});

app.put("/artistas/:id", (req, res) => {
    const id = req.params.id;
    const { nome, genero, pais } = req.body;

    const sql = "UPDATE artistas SET nome = ?, genero = ?, pais = ? WHERE id = ?";

    conexao.query(sql, [nome, genero, pais, id], (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json({ mensagem: "Artista atualizado com sucesso!" });
    });
});

app.delete("/artistas/:id", (req, res) => {
    const id = req.params.id;

    conexao.query("DELETE FROM artistas WHERE id = ?", [id], (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json({ mensagem: "Artista excluído com sucesso!" });
    });
});

app.get("/albuns", (req, res) => {
    conexao.query("SELECT * FROM albuns", (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json(resultado);
    });
});

app.get("/albuns/:id", (req, res) => {
    const id = req.params.id;

    conexao.query("SELECT * FROM albuns WHERE id = ?", [id], (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json(resultado);
    });
});

app.post("/albuns", (req, res) => {
    const { titulo, ano_lancamento, artista_id } = req.body;

    const sql = "INSERT INTO albuns (titulo, ano_lancamento, artista_id) VALUES (?, ?, ?)";

    conexao.query(sql, [titulo, ano_lancamento, artista_id], (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json({ mensagem: "Álbum cadastrado com sucesso!" });
    });
});

app.put("/albuns/:id", (req, res) => {
    const id = req.params.id;
    const { titulo, ano_lancamento, artista_id } = req.body;

    const sql = "UPDATE albuns SET titulo = ?, ano_lancamento = ?, artista_id = ? WHERE id = ?";

    conexao.query(sql, [titulo, ano_lancamento, artista_id, id], (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json({ mensagem: "Álbum atualizado com sucesso!" });
    });
});

app.delete("/albuns/:id", (req, res) => {
    const id = req.params.id;

    conexao.query("DELETE FROM albuns WHERE id = ?", [id], (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json({ mensagem: "Álbum excluído com sucesso!" });
    });
});

app.get("/musicas", (req, res) => {
    conexao.query("SELECT * FROM musicas", (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json(resultado);
    });
});

app.get("/musicas/:id", (req, res) => {
    const id = req.params.id;

    conexao.query("SELECT * FROM musicas WHERE id = ?", [id], (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json(resultado);
    });
});

app.post("/musicas", (req, res) => {
    const { titulo, duracao, album_id } = req.body;

    const sql = "INSERT INTO musicas (titulo, duracao, album_id) VALUES (?, ?, ?)";

    conexao.query(sql, [titulo, duracao, album_id], (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json({ mensagem: "Música cadastrada com sucesso!" });
    });
});

app.put("/musicas/:id", (req, res) => {
    const id = req.params.id;
    const { titulo, duracao, album_id } = req.body;

    const sql = "UPDATE musicas SET titulo = ?, duracao = ?, album_id = ? WHERE id = ?";

    conexao.query(sql, [titulo, duracao, album_id, id], (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json({ mensagem: "Música atualizada com sucesso!" });
    });
});

app.delete("/musicas/:id", (req, res) => {
    const id = req.params.id;

    conexao.query("DELETE FROM musicas WHERE id = ?", [id], (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json({ mensagem: "Música excluída com sucesso!" });
    });
});

app.get("/artistas/:id/albuns", (req, res) => {
    const id = req.params.id;

    conexao.query("SELECT * FROM albuns WHERE artista_id = ?", [id], (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json(resultado);
    });
});

app.get("/artistas/:id/musicas", (req, res) => {
    const id = req.params.id;

    conexao.query("SELECT * FROM musicas WHERE album_id IN (SELECT id FROM albuns WHERE artista_id = ?)", [id], (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json(resultado);
    });
});

app.get("/musicas-completas", (req, res) => {
    conexao.query("SELECT * FROM musicas", (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json(resultado);
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!");
});
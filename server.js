const express = require("express");
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");

const app = express();
const port = 3080;

// Em um cenário real, você deve armazenar isso em um banco de dados
let secrets = {};

app.use(express.json());

// Endpoint para gerar o segredo e o QR code
app.post("/generate", (req, res) => {
  const userId = req.body.userId;
  if (!userId) {
    return res.status(400).json({ message: "O userId é necessário." });
  }

  const secret = speakeasy.generateSecret({ length: 20 });
  secrets[userId] = secret.base32;

  QRCode.toDataURL(secret.otpauth_url, (err, data_url) => {
    res.json({
      message: "QR Code gerado!",
      qrCode: data_url,
    });
  });
});

// Endpoint para verificar o token
app.post("/verify", (req, res) => {
  const userId = req.body.userId;
  const token = req.body.token;

  if (!userId || !token) {
    return res
      .status(400)
      .json({ message: "O userId e o token são necessários." });
  }

  const savedSecret = secrets[userId];
  if (!savedSecret) {
    return res
      .status(400)
      .json({ message: "O usuário não possui um segredo para 2FA." });
  }

  const verified = speakeasy.totp.verify({
    secret: savedSecret,
    encoding: "base32",
    token: token,
  });

  if (verified) {
    res.json({ message: "Token válido!" });
  } else {
    res.status(400).json({ message: "Token inválido!" });
  }
});

app.listen(port, () => {
  console.log(`Aplicação rodando em http://localhost:${port}`);
});

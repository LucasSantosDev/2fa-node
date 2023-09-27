# Autenticação de Dois Fatores (2FA) em Node.js

Este projeto demonstra a implementação da autenticação de dois fatores (2FA) usando Time-based One-Time Password (TOTP) em Node.js.

## Como funciona o 2FA com TOTP?

1. **Geração do Segredo**: O servidor gera um "segredo" único para cada usuário que deseja habilitar 2FA.
2. **Representação QR Code**: O servidor então converte esse segredo em um QR code.
3. **Scanner com App 2FA**: O usuário escaneia esse QR code com um aplicativo de autenticação de dois fatores, como Google Authenticator, Authy, Microsoft Authenticator, etc. Ao escanear o QR code, o aplicativo sabe o "segredo" e pode gerar códigos TOTP válidos para esse usuário.
4. **Geração e Verificação**: Quando o usuário tenta fazer login ou realizar uma ação que requer 2FA, ele abre seu aplicativo de autenticação e insere o código TOTP atualmente exibido. Esse código é então verificado pelo servidor usando o "segredo" original.

O código TOTP é gerado com base no segredo e na hora atual. Por ser válido por um curto período de tempo (geralmente 30 segundos), oferece uma camada adicional de segurança.

## Pré-requisitos

- Node.js
- Aplicativo de autenticação 2FA (Google Authenticator, Authy, etc.)

## Uso

> Para habilitar 2FA para um usuário, faça uma requisição POST para /generate com um userId no corpo da requisição. Isso retornará um QR code que o usuário deve escanear usando seu aplicativo de autenticação 2FA.

> Para verificar um código TOTP, faça uma requisição POST para /verify com userId e token no corpo da requisição.
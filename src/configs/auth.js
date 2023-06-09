module.exports = {
  jwt: {
    secret: process.env.AUTH_SECRET || "default", //utilizado para gerar o token
    expiresIn: "1d"
  }
}
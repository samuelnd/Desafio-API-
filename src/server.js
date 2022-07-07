const express = require('express');

const app = express();

const PORT = 3000;

app.listen(PORT, () => console.log( `Boa, parece que ta funcionando o server na porta ${PORT}`));
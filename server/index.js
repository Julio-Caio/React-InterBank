const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/routes.js')
const dotenv = require('dotenv');
const url = `${__dirname}/client/build/`;

dotenv.config();

const app = express();
const PORT = 3000;
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router)
app.use('/admin', router)

const baseDir = url.replace('\server', '')
app.use(express.static(`${baseDir}`));

app.get('*', (req,res) => res.sendFile( `${baseDir}/index.html`))

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
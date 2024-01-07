const app = require('./app');
const dotenv = require('dotenv').config({ path: 'config.env' });

const PORT =process.env.RUNNING_PORT;



app.listen(PORT , ()=>{
    console.log(`http://localhost:${PORT}/api/v1`);
})
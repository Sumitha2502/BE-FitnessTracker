// import the mongoose module
const mongoose = require('mongoose');
const dotenv=require('dotenv')
dotenv.config()
// import the config module
const config = require('./utils/config');

// import the app module
const app = require('./app');

console.log('Connecting to MongoDB...');
const url='mongodb://localhost:27017'
// Connect to MongoDB using mongoose

mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDB...');
        
        const PORT = 3001 ;

        // start the server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB...', error.message);
    });






// mongoose.connect(url)
//     .then(() => {
//         console.log('Connected to MongoDB...');
        
//         const PORT = config.PORT || 3001;

//         // start the server
//         app.listen(PORT, () => {
//             console.log(`Server running on port ${config.PORT}`);
//         });
//     })
//     .catch((error) => {
//         console.log('Error connecting to MongoDB...', error.message);
//     })


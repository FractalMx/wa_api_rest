require('dotenv').config();
const app = require('./app');


async function main(){
    try {
      await app.listen(app.get('port'));
      
      console.log("webhook is listening", app.get('port'));  
    } catch (error) {
        console.log(error)
    }
}
process.on('uncaughtException', function (err) {
    console.log(err);
});
main();



const FuncCtrl = {};
const axios = require('axios');
const token = process.env.TOKEN;
const mytoken = process.env.MYTOKEN;

FuncCtrl.getWebhook = (req, res) => {
    try {
        console.log(req.query["hub.verify_token"])
        let mode =  req.query["hub.mode"];
        let challenge = req.query["hub.challenge"];
        let token = req.query["hub.verify_token"];
    
        if(mode && token){
            if(mode === "subscribe" && token === mytoken){
                res.status(200).send(challenge);
            }else{
                res.status(403);
            }
        }
    } catch (error) {
        console.log(error)
        res.status(403);
    }
}

FuncCtrl.postWebhook = (req, res) => {
    try {
        let body_param = req.body;
      

    
        
        if(body_param.object ){
            if(body_param.entry && 
                body_param.entry[0].changes[0].value.messages && 
                body_param.entry[0].changes[0].value.messages
            ){
              
                let phone_no_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
                
                let from = body_param.entry[0].changes[0].value.messages[0].from; 
                let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;
                console.log("postWebhook",phone_no_id,from, msg_body);
                let newFrom = from.substring(0,2) + from.substring(3,from.length-1);
                let data = JSON.stringify({
                    "messaging_product": "whatsapp",
                    "to": newFrom,
                    "type": "template",
                    "template": {
                      "name": "HELLO MY NIGGGA",
                      "language": {
                        "code": "en_US"
                      }
                    },
                    text:{
                        body:"Hola mijis "
                    } 
                  });
                axios({
                    method:"POST",
                 
                    url:"https://graph.facebook.com/v17.0/" + phone_no_id + "/messages",
                    data:data,
                    headers:{
                        "Content-Type":"application/json",
                        'Authorization': 'Bearer' + token
                    }
                })
                res.sendStatus(200);
            }else{
                res.sendStatus(404);
            }
        }
    } catch (error) {
        console.log(error)
        res.status(403);
    }
}

FuncCtrl.principal = (req, res) => {
    try {
        console.log("FSDFsdfds")
        res.sendStatus(200).send("Hello this ios webhook setup");
    } catch (error) {
        res.status(403);
    }
}
module.exports = FuncCtrl;
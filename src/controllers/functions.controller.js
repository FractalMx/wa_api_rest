const FuncCtrl = {};



FuncCtrl.getWebhook = (req, res) => {
    try {
        console.log("getWebHook")
        let mode =  req.query("hub.mode");
        let challenge = req.query("hub.challenge");
        let token = req.query("hub.verify_token");
    
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
        console.log(JSON.stringify(body_param, null, 2));
        if(body_param.object ){
            if(body_param.entry && 
                body_param.entry[0].changes[0].value.message && 
                body_param.entry[0].changes[0].value.message
            ){
                let phone_no_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
                
                let from = body_param.entry[0].changes[0].value.messages[0].from; 
                let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;
    
                axios({
                    method:"POST",
                    url:"https://graph.facebook.com/v17.0/" + phone_no_id + "/message?access_token="+ token,
                    data:{
                        messaging_product: "whatsapp", 
                        to:from,
                        text:{
                            body:"Este es un mensaje para ti "
                        } 
    
                    },
                    headers:{
                        "Content-Type":"application/json"
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
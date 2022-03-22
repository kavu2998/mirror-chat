const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

const p = path.join(path.dirname(require.main.filename),
    'data',
    'users.json');

const getUsersFromFile = (cb) => {
    fs.readFile(p, (err, fileContent)=>{
        if(err){
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    })
}

router.route('/googleLogin').post(async (req, res) => {
    const { tokenId } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.CLIENT_ID
        });
        const { name, email, email_verified } = ticket.getPayload();
        console.log(name + "is " + email + " verified " + email_verified );
        if(email_verified){
            getUsersFromFile((users)=>{
                const user = users.find(p => p.email === email);
                if(!user){
                    const userNew = {name,email};
                    users.push(userNew);
                    fs.writeFile(p,JSON.stringify(users),(err)=> {
                        console.log(err);
                    });
                    return res.json({user:userNew, success:true});
                } else{
                    return res.json({user, success:true})
                }
            })
        } else{
            return res.json({success:false});
        }

    } catch (err) {
        console.log("ERROR " + err)
    }

})

module.exports = router;
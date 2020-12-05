const { messages } = require("../data/data");
const User = require("../models/User");
const Message = require("../models/Message");
const { json } = require("body-parser");



const getMessagesBySender = async (req, res) => {

    let sender = ""; 
    req.params.name = req.params.name.replace("+", " ");

    await User.find({ name: req.params.name }).exec((err, docs) => {

    if(err) res.status(500).json({message:`error${err}`});
    else if(docs.length===0) res.status(404).json({message:`no users found`});
    else {
        sender = docs[0].id;
        console.log(docs[0].id)

        Message.find({ sender: sender }).exec((err, docs)=> {
            
            if(err) res.status(500).json({message:err});
            else if(docs.length === 0) res.status(404).json({message:"Could not find messages by sender name"});
            
            else {
                res.status(200).json(docs);
            }
        })
    
    }
    });

};




const seedDB = async (req, res) => {
    
    Message.insertMany(messages)
        .then(res.status(201).send({ messages }))
        .catch(err => res.status(500).send({ message: err }));
}

module.exports = {seedDB, getMessagesBySender };
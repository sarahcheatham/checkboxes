const OpportunityModel = require("../models/OpportunityModel");

module.exports.listOpps = (req, res) => {
    OpportunityModel.find({ }).exec().then(opps => {
        return res.json(opps)
    })
}

module.exports.showOpp = (req, res)=>{
    OpportunityModel.findById(req.params.id).exec().then(opp =>{
        return res.json(opp)
    })
}

module.exports.createOpp = (req, res)=>{
    const o = new OpportunityModel({
        opp: req.body.opp,
        price: req.body.price
    });
    o.save().then(savedOpp =>{
        return res.json(savedOpp)
    })
}


module.exports.updateOpp = (req, res)=>{
    OpportunityModel.findByIdAndUpdate(
        req.params.id, 
        req.body,
        {new: true},
        (err, oppUpdate)=>{
            if(err) return res.status(500).send(err);
            return res.send(oppUpdate)
        }
    )
}

module.exports.removeOpp = (req, res)=>{
    OpportunityModel.findByIdAndRemove(req.params.id, (err, opp)=>{
        if(err) return res.status(500).send(err)

        //creating a simple object to send back with a message and the id of the document that was removed
        const response = {
            message: "Opportunity successfully deleted",
            id: opp._id
        }
        return res.status(200).send(response);
    });
}
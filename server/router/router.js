const express = require('express');
const router = express.Router();
const { Login, SignUp, EventRegister } = require('../model/schema');
const bcrypt = require("bcrypt");

let sess;
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        if (!email || !password) {
            res.status(400).json({ "error": "please fill credentails" });  //400 for bad request
        }

        const userExit = await SignUp.findOne({ email: email });
        console.log(userExit);
        if (userExit) {
            //const isMatch =   bcrypt.compare(password, userExit.password);
            const isMatch = bcrypt.compareSync(password, userExit.password);
            if (isMatch) {
                req.session.email = userExit.email;
                res.status(200).json({ "message": "Logged In Sucessfully" });
            }
            else {
                res.status(400).json({ "error": "Email or password is incorrect" });  // request is 
            }
        }
        res.status(401).json({ "error": "Email is not registed" });

    }
    catch (err) {
        console.log(err);
    }
});

router.post("/signup", async (req, res) => {
    try {
        const { email, password, cpassword } = req.body;
        if (!email || !password || !cpassword) {
            res.status(401).json({ "error": "please fill credentails" });
        }
        const userExit = await SignUp.findOne({ email: email });

        console.log(userExit);
        if (!userExit) {
            if (password === cpassword) {
                const newUser = await SignUp({ email, password, cpassword });
                console.log(newUser);
                const addUser = await newUser.save();

                if (addUser)
                    res.status(201).json({ message: "add successfully" });
            }
            else {
                res.status(400).json({ message: "password & cpassword is not same" });

            }
        }
        else {
            res.status(422).json({ "message": "email is already exist" });
        }
    }
    catch (err) {
        console.log(err);
    }
})
router.post("/eventregister", async (req, res) => {
    try {
        if (req.session.email) {
        const { firstname, lastname, location, stime, dates, mobileno, agenda } = req.body;
        if (!firstname || !lastname || !location || !stime || !dates || !mobileno || !agenda) {
            res.status(422).json({ "error": "please fill credentails" });
        }
        const eventExist = await EventRegister.find({
            $and:
                [{ location: location },
                { dates: dates }
                ]
        })
       // console.log(eventExist[0].stime);

        if ( eventExist.length !== 0) {
            const obj = eventExist[0].stime;
    
            const finalTime = obj.slice(0,2);
            const currTime = stime.slice(0,2);
            console.log(currTime);
            
            if(currTime == finalTime){
            res.status(302).json({ "message": "Event is already Exist" });
            }

        }
        else{
            const event = await EventRegister({ firstname, lastname, location, stime, dates, mobileno, agenda });
            const addEvent = await event.save();

            if (addEvent) {
                res.status(201).json({ "message": "Event is created successfully" });
            }

        }


    }

    }
    catch (err) {
        console.log(err);
    }
})
router.get('/eventlist', async(req,res)=>{
       try{
        if(req.session.email){
        const eventlist = await EventRegister.find();
        console.log(eventlist);
        if(eventlist)
        res.send(eventlist);
        
       }
    }
       catch(err){
        console.log(err);
       }
})
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        else
            res.status(401).json({ "message": "logout is done" });

    });
})
module.exports = router;

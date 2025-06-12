const express = require("express")
const cors = require("cors")
const nodemailer = require("nodemailer")
const mongoose = require("mongoose")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://kkeerthana:123@cluster1.j6gikkt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1").then(function () {
    console.log("Connected to DB")
}).catch(function () {
    console.log("Failed to connection")
})

const credential = mongoose.model("credential", {}, "bulkmail")

app.post("/sendMail", function (req, res) {

    var msg = req.body.msg
    var emailList = req.body.emailList

    credential.find().then(function (data) {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: data[0].toJSON().user,
                pass: data[0].toJSON().pass,
            },
        });

        new Promise(async function (resolve, reject) {
            try {
                for (var i = 0; i < emailList.length; i++) {
                    await transporter.sendMail(
                        {
                            from: "keerthanakannan80@gmail.com",
                            to: emailList[i],
                            subject: "A message from Bulk Mail App",
                            text: msg

                        }
                    )
                    console.log("Email Sent to:" + emailList[i])
                }

                resolve("Success")
            }
            catch (error) {
                reject("Failed")
            }
        }).then(function () {
            res.send(true)
        }).catch(function () {
            res.send(false)
        })

    }).catch(function (error) {
        console.log(error)
    })

})

app.listen(5000, function (req, res) {
    console.log("server started")
})
const express = require('express')
const { getImageById, getScores, addScore, createSession, updateSession, deleteSession} = require('../utils/prismaClient')


const router = express.Router()



router.get('/session', async (req,res) => {

    try {
        
        const sessionId = await createSession()


        return res.status(200).json({msg: "Success",sessionID : sessionId})


    } catch (error) {
        console.log(" An Error occured creating session :", error)
        return res.status(500).json({msg : "Internal server problem"})
    }

})



router.post('/update-session', async (req,res) => {

    const {sessionId,selections} = req.body


    try {

        const session = await updateSession(sessionId, selections)
        
        return res.status(200).status({
            msg: "Success",
            selections : session.selections
        })



    } catch (error) {
        return res.status(500).json({})
    }
})



router.post('/validate-click', async (req,res) => {

    const {imageId, xPercentage, yPercentage, sessionID} = req.body


    const {characters} = await getImageById(imageId)

    characters.forEach(character => {
            const { x, y } = character.pos;
            
            if (
                xPercentage >= x - tolerance && xPercentage <= x + tolerance &&
                yPercentage >= y - tolerance && yPercentage <= y + tolerance   && charName == character.name
            ) {
                console.log(`${character.name} found!`);
                

                return res.status(200).json({
                    success: true,
                    msg: `${character.name} found`
                })
            }else{ 

                return res.status(203).json({success:false, msg: `Not Found`})

            }

    })

})


router.get('/highscore', async (req,res) => {

    const scores = await getScores()

    scores = scores.slice(0,10)

    return res.status(200).json({scores: scores})

})


router.post('/highscore', async(req,res) => {

    const { name, timetaken } = req.body


    const score = await addScore(name,timetaken)

    return res.status(200).json({
        success:true
    })
    

})


module.exports = router

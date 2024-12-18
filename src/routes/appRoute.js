const express = require('express')
const { getImages,getImageById, getScores,addScore, createSession, getSessionById,updateSession, deleteSession} = require('../utils/prismaClient')

const {checkCharacterPos} = require('../utils/helpers')
const router = express.Router()



router.get('/game-images', async (req,res) => {

    const images = await getImages()
    
    return res.status(200).json({
        msg:"success",
        images: images
    })

})



router.get('/start-game', async (req,res) => {

    try {
        
        const sessionId = await createSession()
        
        return res.status(200).json({msg: "Success", sessionID : sessionId})


    } catch (error) {
        console.log(" An Error occured creating session :", error)
        return res.status(500).json({msg : "Internal server problem"})
    }

})



router.post('/validate-click', async (req,res) => {

        const {imageId, xPercentage, yPercentage, sessionID,charName} = req.body


        if(!sessionID){
            
            return res.status(403).json({msg:"Session not found"})

        }

        try {

            const {characters} = await getImageById(imageId)

            const  [characterName, isFound] = checkCharacterPos(characters,xPercentage,yPercentage,charName)

            let session 

            if (isFound) {

                session =  await updateSession(sessionID,characterName,null)


                const gameover = session.selections.length >= 3

            

                if(gameover){

                    const endtime = new Date()

                    session = await updateSession(sessionID, null, endtime)

                    return res.status(200).json({
                        success: true,
                        msg: `${characterName} found!`,
                        gameover
                        
                    })
            
                }


                return res.status(200).json({
                    success: true,
                    msg: `${characterName} found!`,
                    gameover
                })
            }

            return res.status(203).json({
                success: true,
                msg: "Character not Found",
            })
            
        } catch (error) {

            return res.status(500).json({msg: "Internal server error"})
            
        }

        

})



router.get('/highscores', async (req,res) => {

    let scores = await getScores()

    scores = scores.slice(0,10)

    return res.status(200).json({scores: scores})

})


router.post('/end-game', async (req,res) =>{ 

    const {name, sessionID } = req.body 

    if (!sessionID) {
        return res.status(400).json({ msg: "Session ID, name, and timeTaken are required." });
    }
    
    try {

        const session = await getSessionById(sessionID)
    
        const timeTaken = Math.floor((new Date(session.endtime) - new Date(session.starttime)) / 1000);
        
        await deleteSession(sessionID) 
        
        const score = await addScore(name, timeTaken)


        const highscores = await getScores()


        return res.status(200).json({
            msg:"Game ended",
            highscores : highscores.slice(10),
        })
        
    } catch (error) {

        return res.status(500).json({
            msg:"Internal Server problem",
        })
    }

    
})


module.exports = router

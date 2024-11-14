const express = require('express')
const { getImageById, getScores, addScore} = require('../utils/prismaClient')


const router = express.Router()


router.post('/validate-click', async (req,res) => {

    const {imageId, xPercentage, yPercentage, character} = req.body


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

                return res.status(201).json({success:false, msg: `Not Found`})

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

const {PrismaClient} = require('@prisma/client')




const prisma = new PrismaClient()


const createImage = async (imageUrl,characters) => {

    try {

    const newImage = await prisma.image.create({
        data: {
            url: imageUrl,
            characters: {
                create: characters.map(character => ({
                    name: character.name,
                    posX: character.pos.x,
                    posY: character.pos.y,
                })),
            },
        },
    })

    } catch (error) {
        
        console.log("Error creating image: ", error)

    }

}

const addScore = async (name,timeTaken) => {

    try {

        const newScore = await prisma.score.create({
            data: {
                name: name,
                timetaken: timeTaken
            }
        })

    } catch (error) {
        console.log("Failed to add score: ", error)
    }

}


const getScores = async () => {
    try {
        
        const scores = await prisma.score.findMany({
            orderBy: {
                timetaken: 'asc'
            }

        })

        return scores

    } catch (error) {
        

        console.log("Cant get scores: ", error)

    }
}

const getImages = async () => {


    try {

        const images = await prisma.image.findMany()

        return images


    } catch (error) {
        
    }

}


const getImageById = async (imageId) => {

    try {

        const image = await prisma.image.findUnique({
            where : {
                id : Id
            },
            include: {
                characters: true
            }
        })



        return image
        
    } catch (error) {
        console.log("Error: ", error)

        return        
    }

}




module.exports = {
    createImage,
    addScore,
    getScores,
    getImages,
    getImageById
}


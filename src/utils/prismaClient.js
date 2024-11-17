const {v4 : uuidv4} = require('uuid')
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

const addScore = async (name = "Anonymous",timeTaken) => {

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

const createSession = async () => {
    
    const id =  uuidv4()


    const session = prisma.session.create({
        data:{
            id : id,
            starttime: new Date()
            
        }

    })

    return session.id

}

const updateSession = async (sessionId, selection) => {

    const session = await prisma.session.findUnique({ where: { id: sessionId }, }); 
    
    if (!session) { 
        throw new Error('Session not found'); 
    } 
    
    const updatedSession = await prisma.session.update({ 
        where: { id: sessionId }, 
        data: { 
            selections:{
                push : selection
            } }, 
    }); 
    
    return updatedSession;

}





const deleteSession = async (sessionId) => {

    const session = await prisma.session.delete({ where: { id: sessionId }, });
    
    return session

}




module.exports = {
    createImage,
    createSession,
    updateSession,
    deleteSession,
    addScore,
    getScores,
    getImages,
    getImageById
}


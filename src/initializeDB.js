const {createImage} = require('../src/utils/prismaClient')



const images = [{
    imageUrl: "https://www.dropbox.com/scl/fi/cp9u3mwmw9chdo61v6wnk/bleach.jpg?rlkey=rxdrmojumx6d2khgq8ygiw8r5&st=tmy6m1j2&raw=1",
    characters: [ 
            {name: "Toshiro", pos:{x : 59, y: 80}, }, 
            {name: "Kenpachi",pos: {x: 39, y: 52},},
            {name: "Ikkaku",pos:{x: 8, y: 69},}
        ]
    },
    {
    imageUrl: "https://www.dropbox.com/scl/fi/3q9r8tvytwzrnb3niqzki/naruto-shipu.jpg?rlkey=h48m9wakmjh1kmqq5u3yctg4n&st=u7hvjzul&raw=1",
    characters: [ 
                {name: "Sasori", pos:{x : 23, y: 49}}, 
                {name: "Jiraiya",pos: {x: 57, y: 13}},
                {name: "Zabuza",pos:{x: 68, y: 52}}
        ]
    },
]



async function initializeDB(){
    
    let dataAdded = 0

    try {

        console.log("Starting process....")

        for (image of images){

            await createImage(image.imageUrl, image.characters)
            dataAdded+=1
            console.log(`Added ${dataAdded} query`)

        }

        console.log("Successfully added all the data to DB")

       

    } catch (error) {
        
        console.log("An Error occured while loading data to DB: ", error)

    }

}

initializeDB()
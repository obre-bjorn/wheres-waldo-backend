


function checkCharacterPos (characters, xPercentage, yPercentage,charName) {

    const tolerance = 4

    let characterName = null
    let found = false


    for(const character of characters) {

        const {posX,posY} = character

        if (
                xPercentage >= posX - tolerance && xPercentage <= posX + tolerance &&
                yPercentage >= posY - tolerance && yPercentage <= posY + tolerance   && charName == character.name
            ) {
                console.log(`${character.name} found!`);

                characterName = character.name
                found = true
                

            }


    }


    return [characterName, true]

}


module.exports = {
    checkCharacterPos

}
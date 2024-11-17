


function checkCharacterPos (characters, xPercentage, yPercentage) {

    const tolerance = 4

    let characterName = null
    let found = false


    for(const character of characters) {

        const {x,y} = character.pos

        if (
                xPercentage >= x - tolerance && xPercentage <= x + tolerance &&
                yPercentage >= y - tolerance && yPercentage <= y + tolerance   && charName == character.name
            ) {
                console.log(`${character.name} found!`);

                characterName = character.name
                found = true
                
                break

            }


    }


    return [characterName, true]

}


module.exports = {
    checkCharacterPos

}
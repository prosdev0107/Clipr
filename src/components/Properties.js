import React from 'react'
import PropertiesFormContainer from "../containers/properties/PropertiesFormContainer"
import GeneralFormContainer from "../containers/properties/GeneralFormContainer"
import {Button} from 'react-bootstrap'

const Properties = ({story_sticker, propertiesButtonAction}) => {



    if (typeof story_sticker !== "undefined") {

        let directions = ['SEND_FULL_BACK','SEND_BACK','SEND_FRONT','SEND_FULL_FRONT']
        let directions_translations = {
            'SEND_FULL_BACK' : "Arrière plan",
            'SEND_BACK' : "Vers l'arrière",
            'SEND_FRONT' : "Vers l'avant",
            'SEND_FULL_FRONT' : "Premier plan"
        }

        return <div>

            {/* Edit story stickers attributes */}
            <PropertiesFormContainer story_sticker={story_sticker}/>

            {/* Send at different position relative to other stickers */}
            { directions.map((direction, i) => {
                return <Button
                    key={i}
                    bsStyle="primary"
                    data-story-sticker-id={story_sticker.id}
                    onClick={(event) => propertiesButtonAction('PROPERTIES_BUTTON_'+direction+'_SELECTED',event)}
                >
                    { directions_translations[direction] }
                </Button>
            }) }


            {/* Remove story sticker from stickers layer */}
            <Button
                bsStyle="warning"
                data-story-sticker-id={story_sticker.id}
                onClick={(event) => propertiesButtonAction('PROPERTIES_BUTTON_REMOVE_SELECTED',event)}
                >
                Supprimer
            </Button>

        </div>
    }

    return <div>

        {/* Edit general attributes */}
        <GeneralFormContainer story_sticker={story_sticker}/>

    </div>
}

export default Properties

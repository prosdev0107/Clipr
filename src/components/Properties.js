import React from 'react'
import PropertiesFormContainer from "../containers/properties/PropertiesFormContainer"
import {Button} from 'react-bootstrap'

const Properties = ({story_sticker, propertiesButtonAction}) => {


    if (typeof story_sticker !== "undefined") {

        return <div>

            {/* Edit story stickers attributes */}
            <PropertiesFormContainer story_sticker={story_sticker}/>

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

    return <p>Nothing selected</p>
}

export default Properties

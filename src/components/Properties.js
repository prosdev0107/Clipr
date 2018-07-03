import React from 'react'
import PropertiesFormContainer from "../containers/properties/PropertiesFormContainer"
import {Button,Row,Col} from 'react-bootstrap'

const Properties = ({story_sticker, propertiesButtonAction}) => {

    if (typeof story_sticker !== "undefined") {

        let directions = ['SEND_FULL_BACK','SEND_BACK','SEND_FRONT','SEND_FULL_FRONT']
        let directions_translations = {
            'SEND_FULL_BACK' : "fa-backward",
            'SEND_BACK' : "fa-caret-left",
            'SEND_FRONT' : "fa-caret-right",
            'SEND_FULL_FRONT' : "fa-forward"
        }

        return <div className="properties-sidebar padding-top-20">

            <h3 className="text-center text-primary margin-bottom-20">Propriétés</h3>

            {/* Edit story stickers attributes */}
            <PropertiesFormContainer story_sticker={story_sticker}/>

            <div className="padding-left-15 padding-right-15 padding-bottom-50">

                {/* Send at different position relative to other stickers */}
                <p className="margin-0 margin-bottom-5 padding-top-15">Positionnement</p>
                <Row>
                    { directions.map((direction, i) => {
                        return <Col key={i} className="text-center" sm={3}>
                            <Button
                            bsStyle="default"
                            data-story-sticker-id={story_sticker.id}
                            className="inline-block"
                            onClick={(event) => propertiesButtonAction('PROPERTIES_BUTTON_'+direction+'_SELECTED',event)}
                        >
                                <i className={ "fa " + directions_translations[direction] } />
                        </Button>
                        </Col>
                    }) }
                </Row>

                {/* Remove story sticker from stickers layer */}
                <p className="margin-0 margin-bottom-5 padding-top-15">Autre</p>
                <Button
                    bsStyle="danger"
                    data-story-sticker-id={story_sticker.id}
                    onClick={(event) => propertiesButtonAction('PROPERTIES_BUTTON_REMOVE_SELECTED',event)}
                >
                    Supprimer
                </Button>

            </div>



        </div>
    }

    return <div>

    </div>
}

export default Properties

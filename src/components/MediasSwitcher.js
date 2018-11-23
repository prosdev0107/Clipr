import React from 'react'
import MediaSwitchBoxContainer from '../containers/central/MediaSwitchBoxContainer'
import {Row, Col} from 'react-bootstrap'

const MediasSwitcher = ({cs_items, cs_item_index_editing}) => {

    // First render as many buttons as number of medias
    // Then add "add new media" button

    let col_length = 12/Math.min(4,1+cs_items.length)

    return <div className="medias-switcher absolute-center-horizontal">

        <Row>
            {cs_items.map((cs_item,index) =>
                <Col key={index} sm={col_length}>
                    <MediaSwitchBoxContainer
                        index={index}
                        cs_item={cs_item}
                        selected={typeof cs_item_index_editing !== "undefined" ? index === cs_item_index_editing : 0}
                    />
                </Col>
            )}

            <Col sm={col_length}>

                <MediaSwitchBoxContainer
                    cs_item={null}
                    selected={0}
                />

            </Col>

        </Row>

    </div>
}

export default MediasSwitcher

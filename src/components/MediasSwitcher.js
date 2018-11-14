import React from 'react'
import MediaSwitchBoxContainer from '../containers/central/MediaSwitchBoxContainer'
import {Row, Col} from 'react-bootstrap'

const MediasSwitcher = ({cs_items, cs_item_index_editing}) => {

    return <div className="medias-switcher absolute-center-horizontal">

        <Row>
            {cs_items.map((cs_item,index) =>
                <Col key={index} sm={3}>
                    <MediaSwitchBoxContainer
                        index={index}
                        cs_item={cs_item}
                        selected={typeof cs_item_index_editing !== "undefined" ? index === cs_item_index_editing : 0}
                    />
                </Col>
            )}
        </Row>

    </div>
}

export default MediasSwitcher

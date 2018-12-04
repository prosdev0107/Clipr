import React from 'react'
import ImportMediaAPIMediaContainer from "../containers/import/ImportMediaAPIMediaContainer"
import {Row, Col} from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'

const ImportMediaContent = ({medias, is_loading}) => {

    if (medias.length === 0) {

        // Empty
        return <div>
            <p className="text-center margin-top-50">
                { is_loading ?
                    <FormattedMessage id="common.loading"/> :
                    <FormattedMessage id="common.no_content"/> }
                </p>
        </div>
    }

    // Adapt library height to screen (not with pure css cause problem with scroll+modal)
    let windowHeight = window.innerHeight
    let margin = 260
    let heightMax = 800
    let apiLibraryHeight = Math.min(heightMax, windowHeight-margin)
    let styles = {
        height: apiLibraryHeight+"px"
    }

    return <div className="api-library padding-20" style={styles}>
        <Row>
            {medias.map((media,index) =>
                typeof media === "undefined" || typeof media.source === "undefined" ? null :
                <Col
                    key={index}
                    lg={media.type === "img" ? 2 : 4}
                    md={media.type === "img" ? 3 : 4}
                    sm={media.type === "img" ? 4 : 6}
                    xs={media.type === "img" ? 6 : 12}
                    className={"padding-5 "+ (media.type === "img" ? "col-xlg-2" : "")}
                >
                    <ImportMediaAPIMediaContainer media={media}/>

                </Col>
            )}
        </Row>

        <p className="text-center margin-30">
            { is_loading ? <FormattedMessage id="common.loading"/> : "" }
        </p>

    </div>
}

export default ImportMediaContent

import React from 'react'
import ImportMediaAPIMediaContainer from "../containers/import/ImportMediaAPIMediaContainer"
import {Row} from 'react-bootstrap'
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
                <div
                    key={index}
                    className={"api-library-media-container"}
                >
                    <ImportMediaAPIMediaContainer media={media}/>

                </div>
            )}
        </Row>

        <p className="text-center margin-30">
            { is_loading ? <FormattedMessage id="common.loading"/> : "" }
        </p>

    </div>
}

export default ImportMediaContent

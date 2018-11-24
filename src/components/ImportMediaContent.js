import React from 'react'
import ImportMediaAPIMediaContainer from "../containers/import/ImportMediaAPIMediaContainer"
import {Row, Col} from 'react-bootstrap'

const ImportMediaContent = ({medias, is_loading}) => {

    if (medias.length === 0) {

        // Empty
        return <div>
            <p className="text-center margin-top-50">
                { is_loading ? "Loading..." : "Aucun contenu trouvé !" }
                </p>
        </div>
    }

    return <div className="api-library padding-20">
        <Row>
            {medias.map((media,index) =>
                typeof media === "undefined" || typeof media.source === "undefined" ? null :
                <Col
                    key={index}
                    lg={media.type === "img" ? 3 : 4}
                    sm={6}
                    className={"padding-5 "+ (media.type === "img" ? "col-xlg-2" : "")}
                >
                    <ImportMediaAPIMediaContainer media={media}/>

                </Col>
            )}
        </Row>

        <p className="text-center margin-30">
            { is_loading ? "Loading..." : "" }
        </p>

    </div>
}

export default ImportMediaContent

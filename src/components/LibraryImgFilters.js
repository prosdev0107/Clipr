import React from 'react'
import {Row, Col} from 'react-bootstrap'

const LibraryImgFilters = ({img_filters, current_filter_class, media_thumbnail, changeFilter}) => {

    return <div className="stickers-library-shelf height-full padding-20">

        <Row>

            {img_filters.map((img_filter,index) =>
                <Col
                    key={index}
                    lg={6}
                    sm={12}
                    className="col-xlg-4"
                >
                    <div className={"library-css-filter "+(current_filter_class === img_filter.className ? "selected" : "")}
                         onClick={() => changeFilter(img_filter.className)}>
                        <div className={"library-css-filter-img-container "+img_filter.className}>
                            <img className="width-full" alt="media thumbnail" src={media_thumbnail}/>
                        </div>
                        <span>{img_filter.name} </span>
                    </div>

                </Col>
            )}
        </Row>

    </div>
}

export default LibraryImgFilters

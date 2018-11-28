import React from 'react'
import ImportMediaDropZoneContainer from "../containers/import/ImportMediaDropZoneContainer"
import {Tabs, Tab} from 'react-bootstrap'
import SearchAPIBarContainer from "../containers/library/SearchAPIBarContainer"
import ImportMediaAPIContentContainer from "../containers/import/ImportMediaAPIContentContainer"
import { FormattedMessage } from 'react-intl'

const ImportMediaLibrary = () => {

    /* We can import a media in 3 ways :
     * 1) Import owned media
     * 2) Select from image api library
     * 3) Select from video api library
     */

    return <div className={"import-media-library-tabs"}>

        <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">

            <Tab eventKey={1} title={<FormattedMessage id="import.media.tab.template" />}>
                Coming soon !
            </Tab>
            <Tab eventKey={2} title={<FormattedMessage id="import.media.tab.dropzone" />}>
                <ImportMediaDropZoneContainer />
            </Tab>
            <Tab eventKey={3} title={<FormattedMessage id="import.media.tab.image" />}>
                <SearchAPIBarContainer type={"image"} source={"pixabay"} />
                <ImportMediaAPIContentContainer type={"image"} source={"pixabay"}  />
            </Tab>
            <Tab eventKey={4} title={<FormattedMessage id="import.media.tab.video" />}>
                <SearchAPIBarContainer type={"video"} source={"pixabay"} />
                <ImportMediaAPIContentContainer type={"video"} source={"pixabay"}  />
            </Tab>

        </Tabs>

    </div>

}

export default ImportMediaLibrary

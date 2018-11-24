import React from 'react'
import ImportMediaDropZoneContainer from "../containers/import/ImportMediaDropZoneContainer"
import {Tabs, Tab} from 'react-bootstrap'
import SearchAPIBarContainer from "../containers/library/SearchAPIBarContainer"
import ImportMediaAPIContentContainer from "../containers/import/ImportMediaAPIContentContainer"

const ImportMediaLibrary = () => {

    /* We can import a media in 3 ways :
     * 1) Import owned media
     * 2) Select from image api library
     * 3) Select from video api library
     */

    return <div className={"import-media-library-tabs"}>

        <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">

            <Tab eventKey={1} title="Templates">
                Coming soon !
            </Tab>
            <Tab eventKey={2} title="Import file">
                <ImportMediaDropZoneContainer />
            </Tab>
            <Tab eventKey={3} title="Bibli Images">
                <SearchAPIBarContainer type={"image"} source={"pixabay"} />
                <ImportMediaAPIContentContainer type={"image"} source={"pixabay"}  />
            </Tab>
            <Tab eventKey={4} title="Bibli Video">
                <SearchAPIBarContainer type={"video"} source={"pixabay"} />
                <ImportMediaAPIContentContainer type={"video"} source={"pixabay"}  />
            </Tab>

        </Tabs>

    </div>

}

export default ImportMediaLibrary

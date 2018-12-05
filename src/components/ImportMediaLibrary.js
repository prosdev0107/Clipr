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

            {/*<Tab eventKey={1} title={<div>
                <i className={"icon fa fa-upload"} />
                <FormattedMessage id="import.media.tab.template" />
            </div>}>
                Coming soon !
            </Tab> */}
            <Tab eventKey={2} title={<div>
                <i className={"icon fa fa-upload"} />
                <FormattedMessage id="import.media.tab.dropzone" />
            </div>}>
                <ImportMediaDropZoneContainer />
                To do :
                <br />- Message "loading" + afficher médias reçus par l'API
                <br />- Call POST create media pour chaque média uploadé dans la drop zone
                <br />- Refresh bibli perso une fois média uploadé
                <br />- Barre de progression des médias drop-zonés
                <div className={"hidden"}>
                    {/* Necessary as data feeding is made from search bar */}
                    <SearchAPIBarContainer type={"all"} source={"clipr"} />
                </div>
                <ImportMediaAPIContentContainer type={"all"} source={"clipr"}  />
            </Tab>
            <Tab eventKey={3} title={<div>
                <i className={"icon fa fa-image"} />
                <FormattedMessage id="import.media.tab.image" />
            </div>}>
                <SearchAPIBarContainer type={"image"} source={"pixabay"} />
                <ImportMediaAPIContentContainer type={"image"} source={"pixabay"}  />
            </Tab>
            <Tab eventKey={4} title={<div>
                <i className={"icon fa fa-play"} />
                <FormattedMessage id="import.media.tab.video" />
            </div>}>
                <SearchAPIBarContainer type={"video"} source={"pixabay"} />
                <ImportMediaAPIContentContainer type={"video"} source={"pixabay"}  />
            </Tab>

        </Tabs>

    </div>

}

export default ImportMediaLibrary

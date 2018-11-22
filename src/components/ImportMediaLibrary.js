import React from 'react'
import ImportMediaDropZoneContainer from "../containers/import/ImportMediaDropZoneContainer"
import {Button} from 'react-bootstrap'

const ImportMediaLibrary = ({}) => {

    /* We can import a media in 3 ways :
     * 1) Import owned media
     * 2) Select from image api library
     * 3) Select from video api library
     */

    return <div>

        <ImportMediaDropZoneContainer />


    </div>

}

export default ImportMediaLibrary

import React from 'react'

const PreviewSwitcher = ({is_preview_mode, switchPreviewMode}) => {

    const togglePreviewMode = () => switchPreviewMode(!is_preview_mode)

    let btnIcon = is_preview_mode ? "fa-paint-brush" : "fa-eye"

    return <div className="preview-switcher absolute-center-horizontal">

        <button
            className={"btn btn-info btn-lg"}
            onClick={() => togglePreviewMode()} >
            <i className={"margin-right-5 icon fa "+btnIcon}></i>
            {is_preview_mode ? "Modifier" : "Preview"}
        </button>

    </div>
}

export default PreviewSwitcher

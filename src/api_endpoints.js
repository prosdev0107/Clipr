const data_providers = {
    sticker: {
        list: "/cnv/stickers"
    },
    clip: {
        read:   (cnv_short_code) => "/cnv/clip/"+cnv_short_code
    },
    cs_item: {
        list:   (cnv_short_code) => "/cnv/clip/"+cnv_short_code+"/cs_items",
        create: (cnv_short_code) => "/cnv/clip/"+cnv_short_code+"/cs_items/create",
        read:   (cnv_short_code, cs_item_id) => "/cnv/clip/"+cnv_short_code+"/cs_items/"+cs_item_id,
        update: (cnv_short_code, cs_item_id) => "/cnv/clip/"+cnv_short_code+"/cs_items/"+cs_item_id+"/update",
        delete: (cnv_short_code, cs_item_id) => "/cnv/clip/"+cnv_short_code+"/cs_items/"+cs_item_id+"/delete"
    }
}

export default data_providers
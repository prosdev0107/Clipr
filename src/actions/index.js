

// A simple action to transfer data to reducer without any edit
export const sendToReducersAction = (type, data) => {

    // Format and return
    return {
        type: type,
        data: data
    }
}
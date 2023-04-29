import { showMessage } from "react-native-flash-message";

const showSucess = (message) => {
    showMessage({
        type: 'success',
        message: "Success",
        description: message
    })
}

const showError = (message) => {
    showMessage({
        type: "danger",
        message: "Error",
        description: message
    })
}

export {
    showSucess,
    showError
}
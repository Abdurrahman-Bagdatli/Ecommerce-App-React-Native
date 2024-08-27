import Toast from "react-native-toast-message";

const showToast = (type , text , position= "top" , visibiliyTime =  1000) => {
    Toast.show(
        {
        type,
        text1:text,
        position,
        visibiliyTime:visibiliyTime,
        autoHide:true,
});
};
export default showToast;
export const hanldInput = (e) => {
    let text = '';
    if (e.target.value) {
        text = e.target.value.split(' ').map((element) => capitalizeFirstLetter(element)).join(' ');
        return text
    }
};
const capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

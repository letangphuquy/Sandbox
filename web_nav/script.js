const changeState = (dataset) => {
    dataset.enabled = (dataset.enabled == "true") ? "false" : "true";
}
const toggleNav = () => {
    changeState(document.getElementById("menu-toggle").dataset);

}
// ************ Themes ************
const themes = {
};
const theme_names = {
};
function changeTheme() {
	colors_theme = colors["default"];
	document.body.style.setProperty('--background', "#efefef");
	document.body.style.setProperty('--background_tooltip',"rgba(255, 255, 255, 0.75)");
	document.body.style.setProperty('--color',  "#dfdfdf");
	document.body.style.setProperty('--points',"#ffffff");
	document.body.style.setProperty("--locked","#bf8f8f");
}
function getThemeName() {
	return "Default";
}
function switchTheme() {
	changeTheme();
	resizeCanvas();
}
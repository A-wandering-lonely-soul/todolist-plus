export function changeMoon() {
  const domStyle = document.documentElement.style;
  domStyle.setProperty('--title-color', 'pink');
  domStyle.setProperty('--content-background', '#121212');
  domStyle.setProperty('--page-background', '#143f5f');
}
export function changeSun() {
  const domStyle = document.documentElement.style;
  domStyle.setProperty('--title-color', '#000');
  domStyle.setProperty('--content-background', '#fff');
  domStyle.setProperty('--page-background', '#edf8f3');
}

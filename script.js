const url = "http://colormind.io/api/";
var options = {
  model: "default",
};


const divs = document.getElementsByClassName("color");
const colorDivs = Array.from(divs);
const white = new Color("white");

const button = document.getElementById("generate");

const generatePalette = () => {
  fetch(url, { method: "POST", body: JSON.stringify(options) })
    .then((response) => response.json())
    .then((data) => {
      const { result } = data;
      console.log(data.result);

      colorDivs.forEach((div, i) => {
        result.forEach((colorArray, j) => {
            if(i === j){
            let color = `rgb(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]})`;
            console.log(color);

            div.style.backgroundColor = color;

            let rgbColor = new Color(color);

            let whiteContrast = rgbColor.contrast(white, "APCA");

            let hexColor = rgbColor.toString({format: "hex"})

            div.innerHTML = `<h2>${hexColor}</h2><p>${color}</p>`;
            whiteContrast < - 50 ? div.style.color = "white" : div.style.color = "black";
            }
        })
      })
    });
};

document.addEventListener("keyup", (e) => {
  if (e.code === "Space") {
    generatePalette();
  }
});

button.addEventListener("click", () => {
    generatePalette();
  });

generatePalette();

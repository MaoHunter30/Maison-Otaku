const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 6, value: "combat" },
  { minDegree: 7, maxDegree: 18, value: "Isekai" },
  { minDegree: 19, maxDegree: 30, value: "Aventure" },
  { minDegree: 31, maxDegree: 42, value: "PP Homme" },
  { minDegree: 43, maxDegree: 54, value: "PP Femme" },
  { minDegree: 55, maxDegree: 66, value: "Sport" },
  { minDegree: 67, maxDegree: 78, value: "Sans magie" },
  { minDegree: 79, maxDegree: 90, value: "Romance" },
  { minDegree: 91, maxDegree: 102, value: "Espèces Non Humaine" },
  { minDegree: 103, maxDegree: 114, value: "School Life" },
  { minDegree: 115, maxDegree: 126, value: "Jeu vidéo" },
  { minDegree: 127, maxDegree: 138, value: "Aventure" },
  { minDegree: 139, maxDegree: 150, value: "Ecchi" },
  { minDegree: 151, maxDegree: 162, value: "combat" },
  { minDegree: 163, maxDegree: 174, value: "Isekai" },
  { minDegree: 175, maxDegree: 186, value: "Aventure" },
  { minDegree: 187, maxDegree: 198, value: "PP Homme" },
  { minDegree: 199, maxDegree: 210, value: "PP Femme" },
  { minDegree: 211, maxDegree: 222, value: "Sport" },
  { minDegree: 223, maxDegree: 234, value: "Sans magie" },
  { minDegree: 235, maxDegree: 246, value: "Romance" },
  { minDegree: 247, maxDegree: 258, value: "Espèces Non Humaine" },
  { minDegree: 259, maxDegree: 270, value: "School Life" },
  { minDegree: 271, maxDegree: 282, value: "Jeu vidéo" },
  { minDegree: 283, maxDegree: 294, value: "Aventure" },
  { minDegree: 295, maxDegree: 306, value: "Ecchi" },
  { minDegree: 307, maxDegree: 318, value: "Romance" },
  { minDegree: 319, maxDegree: 330, value: "Espèces Non Humaine" },
  { minDegree: 331, maxDegree: 342, value: "School Life" },
  { minDegree: 343, maxDegree: 354, value: "Jeu vidéo" },
  { minDegree: 355, maxDegree: 360, value: "combat" },
];
//Size of each piece
const data = [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50];
//background color for each piece
var pieColors = [
  "#003c61",
  "#01578c",
  "#036aaa",
  "#003c61",
  "#01578c",
  "#036aaa",
  "#003c61",
  "#01578c",
  "#036aaa",
  "#003c61",
  "#01578c",
  "#036aaa",
  "#003c61",
  "#01578c",
  "#036aaa",
  "#003c61",
  "#01578c",
  "#036aaa",
  "#003c61",
  "#01578c",
  "#036aaa",
  "#003c61",
  "#01578c",
  "#036aaa",
  "#003c61",
  "#01578c",
  "#036aaa",
  "#003c61",
  "#01578c",
  "#036aaa",
];
//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, "☹️", 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, "☹️", 25, 26, 27, 28, 29, 30,],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 12 },
      },
    },
  },
});
//display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>${i.value}</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  //Empty final value
  finalValue.innerHTML = `<p>C'est parti!</p>`;
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});

var times = ["Mar 6 2016", "Apr 2017", "June 2017", "Apr 2019"];

// For drawing the lines
var angerScores = [Math.random(),Math.random(),Math.random(),Math.random()];
var fearScores = [Math.random(),Math.random(),Math.random(),Math.random()];
var joyScores = [Math.random(),Math.random(),Math.random(),Math.random()];
var sadnessScores = [Math.random(),Math.random(),Math.random(),Math.random()];
var analyticalScores = [Math.random(),Math.random(),Math.random(),Math.random()];
var confidentScores = [Math.random(),Math.random(),Math.random(),Math.random()];
var tentativeScores = [Math.random(),Math.random(),Math.random(),Math.random()];

console.log("HERE !!!!!!");

var ctx = document.getElementById("myChart");
//ctx.width = 16;
//ctx.height = 9;
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: times,
    datasets: [
      { 
  data: angerScores,
  label: "Anger",
  borderColor: "#FF3105",
  fill: false
},
{ 
  data: fearScores,
  label: "Fear",
  borderColor: "#05A8FF",
  fill: false
},
{ 
  data: joyScores,
  label: "Joy",
  borderColor: "#FFA005",
  fill: false
},
{ 
  data: sadnessScores,
  label: "Sadness",
  borderColor: "#BF05FF",
  fill: false
},
{ 
  data: analyticalScores,
  label: "Analytical",
  borderColor: "#05FFB7",
  fill: false
},{ 
  data: confidentScores,
  label: "Confident",
  borderColor: "#263F27",
  fill: false
},{ 
  data: tentativeScores,
  label: "Tentative",
  borderColor: "#EA97E6",
  borderDash: [5, 5],
  fill: false
}
    ]
  },
        options: {
            responsive: false,title: {
					display: true,
					text: 'User Emotions Over Time'
				},
            	scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Percentage of Post Containing Emotion'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Post Date'
						}
					}]
				}}
});
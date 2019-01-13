let app;
app = new Vue({
    el: '#app',
    data: {
        msg: "Hello World"
    },
    methods: {
        press: () => {
            let data = {};
            data['times'] = [];
            data['angerScores'] = [];
            data['fearScores'] = [];
            data['joyScores'] = [];
            data['sadnessScores'] = [];
            data['analyticalScores'] = [];
            data['confidentScores'] = [];
            data['tentativeScores'] = [];

            // this currently gets dummy user data from firebase
            db.collection("Users").doc('dummyDataUser').collection("Emotions").get()
                .then((snapshot) => {
                    snapshot.forEach(postEmotionData => {
                        //console.log(postEmotionData.id, " => ", postEmotionData.data().value);
                        data['times'].push(postEmotionData.data().timePost);
                        data['angerScores'].push(postEmotionData.data().value[0]);
                        data['fearScores'].push(postEmotionData.data().value[1]);
                        data['joyScores'].push(postEmotionData.data().value[2]);
                        data['sadnessScores'].push(postEmotionData.data().value[3]);
                        data['analyticalScores'].push(postEmotionData.data().value[4]);
                        data['confidentScores'].push(postEmotionData.data().value[5]);
                        data['tentativeScores'].push(postEmotionData.data().value[6]);
                    })
                }).then(() => {
                    var ctx = document.getElementById("myCanvas");

                    //ctx.width = 16;
                    //ctx.height = 9;
                    var myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: data['times'],
                            datasets: [{
                                    data: data['angerScores'],
                                    label: "Anger",
                                    borderColor: "#FF3105",
                                    fill: false
                                },
                                {
                                    data: data['fearScores'],
                                    label: "Fear",
                                    borderColor: "#05A8FF",
                                    fill: false
                                },
                                {
                                    data: data['joyScores'],
                                    label: "Joy",
                                    borderColor: "#FFA005",
                                    fill: false
                                },
                                {
                                    data: data['sadnessScores'],
                                    label: "Sadness",
                                    borderColor: "#BF05FF",
                                    fill: false
                                },
                                {
                                    data: data['analyticalScores'],
                                    label: "Analytical",
                                    borderColor: "#05FFB7",
                                    fill: false
                                }, {
                                    data: data['confidentScores'],
                                    label: "Confident",
                                    borderColor: "#263F27",
                                    fill: false
                                }, {
                                    data: data['tentativeScores'],
                                    label: "Tentative",
                                    borderColor: "#EA97E6",
                                    borderDash: [5, 5],
                                    fill: false
                                }
                            ]
                        },
                        options: {
                            responsive: false,
                            title: {
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
                            }
                        }
                    });
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });
            console.log("I AM HERE !!!!!!");
        }
    }
});
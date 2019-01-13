// TODO: implement multiple queries on watson for each post

var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var toneAnalyzer = new ToneAnalyzerV3({
	version: '2017-09-21',
	iam_apikey: 'MKC6ePTUwjYpdzZzDjbtnVNdLodAgvWBUfwR3gwS3d0n',
	url: 'https://gateway-wdc.watsonplatform.net/tone-analyzer/api'
});
var angerScores = [Math.random(), Math.random(), Math.random(), Math.random()];
var fearScores = [Math.random(), Math.random(), Math.random(), Math.random()];
var joyScores = [Math.random(), Math.random(), Math.random(), Math.random()];
var sadnessScores = [Math.random(), Math.random(), Math.random(), 3.4]; // to show it works bc everything else is a decimal number
var analyticalScores = [Math.random(), Math.random(), Math.random(), Math.random()];
var confidentScores = [Math.random(), Math.random(), Math.random(), Math.random()];
var tentativeScores = [Math.random(), Math.random(), Math.random(), Math.random()];

async function analyzeTone(textToAnalyze) {
	var newSize = 0;
	console.log("Tone Analyzer running inside function");
	toneAnalyzer.tone({
			tone_input: textToAnalyze,
			content_type: 'text/plain'
		},
		function(err, tone) {
			if (err) {
				console.log(err);
			} else {
				console.log('RESULT FROM WATSON============');

				let data = tone;
				//console.log(JSON.stringify(data, null, 2)); // printing out the entire return statement

				let doc_tone = data["document_tone"]; // get only the overall paragraph data
				let tonesReturned = doc_tone["tones"]; // get the tones out of that overall data
				//console.log('============================================');


				Object.keys(tonesReturned).forEach(key => { // looping through all objects in the tones object
					//console.log(key);          // the name of the current key.		
					let currTone = tonesReturned[key]
					//console.log(currTone);   // the value of the current key.
					//console.log(' TONE DATA============================================');	
					var curScore = 0;
					Object.keys(currTone).forEach(key => { // looping through the data in each tone
						if (key == 'score') {
							curScore = currTone[key];
							//console.log("ID NAME ", key);          // the name of the current key.
							//console.log("ID VALUE ", currTone[key]);   // the value of the current key.
							//toneScores.push(currTone[key]);
						}
						if (key == 'tone_name') {
							var name = currTone[key];
							console.log("ID VALUE ", name); // the value of the current key.
							console.log("Inside push ", curScore);
							if (name == "Anger") {
								angerScores.push(curScore);
								newSize = angerScores.length;
							}
							if (name == "Fear") {
								fearScores.push(curScore);
								newSize = fearScores.length;
							}
							if (name == "Joy") {
								joyScores.push(curScore);
								newSize = joyScores.length;
							}
							if (name == "Sadness") {
								sadnessScores.push(curScore);
								newSize = sadnessScores.length;
							}
							if (name == "Analytical") {
								analyticalScores.push(curScore);
								newSize = analyticalScores.length;
							}
							if (name == "Confident") {
								confidentScores.push(curScore);
								newSize = confidentScores.length;
							}
							if (name == "Tentative") {
								tentativeScores.push(curScore);
								newSize = tentativeScores.length;
							}
							//console.log("ID NAME ", key);          // the name of the current key.

							//toneNames.push(currTone[key]);
						}
					});
				});
				if (angerScores.length != newSize) {
					angerScores.push(0);
				}
				if (fearScores.length != newSize) {
					fearScores.push(0);
				}
				if (joyScores.length != newSize) {
					joyScores.push(0);
				}
				if (sadnessScores.length != newSize) {
					sadnessScores.push(0);
				}
				if (analyticalScores.length != newSize) {
					analyticalScores.push(0);
				}
				if (confidentScores.length != newSize) {
					confidentScores.push(0);
				}
				if (tentativeScores.length != newSize) {
					tentativeScores.push(0);
				}
			}
		}
	);

	var result = await resolveAfter2Seconds();
	if (result = 'resolved') {
		printScores();
	}
}
// Promise for await. Simple timeout idea
function resolveAfter2Seconds() {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve('resolved');
		}, 2000);
	});
}

function printScores() {
	var r = 0;
	for (r = 0; r < sadnessScores.length; r++) {
		console.log("Sad Score", sadnessScores[r]);
	}
}
var textToTry = "Hi Team, The times are difficult! Our sales have been disappointing for the past three quarters for our data analytics product suite. We have a competitive data analytics product suite in the industry. However, we are not doing a good job at selling it, and this is really frustrating. We are missing critical sales opportunities. We cannot blame the economy for our lack of execution. Our clients need analytical tools to change their current business outcomes. In fact, it is in times such as this, our clients want to get the insights they need to turn their businesses around. It is disheartening to see that we are failing at closing deals, in such a hungry market. Let's buckle up and execute.";
analyzeTone(textToTry);
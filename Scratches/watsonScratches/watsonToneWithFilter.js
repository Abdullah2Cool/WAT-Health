var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var toneNames = [];
var toneScores = [];
const watsoneToneNames = ['Anger','Fear', 'Joy', 'Sadness', 'Analytical', 'Confident', 'Tentative'];

var toneAnalyzer = new ToneAnalyzerV3({
	version: '2017-09-21'	,
	iam_apikey: 'MKC6ePTUwjYpdzZzDjbtnVNdLodAgvWBUfwR3gwS3d0n',
	url: 'https://gateway-wdc.watsonplatform.net/tone-analyzer/api'
});
var textToAnalyze = "Hi Team, The times are difficult! Our sales have been disappointing for the past three quarters for our data analytics product suite. We have a competitive data analytics product suite in the industry. However, we are not doing a good job at selling it, and this is really frustrating. We are missing critical sales opportunities. We cannot blame the economy for our lack of execution. Our clients need analytical tools to change their current business outcomes. In fact, it is in times such as this, our clients want to get the insights they need to turn their businesses around. It is disheartening to see that we are failing at closing deals, in such a hungry market. Let's buckle up and execute.";

toneAnalyzer.tone(
	{
		tone_input: textToAnalyze,
		content_type: 'text/plain'
	},
	function(err, tone) {
		if (err) {
			console.log(err);
		} else {
			console.log('RESULT FROM WATSON============');
			
			let data = tone;
			console.log(JSON.stringify(data,null,2)); // printing out the entire return statement

			let doc_tone = data["document_tone"]; // get only the overall paragraph data
			let tonesReturned = doc_tone["tones"]; // get the tones out of that overall data
			console.log('============================================');
			
			Object.keys(tonesReturned).forEach(key => { // looping through all objects in the tones object
					console.log(key);          // the name of the current key.		
					let currTone = tonesReturned[key]
					console.log(currTone);   // the value of the current key.
					//console.log(' TONE DATA============================================');		
					
					Object.keys(currTone).forEach(key => { // looping through the data in each tone
    					if (key=='score')
    					{
    						//console.log("ID NAME ", key);          // the name of the current key.
					    	//console.log("ID VALUE ", currTone[key]);   // the value of the current key.
					    	toneScores.push(currTone[key]);
						}
    					if (key=='tone_name')
    					{
    						//console.log("ID NAME ", key);          // the name of the current key.
					    	//console.log("ID VALUE ", currTone[key]);   // the value of the current key.
					    	toneNames.push(currTone[key]);
						}
					});
					console.log('NEW TONE============================================');	

			});
			// acess array and print here
			//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
		console.log('FROM ARRAY============================================');	
			var pos = toneNames.indexOf(watsoneToneNames[3]);
			console.log(toneNames[pos]);
			console.log(toneScores[pos]);
		}
	}
);
/*

const confidencethreshold = 0.55;
toneAnalyzer.tone({text: textToAnalyze}, (err, tone) => {
		tone.document_tone.tone_categories.forEach((tonecategory) => {
			if(tonecategory.category_id === 'emotion_tone'){
				console.log(tonecategory.tones);
				tonecategory.tones.forEach((emotion) => {
					if(emotion.score >= confidencethreshold) {
						console.log(emotion, ev);
					}
				})
			}
		})
	});
*/
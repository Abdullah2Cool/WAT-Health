var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21'	,
  iam_apikey: 'MKC6ePTUwjYpdzZzDjbtnVNdLodAgvWBUfwR3gwS3d0n',
  url: 'https://gateway-wdc.watsonplatform.net/tone-analyzer/api'
});

toneAnalyzer.tone(
  {
    tone_input: 'I wish you guys would have done a better job. It has given me a lot of trouble',
    content_type: 'text/plain'
  },
  function(err, tone) {
    if (err) {
      console.log(err);
    } else {
      console.log('tone endpoint:');
      console.log(JSON.stringify(tone, null, 2));
    }
  }
);
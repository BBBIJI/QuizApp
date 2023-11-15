const http = require('http');
const https = require('https');
const qs = require("node:querystring");

//function getTrivia(triviaUrl){
  
//}

let triviaData = '';
let triviaUrl = '';
let triviaUrlPart1 = 'https://opentdb.com/api.php?';
let triviaUrlPart2 = 'amount=10&category=9&difficulty=easy&type=multiple';
let que = {};
let questions = [];
let correctAnswers = [];
let incorrectAnswers = [];
let answerList = [];

http.createServer(function(req, res){
  
  res.writeHead(200, {'Content-Type': 'text/html'});
  
  triviaUrl = triviaUrlPart1 + triviaUrlPart2;
  https.get(triviaUrl, (response) => {
    response.on('data', (chunk) => {
      triviaData += chunk.toString();
    }); 

    response.on('end', () => {
      let jsonStr = triviaData;
      triviaData = '';
      let trivia_result = JSON.parse(jsonStr);
      que = trivia_result["results"];
      questions[0] = que[0]["question"];
      correctAnswers[0] = que[0]["correct_answer"];
      incorrectAnswers = que[0]["incorrect_answers"];
      //answerList[0] = incorrectAnswers[0].push(correctAnswers[0]);
      //console.log(incorrectAnswers);
    });

    
  });

  res.write('<h3>' + questions[0] + '</h3>' + 
            '<p>a.' + correctAnswers[0] + '</p>' + 
            '<p>b.' + incorrectAnswers[1] + '</p>' +  
            '<p>c.' + incorrectAnswers[2] + '</p>' + 
            '<p>d.' + incorrectAnswers[0] + '</p>'
            );
            
}).listen(8080);

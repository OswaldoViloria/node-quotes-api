const express = require("express");
const app = express();
app.use(express.json());


const quotes = require("./quotes.json");


app.get('/heartbeat', function(request, response) {
  response.status(200).send('OK');
});

app.get("/quotes", function(request, response){
  response.status(200).json(quotes);
});

app.get("/quotes/:quote_id", function(request, response){
  const quoteId = request.params.quote_id;
  const result = quotes.find(q => q.id == quoteId);
  if (result) {
    response.status(200).json(result);
  } else {
    response.status(404).send("Not Found");
  }
});

app.post("/quotes", function(request, response) {
  const newQuoteId = quotes.length > 0 ? quotes[quotes.length - 1].id + 1 : 0;
  const newQuote = {
    id: newQuoteId,
    ...request.body
  }
  quotes.push(newQuote);
  response.status(201).json(newQuote);
});

app.listen(3000, () => console.log("Listening on port 3000"));
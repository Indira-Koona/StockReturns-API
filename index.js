const express = require('express');
const { resolve } = require('path');
let cors=require("cors");
const app = express();
const port = 3000;
app.use(cors());
app.use(express.static('static'));
function returnsOfStocks(boughtAt,marketPrice,quantity)
{
  return (marketPrice - boughtAt) * quantity;
}
app.get('/calculate-returns', (req, res) => {
  let boughtAt = parseFloat(req.query.boughtAt);
    let marketPrice = parseFloat(req.query.marketPrice);
    let quantity = parseInt(req.query.quantity);
    let result=returnsOfStocks(boughtAt,marketPrice,quantity);
    res.send(result.toString());
});

app.get('/total-returns', (req, res) => {
  let stock1 = parseFloat(req.query.stock1);
  let stock2 = parseFloat(req.query.stock2);
  let stock3 = parseFloat(req.query.stock3);
  let stock4 = parseFloat(req.query.stock4);
  
  let totalReturns = stock1 + stock2 + stock3 + stock4;
  
  res.send(totalReturns.toString());
});

function returnPercentage(boughtAt,returns)
{
  return returns/boughtAt*100;
}
app.get('/calculate-return-percentage',(req,res)=>{
  let boughtAt=parseFloat(req.query.boughtAt);
  let returns=parseFloat(req.query.returns);
  let result=returnPercentage(boughtAt,returns);
  res.json(result);
});
app.get('/total-return-percentage',(req,res)=>{
let stock1 = parseFloat(req.query.stock1);
  let stock2 = parseFloat(req.query.stock2);
  let stock3 = parseFloat(req.query.stock3);
  let stock4 = parseFloat(req.query.stock4);
  let result=stock1+stock2+stock3+stock4;
  res.send(result.toString());

});
function statusOfStocks(returnPercentage)
{
  if(returnPercentage>0)
  {
    return "profit";
  }
    else{
      return "loss";
    }
  
}
app.get('/status',(req,res)=>{
  let returnPercentage=parseFloat(req.query.returnPercentage);
  let result=statusOfStocks(returnPercentage);
  res.send(result.toString());
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

console.log("Welcome to TradeWise");
let balance = Number(localStorage.getItem("balance"))||85000.00;
localStorage.setItem("balance",balance);
console.log(balance);
let balancedisplay = document.getElementById("balance");
function formatMoney(amount) {
    return "₹" + amount.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
balancedisplay.textContent = formatMoney(balance);
let portfolio = JSON.parse(localStorage.getItem("portfolio"))|| {
    Reliance:0,
    TCS:0,
    Infosys:0
};
localStorage.setItem("portfolio", JSON.stringify(portfolio));
let relianceowned = document.getElementById("relianceowned");
let tcsowned = document.getElementById("tcsowned");
let infosysowned = document.getElementById("infosysowned");
relianceowned.textContent = portfolio.Reliance;
tcsowned.textContent = portfolio.TCS;
infosysowned.textContent = portfolio.Infosys;
let buybutton = document.getElementById("reliance");
let quantityInput = document.getElementById("reliancequantity");
buybutton.addEventListener("click", function() {
    let quantity = Number(quantityInput.value);
    let totalcost = 1450.00 * quantity;
if (quantity >0 && Number.isInteger(quantity)){
  if(balance >= totalcost){
    balance = balance - totalcost;
    localStorage.setItem("balance",balance);
    portfolio.Reliance = portfolio.Reliance + quantity;
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
    relianceowned.textContent = portfolio.Reliance;
    console.log(portfolio);
    balancedisplay.textContent = formatMoney(balance);

    addTrade("Reliance","Buy",quantity,1450.00);
    alert("Reliance share purchased!");
  } else{
    alert("insufficient balance to buy Reliance share.");

  }
} else {
    alert("enter a valid quantity to buy");
}

});
let tcsbutton = document.getElementById("tcs");
let tcsquantityInput = document.getElementById("tcsquantity");

tcsbutton.addEventListener("click", function() {
    let quantity = Number(tcsquantityInput.value);
    let totalcost = 3200.00 * quantity;

    if (quantity >0 && Number.isInteger(quantity)){
        if(balance >= totalcost){
            balance = balance - totalcost;
            localStorage.setItem("balance",balance);
            portfolio.TCS = portfolio.TCS + quantity;
            localStorage.setItem("portfolio", JSON.stringify(portfolio));
            balancedisplay.textContent = formatMoney(balance);
            tcsowned.textContent = portfolio.TCS;
            addTrade("TCS", "Buy", quantity, 3200);
            alert("TCS share purchased!");
        } else{
            alert("insufficient balance!");
         } }  else {
            alert("enter a valid quantity");
        }
    
});


let infosysbutton = document.getElementById("infosys");
let infosysquantityinput = document.getElementById("infosysquantity");

infosysbutton.addEventListener("click", function(){
    let quantity = Number(infosysquantityinput.value);
    let totalcost = 1500.00 * quantity;
    if (quantity >0 && Number.isInteger(quantity)) {
        if(balance >= totalcost) {
            balance = balance - totalcost;
            localStorage.setItem("balance",balance);
            portfolio.Infosys = portfolio.Infosys + quantity;
            localStorage.setItem("portfolio", JSON.stringify(portfolio));
            balancedisplay.textContent = formatMoney(balance);
            infosysowned.textContent = portfolio.Infosys;
            addTrade("Infosys", "Buy", quantity, 1500);
            alert("Infosys share purchased!");
        } else {
            alert ("insufficient balance!");

        }
    } else {
        alert("enter a valid quantity");
    }

});

let sellreliancebutton = document.getElementById("sellreliance");
sellreliancebutton.addEventListener("click", function(){

    let quantity= Number(quantityInput.value);
    
    if(quantity>0 && Number.isInteger(quantity)){
        if(portfolio.Reliance >= quantity){
            let totalcost = 1450.00 * quantity;

            portfolio.Reliance = portfolio.Reliance - quantity;
            balance = balance + totalcost;
            localStorage.setItem("balance",balance);
            localStorage.setItem("portfolio", JSON.stringify(portfolio));

            balancedisplay.textContent = formatMoney(balance);
            relianceowned.textContent = portfolio.Reliance;
            addTrade("Reliance", "Sell", quantity, 1450);
            alert("Reliance share sold!");
        } else {
            alert("You do not have enough Reliance shares to sell.");

        }
    } else {
        alert ("Enter a valid quantity to sell.");
    }
});

let tcsquantity = document.getElementById("tcsquantity");
let selltcsbutton = document.getElementById("selltcs");
selltcsbutton.addEventListener("click", function(){

    let quantity= Number(tcsquantity.value);
    
    if(quantity>0 && Number.isInteger(quantity)){
        if(portfolio.TCS >= quantity){
            let totalcost = 3200.00 * quantity;

            portfolio.TCS = portfolio.TCS - quantity;
            localStorage.setItem("portfolio", JSON.stringify(portfolio));
            balance = balance + totalcost;
            localStorage.setItem("balance",balance);

            balancedisplay.textContent = formatMoney(balance);
            tcsowned.textContent = portfolio.TCS;
            addTrade("TCS", "Sell", quantity, 3200);
            alert("TCS share sold!");
        } else {
            alert("You do not have enough TCS shares to sell.");

        }
    } else {
        alert ("Enter a valid quantity to sell.");
    }
});

let infosysquantity = document.getElementById  ("infosysquantity");
let sellinfosysbutton = document.getElementById("sellinfo");
sellinfosysbutton.addEventListener("click", function(){

    let quantity= Number(infosysquantity.value);
    
    if(quantity > 0 && Number.isInteger(quantity)){
        if(portfolio.Infosys >= quantity){
            let totalcost = 1500.00 * quantity;

            portfolio.Infosys = portfolio.Infosys - quantity;
            localStorage.setItem("portfolio", JSON.stringify(portfolio));
            balance = balance + totalcost;
            localStorage.setItem("balance",balance);

            balancedisplay.textContent = formatMoney(balance);
            infosysowned.textContent = portfolio.Infosys;
            addTrade("Infosys", "Sell", quantity, 1500);
            alert("Infosys share sold!");
        } else {
            alert("You do not have enough Infosys shares to sell.");

        }
    } else {
        alert ("Enter a valid quantity to sell.");
    }
});


function addTrade(stock,action,quantity,price) {
    let total = quantity * price;
    let trades = JSON.parse(localStorage.getItem("trades")) || [];
      let trade = {
        stock: stock,
        action: action,
        quantity: quantity,
        price: price,
        total: total
      };
      trades.unshift(trade);
      localStorage.setItem("trades", JSON.stringify(trades));
      displayTrades();
}


function displayTrades() {
    let history = document.getElementById("tradeHistory");
    let trades = JSON.parse(localStorage.getItem("trades")) || [];

    history.innerHTML = "";

    trades.forEach(function(trade) {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${trade.stock}</td>
            <td>${trade.action}</td>
            <td>${trade.quantity}</td>
            <td>${formatMoney(trade.price)}</td>
            <td>${formatMoney(trade.total)}</td>
        `;

        history.appendChild(row);
    });
}

displayTrades();

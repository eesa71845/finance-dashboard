function renderTable(data){

let tbody = document.getElementById("tableBody")

tbody.innerHTML=""

data.forEach(t => {

tbody.innerHTML += `
<tr>
<td>${t.date}</td>
<td>${t.category}</td>
<td>${t.amount}</td>
<td>${t.type}</td>
</tr>
`

})

}

renderTable(transactions)
function calculateSummary(){

let income = 0
let expense = 0

transactions.forEach(t=>{

if(t.type=="income")
income+=t.amount
else
expense+=t.amount

})

let balance = income - expense

document.getElementById("income").innerText = income
document.getElementById("expense").innerText = expense
document.getElementById("balance").innerText = balance

}

calculateSummary()
document.getElementById("search").addEventListener("keyup",function(){

let value = this.value.toLowerCase()

let filtered = transactions.filter(t =>
t.category.toLowerCase().includes(value)
)

renderTable(filtered)

})
let roleSelect = document.getElementById("role")

roleSelect.addEventListener("change",function(){

let role = this.value

let btn = document.getElementById("addBtn")

if(role=="viewer")
btn.style.display="none"
else
btn.style.display="block"

})
let categories = {}
transactions.forEach(t=>{

if(t.type=="expense"){
categories[t.category] =
(categories[t.category] || 0) + t.amount
}

})

let ctx = document.getElementById("categoryChart")

new Chart(ctx,{
type:"pie",
data:{
labels:Object.keys(categories),
datasets:[{
data:Object.values(categories)
}]
}
})
let dates = transactions.map(t=>t.date)
let amounts = transactions.map(t=>t.amount)

let ctx2 = document.getElementById("trendChart")

new Chart(ctx2,{
type:"line",
data:{
labels:dates,
datasets:[{
label:"Transactions",
data:amounts
}]
}
})
function generateInsights(){

let categories = {}

transactions.forEach(t=>{
if(t.type=="expense"){
categories[t.category]=(categories[t.category]||0)+t.amount
}
})

let max = 0
let maxCategory = ""

for(let c in categories){

if(categories[c]>max){
max=categories[c]
maxCategory=c
}

}

document.getElementById("insight").innerText =
"Highest spending category is "+maxCategory

}

generateInsights()
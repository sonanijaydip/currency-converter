const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button")
const fromCurrencies = document.querySelector(".from select")
const toCurrencies = document.querySelector(".to select")
const msg = document.querySelector(".msg")

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option")
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name == "from" && currCode == "USD") {
            newOption.selected = "selected"
        } else if (select.name == "to" && currCode == "INR") {
            newOption.selected = "selected"
        }
        select.append(newOption);
    }
    select.addEventListener("change", (e) => {
        updateFlag(e.target)
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode]
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (event) => {
    event.preventDefault();
    updateExchange();

})

const updateExchange = async () => {
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value
    // console.log(amtVal);
    if (amtVal == "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1"
    }

    // console.log(fromCurrencies.value, toCurrencies.value);
    const URL = `${BASE_URL}/${fromCurrencies.value.toLowerCase()}/${toCurrencies.value.toLowerCase()}.json`
    let responce = await fetch(URL)
    let data = await responce.json();
    let rate = data[toCurrencies.value.toLowerCase()]
    // console.log(rate);

    let finalvalue = amtVal * rate
    msg.innerText = `${amtVal} ${fromCurrencies.value} = ${finalvalue} ${toCurrencies.value}`
}


window.addEventListener("load", () => {
    updateExchange();
})
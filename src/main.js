import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")
//const cardColor = document.querySelector(".cc")

function setCardType(type) {   
    const colors = {
        visa: ["#436D99", "#2D57F2"],
        mastercard: ["#DF6F29", "#C69347"],
        hipercard: ["#ED0909","#ED0909"],
        elo: ["#000000", "#000000"],
        americanex: ["#006fcf", "#006fcf"],
        default: ["black", "gray"],
    
    }

    ccBgColor01.setAttribute("fill", colors[type] [0])
    ccBgColor02.setAttribute("fill", colors[type] [1])
    ccLogo.setAttribute("src", `cc-${type}.svg`)
     // cardColor.style.backgroundColor = ("#ED0909")
 }

 globalThis.setCardType = setCardType


//Security Code
const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
    mask: "0000"
}

const securityCodeMasked = IMask(securityCode, securityCodePattern)

//Expiration Date Using IMask
const expirationDate = document.querySelector("#expiration-date")
const expirationPattern = {
    mask: "MM{/}YY",
    blocks: {
        YY: {
            mask: IMask.MaskedRange,
            from: String(new Date().getFullYear()).slice(2),
            to: String(new Date().getFullYear() + 10).slice(2)
        },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
        },
    },
}

const expirationDateMasked = IMask(expirationDate, expirationPattern)

//Card Number Using IMask Regex
const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
     mask: [

        {
            mask: "0000 0000 0000 0000",
            regex: /(4011|431274|438935|451416|457393|4576|457631|457632|504175|50(4175|6699|67[0-6][0-9]|677[0-8]|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])|627780|636297|636368|636369|(6503[1-3])|(6500(3[5-9]|4[0-9]|5[0-1]))|(6504(0[5-9]|1[0-9]|2[0-9]|3[0-9]))|(650(48[5-9]|49[0-9]|50[0-9]|51[1-9]|52[0-9]|53[0-7]))|(6505(4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-8]))|(6507(0[0-9]|1[0-8]))|(6507(2[0-7]))|(650(90[1-9]|91[0-9]|920))|(6516(5[2-9]|6[0-9]|7[0-9]))|(6550(0[0-9]|1[1-9]))|(6550(2[1-9]|3[0-9]|4[0-9]|5[0-8]))|(506(699|77[0-8]|7[1-6][0-9))|(509([0-9][0-9][0-9])))/,
            cardtype: "elo",
        },
      
        {
          mask: "0000 0000 0000 0000",
          regex: /^4\d{0,15}/,
          cardtype: "visa",
        },
        {
            mask: "0000 0000 0000 0000",
            regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
            cardtype: "mastercard",
        },
        {
            mask: "0000 0000 0000 0000",
            regex: /^(6[2-8]\d{10}(\d{3})?)|(3841\d{15})$/,
            cardtype: "hipercard",
        },
        {
            mask: '0000 000000 00000',
            regex: '^3[47]\\d{0,13}',
            cardtype: 'americanex'
        },       
        {
            mask: "0000 0000 0000 0000",
            cardtype: "default",
        },    
    ],
   dispatch: function(appended, dynamicMasked) {
      const number = (dynamicMasked.value + appended).replace(/\D/g, "")
      const foundMask = dynamicMasked.compiledMasks.find(function (item) {
        return number.match(item.regex)
      })

      //console.log(foundMask)

      return foundMask
   },
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

//Card select function
const addButton = document.querySelector("#add-card")
addButton.addEventListener("click", () =>  {
    alert("Cartão adicionado!")
   
})

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault()
})

//Card holder capture person name function
const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
    const ccHolder = document.querySelector(".cc-holder .value")

    ccHolder.innerHTML = cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value

})

//Function press number null
const inputNumber = document.querySelector("#card-holder")
inputNumber.addEventListener("keypress", (e) => {
 const keyCode = (e.keyCode ? e.keyCode : e.wich)
 if(keyCode > 47 && keyCode < 58) {
    e.preventDefault()
 }
})


//Function dynamic security card code
securityCodeMasked.on("accept", () => {
   updateSecurityCode(securityCodeMasked.value)
})

function updateSecurityCode(code) {
    const ccSecurity = document.querySelector(".cc-security .value")

    ccSecurity.innerText = code.length === 0 ? "123" : code
}

//Function dynamic card number and setCardType
cardNumberMasked.on("accept", () => {
    const cardType = cardNumberMasked.masked.currentMask.cardtype
    setCardType(cardType)
  updateCardNumber(cardNumberMasked.value)
})

function updateCardNumber(number) {
    const ccNumber = document.querySelector(".cc-number")

    ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number
}

//Function dynamic expiration date
expirationDateMasked.on("accept", () => {
   updateExpirationDate(expirationDateMasked.value)
})

function updateExpirationDate(date) {
    const ccExpiration = document.querySelector(".cc-extra .value")
    ccExpiration.innerText = date.length === 0 ? "02/32" : date
}

function validadeInput () {
    let validade 
}

const selText = document.querySelector(".feedback-content__text")
const textApost = selText.innerText

const apSl = /'(?=\?|,|!|\.)|(?<=\s)'\b|\b'(?=\s)|^'/gi

function repA(text) {
    selText.innerText = text.replace(apSl, '"')
    return text.replace(apSl, '"')
}
document.onload = repA(textApost)
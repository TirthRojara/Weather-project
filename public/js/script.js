

console.log('Client side java script')

// fetch('https://api.geoapify.com/v1/geocode/search?text=Rajkot&apiKey=7349543a2c8e44cbafb477e9db4a8a00').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })


// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.City)
//             console.log(data.State)
//             console.log(data.forecast)
//         }
//     })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('.msg1')
const msg2 = document.querySelector('.msg2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value
    console.log(location)

    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                msg1.textContent = data.error
            } else {
                console.log(data.City)
                console.log(data.State)
                console.log(data.forecast)
                msg1.textContent = data.City + ', ' + data.State
                msg2.textContent = data.forecast
            }
        })
    })
})










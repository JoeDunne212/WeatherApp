const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const input = document.querySelector('form .form-control');
const icon = document.querySelector('.icon img');
const cancel = document.querySelector('.card .cancel');
const cancelIMG = document.querySelector('.cancel img');

const updateUI = (data) => {
    // const cityDets = data.cityDetails;
    // const weatherDets = data.weatherDetails;

    //destructing properties
    const { cityDetails, weatherDetails } = data;
    //update details template




    details.innerHTML =
        `<h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weatherDetails.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weatherDetails.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>`;





    const iconSrc = `img/icons/${weatherDetails.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = weatherDetails.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

    input.style.display = 'none';
}
const updateCity = async (cityName) => {
    const cityDetails = await getCity(cityName);
    const weatherDetails = await getWeather(cityDetails.Key);


    //object short-hand notation
    return { cityDetails, weatherDetails };
}


cityForm.addEventListener('submit', e => {
    e.preventDefault();
    const city = cityForm.city.value.trim();

    //set local storage 
    //storing most recent location
    localStorage.setItem('city', city);

    console.log(city);
    cityForm.reset();
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

});

cancelIMG.addEventListener('onfocus', () => {
    console.log("Hover");
})


cancel.addEventListener('click', () => {
    if (!card.classList.contains('d-none')) {

        input.style.display = 'block';
        scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        card.classList.add('d-none');
    }
});



if (localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}
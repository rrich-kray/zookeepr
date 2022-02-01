const { response } = require("express");

const $animalForm = document.querySelector('#animal-form');

const handleAnimalFormSubmit = event => {
  event.preventDefault();

  // get animal data and organize it
  const name = $animalForm.querySelector('[name="animal-name"]').value;
  const species = $animalForm.querySelector('[name="species"]').value;
  const dietRadioHTML = $animalForm.querySelectorAll('[name="diet"]');
  let diet;

  for (let i = 0; i < dietRadioHTML.length; i += 1) {
    if (dietRadioHTML[i].checked) {
      diet = dietRadioHTML[i].value;
    }
  }

  if (diet === undefined) {
    diet = '';
  }

  const selectedTraits = $animalForm.querySelector('[name="personality"]').selectedOptions;
  const personalityTraits = [];
  for (let i = 0; i < selectedTraits.length; i += 1) {
    personalityTraits.push(selectedTraits[i].value);
  }
  const animalObject = { name, species, diet, personalityTraits };

  fetch('/api/animals', { // because the request is coming from the server, we don't have to use the full url
    method: 'POST', // this instructs the fetch request to connect to the proper encdpoint on the server, which is the one we created in the previous lesson
    headers: {
      Accept: 'application/json', // informs the request that this is going to be JSON data
      'Content-type': 'application/json'
    },
    body: JSON.stringify(animalObject)
  })
  .then(response => {
    if (response.ok) {
      return response.json()
      }
      alert('Error: ' + response.statusText);
  })
  .then(postResponse => {
    console.log(postResponse);
    alert('Thank you for adding an animal!')
  })

};

$animalForm.addEventListener('submit', handleAnimalFormSubmit);

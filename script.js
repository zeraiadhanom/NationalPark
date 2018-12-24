
const apiKey = '95xXkwQDeOp8P5HsM133d65xiCzrZW1ZjAQtpYNM'; 
const searchURL = 'https://api.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  
  // if there are previous results, remove them
  
  $('#results-list').empty();
  // iterate through the items array
  //console.log(responseJson.data[0].states);
  for (let i = 0; i < responseJson.data.length; i++){
     
     console.log(responseJson.data[0].url);
 
     $('#results-list').append(
      `<li><h3>${responseJson.data[0].fullName}</h3>
      <p>${responseJson.data[0].description}</p>
      <a href=${responseJson.data[0].url}>Visit our website</a>
      </li>`)
  
  //display the results section  
     $('#results').removeClass('hidden');
    }

}


function getParks(query, maxResults=10) {
  const params = {
    key: apiKey,
    q: query,
    maxResults: 10
  };

  const queryString = formatQueryParams(params)
  const url = searchURL + '?'  + "parkCode=" + `${query}`
  console.log(url)

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
        //console.log(responseJson);
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
         
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    //console.log(searchTerm)
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm, maxResults);
  });
}


$(watchForm);

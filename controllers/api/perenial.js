/*api URL with key
 https://perenual.com/api/species-list?page=1&key=sk-YD7M644b1a9a55fb8682
*/
/*call to the api for plant search data
 https://perenual.com/api/species-list?page=1&key=sk-YD7M644b1a9a55fb8682&q={USER SEARCH INPUT}
*/
/*call to the api for specific plant care data
https://perenual.com/api/species/details/{API PLANT ID}?key=sk-YD7M644b1a9a55fb8682
*/

// let plantSearch = "https://perenual.com/api/species-list?page=1&key=sk-YD7M644b1a9a55fb8682&q=" + '{USER SEARCH INPUT}'

//function pulls just basic plant data for the information below
function findPlant() {
  fetch(plantSearch)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      //let apiId = data.id (commented out as we are not certain we will be using the apiId to make further calls for more specific data)
      let plantName = data[0].common_name;
      let latinName = data[0].scientific_name;
      let watering = data[0].watering;
      let light = data[0].sunlight;
      let plantImage = data[0].medium_url;
    });
}

function savePlantData(plantData, data) {
  localStorage.setItem(plantData, JSON.stringify(data));
}

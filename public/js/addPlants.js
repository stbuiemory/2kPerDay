/*api URL with key
 https://perenual.com/api/species-list?page=1&key=sk-YD7M644b1a9a55fb8682
*/
/*call to the api for plant search data
 https://perenual.com/api/species-list?page=1&key=sk-YD7M644b1a9a55fb8682&q={USER SEARCH INPUT}
*/
/*call to the api for specific plant care data
https://perenual.com/api/species/details/{API PLANT ID}?key=sk-YD7M644b1a9a55fb8682
*/

// with user input: "https://perenual.com/api/species-list?page=1&key=sk-YD7M644b1a9a55fb8682&q=" + '{USER SEARCH INPUT}'

//function pulls just basic plant data for the information below
function populateGarden() {
  for (let i=0; i<9; i++) {
    let plantId = Math.floor(Math.random() * 100);
    //api call for a plant with randomized id
    let plantSearch = `https://perenual.com/api/species/details/${plantId}?key=sk-YD7M644b1a9a55fb8682`
    
    fetch(plantSearch)
      .then(function (response) {
        return response.json();
      })
  
      .then(function (data) {
        let plantName = data[0].common_name;
        let latinName = data[0].scientific_name;
        let watering = data[0].watering;
        let light = data[0].sunlight;
        let plantImage = data[0].medium_url;
        $(`#plant-image-${i+1}`).attr("src", plantImage);
        $(`#plant-name-${i+1}`).text(plantName);
                
      }); 
  }
}

populateGarden()

function addToMyGarden() {
  $(`.add-plant`).on( "click", function() {
  // when add to garden is clicked, all plant information is inserted into SQL table   
  } );
  
}

function resetWaterCount() {
  //if watercount is low,
}

function removePlant() {
  //if a plant is removed, then it is removed from the database 
  //alert -no plant left to be found
}

function savePlantData(plantData, data) {
  localStorage.setItem(plantData, JSON.stringify(data));
}
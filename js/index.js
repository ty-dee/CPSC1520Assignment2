
let dataStore
let albumForm 

async function appInit() {
  const res = await fetch('public/data/albums.json')
  const data = await res.json()
  dataStore = [...data]
  
  render(dataStore, document.querySelector('#album-rows'));

  albumForm = document.querySelector('#album-search-form');

  albumForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
  
    const searchQuery = document.getElementById('search-input').value.trim();
    const minRatingInput = document.getElementById('min-album-rating-input');
    const minRating = parseFloat(minRatingInput.value) || 0;
    
    const filteredData = filterData(searchQuery, minRating);
    render(filteredData, document.querySelector('#album-rows'));
    console.log(filteredData);
  });
}

function render (data, container) {
  container.innerHTML = '';
  data.forEach((field) => {
    const template = `
    <tr>
  <td>${field.album}</td>
  <td>${field.releaseDate}</td>
  <td>${field.artistName}</td>
  <td>${field.genres}</td>
  <td>${field.averageRating}</td>
  <td>${field.numberRatings}</td>
</tr> 
  `
  container.insertAdjacentHTML('beforeend', template)
  })
}

function filterData(searchQuery, minRating) {
  return dataStore.filter(item => {
  
    const searchQueryLower = searchQuery.toLowerCase();
    
    const albumLower = item.album.toLowerCase();
    const artistLower = item.artistName.toLowerCase();

      return (
        (albumLower.includes(searchQueryLower) ||
        artistLower.includes(searchQueryLower)) && item.averageRating >= minRating
      );
      
  });
}

appInit()







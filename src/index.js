console.log('%c HI', 'color: firebrick')

window.addEventListener('DOMContentLoaded',() => {
    fetchDogPictures()
    fetchDogBreeds()
})

//for dog images
const fetchDogPictures = () => {
    fetch("https://dog.ceo/api/breeds/image/random/4")
        .then (response => response.json())
        .then ((json) => {
            console.log(json)
            json.message.forEach(el => makeImg(el));
        })
}

//For initial breed list
const fetchDogBreeds = () => {
    fetch ('https://dog.ceo/api/breeds/list/all')
        .then (res => res.json())
        .then ((json) => Object.keys(json.message).forEach(el => makeList(el)))
        .then (() => {
            addColorChange()
            dropdownListener()
        })
}

//For displaying filtered breeds list
const fetchDogBreedsFiltered = (filterValue) => {
    fetch ('https://dog.ceo/api/breeds/list/all')
        .then (res => res.json())
        .then ((json) => {
            const filteredBreeds = Object.keys(json.message).filter(el => el.charAt(0) === filterValue)
            filteredBreeds.forEach(el => makeList(el))
        })
        .then (() => {
            addColorChange()
        })
}

// Makes image element to be appended to DOM
const makeImg = img => {
    let newImg = document.createElement('img');
    newImg.src = img;
    addEl(newImg);
}

// Appends any elements passed to it to the dog container of document
const addEl = el => document.getElementById('dog-image-container').append(el);

// Adds listener for filter change
const dropdownListener = () => {
    const breedDropdown = document.getElementById('breed-dropdown')
    breedDropdown.addEventListener('change', () => {
        const filterValue = breedDropdown.value;
        filterBreeds(filterValue);
    })
}

// Clears existing breed list for filtering
const removeList = (parent) => {
    while (parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

// Creates new list based on passed filter value
const filterBreeds = (filterValue) => {
    const parent = document.getElementById('dog-breeds');
    removeList(parent);
    fetchDogBreedsFiltered(filterValue)   
}

// Creates list elements
const makeList = element => {
    let newEntry = document.createElement('li');
    newEntry.textContent = element;
    document.getElementById('dog-breeds').append(newEntry);
}
    
// Applies event listeners that allow for color change
const addColorChange = () => {
    const listElements = document.querySelectorAll('li')
    listElements.forEach(el => {
        el.addEventListener('click', () => {
            el.style.color = 'teal'}) 
    })
}







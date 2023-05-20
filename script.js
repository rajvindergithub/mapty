'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


class Workout{
    
    date = new Date(); 
    id = (Date.now() + '').slice(-10);
    
    constructor(coords, distance, duration){
        this.coords = coords;
        this.distance = distance;
        this.duration = distance;
    }

   

}

class Running extends Workout{
    constructor(coords, distance, duration, cadence){
        super(coords, distance, duration);
        this.cadence = cadence; 
        this.calcPace(); 
    }
    
     calcPace(){
        this.pace = this.duration / this.distance;  
        return this.pace 
    }
}

class Cycling extends Workout{
    
    constructor(coords, distance, duration, elevationGain){
        super(coords, distance, duration);
        this.elevationGain = elevationGain; 
        this.calcSpeed(); 
    }
    
    calcSpeed(){
        this.speed = this.distance / (this.duration / 60);
        return this.speed; 
    }
    
}


const run1 = new Running([39, -1], 5.2, 24, 178); 
const cycling1 = new Cycling([39, -1], 27, 95, 523); 

console.log(run1);
console.log(cycling1);

let map, mapEvent; 

class App{
    
    #map; 
    #mapEvent; 
    #workouts = []; 
    
    constructor(){
        this._getPosition();
        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change',this._toggleElevationField );
    }

    _getPosition(){
        
     navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function(){
            alert('Not getting your location');
        });

        
    }
    
    _loadMap(position){
        
        const {latitude} = position.coords; 
        const {longitude} = position.coords;

        console.log(latitude,longitude);
        //console.log(`https://www.google.com/maps/@${latitude},${longitude},14z`);

        const coords = [latitude, longitude]; 

        this.#map = L.map('map').setView( coords, 15);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);


        this.#map.on('click', this._showForm.bind(this) )}
        
    _newWorkout(e){
          e.preventDefault();
            
        const validInputs = (...inputs) => {
            inputs.every(inp => Number.isFinite(inp));
            
            const allPositive = (...inputs) => inputs.every(inp => inp > 0); 
        }    
            
    //get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;        
    const duration = +inputDuration.value; 
    const{lat, lng} = this.#mapEvent.latlng; 
    let workout; 
            
    if(type === 'running'){
        const cadence = +inputCadence.value;
        
        if(!validInputs(distance, duration, cadence) || !allPositive(distance, duration, cadence)){
        
           return alert('Input have to be positive numbers----');
        
                workout = new Running([lat, lng], distance, duraction, cadence);
            
                
               
           }
    }
            
      if(type === 'cycling'){
        const cadence = +inputElevation.value; 
          
           if(!validInputs(distance, duration, elevation) || !allPositive(distance, duration)){
           return alert('Input have to be positive numbers');
               
               workout = new Cycling([lat, lng], distance, duraction, elevation);
               
              
               
           }
          
       }            
            
         this.#workouts.push(workout);
            console.log(workout);
         
         
    //check if data is valid
            
    //if workout running create running object
            
    //if workout cycling create cycling object
            
    //add new object to workout array
            
    // render workout on map as marker
            
  
    L.marker([lat, lng]).addTo(this.#map)
        .bindPopup(
                L.popup({ maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
                className: 'running-popup' })
            ).setPopupContent('Workout')
        .openPopup();        

     // render workout on list       
            
    //clear input fields        
    
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
    
    //display marker
            
            
        
    }

    _showForm(mapE){
        
        this.#mapEvent = mapE; 

        form.classList.remove('hidden');
        inputDistance.focus(); 
    }
        
    _toggleElevationField(){
        
         inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
            inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
        
    }    
    
}


let app = new App(); 


import './App.css';
import { useState, useEffect } from 'react';
import SlideShow from '../Components/SlideShow/SlideShow';
import ErrorMessage from '../Components/ErrorMessage/ErrorMessage';

function App() {

  const [dogImgUrlArr, setDogImgUrlArr] = useState("");
  const [dogBreeds, setDogBreeds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [error, setError] = useState("Failed getting Dog breed images");
  const [currentBreed, setCurrentBreed] = useState("Choose a dog breed");

  


/* load the list of dog breeds when app renders */
  useEffect(() => {
    async function getDogBreeds() {
      setError("");
      try {
        const dogBreedsRequest = await fetch("https://dog.ceo/api/breeds/list/all");

        const breedsObj = await dogBreedsRequest.json()
        setDogBreeds(Object.entries(breedsObj.message));
      } catch (e) {
        setError(`We could not get the puppies because: ${e.message} :c`)
      }

    }
    getDogBreeds();

  }, []);

  /* fetch selected dog breed */
  async function handleChange(e, autoChange) {
    let dogBreed;
    setError("");

    
    if (e === null) { 
      /* handle if array of images ended automatically change to next dog */
      dogBreed = autoChange;
      const select = window.document.querySelector("#select");
      select.value = autoChange;
      
    } else {
      /* handle change selected by user */
      e.preventDefault();
      dogBreed = e.target.value;
      if (dogBreed === "Choose a dog breed") {
        setCurrentBreed(dogBreed);
        return;
      }
    }

    try { /* fetch images and set as an arr of breed imgs */
      const imgRequest = await fetch(`https://dog.ceo/api/breed/${dogBreed}/images`);
    
      const imgData = await imgRequest.json();

    setDogImgUrlArr(imgData.message)
    setCurrentIndex(0);
    setCurrentBreed(dogBreed);
    
    } catch(e) {
      setError(`We could not get the dog images because: ${e.message} :c`)
    }
  }




  return (
    <div className="App">
      {
      error ? 
      <ErrorMessage>{error}</ErrorMessage> : 
      <header>
        <h1>Endless Dog App</h1>
        <form >
          <select id="select" name="dogBreed" onChange={handleChange}>
            <option>Choose a dog breed</option>
            {
              dogBreeds.map(dog => (
                <option key={dog[0]} value={dog[0]}>{dog[0]}</option>
              ))
            }
          </select>
        </form>
      </header>
      }
      {
        error ? 
        null : 
        <SlideShow
        dogImgUrlArr={dogImgUrlArr}
        currentBreed={currentBreed}
        setCurrentIndex={setCurrentIndex}
        currentIndex={currentIndex}
        dogBreeds={dogBreeds}
        handleChange={handleChange} />
      }
    </div>
  );
}

export default App;





/* 
code boneyard! 


I like leaving the dead code here sometimes it can be useful to use certain pices.
*/







/* on change 

async function handleChange(e) {
    e.preventDefault();

    const dogBreed = e.target.value;

    const imgRequest = await fetch(`https://dog.ceo/api/breed/${dogBreed}/images/random/3`);
    console.log(imgRequest);

    const imgData = await imgRequest.json();

    console.log(imgData)
    setDogImgUrlArr(imgData.message)
    console.log(imgData.message)
  }

  return (
    <div className="App">
      <header>
        <h1>Endless Dog App</h1>
        <form >
          <select name="dogBreed" onChange={handleChange}>
            {dogBreeds.map(dog => (
              <option key={dog[0]} value={dog[0]}>{dog[0]}</option>
            ))}
          </select>
          <button>Get pictures</button>
        </form>
      </header>
      <main>
        {
          dogImgUrlArr ?
            dogImgUrlArr.map(imgUrl => (
              <img key={imgUrl} src={imgUrl}></img>
            )) :
            null
        }
      </main>
    </div>
  );
}

export default App;

*/



/*

  const [dogImgUrlArr, setDogImgUrlArr] = useState("");
  const [dogBreeds, setDogBreeds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-2);
  console.log(currentIndex)

  const slideShowTimer = useCallback(() => 
    setTimeout(() => {
      setCurrentIndex(lastIndx => lastIndx + 2)
    }, 3000)
  , [currentIndex])

  useEffect(() => {
    async function getDogBreeds() {

      try {
        const dogBreedsRequest = await fetch("https://dog.ceo/api/breeds/list/all");

        const breedsObj = await dogBreedsRequest.json()
        setDogBreeds(Object.entries(breedsObj.message));
      } catch (e) {
        console.log(e.message)
      }

    }
    getDogBreeds();

  }, []);

  useEffect(() => {
    slideShowTimer();
    return () => clearTimeout(slideShowTimer)
  }, [currentIndex])
*/
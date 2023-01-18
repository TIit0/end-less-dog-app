
import './App.css';
import { useState, useEffect, useCallback } from 'react';
import SlideShow from '../Components/SlideShow/SlideShow';

function App() {

  const [dogImgUrlArr, setDogImgUrlArr] = useState("");
  const [dogBreeds, setDogBreeds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);

  const [currentBreed, setCurrentBreed] = useState("Choose a dog breed")

  console.log(currentIndex)
  



  useEffect(() => {
    async function getDogBreeds() {
      console.log("making request")
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


  async function handleChange(e, autoChange) {
    let dogBreed;

    if (e === null) {
      dogBreed = autoChange;
      const select = window.document.querySelector("#select");
      select.value = autoChange;
      console.log(autoChange)
      console.log(dogBreeds.length);
      
    } else {
      e.preventDefault();
      dogBreed = e.target.value;
      if (dogBreed === "Choose a dog breed") {
        setCurrentBreed(dogBreed);
        return;
      }
    }
    const imgRequest = await fetch(`https://dog.ceo/api/breed/${dogBreed}/images`);
    console.log(imgRequest);

    const imgData = await imgRequest.json();

    console.log(imgData)
    setDogImgUrlArr(imgData.message)
    console.log(imgData.message)
    setCurrentIndex(0);
    setCurrentBreed(dogBreed)
  }




  return (
    <div className="App">
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
      <SlideShow
        dogImgUrlArr={dogImgUrlArr}
        currentBreed={currentBreed}
        setCurrentIndex={setCurrentIndex}
        currentIndex={currentIndex}
        dogBreeds={dogBreeds}
        handleChange={handleChange} />
    </div>
  );
}

export default App;




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
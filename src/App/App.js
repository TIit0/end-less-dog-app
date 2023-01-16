
import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [dogImgUrlArr, setDogImgUrlArr] = useState("");
  const [dogBreeds, setDogBreeds] = useState([]);

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
  }, [])



  async function handleChange(e) {
    e.preventDefault();
    const dogBreed = e.target.value;
    if (dogBreed === "Choose a dog breed") return

    const imgRequest = await fetch(`https://dog.ceo/api/breed/${dogBreed}/images/random/1`);
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
            <option>Choose a dog breed</option>
            {
              dogBreeds.map(dog => (
                <option key={dog[0]} value={dog[0]}>{dog[0]}</option>
              ))
            }
          </select>
        </form>
      </header>
      <div className='slideshow'>
        {
          dogImgUrlArr ?

            <div
            className='slide'
            key={dogImgUrlArr[0]}
            src={dogImgUrlArr[0]}
            style={{backgroundImage: `url(${dogImgUrlArr[0]})`}}></div>
            :
            null
        }
      </div>
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
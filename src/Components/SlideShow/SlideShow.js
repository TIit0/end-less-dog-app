import "./SlideShow.css";
import { useState, useEffect } from "react";

export default function SlideShow({dogImgUrlArr, currentBreed, setCurrentIndex, currentIndex, dogBreeds, handleChange}) {
    

    useEffect(() => {
        if (currentBreed === "Choose a dog breed") return
        if ((dogImgUrlArr.length  - 1) === currentIndex) {
            for(let i = 0; i < dogBreeds.length; i++) {
                if (currentBreed === dogBreeds[i][0] ) {
                    const e = null;
                    handleChange(e, dogBreeds[i + 1][0]);
                    return;
                }
                
            }
            return
        }

        const interval = setInterval(() => {
            setCurrentIndex(lastIndx => lastIndx + 1)
        }, 4000);


        return () => clearInterval(interval)
    }, [currentIndex]);

    return (
        <div className='slideshow'>
            {
                dogImgUrlArr ?

                    <>
                        <div
                            className='slide'
                            key={dogImgUrlArr[0]}
                            src={dogImgUrlArr[0]}
                            style={{ backgroundImage: `url(${dogImgUrlArr[currentIndex]})` }}>

                        </div>
                        <div
                            className='slide'
                            key={dogImgUrlArr[1]}
                            src={dogImgUrlArr[1]}
                            style={{ backgroundImage: `url(${dogImgUrlArr[currentIndex + 1]})` }}>

                        </div>
                    </>

                    :
                    null
            }
        </div>
    )
}
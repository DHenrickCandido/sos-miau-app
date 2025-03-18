import './Slider.css';
import { useState, useRef } from 'react';
import { Card } from './subComponents/card/Card'
import lista from './mock/mock';

export function Slider() {
    const [index, setIndex] = useState(0);

    const slide =  useRef<HTMLDivElement>(null); // Use useRef for DOM reference

    const [aditionalStyle, setAditionalStyle] = useState({
        backgroundColor: '#132945',
        transform: 'translate(-48%, -48.5%)',
    });

    const [aditional2Style, setAditional2Style] = useState({
        backgroundColor: '#10243c',
        transform: 'translate(-46%, -47%)',
    });

    const [aditional3Style, setAditional3Style] = useState({
        opacity: 0,
        backgroundColor: '#10243c',
        transform: 'translate(-46%, -47%)',
    });

    const [isDragging, setIsDragging] = useState(false);
    const [inTransform, setInTransform] = useState(false);

    const [transition, setTransition] = useState(0);
    const [opacity, setOpacity] = useState(1);
    const [transformRotate, setTransformRotate] = useState(0);
    const [transformTranslate, setTransformTranslate] = useState([0, "px"]); // Fixed typo

    const [startX, setStartX] = useState(0);
    const deltaXRef = useRef(0); // Use useRef for immediate access to deltaX

    function mouseDown(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.preventDefault();

        if (!inTransform) {
            setStartX(e.clientX);
            deltaXRef.current = 0; // Reset deltaX
            setIsDragging(true);
        }
    }

    function mouseMove(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (!isDragging || inTransform) return;

        const deltaX = e.clientX - startX;
        deltaXRef.current = deltaX; // Update deltaXRef
        setTransformTranslate([deltaX, "px"]); // Update translate state
        setTransformRotate(0.02 * deltaX); // Update rotate state
    }

    function mouseUp() {
        if (isDragging && slide.current) {
            setIsDragging(false);
            if (!inTransform) {
                setInTransform(true);
                const deltaX = deltaXRef.current;

                if (deltaX > slide.current.clientWidth / 4) {
                    like();
                } else if (deltaX < -slide.current.clientWidth / 4) {
                    dislike();
                } else {
                    resetSlide();
                }
            }
        }
    }

    function resetSlide() {
        setTransition(Math.min(Math.abs(deltaXRef.current) * 0.01, 0.5));
        setTransformTranslate([0, "%"]);
        setTransformRotate(0);

        setTimeout(() => {
            setTransition(0);
            setInTransform(false);
        }, 500);
    }

    function like() {
        setTransition(0.5);
        setTransformTranslate([200, "%"]);
        setTransformRotate(-20);

        console.log('Like');

        setTimeout(() => {
            resetAfterAction();
        }, 500);
    }

    function dislike() {
        setTransition(0.5);
        setTransformTranslate([-200, "%"]);
        setTransformRotate(20);

        console.log('Dislike');

        setTimeout(() => {
            resetAfterAction();
        }, 500);
    }

    function resetAfterAction() {
        const transitionTime = 0.5;
        nextSlide(0.5);
        setTimeout(() => {
            setTransition(0);
            setTransformTranslate([0, "%"]);
            setTransformRotate(0);
            setInTransform(false);
        }, transitionTime * 1000);
    }

    function nextSlide(time: number) {
        if (slide.current) {
            console.log('changing picture');
            setTransition(time);
            setOpacity(0);

            // Smoothly translate the additional divs
            setAditionalStyle((prevStyle) => ({
                ...prevStyle,
                transition: time + 's ease',
                backgroundColor: "#153151",
                transform: 'translate(-50%, -50%)',
            }));
            setAditional2Style((prevStyle) => ({
                
                ...prevStyle,
                transition: time + 's ease',
                backgroundColor: "#132945",
                transform: 'translate(-48%, -48.5%)',
            }));
            
            
            if(lista.length - index > 3){
                setAditional3Style((prevStyle) => ({
                    ...prevStyle,
                    opacity: 1,
                }));
            }

            setTimeout(() => {
                if (slide.current) {
                    setTransition(0);
                    setOpacity(1); // Reset opacity after slide change

                    // Reset styles for smooth transition
                    setAditionalStyle((prevStyle) => ({
                        ...prevStyle,
                        transition: 0 + 's ease',
                        backgroundColor: "#132945",
                        transform: 'translate(-48%, -48.5%)',
                    }));
                    setAditional2Style((prevStyle) => ({
                        ...prevStyle,
                        transition: 0 + 's ease',
                        backgroundColor: "#10243c",
                        transform: 'translate(-46%, -47%)',
                    }));
                    if(lista.length - index > 3){
                        setAditional3Style((prevStyle) => ({
                            ...prevStyle,
                            opacity: 0,
                        }));
                    }
                }
                console.log('changed picture');
                setIndex((prevIndex) => {
                    const newIndex = prevIndex + 1;
                    if (lista.length - newIndex === 0) {
                        console.log(1);
                        setOpacity(0);

                        setTimeout(() => {
                            setOpacity(1);
                        }, 500);
                    }
                    return newIndex;
                });

            }, time * 1000); // Wait for the fade-out effect to complete
        }
    }

    return (
        <>
            <div className="chose" 
                onMouseMove={(e) => mouseMove(e)}
                onMouseUp={() => mouseUp()}>
                    
                <div className="option">
                    <button id="dislike" onClick={() => dislike()} disabled={lista.length - index === 0}>
                        <img src="./src/components/Slider/assets/X.png"></img>
                    </button>
                </div>
                
                {
                    lista.length - index != 0 ? 
                    <div
                        className="slide"
                        id="slide"
                        ref={slide}
                        style={{
                            transition: `${transition}s ease`,
                            opacity: `${opacity}`,
                            transform: `translateX(${transformTranslate[0]}${transformTranslate[1]}) rotate(${transformRotate}deg)`,
                        }}
                        onMouseDown={(e) => mouseDown(e)}
                    >
                        <Card cat={lista[index]}></Card>
                    </div>
                    :
                    <>
                        <div 
                            className='NoRecomendations' 
                            
                            style={{
                                transition:"0.5s ease",
                                width: "50%",
                                height: "100%",
                                padding: "10px",
                                backgroundColor: "#153151",
                                borderRadius: "20px",
                                textAlign: "center",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "white",
                                opacity: opacity,
                            }}
                        >
                            <p>No more recommendations</p>
                        </div>
                    </>
                }
                {
                    lista.length - index > 1 ? 
                    <div className="additional-div" style={aditionalStyle}>
                        <Card cat={lista[index+1]}></Card>
                    </div>:
                    <></>
                }
                {
                    lista.length - index > 2 ? 
                    <div className="additional-div2" style={aditional2Style}></div>:
                    <></>
                }
                
                <div className="additional-div2" style={aditional3Style}>

                </div>

                
                <div className="option">
                    <button id="like" onClick={() => like()} disabled={lista.length - index === 0}>
                        <img src="./src/components/Slider/assets/Hearth.png"></img>
                    </button>
                </div>
                
            </div>
        </>
    );
}
import React, {useState} from 'react'
import './maincontent.css'
import {Carousel, CarouselCaption, CarouselControl, CarouselItem, CarouselIndicators} from 'reactstrap'
import albion from '../../assets/images/wallpaper_albion.jpeg'
import runescape from '../../assets/images/wallpaper_runescape.jpg'
import wow from '../../assets/images/wallpaper_wow.jpg'
import MainProducts from './mainproducts'

const items = [
    {src: albion, alt: "albion"},
    {src: runescape, alt: "runescape"},
    {src: wow, alt: "world of warcraft"}
]

export default params => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [animating, setAnimating] = useState(false)

    const next = () => {
        if (animating) return
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1
        setActiveIndex(nextIndex)
    }

    const previous = () => {
        if (animating) return
        const previousIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1
        setActiveIndex(previousIndex)
    }
    const goToIndex = (newIndex) => {
        if (animating) return
        setActiveIndex(newIndex)
    }

    const slides = items.map((item, index) => (
        <CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} 
        key={index}>
            <img src={item.src} alt={item.alt} className="carousel-image"/>
        </CarouselItem>
    ))

    return (
        <>
        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex}/>
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous}/>
            <CarouselControl direction="next" directionText="Next" onClickHandler={next}/>
        </Carousel>
        <MainProducts/>
        </>
        
    )

}
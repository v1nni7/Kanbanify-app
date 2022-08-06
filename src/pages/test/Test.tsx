import { useEffect, useRef, useState } from 'react';
import './styles.scss';

const Test = () => {

  const [numberOfCarouselChildren, setNumberOfCarouselChildren] = useState(0);
  const [translateXCarouselForm, setTranslateXCarouselForm] = useState(0);
  const [maxWidthCarousel, setMaxWidthCarousel] = useState(0);
  const [widthOfCarouselItem, setWidthOfCarouselItem] = useState(0);

  const carousel = useRef<HTMLDivElement>(null);
  const carouselContent = useRef<HTMLDivElement>(null);

  const nextCarouselForm = () => {
    if (maxWidthCarousel === translateXCarouselForm) {
      console.log('Não há mais nada')
    } else {
      setTranslateXCarouselForm(translateXCarouselForm - widthOfCarouselItem);
    }
  }

  const prevCarouselForm = () => {
    if (translateXCarouselForm === 0) {
      console.log('Para que voltar?')
    } else {
      setTranslateXCarouselForm(translateXCarouselForm + widthOfCarouselItem);
    }
  }

  useEffect(() => {
    let carouselContentChildrens: any = carouselContent.current?.children.length
    let carouselClientWidth: any = carousel.current?.clientWidth

    setWidthOfCarouselItem(carouselClientWidth)
    setNumberOfCarouselChildren(carouselContentChildrens - 1)
    setMaxWidthCarousel(numberOfCarouselChildren * (- carouselClientWidth));
  }, [numberOfCarouselChildren]);

  return (
    <>
      <div className="test">
        <div className="carousel" ref={carousel}>
          <div className="carousel-content"
            ref={carouselContent}
            style={{ transform: `translateX(${translateXCarouselForm}px)` }}>
            <div className="carousel-item">
              Carousel 1
            </div>
            <div className="carousel-item">
              Carousel 2
            </div>
            <div className="carousel-item">
              Carousel 3
            </div>
            <div className="carousel-item">
              Carousel 4
            </div>
          </div>
        </div>
        <div className="flex justify-content-between">
          <button type='button' onClick={prevCarouselForm}>Anterior</button>
          <button type='button' onClick={nextCarouselForm}>Próximo</button>
        </div>
      </div>
    </>
  )
}

const Carousel = () => {
  return (
    <>
      <div className="carousel">

      </div>
    </>
  )
}

export default Test;
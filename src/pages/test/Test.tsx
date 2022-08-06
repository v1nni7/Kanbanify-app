import { useEffect, useRef, useState } from 'react';
import { Carousel, CarouselItem } from '../../components/Carousel/Carousel';
import './styles.scss';

const Test = () => {
  
  return (
    <>
      <div className="test">
        <Carousel>
          <CarouselItem>
            Carousel 1
          </CarouselItem>
          <CarouselItem>
            Carousel 2
          </CarouselItem>
          <CarouselItem>
            Carousel 3
          </CarouselItem>
          <CarouselItem>
            Carousel 4
          </CarouselItem>
          <CarouselItem>
            Carousel 5
          </CarouselItem>
          <CarouselItem>
            Carousel 6
          </CarouselItem>
        </Carousel>
      </div>
    </>
  )
}

export default Test;
import { ReactNode, useCallback, useEffect, useRef, useState } from "react"

import './styles.scss'

interface AuxProps {
  children: ReactNode
}

export const Carousel = ({ children }: AuxProps) => {

  const carousel = useRef<HTMLDivElement>(null);
  const carouselContent = useRef<HTMLDivElement>(null);

  const [carouselWidth, setCarouselWidth] = useState<number>(0);
  const [carouselTransform, setCarouselTransform] = useState<number>(0);
  const [totalChildrenContent, setTotalChildrenContent] = useState<number>(0)

  const nextSlideCarousel = useCallback(() => {
    if (totalChildrenContent * (-carouselWidth) === carouselTransform) {
      return;
    }

    setCarouselTransform(carouselTransform - carouselWidth);
  }, [carouselTransform, carouselWidth, totalChildrenContent]);

  const prevSlideCarousel = useCallback(() => {
    if (carouselTransform === 0) {
      return;
    }
    
    setCarouselTransform(carouselTransform + carouselWidth);
  }, [carouselTransform, carouselWidth, totalChildrenContent])

  useEffect(() => {
    const getCarouselWidth: number | any = carousel.current?.clientWidth;
    const getTotalChildren: number | any = carouselContent.current?.children.length;
    setCarouselWidth(getCarouselWidth);
    setTotalChildrenContent(getTotalChildren - 1);
  }, [])

  return (
    <div className="carousel" ref={carousel}>
      <div className="carousel-content" style={{ transform: `translateX(${carouselTransform}px)` }} ref={carouselContent}>
        {children}
      </div>

      <div className="carousel-buttons">
        <button type="button" onClick={prevSlideCarousel}>Prev</button>
        <button type="button" onClick={nextSlideCarousel}>Next</button>
      </div>
    </div>
  )
}

export const CarouselItem = ({ children }: AuxProps) => {
  return (
    <div className="carousel-item">
      {children}
    </div>
  )
}
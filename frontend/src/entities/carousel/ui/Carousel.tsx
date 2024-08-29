import React, { useCallback, useEffect, useRef } from 'react';
import { EmblaOptionsType, EmblaCarouselType, EmblaEventType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import '../css/embla.css';
import { Project } from '../../../shared/types/projectList.ts';
import { Link } from 'react-router-dom';
import { usePrizeProjects } from '../api/getPrizeProjects.ts';
import { prizeDate } from '../../../shared/types/prizeDate.ts';

const TWEEN_FACTOR_BASE = 0.84;

const numberWithinRange = (number: number, min: number, max: number): number => Math.min(Math.max(number, min), max);

type PropType = {
  options?: EmblaOptionsType;
  date: prizeDate;
};

export const EmblaCarousel: React.FC<PropType> = (props) => {
  const { options, date } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3000, stopOnMouseEnter: true, stopOnInteraction: false }),
  ]);
  const tweenFactor = useRef(0);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenOpacity = useCallback((emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === 'scroll';

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
        const opacity = numberWithinRange(tweenValue, 0.2, 1).toString();
        emblaApi.slideNodes()[slideIndex].style.opacity = opacity;
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenFactor(emblaApi);
    tweenOpacity(emblaApi);
    emblaApi
      .on('reInit', setTweenFactor)
      .on('reInit', tweenOpacity)
      .on('scroll', tweenOpacity)
      .on('slideFocus', tweenOpacity);
  }, [emblaApi, tweenOpacity]);

  const { data, isLoading, isError, error } = usePrizeProjects(date);

  if (isLoading) {
    return <div className="bg-transparent w-full h-full">Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {data?.map((project: Project, index: number) => (
            <div className="embla__slide" key={index}>
              <Link to={`/projectview/${project.id}`}>
                <div className="embla__slide__number cursor-pointer">
                  <img src={project.mainImageUrl} className="w-full h-full object-cover" />
                  <div className="hover-content ">
                    <div className="font-bold text-[2.5rem] leading-[1] mb-5">{project.title}</div>
                    <div className="font-normal text-[1.5rem]">{project.subtitle}</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

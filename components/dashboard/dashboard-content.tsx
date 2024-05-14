'use client';

import React, { useState, useEffect } from 'react';

import Autoplay from 'embla-carousel-autoplay';

import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import { type CarouselApi } from '@/components/ui/carousel';
import { Novel } from '@/models/novel/novel';

import DashboardHeader from './dashboard-header';
import DashboardItemRow from '@/components/dashboard/dashboard-item row';

export default function DashboardContent({novels, carouselNovels, randomNovels}: { novels: Array<Novel>, carouselNovels: Array<Novel>, randomNovels: Array<Novel> }) {
  // Carousel handler
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!api) return;

    api.on('scroll', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <>
      <div className="relative w-full h-full pb-8">
        <Carousel opts={{loop: true}} plugins={[Autoplay({delay: 3000})]} setApi={setApi}>
          <CarouselContent className="m-0">
            {carouselNovels.map((currentNovel: Novel, index: number) => (
              <CarouselItem key={index} className="p-0">
                <DashboardHeader currentNovel={currentNovel}/>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="relative w-full flex justify-center h-[0.35rem] px-8">
          <div className="absolute top-2 sm:-top-12 right-2 select-none">{current + 1} / {carouselNovels.length}</div>
          <div className="absolute -top-2 flex gap-1 w-[90%] h-full">
            {carouselNovels.map((_, index) => (
              <div
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`grow w-full h-full cursor-pointer transition-colors ${index === current ? 'bg-white' : 'bg-muted-foreground'}`}/>
            ))}
          </div>
        </div>

        <DashboardItemRow itemTitle="Continue Reading" novels={novels
        .sort((a, b) => new Date(b.last_read ?? 0).getTime() - new Date(a.last_read ?? 0).getTime())
        .slice(0, 20)
        }/>
        <DashboardItemRow itemTitle="Recently Added" novels={novels
          .slice() // Create new novels object
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 20)
        }/>
        <DashboardItemRow itemTitle="Random" novels={randomNovels.slice(0, 20)}/>
      </div>
    </>
  );
}

'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { BannerDataTypes } from '@/lib/types'
import { imageBaseUrl } from '@/lib/constants'

interface Slide {
  image: string
  title: string
  description: string
  cta?: {
    text: string
    link: string
  }
}

interface HeroCarouselProps {
  slides: BannerDataTypes[]
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [autoPlay, slides.length])

  const goToSlide = (index: number) => {
    setCurrent(index)
    setAutoPlay(false)
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
    setAutoPlay(false)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    setAutoPlay(false)
  }

  return (
    <div
      className="relative w-full aspect-[16/9] md:h-[500px] overflow-hidden group"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${index === current ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <Image
            src={`${imageBaseUrl}${slide.image}`}
            alt={slide.name}
            fill
            className="object-fill"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute cursor-pointer left-4 top-1/2 transform -translate-y-1/2 bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-full transition-all z-10 opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-full transition-all z-10 opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === current ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

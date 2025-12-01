import { Users, Car } from "lucide-react";
import { Button } from "../ui/button";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback } from "react";

interface HeroProps {
  onGetStarted: () => void;
}

const IMAGES = [
  "https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg",
  "https://images.pexels.com/photos/100650/pexels-photo-100650.jpeg",
  "https://images.pexels.com/photos/4606336/pexels-photo-4606336.jpeg",
];

export function Hero({ onGetStarted }: HeroProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  // Autoplay: advance every 4s
  useEffect(() => {
    if (!emblaApi) return;
    const handler = () => emblaApi.scrollNext();
    const id = setInterval(handler, 4000);
    return () => clearInterval(id);
  }, [emblaApi]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  return (
    <section className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: content */}
        <div className="text-center md:text-left">
          <div className="inline-block mb-4 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            🇷🇼 Rwanda's Premier Carpooling Platform
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Travel Smarter, Save More, Connect Better
          </h2>

          <p className="text-lg text-gray-600 mb-6 max-w-xl">
            Join thousands of Rwandans reducing travel costs and traffic
            congestion through safe, convenient carpooling.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="text-lg px-8 py-4"
            >
              <Users className="mr-2" /> Find a Ride
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onGetStarted}
              className="text-lg px-8 py-4"
            >
              <Car className="mr-2" /> Become a Driver
            </Button>
          </div>
        </div>

        {/* Right: image carousel */}
        <div className="w-full">
          <div className="relative">
            <div
              className="embla overflow-hidden rounded-xl shadow-lg"
              ref={emblaRef}
            >
              <div className="flex">
                {IMAGES.map((src, idx) => (
                  <div className="embla__slide flex-shrink-0 w-full" key={idx}>
                    <img
                      src={`${src}?auto=compress&cs=tinysrgb&dpr=1&w=1200`}
                      alt={`Slide ${idx + 1}`}
                      className="w-full h-64 md:h-96 object-cover rounded-xl"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="absolute inset-y-1/2 left-3 transform -translate-y-1/2">
              <button
                onClick={scrollPrev}
                aria-label="Previous"
                className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow"
              >
                ‹
              </button>
            </div>
            <div className="absolute inset-y-1/2 right-3 transform -translate-y-1/2">
              <button
                onClick={scrollNext}
                aria-label="Next"
                className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

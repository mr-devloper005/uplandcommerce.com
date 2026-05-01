"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ContentImage } from "@/components/shared/content-image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function TaskImageCarousel({ images }: { images: string[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: images.length > 1,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  if (!images.length) return null;

  const openLightbox = (index: number) => {
    setLightboxIndex(Math.max(0, Math.min(images.length - 1, index)));
    setLightboxOpen(true);
  };

  const lightboxPrev = () => {
    setLightboxIndex((value) => (value - 1 + images.length) % images.length);
  };

  const lightboxNext = () => {
    setLightboxIndex((value) => (value + 1) % images.length);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-muted">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((src, index) => (
            <div key={`${src}-${index}`} className="min-w-0 flex-[0_0_100%]">
              <button
                type="button"
                className="relative block aspect-[16/10] w-full cursor-zoom-in"
                onClick={() => openLightbox(index)}
                aria-label={`Open image ${index + 1}`}
              >
                <ContentImage
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 900px"
                  quality={78}
                  className="object-cover"
                  intrinsicWidth={1440}
                  intrinsicHeight={900}
                  priority={index === 0}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <Button
            variant="secondary"
            size="icon"
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl border-border bg-black p-0">
          <DialogTitle className="sr-only">Image preview</DialogTitle>
          <div className="relative">
            <div className="relative aspect-[16/10] w-full bg-black">
              <ContentImage
                src={images[lightboxIndex]}
                alt={`Full image ${lightboxIndex + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 1100px"
                quality={90}
                className="object-contain"
                intrinsicWidth={1600}
                intrinsicHeight={1000}
              />
            </div>

            {images.length > 1 ? (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  onClick={lightboxPrev}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={lightboxNext}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}





import React from "react";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
}

export default function ImageLightbox({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
}: ImageLightboxProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-100 flex items-center justify-center backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-110 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all cursor-pointer"
      >
        <X size={28} />
      </button>

      <div
        className="w-full max-w-6xl px-12"
        onClick={(e) => e.stopPropagation()}
      >
        <Carousel opts={{ startIndex: initialIndex }} className="w-full">
          <CarouselContent>
            {images.map((src, idx) => (
              <CarouselItem key={idx}>
                <div className="flex flex-col items-center justify-center h-screen py-12">
                  <TransformWrapper
                    initialScale={1}
                    minScale={0.5}
                    maxScale={4}
                    centerOnInit
                    wheel={{ step: 0.5 }}
                    doubleClick={{ step: 0.7 }}
                  >
                    {({ zoomIn, zoomOut, resetTransform }) => (
                      <div className="relative w-full flex flex-col items-center">
                        {/* Control Buttons - Fixed and Functional */}
                        <div className="absolute left-4 top-1/5 -translate-y-1/2 flex flex-col gap-3 z-110">
                          <button
                            onClick={() => zoomIn(0.5)}
                            className="bg-white/10 hover:bg-white/20 p-3 rounded-full text-white backdrop-blur-md border border-white/20 transition-all active:scale-90 cursor-pointer"
                          >
                            <ZoomIn size={22} />
                          </button>
                          <button
                            onClick={() => zoomOut(0.5)}
                            className="bg-white/10 hover:bg-white/20 p-3 rounded-full text-white backdrop-blur-md border border-white/20 transition-all active:scale-90 cursor-pointer"
                          >
                            <ZoomOut size={22} />
                          </button>
                          <button
                            onClick={() => resetTransform()}
                            className="bg-white/10 hover:bg-white/20 p-3 rounded-full text-white backdrop-blur-md border border-white/20 transition-all active:scale-90 cursor-pointer"
                          >
                            <RotateCcw size={22} />
                          </button>
                        </div>

                        <TransformComponent
                          wrapperClass="!w-full !h-[75vh]"
                          contentClass="!w-full !h-full flex items-center justify-center"
                        >
                          <div className="w-full h-full flex items-center justify-center">
                            <img
                              src={src}
                              alt={`Image ${idx + 1}`}
                              className="h-full w-full object-contain md:object-contain rounded-md cursor-grab active:cursor-grabbing"
                              onDragStart={(e) => e.preventDefault()}
                            />
                          </div>
                        </TransformComponent>

                        <p className="text-center mt-8 font-medium text-white/70 tracking-widest">
                          {idx + 1} / {images.length}
                        </p>
                      </div>
                    )}
                  </TransformWrapper>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <div className="hidden md:block">
            <CarouselPrevious className="-left-10 bg-white/10 border-none text-white hover:bg-white/20 cursor-pointer" />
            <CarouselNext className="-right-10 bg-white/10 border-none text-white hover:bg-white/20 cursor-pointer" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}

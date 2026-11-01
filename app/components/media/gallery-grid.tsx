"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ImageData } from "@/app/lib/gallery";
import { X } from "lucide-react";

interface ImageModalProps {
  image: ImageData;
  onClose: () => void;
}

export default function GalleryGrid({
  initialImages,
}: {
  initialImages: ImageData[];
}) {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  return (
    <>
      <div className="columns-1 md:columns-2 xl:columns-3 gap-4 md:gap-6 lg:gap-8 space-y-4 md:space-y-6 lg:space-y-8">
        {initialImages.map((image, idx) => {
          return (
            <div
              key={idx}
              className="relative w-full overflow-hidden break-inside-avoid group"
              onClick={() => setSelectedImage(image)}
            >
              <div
                className="relative w-full"
                style={{
                  aspectRatio: `${image.width}/${image.height}`,
                }}
                aria-label={`Photo: ${image.alt}`}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  style={{ objectFit: "cover" }}
                  className="absolute left-0 top-0 h-full w-full transition-all duration-500 
                              hover:scale-[1.02] cursor-pointer"
                  priority={idx < 4}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </div>
              <div className="absolute bottom-0 left-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-light">{image.alt}</p>
              </div>
            </div>
          );
        })}
      </div>

      {selectedImage && (
        <GalleryImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}

function GalleryImageModal({ image, onClose }: ImageModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: `min(${image.width}px, 90vw)`,
          maxHeight: "90vh",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-all z-10"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <Image
          src={image.src || "/placeholder.svg"}
          alt={image.alt}
          width={image.width}
          height={image.height}
          priority
          className="max-h-[90vh] w-auto h-auto"
        />

        <div className="absolute top-2 left-2 bg-black/50 px-3 py-2 rounded-sm">
          <p className="text-white text-sm font-medium">{image.alt}</p>
          {/* Add additional metadata here */}
          {image.filmStock && (
            <p className="text-white/80 text-xs mt-1">
              Film: {image.filmStock}
            </p>
          )}
          {image.camera && (
            <p className="text-white/80 text-xs">Camera: {image.camera}</p>
          )}
        </div>
      </div>
    </div>
  );
}

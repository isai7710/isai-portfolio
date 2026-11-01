const SKELETON_HEIGHTS = [220, 380, 260, 440, 300, 360];

export default function GalleryLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
      {SKELETON_HEIGHTS.map((height, i) => (
        <div
          key={`skeleton-${i}`}
          className="w-full bg-[#2a2a2a] animate-pulse"
          style={{
            height: `${height}px`,
          }}
        />
      ))}
    </div>
  );
}

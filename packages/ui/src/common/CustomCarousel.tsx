import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  Children,
  useMemo,
//   useLayoutEffect,
} from "react";
import {
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  SxProps,
  Theme,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "../../../icons/src";

// ------------------ Types ------------------
type ResponsiveSettings = {
  breakpoint: number; // in px
  settings: Partial<CarouselSettings>;
};

type CarouselSettings = {
  slidesToShow: number;
  slidesToScroll: number;
  spacing: number; // gap between slides in px
  autoplay: boolean;
  autoplaySpeed: number; // ms
  infinite: boolean;
  showArrows: boolean;
  showDots: boolean;
  pauseOnHover: boolean;
};

interface CarouselProps {
  children: React.ReactNode;
  settings?: Partial<CarouselSettings>;
  responsive?: ResponsiveSettings[];
  sx?: SxProps<Theme>;
  arrowSx?: SxProps<Theme>;
  dotSx?: SxProps<Theme>;
}

const defaultSettings: CarouselSettings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  spacing: 16,
  autoplay: false,
  autoplaySpeed: 4000,
  infinite: false,
  showArrows: true,
  showDots: true,
  pauseOnHover: true,
};

// ------------------ Hook: useResponsiveSettings ------------------
function useResponsiveSettings(
  responsive: ResponsiveSettings[] | undefined,
  settings: CarouselSettings
): CarouselSettings {
  const theme = useTheme();
  const breakpoints = responsive?.map((r) => r.breakpoint) ?? [];

  // Create media query results for each breakpoint (mobile first)
  const queries = breakpoints.map((bp) =>
    useMediaQuery(theme.breakpoints.up(bp))
  );

  return useMemo(() => {
    let merged = { ...settings };
    if (responsive) {
      // Apply the last matching breakpoint's settings (highest breakpoint first)
      for (let i = responsive.length - 1; i >= 0; i--) {
        if (queries[i]) {
          merged = { ...merged, ...responsive[i]?.settings };
          break;
        }
      }
    }
    return merged;
  }, [responsive, settings, queries]);
}

// ------------------ Carousel Component ------------------
export const CustomCarousel: React.FC<CarouselProps> = ({
  children,
  settings: userSettings,
  responsive,
  sx,
  arrowSx,
  dotSx,
}) => {
  const mergedSettings = useResponsiveSettings(responsive, {
    ...defaultSettings,
    ...userSettings,
  });

  const {
    slidesToShow,
    slidesToScroll,
    spacing,
    autoplay,
    autoplaySpeed,
    infinite,
    showArrows,
    showDots,
    pauseOnHover,
  } = mergedSettings;

  // Items array
  const items = useMemo(() => Children.toArray(children), [children]);
  const totalSlides = items.length;

  // Clamp slidesToShow
  const visibleSlides = Math.min(slidesToShow, totalSlides);
  const scrollSlides = Math.min(slidesToScroll, visibleSlides);

  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Swipe handling
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const isSwiping = useRef(false);

  // Maximum index (inclusive)
  const maxIndex = infinite
    ? totalSlides - 1
    : Math.max(0, totalSlides - visibleSlides);

  // Calculate slide width as percentage
  const slideWidthPercent = 100 / visibleSlides;

  // Navigation with wrapping for infinite
  const goTo = useCallback(
    (index: number) => {
      if (!infinite) {
        const clamped = Math.max(0, Math.min(index, maxIndex));
        setCurrentIndex(clamped);
        return;
      }
      // Handle wrapping
      let nextIndex = index;
      while (nextIndex < 0) nextIndex += totalSlides;
      while (nextIndex >= totalSlides) nextIndex -= totalSlides;
      setCurrentIndex(nextIndex);
    },
    [infinite, maxIndex, totalSlides]
  );

  const goNext = useCallback(() => {
    goTo(currentIndex + scrollSlides);
  }, [currentIndex, scrollSlides, goTo]);

  const goPrev = useCallback(() => {
    goTo(currentIndex - scrollSlides);
  }, [currentIndex, scrollSlides, goTo]);

  // Autoplay
  useEffect(() => {
    if (
      !autoplay ||
      (pauseOnHover && isHovered) ||
      totalSlides <= visibleSlides
    ) {
      return;
    }
    autoplayTimerRef.current = setInterval(goNext, autoplaySpeed);
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [
    autoplay,
    autoplaySpeed,
    pauseOnHover,
    isHovered,
    goNext,
    totalSlides,
    visibleSlides,
  ]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    },
    [goPrev, goNext]
  );

  // ---- Swipe handling (pointer events) ----
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    touchStartX.current = e.clientX;
    touchDeltaX.current = 0;
    isSwiping.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isSwiping.current) return;
    touchDeltaX.current = e.clientX - touchStartX.current;
  }, []);

  const handlePointerUp = useCallback(
    (_e: React.PointerEvent) => {
      if (!isSwiping.current) return;
      isSwiping.current = false;
      const delta = touchDeltaX.current;
      const threshold = 50; // px
      if (delta > threshold) {
        goPrev();
      } else if (delta < -threshold) {
        goNext();
      }
    },
    [goPrev, goNext]
  );

  // Smooth transform
  const transformValue = useMemo(() => {
    return -(currentIndex * slideWidthPercent);
  }, [currentIndex, slideWidthPercent]);

  // Slide count used for dots
  const dotCount = infinite
    ? totalSlides
    : Math.max(0, totalSlides - visibleSlides + 1);

  // Disable arrows logic
  const disablePrev = !infinite && currentIndex <= 0;
  const disableNext = !infinite && currentIndex >= maxIndex;

  // If no items, render nothing
  if (totalSlides === 0) return null;

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        ...sx,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="carousel"
    >
      {/* Track */}
      <Box
        ref={trackRef}
        sx={{
          display: "flex",
          transition: "transform 0.5s ease-in-out",
          transform: `translateX(${transformValue}%)`,
          gap: `${spacing}px`,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ touchAction: "pan-y" }} // prevent vertical scroll interference
      >
        {items.map((child, index) => (
          <Box
            key={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${totalSlides}`}
            sx={{
              flex: `0 0 calc(${slideWidthPercent}% - ${(spacing * (visibleSlides - 1)) / visibleSlides}px)`,
              minWidth: 0,
            }}
          >
            {child}
          </Box>
        ))}
        {/* For infinite loop, we would need clone slides; this simplified version only
              wraps the index but doesn't visually clone. For a true infinite effect,
              consider a library or advanced cloning logic. */}
      </Box>

      {/* Arrows */}
      {showArrows && totalSlides > visibleSlides && (
        <>
          <IconButton
            aria-label="previous slide"
            onClick={goPrev}
            disabled={disablePrev}
            sx={{
              position: "absolute",
              top: "50%",
              left: 8,
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255,255,255,0.7)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
              zIndex: 2,
              ...arrowSx,
            }}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            aria-label="next slide"
            onClick={goNext}
            disabled={disableNext}
            sx={{
              position: "absolute",
              top: "50%",
              right: 8,
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255,255,255,0.7)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
              zIndex: 2,
              ...arrowSx,
            }}
          >
            <ChevronRight />
          </IconButton>
        </>
      )}

      {/* Dots */}
      {showDots && totalSlides > visibleSlides && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 1,
            gap: 0.5,
          }}
        >
          {Array.from({ length: dotCount }).map((_, idx) => {
            // Determine active dot (consider currentIndex)
            const active = infinite
              ? currentIndex === idx
              : currentIndex === idx;
            return (
              <Box
                key={idx}
                role="button"
                tabIndex={0}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => goTo(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    goTo(idx);
                  }
                }}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: active ? "primary.main" : "grey.400",
                  transition: "background-color 0.3s",
                  cursor: "pointer",
                  ...dotSx,
                }}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
};



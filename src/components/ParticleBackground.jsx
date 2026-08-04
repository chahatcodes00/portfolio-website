import { useEffect, useRef } from "react";

// Full-viewport canvas of drifting red dots that link to nearby dots (and to
// the cursor, within range) with red lines — sits behind the page content on
// the site's plain white background. Pure canvas + rAF, no external library.
//
// The navbar and footer are meant to read as plain, seamless chrome — no
// boxed background, but also no dots/lines running behind them. So instead
// of covering them with an opaque panel, we clip the canvas draw region to
// exclude whatever screen-space band <header> and <footer> currently occupy,
// tracked live via ResizeObserver (covers the mobile menu opening/closing)
// and re-measured on scroll/resize.
//
// Skips entirely on touch devices (no cursor to react to) and renders one
// static frame instead of animating when prefers-reduced-motion is set.

const COLOR_DOT = "192, 57, 43"; // red-600
const COLOR_LINE = "192, 57, 43"; // same red, lighter alpha — bolder/more visible than a darker tint

const PARTICLE_COUNT_PER_PX = 1 / 12000; // scales with screen area
const MAX_PARTICLES = 100;
const LINK_DISTANCE = 140;
const CURSOR_LINK_DISTANCE = 170;
const SPEED = 0.35;

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    let frame = null;
    const mouse = { x: -9999, y: -9999, active: false };

    // Screen-space bands (viewport coordinates, matching particle coords)
    // to exclude from drawing. Empty/zero-height rects are no-ops.
    const headerEl = document.querySelector("header");
    const footerEl = document.querySelector("footer");
    let headerBand = { top: 0, bottom: 0 };
    let footerBand = { top: 0, bottom: 0 };

    function updateBands() {
      if (headerEl) {
        const r = headerEl.getBoundingClientRect();
        headerBand = { top: r.top, bottom: r.bottom };
      }
      if (footerEl) {
        const r = footerEl.getBoundingClientRect();
        footerBand = { top: r.top, bottom: r.bottom };
      }
    }

    function makeParticles() {
      const count = Math.min(
        MAX_PARTICLES,
        Math.round(width * height * PARTICLE_COUNT_PER_PX),
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        r: Math.random() * 1.8 + 1.4,
      }));
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeParticles();
      updateBands();
    }

    function step() {
      updateBands();
      ctx.clearRect(0, 0, width, height);

      // Move
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      // Clip out the header/footer bands so nothing draws behind them —
      // outer full-canvas rect plus the excluded bands, combined with the
      // evenodd rule, leaves a hole where each band sits.
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, width, height);
      if (headerBand.bottom > headerBand.top) {
        ctx.rect(0, headerBand.top, width, headerBand.bottom - headerBand.top);
      }
      if (footerBand.bottom > footerBand.top) {
        ctx.rect(0, footerBand.top, width, footerBand.bottom - footerBand.top);
      }
      ctx.clip("evenodd");

      // Links between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(${COLOR_LINE}, ${0.3 * (1 - dist / LINK_DISTANCE)})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Link to cursor
        if (mouse.active) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CURSOR_LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(${COLOR_LINE}, ${0.5 * (1 - dist / CURSOR_LINK_DISTANCE)})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // Dots (drawn after links so they sit on top)
      for (const p of particles) {
        ctx.fillStyle = `rgba(${COLOR_DOT}, 0.6)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      if (!reducedMotion) frame = requestAnimationFrame(step);
    }

    function onMouseMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }

    function onMouseLeave() {
      mouse.active = false;
    }

    resize();
    step();

    const resizeObserver = new ResizeObserver(updateBands);
    if (headerEl) resizeObserver.observe(headerEl);
    if (footerEl) resizeObserver.observe(footerEl);

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateBands, { passive: true });
    if (!isTouch) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseleave", onMouseLeave);
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateBands);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      resizeObserver.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}


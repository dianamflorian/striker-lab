import { useEffect, useRef } from 'react';

interface CosmosCanvasProps {
  heading: number; // Ángulo panorámico 0 - 360°
  accentColor: string;
}

interface Star {
  x: number;
  y: number;
  z: number;
  radius: number;
  color: string;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface DustCloud {
  x: number;
  y: number;
  rx: number;
  ry: number;
  angle: number;
  color: string;
}

export function CosmosCanvas({ heading, accentColor }: CosmosCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / width - 0.5) * 2;
      const ny = (e.clientY / height - 0.5) * 2;
      pointerRef.current.targetX = nx * 90;
      pointerRef.current.targetY = ny * 55;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Paleta astrofotográfica real (temperatura de color estelar)
    const starColors = [
      '#ffffff',
      '#ffffff',
      '#dbeafe', // Azul blanco
      '#93c5fd', // Zafiro atmosférico
      '#fef3c7', // Blanco cálido
      '#fdba74', // Ámbar estelar
      '#e9d5ff', // Violeta tenue
    ];

    // Generación orgánica de 1,800 estrellas (agrupadas en la Vía Láctea + zonas vacías)
    const totalStars = 1800;
    const stars: Star[] = [];
    const panoWidth = width * 2.4;
    const panoHeight = height * 1.6;

    for (let i = 0; i < totalStars; i++) {
      const isGalacticCore = Math.random() < 0.68;
      let x = Math.random() * panoWidth;
      let y = Math.random() * panoHeight;

      if (isGalacticCore) {
        // Banda diagonal de la Vía Láctea con dispersión gaussiana
        const t = Math.random();
        const spread = (Math.random() - 0.5 + (Math.random() - 0.5)) * (panoHeight * 0.28);
        x = t * panoWidth;
        y = t * panoHeight * 0.85 + spread + panoHeight * 0.08;
      }

      // Crear "vacíos" naturales donde hay polvo oscuro (como en la foto)
      const inDarkRift =
        Math.sin(x * 0.004) * Math.cos(y * 0.005) > 0.62 && Math.random() < 0.78;
      if (inDarkRift) continue;

      const isBright = Math.random() < 0.08;
      stars.push({
        x,
        y,
        z: 0.35 + Math.random() * 0.85,
        radius: isBright ? 1.3 + Math.random() * 1.1 : 0.45 + Math.random() * 0.85,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        baseAlpha: isBright ? 0.75 + Math.random() * 0.25 : 0.25 + Math.random() * 0.6,
        twinkleSpeed: 0.0012 + Math.random() * 0.0045, // Velocidad única por estrella
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // Nubes irregulares de polvo galáctico (ámbar cálido, azul cobalto y grietas oscuras)
    const dustClouds: DustCloud[] = [];
    for (let i = 0; i < 42; i++) {
      const t = i / 42;
      const cx = t * panoWidth + (Math.random() - 0.5) * 140;
      const cy = t * panoHeight * 0.85 + panoHeight * 0.08 + (Math.random() - 0.5) * 120;
      const isWarmCore = i % 3 === 0;
      const isDarkLane = i % 4 === 0;

      dustClouds.push({
        x: cx,
        y: cy,
        rx: 90 + Math.random() * 180,
        ry: 40 + Math.random() * 95,
        angle: -0.45 + (Math.random() - 0.5) * 0.3,
        color: isDarkLane
          ? 'rgba(2, 3, 6, 0.52)'
          : isWarmCore
          ? 'rgba(196, 138, 102, 0.075)'
          : 'rgba(68, 118, 212, 0.07)',
      });
    }

    const render = (time: number) => {
      // Suavizado del movimiento panorámico (mouse + rumbo cardinal)
      pointerRef.current.x += (pointerRef.current.targetX - pointerRef.current.x) * 0.05;
      pointerRef.current.y += (pointerRef.current.targetY - pointerRef.current.y) * 0.05;

      const headingOffset = (heading / 360) * (panoWidth * 0.55);

      // Fondo cielo nocturno profundo
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#020307');
      bgGrad.addColorStop(0.65, '#05070e');
      bgGrad.addColorStop(1, '#120e0d'); // Leve calidez del horizonte atmosférico
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Renderizar nubes de polvo de la Vía Láctea
      for (const cloud of dustClouds) {
        const drawX = ((cloud.x - headingOffset - pointerRef.current.x * 0.45) % panoWidth + panoWidth) % panoWidth - panoWidth * 0.2;
        const drawY = cloud.y - pointerRef.current.y * 0.45 - panoHeight * 0.15;

        ctx.save();
        ctx.translate(drawX, drawY);
        ctx.rotate(cloud.angle);
        const grad = ctx.createRadialGradient(0, 0, 5, 0, 0, cloud.rx);
        grad.addColorStop(0, cloud.color);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(0, 0, cloud.rx, cloud.ry, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Renderizar cada estrella con su propio centelleo atmosférico asíncrono
      for (const star of stars) {
        const parallaxX = (headingOffset + pointerRef.current.x) * star.z;
        const parallaxY = pointerRef.current.y * star.z;

        const drawX = ((star.x - parallaxX) % panoWidth + panoWidth) % panoWidth - panoWidth * 0.2;
        const drawY = star.y - parallaxY - panoHeight * 0.15;

        if (drawX < -10 || drawX > width + 10 || drawY < -10 || drawY > height + 10) continue;

        // Oscilación atmosférica individual
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
        const alpha = Math.max(0.08, Math.min(1, star.baseAlpha + twinkle * 0.35));

        ctx.globalAlpha = alpha;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Destello sutil solo en las estrellas más brillantes
        if (star.radius > 1.75 && twinkle > 0.4) {
          ctx.globalAlpha = alpha * 0.25;
          ctx.beginPath();
          ctx.arc(drawX, drawY, star.radius * 2.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }


            // --- HORIZONTE DE ONDULACIÓN SUAVE Y CUADRÍCULA ULTRALENTA ---
      const horizonY = height * 0.68;
      const centerX = width * 0.5;
      const wormholeDepth = 42; // Curva cóncava suave sin picos bruscos

      // Resplandor atmosférico neón suave + verde turquesa (#2dd4bf)
      const horizonGlow = ctx.createLinearGradient(0, horizonY - 90, 0, horizonY + 80);
      horizonGlow.addColorStop(0, 'rgba(0, 0, 0, 0)');
      horizonGlow.addColorStop(0.4, 'rgba(45, 212, 191, 0.22)'); // Verde turquesa suave
      horizonGlow.addColorStop(0.65, accentColor); // Neón suave
      horizonGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.globalAlpha = 0.28 + Math.sin(time * 0.0008) * 0.04;
      ctx.fillStyle = horizonGlow;
      ctx.fillRect(0, horizonY - 90, width, 170);

      // Curva gaussiana pura y simétrica (elimina cualquier quiebre o irregularidad)
      const getWormholeY = (x: number) => {
        const dist = (x - centerX) / (width * 0.34);
        const well = Math.exp(-dist * dist) * wormholeDepth;
        return horizonY + well;
      };

      // Suelo oscuro recortado con la curva suave del agujero de gusano
      ctx.globalAlpha = 0.92;
      ctx.fillStyle = '#030409';
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 8) {
        ctx.lineTo(x, getWormholeY(x));
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Línea superior continua en verde turquesa suave
      ctx.globalAlpha = 0.55;
      ctx.strokeStyle = '#2dd4bf';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 8) {
        const y = getWormholeY(x);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Líneas verticales en perspectiva con intermitencia lenta y suave
      const numVerticalLines = 20;
      for (let i = -numVerticalLines; i <= numVerticalLines; i++) {
        const flicker = 0.16 + 0.34 * Math.abs(Math.sin(time * 0.0007 + i * 0.5));
        ctx.globalAlpha = flicker;
        ctx.strokeStyle = i % 2 === 0 ? '#2dd4bf' : accentColor;
        ctx.lineWidth = i % 4 === 0 ? 1.2 : 0.7;

        const topX = centerX + i * 24;
        const startY = getWormholeY(topX);
        const bottomX = centerX + i * 110;

        ctx.beginPath();
        ctx.moveTo(topX, startY);
        ctx.lineTo(bottomX, height);
        ctx.stroke();
      }

      // Líneas horizontales avanzando a velocidad mínima (5 veces más lenta)
      const speed = (time * 0.00018)% 1;
      const rows = 9;
      for (let r = 0; r < rows; r++) {
        const progress = (r + speed) / rows;
        const depthFactor = Math.pow(progress, 2.2);
        const pulse = 0.15 + 0.42 * Math.sin(time * 0.0009 - r * 0.5) ** 2;

        ctx.globalAlpha = pulse * progress;


         const lineGradient = ctx.createLinearGradient(0, horizonY, width, height);
        lineGradient.addColorStop(0, '#9ff7ce');   // Verde turquesa suave
        lineGradient.addColorStop(0.5, accentColor); // Color neón del deportista
        lineGradient.addColorStop(1, '#2dd4bf');   // Verde turquesa suave al otro extremo

        ctx.strokeStyle = lineGradient;


        ctx.strokeStyle =lineGradient;
        ctx.lineWidth = 0.65 + progress * 0.95;

        ctx.beginPath();
        for (let x = 0; x <= width; x += 12) {
          const baseHorizon = getWormholeY(x);
          const curvedY = baseHorizon + depthFactor * (height - baseHorizon);
          if (x === 0) ctx.moveTo(x, curvedY);
          else ctx.lineTo(x, curvedY);
        }
        ctx.stroke();
      }



      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [heading, accentColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}

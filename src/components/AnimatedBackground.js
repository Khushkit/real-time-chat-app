import React, { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let boxes = [];
    let mousePosition = { x: 0, y: 0 };

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create grid boxes
    const createBoxes = () => {
      const boxSize = 100;
      const cols = Math.ceil(canvas.width / boxSize);
      const rows = Math.ceil(canvas.height / boxSize);
      
      boxes = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          boxes.push({
            x: i * boxSize,
            y: j * boxSize,
            width: boxSize,
            height: boxSize,
            brightness: 0.05,
            targetBrightness: 0.05
          });
        }
      }
    };
    createBoxes();

    // Handle mouse movement
    const handleMouseMove = (e) => {
      mousePosition = {
        x: e.clientX,
        y: e.clientY
      };
      
      boxes.forEach(box => {
        const boxCenterX = box.x + box.width / 2;
        const boxCenterY = box.y + box.height / 2;
        const distance = Math.sqrt(
          Math.pow(mousePosition.x - boxCenterX, 2) +
          Math.pow(mousePosition.y - boxCenterY, 2)
        );
        
        if (distance < 200) {
          box.targetBrightness = 0.15;
        } else {
          box.targetBrightness = 0.05;
        }
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      boxes.forEach(box => {
        // Smooth brightness transition
        box.brightness += (box.targetBrightness - box.brightness) * 0.1;
        
        // Draw box with gradient
        const gradient = ctx.createLinearGradient(
          box.x,
          box.y,
          box.x + box.width,
          box.y + box.height
        );
        gradient.addColorStop(0, `rgba(64, 224, 208, ${box.brightness})`);
        gradient.addColorStop(1, `rgba(0, 191, 255, ${box.brightness})`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(box.x, box.y, box.width, box.height);
        
        // Draw grid lines
        ctx.strokeStyle = `rgba(64, 224, 208, ${box.brightness * 0.3})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(box.x, box.y, box.width, box.height);
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="animated-background" />;
};

export default AnimatedBackground; 
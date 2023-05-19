import { Component, Input, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Climates } from 'src/app/utils/app.data';

@Component({
  selector: 'app-planet-drawing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planet-drawing.component.html'
})
export class PlanetDrawingComponent implements OnInit, OnDestroy {
  @Input() diameter!: string;
  @Input() climate!: string;
  @Input() rotationPeriod!: string;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D | null;
  private canvasElement!: HTMLCanvasElement;
  private centerX!: number;
  private centerY!: number;
  private gradientColor: string = '#020314';
  private angle: number = 0;
  private rotationSpeed: number = 1;
  private animationFrameId!: number;

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.canvasElement = this.canvas.nativeElement;
    this.centerX = this.canvasElement.width / 2;
    this.centerY = this.canvasElement.height / 2;
    this.rotationSpeed = this.calculatePlanetRotationSpeed(this.rotationPeriod);
    this.animatePlanet();
  }

  drawPlanet() {
    const radius = this.calculatePlanetDiameter(this.diameter);
    const dotSpacing = 12;
    const dotSize = 6;
    const lineWidth = 2;
    const strokeStyle = '#999999';

    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

      this.ctx.beginPath();
      this.ctx.arc(this.centerX, this.centerY, radius, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = this.selectColorBasedOnClimate(this.climate);
      this.ctx.fill();

      // Draw gradient overlay
      if (!isNaN(this.centerX) && !isNaN(this.centerY) && !isNaN(radius) && isFinite(this.centerX) && isFinite(this.centerY) && isFinite(radius)) {
        const gradient = this.ctx.createRadialGradient(this.centerX, this.centerY, 0, this.centerX, this.centerY, radius);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(1, this.gradientColor);

        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
      }

      // Draw dotted lines
      this.ctx.lineWidth = lineWidth;
      this.ctx.setLineDash([dotSize, dotSpacing]);
      this.ctx.strokeStyle = strokeStyle;
      this.ctx.stroke();
    }
  }

  rotatePlanet(angle: number) {
    if (this.ctx) {
      this.ctx.save();
      this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
      this.ctx.translate(this.centerX, this.centerY);
      this.ctx.rotate(angle * (Math.PI / 180));
      this.ctx.translate(-this.centerX, -this.centerY);
      this.drawPlanet();
      this.ctx.restore();
    }
  }

  animatePlanet() {
    this.angle += this.rotationSpeed;
    if (this.angle >= 360) {
      this.angle = 0;
    }

    this.rotatePlanet(this.angle);
    this.animationFrameId = requestAnimationFrame(() => this.animatePlanet());
  }

  calculatePlanetDiameter(diameter: string): number {
    if ((Number(diameter) / 100) > 1000) {
      // in case the diameter is to big, just use 140 to fit in canvas
      return 140;
    } else {
      return (((Number(diameter) / 100) / 2) * 100) / 100;
    }
  }

  calculatePlanetRotationSpeed(rotationPeriod: string) {
    return Number(rotationPeriod) / 50;
  }

  selectColorBasedOnClimate(climate: string): string {
    let climateColor: string = '#fff';
    switch (climate?.split(',')[0].trim()) {
      case Climates.temperate:
        climateColor = '#d4ca85';
        break;

      case Climates.arid:
      case Climates.rocky:
        climateColor = '#e38d08';
        break;

      case Climates.hot:
      case Climates.super_heated:
        climateColor = '#bb352c';
        break;

      case Climates.tropical:
        climateColor = '#7dc410'
        break;

      case Climates.artificial_temperate:
        climateColor = '#c7c7c7';
        break;

      case Climates.frigid:
      case Climates.sub_artic:
      case Climates.windy:
      case Climates.frozen:
        climateColor = '#00c1ff';
        break;

      case Climates.moist:
        climateColor = '#56b893';
        break;

      case Climates.murky:
        climateColor = '#0c5e58';
        break;

      case Climates.polluted:
        climateColor = '#131313';
        break;
    }
    return climateColor;
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
  }
}

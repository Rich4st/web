export enum ShapeType {
  ROUND = 'round',
  TRIANGLE = 'triangle',
  SQUARE = 'square',
  PENTAGON = 'pentagon'
}

export enum FillType {
  SOLID = 'solid',
  FENCE = 'fence',
  SPOT = 'spot',
}

export interface PolygonParams {
  left: string;
  top: string;
  size: string;
  rotate: string;
  opacity: string | number;
  shape: `${ShapeType}`;
  fill: `${FillType}`;
  color: string;
  animationDuration: string;
}

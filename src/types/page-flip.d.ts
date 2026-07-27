// Minimal ambient types for page-flip (StPageFlip), which ships no
// declarations. Covers only the surface ReportBook uses. See
// https://github.com/Nodlik/StPageFlip for the full API.
declare module "page-flip" {
  export interface PageFlipSettings {
    width: number;
    height: number;
    size?: "fixed" | "stretch";
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    showCover?: boolean;
    usePortrait?: boolean;
    maxShadowOpacity?: number;
    mobileScrollSupport?: boolean;
    flippingTime?: number;
    drawShadow?: boolean;
  }

  export class PageFlip {
    constructor(element: HTMLElement, settings: PageFlipSettings);
    loadFromImages(images: string[]): void;
    on(event: "flip" | "changeState" | "changeOrientation", callback: (e: { data: number }) => void): void;
    flipNext(): void;
    flipPrev(): void;
    destroy(): void;
  }
}

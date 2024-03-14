import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appAutoResizeColumns]',
  standalone: true
})
export class AutoResizeColumnsDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.resizeColumns());
  }

  private resizeColumns() {
    const table = this.el.nativeElement;
    const rows = Array.from(table.querySelectorAll('.mat-row'));
    if (rows.length === 0) return; // No data rows present

    const columnCount = (rows[0] as HTMLElement).children.length;

    for (let i = 0; i < columnCount; i++) {
      let maxWidth = 0;

      // Measure header cell width
      const headerCell = this.el.nativeElement.querySelector(`.mat-header-cell:nth-child(${i + 1})`);
      maxWidth = Math.max(maxWidth, headerCell.clientWidth);

      // Measure each body cell width in the column
      rows.forEach((row: any) => {
        const cell = row.children[i];
        maxWidth = Math.max(maxWidth, cell.clientWidth);
      });

      // Update header and all body cells to the maximum width found
      this.renderer.setStyle(headerCell, 'width', `${maxWidth}px`);
      rows.forEach((row: any) => {
        const cell = row.children[i];
        this.renderer.setStyle(cell, 'width', `${maxWidth}px`);
      });
    }
  }
}

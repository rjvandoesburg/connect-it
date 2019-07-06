export default class Module {
    constructor(x, y, fill) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.isDragging = false;
        this.fill = fill
    }

    isWithin(x, y) {
        return (x > this.x && x < this.x + this.width)
            && (y > this.y && y < this.y + this.height)
    }
    
    draw(ctx, panX, panY) {
        ctx.fillRect(
            this.x - panX,
            this.y - panY,
            this.width,
            this.height
        )
    }
}

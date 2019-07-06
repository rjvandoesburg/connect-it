class Canvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.bb = canvas.getBoundingClientRect();
        this.width = canvas.width;
        this.height = canvas.height;
        this.offsetX = this.bb.left;
        this.offsetY = this.bb.top;
        this.shapes = [];
        this.draggingShape = null;

        this.panX = 0;
        this.panY = 0;
        this.mouseHeld = false;

        // Manually bind everyhing to this because we are operating from the 'window'
        this.draw = this.draw.bind(this);
        this.clear = this.clear.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.mouseMove = this.mouseMove.bind(this);

        window.onmousedown = this.mouseDown;
        window.onmouseup = this.mouseUp;
        window.onmousemove = this.mouseMove;
    }


    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    mouseDown(event) {
        event.preventDefault();
        event.stopPropagation();

        this.mouseHeld = true;

        let mx = event.clientX - this.offsetX;
        let my = event.clientY - this.offsetY;

        _.forEach(this.shapes, shape => {
            if (shape.isWithin(mx + this.panX, my + this.panY)) {
                shape.isDragging = true;
                this.draggingShape = shape;

                window.requestAnimationFrame(this.draw);
            }
        })
    }

    mouseMove(event) {
        let mx = event.clientX - this.offsetX;
        let my = event.clientY - this.offsetY;

        if (this.mouseHeld) {
            if (this.selectedNode !== null) {
                // dragging shape move
                this.selectedNode.x = mx - this.selectedNode.width * 0.5 + this.panX;
                this.selectedNode.y = my - this.selectedNode.height * 0.5 + this.panY;
            } else {
                this.panX += this.startX - mx;
                this.panY += this.startY - my;
            }
        }

        this.startX = mx;
        this.startY = my;

        window.requestAnimationFrame(this.draw);
    }

    mouseUp(event) {
        event.preventDefault();
        event.stopPropagation();

        this.mouseHeld = false;

        if (this.selectedNode !== null) {
            this.selectedNode.isDragging = false;
            this.draggingShape = null;
            window.requestAnimationFrame(this.draw);
        }
    }

    draw() {
        this.clear();

        let xMin = 0;
        let yMin = 0;
        let xMax = 0;
        let yMax = 0;

        _.forEach(this.shapes, shape => {
            this.ctx.fillStyle = shape.fill;

            xMin = shape.x - this.panX;
            xMax = shape.x + shape.width - this.panX;
            yMin = shape.y - this.panY;
            yMax = shape.y + shape.height - this.panY;

            if (yMax > 0 && xMin < this.width
                && yMax > 0 && yMin < this.height) {
                shape.draw(this.ctx, this.panX, this.panY);
            }
        });
    }

    addModule(module) {
        this.shapes.push(module);
    }
}

export default Canvas;
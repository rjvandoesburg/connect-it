<template>

</template>

<script>
    export default {

        props: {
            node: {
                required: true,
            },

            canvas: {
                required: false,
            }
        },

        data() {
            return {
                x: 0,
                y: 0,
                width: 50,
                height: 50,
                isDragging: false,
                fill: null,

                linkedNodes: [],
            }
        },

        created() {
            this.x = this.node.x;
            this.y = this.node.y;
            this.fill = this.node.fill;
        },

        methods: {
            isWithin(x, y) {
                return (x > this.x && x < this.x + this.width)
                    && (y > this.y && y < this.y + this.height)
            },

            draw(canvas) {
                // Draw the links
                this.drawLinks(canvas);

                if (this.isVisible(canvas)) {
                    this.drawElement(canvas);
                }
            },

            drawElement(canvas) {
                canvas.ctx.fillStyle = this.fill;

                canvas.ctx.fillRect(
                    this.x - canvas.panX,
                    this.y - canvas.panY,
                    this.width,
                    this.height
                )
            },

            drawLinks(canvas) {
                if (this.linkedNodes.length === 0) {
                    return;
                }

                _.forEach(this.linkedNodes, node => {
                    canvas.ctx.beginPath();
                    canvas.ctx.moveTo(this.centerX, this.centerY);
                    canvas.ctx.lineTo(node.centerX, node.centerY);
                    canvas.ctx.stroke();
                });
            },

            isVisible(canvas) {
                let xMin = this.x - canvas.panX;
                let xMax = this.x + this.width - canvas.panX;
                let yMin = this.y - canvas.panY;
                let yMax = this.y + this.height - canvas.panY;
                
                return xMax > 0 && xMin < canvas.width
                && yMax > 0 && yMin < canvas.height
            },

            linkNode(node) {
                this.linkedNodes.push(node);
            }
        },

        computed: {
            centerX() {
                return this.x + this.width / 2;
            },

            centerY() {
                return this.y + this.height / 2;
            },
        },
    }
</script>
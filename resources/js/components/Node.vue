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
                if (! this.isVisible(canvas)) {
                    return;
                }

                canvas.ctx.fillStyle = this.fill;

                canvas.ctx.fillRect(
                    this.x - canvas.panX,
                    this.y - canvas.panY,
                    this.width,
                    this.height
                )
            },

            isVisible(canvas) {
                let xMin = this.x - canvas.panX;
                let xMax = this.x + this.width - canvas.panX;
                let yMin = this.y - canvas.panY;
                let yMax = this.y + this.height - canvas.panY;
                
                return xMax > 0 && xMin < canvas.width
                && yMax > 0 && yMin < canvas.height
            }
        },
    }
</script>
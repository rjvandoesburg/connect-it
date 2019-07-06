<template>
    <div class="h-full w-full">
        <canvas ref="canvas" class="bg-white"></canvas>
        <node
                ref="nodes"
                v-for="(data, index) in modules"
                :node="data"
                :key="index"
        ></node>
    </div>
</template>

<script>
    import Node from './../components/Node';

    export default {
        components: {
            Node
        },

        data() {
            return {
                canvas: null,
                ctx: null,
                bb: null,
                width: null,
                height: null,
                offsetX: null,
                offsetY: null,
                shapes: [],
                draggingShape: null,

                panX: 0,
                panY: 0,
                mouseHeld: false,

                modules: [
                    {
                        x: 50,
                        y: 50,
                        fill: '#00aa00',
                    },
                    {
                        x: 125,
                        y: 50,
                        fill: '#aa0000',
                    },
                    {
                        x: 50,
                        y: 125,
                        fill: '#0000aa',
                    },
                    {
                        x: 135,
                        y: 180,
                        fill: '#8899aa',
                    },
                ]
            }
        },

        created() {
            window.addEventListener('resize', this.resizeCanvas, false);
        },

        mounted() {
            this.canvas = this.$refs.canvas;

            this.$refs.nodes[0].linkNode(this.$refs.nodes[1]);

            this.ctx = this.canvas.getContext('2d');
            this.shapes = [];
            this.draggingShape = null;

            window.onmousedown = this.mouseDown;
            window.onmouseup = this.mouseUp;
            window.onmousemove = this.mouseMove;

            this.resizeCanvas();
        },

        methods: {
            resizeCanvas() {
                this.canvas.width = this.$el.clientWidth;
                this.canvas.height = this.$el.clientHeight;

                this.width = this.canvas.width;
                this.height = this.canvas.height;
                this.bb = this.canvas.getBoundingClientRect();
                this.offsetX = this.bb.left;
                this.offsetY = this.bb.top;


                this.draw();
            },

            clear() {
                this.ctx.clearRect(0, 0, this.width, this.height);
            },

            mouseDown(event) {
                event.preventDefault();
                event.stopPropagation();

                this.mouseHeld = true;

                _.forEach(this.$refs.nodes, node => {
                    if (node.isWithin(this.startX + this.panX, this.startY + this.panY)) {
                        node.isDragging = true;
                        this.draggingShape = node;

                        requestAnimationFrame(this.draw);
                    }
                })
            },

            mouseMove(event) {
                let mx = event.clientX - this.offsetX;
                let my = event.clientY - this.offsetY;

                if (this.mouseHeld) {
                    if (this.draggingShape !== null) {
                        // dragging shape move
                        this.draggingShape.x = mx - this.draggingShape.width * 0.5 + this.panX;
                        this.draggingShape.y = my - this.draggingShape.height * 0.5 + this.panY;
                    } else {
                        this.panX += this.startX - mx;
                        this.panY += this.startY - my;
                    }
                }

                this.startX = mx;
                this.startY = my;

                requestAnimationFrame(this.draw);
            },

            mouseUp(event) {
                event.preventDefault();
                event.stopPropagation();

                this.mouseHeld = false;

                if (this.draggingShape !== null) {
                    this.draggingShape.isDragging = false;
                    this.draggingShape = null;
                    requestAnimationFrame(this.draw);
                }
            },

            draw() {
                this.clear();
                _.forEach(this.$refs.nodes, node => {
                    node.draw(this);
                })
            },
        }
    }
</script>

<style scoped>

</style>
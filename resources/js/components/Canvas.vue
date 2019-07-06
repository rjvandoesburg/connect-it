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
                selectedNode: null,

                panX: 0,
                panY: 0,
                mouseHeld: false,

                scale: 1,
                currentScale: 1,
                adjustScale: false,

                didDrag: false,

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
            this.selectedNode = null;

            window.onmousedown = this.mouseDown;
            window.onmouseup = this.mouseUp;
            window.onmousemove = this.mouseMove;

            this.canvas.onwheel = this.onScroll;

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
                if (this.adjustScale) {
                    this.ctx.scale(this.scale, this.scale);
                    this.adjustScale = false;
                }

                this.ctx.clearRect(0, 0, this.width, this.height);
            },

            mouseDown(event) {
                event.preventDefault();
                event.stopPropagation();

                this.mouseHeld = true;

                _.forEach(this.$refs.nodes, node => {
                    if (node.isWithin(this.startX + this.panX, this.startY + this.panY)) {
                        node.isDragging = true;
                        this.selectedNode = node;

                        requestAnimationFrame(this.draw);
                    }
                })
            },

            mouseMove(event) {
                let mx = event.clientX - this.offsetX;
                let my = event.clientY - this.offsetY;

                if (this.mouseHeld) {
                    this.didDrag = true;
                    if (this.selectedNode !== null) {
                        // dragging shape move
                        this.selectedNode.x = mx - this.selectedNode.width * 0.5 + this.panX;
                        this.selectedNode.y = my - this.selectedNode.height * 0.5 + this.panY;
                    } else {
                        this.panX += this.startX - mx;
                        this.panY += this.startY - my;
                    }

                    requestAnimationFrame(this.draw);
                }

                this.startX = mx;
                this.startY = my;
            },

            mouseUp(event) {
                event.preventDefault();
                event.stopPropagation();

                this.mouseHeld = false;

                if (this.selectedNode !== null) {
                    if (! this.didDrag) {
                        console.log('handle node click');
                    }
                    this.selectedNode.isDragging = false;
                    this.selectedNode = null;
                    requestAnimationFrame(this.draw);
                }

                this.didDrag = false;
            },

            draw() {
                this.clear();
                _.forEach(this.$refs.nodes, node => {
                    node.draw(this);
                })
            },

            onScroll(event) {
                return;
                // TODO: Implement scrolling
                // The scaling should only apply to the next render
                // afterwards the new 'scale' should be 1 because we did not scroll
                event.preventDefault();
                // some how alter the scale

                this.adjustScale = true;

                this.scale = this.scale + event.deltaY * -0.01;

                // Restrict scale
                this.scale = Math.min(Math.max(.9, this.scale), 1);
                console.log(this.scale);
                //this.currentScale = this.scale;


                requestAnimationFrame(this.draw);
            },
        }
    }
</script>
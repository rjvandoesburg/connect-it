<template>
    <div class="p-4 w-screen h-screen bg-gray-200">

        <!--        <div class="grid bg-white w-100 h-100">-->
        <!--            <div>-->
        <!--                <node class="draggable" v-for="(node, index) in nodes" :color="node.color" :key="index"></node>-->
        <!--            </div>-->

        <!--        </div>-->
        <canvas ref="canvas" class="bg-white" width="500" height="500"></canvas>
    </div>
</template>


<script>
    import Node from './../components/Node';
    import Canvas from './../classes/Canvas';
    import Module from './../classes/Module';

    export default {

        components: {
            Node
        },

        data() {
            return {
                canvas: null,

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

        mounted() {
            this.canvas = new Canvas(this.$refs.canvas);
            _.forEach(this.modules, module => {
                this.canvas.addModule(new Module(module.x, module.y, module.fill));
            })
            this.canvas.draw();
        },

        methods: {
        }
    }
</script>

<style scoped>

    canvas {
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        border: solid 1px white;
        border-radius: 10px;
    }
</style>
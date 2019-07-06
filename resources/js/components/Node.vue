<template>
    <div class="rounded-full flex items-center justify-center border w-20 h-20 m-2" :class="`border-${color}-500 bg-${color}-300`">

    </div>
</template>

<script>
    export default {

        props: {
            color: {
                required: true,
            }
        },

        methods: {
            handleDrag(event) {

                let
                    // keep the dragged position in the data-x/data-y attributes
                    x = (parseFloat(this.$el.getAttribute('data-x')) || 0) + event.dx,
                    y = (parseFloat(this.$el.getAttribute('data-y')) || 0) + event.dy;

                // translate the element
                this.$el.style.webkitTransform =
                    this.$el.style.transform =
                        'translate(' + x + 'px, ' + y + 'px)';

                // update the posiion attributes
                this.$el.setAttribute('data-x', x);
                this.$el.setAttribute('data-y', y);
            }
        },
    }
</script>
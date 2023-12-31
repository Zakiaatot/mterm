<template>
    <li class="w-full">
        <a class="w-full">
            <div class=" text-xl font-semibold w-28 whitespace-nowrap overflow-hidden text-ellipsis">
                终端n号
            </div>
            <div class="operator flex justify-evenly w-20">
                <button @click.stop>
                    <svg t="1704003185691" class="icon w-6 h-6" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="9172" width="200" height="200">
                        <path
                            d="M257.7 752c2 0 4-0.2 6-0.5L431.9 722c2-0.4 3.9-1.3 5.3-2.8l423.9-423.9c3.9-3.9 3.9-10.2 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2c-1.9 11.1 1.5 21.9 9.4 29.8 6.6 6.4 14.9 9.9 23.8 9.9z m67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"
                            p-id="9173"></path>
                    </svg>
                </button>
                <button @click.stop>
                    <svg t="1704002804153" class="icon h-6 w-6" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2111" width="200" height="200">
                        <path
                            d="M768 384c-19.2 0-32 12.8-32 32l0 377.6c0 25.6-19.2 38.4-38.4 38.4L326.4 832c-25.6 0-38.4-19.2-38.4-38.4L288 416C288 396.8 275.2 384 256 384S224 396.8 224 416l0 377.6c0 57.6 44.8 102.4 102.4 102.4l364.8 0c57.6 0 102.4-44.8 102.4-102.4L793.6 416C800 396.8 787.2 384 768 384z"
                            fill="#272636" p-id="2112"></path>
                        <path
                            d="M460.8 736l0-320C460.8 396.8 448 384 435.2 384S396.8 396.8 396.8 416l0 320c0 19.2 12.8 32 32 32S460.8 755.2 460.8 736z"
                            fill="#272636" p-id="2113"></path>
                        <path
                            d="M627.2 736l0-320C627.2 396.8 608 384 588.8 384S563.2 396.8 563.2 416l0 320C563.2 755.2 576 768 588.8 768S627.2 755.2 627.2 736z"
                            fill="#272636" p-id="2114"></path>
                        <path
                            d="M832 256l-160 0L672 211.2C672 166.4 633.6 128 588.8 128L435.2 128C390.4 128 352 166.4 352 211.2L352 256 192 256C172.8 256 160 268.8 160 288S172.8 320 192 320l640 0c19.2 0 32-12.8 32-32S851.2 256 832 256zM416 211.2C416 198.4 422.4 192 435.2 192l153.6 0c12.8 0 19.2 6.4 19.2 19.2L608 256l-192 0L416 211.2z"
                            fill="#272636" p-id="2115"></path>
                    </svg>
                </button>
            </div>
        </a>
    </li>
</template>

<script>
</script>

<style scoped>
.icon path {
    fill: hsl(var(--bc) / var(--tw-text-opacity, 1));
}

.operator button:active {
    animation: scale-ani ease-in-out .2s;
}

@keyframes scale-ani {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(0.6);
    }

    100% {
        transform: scale(1);
    }
}
</style>


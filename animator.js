class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop, flipLeft) {

        Object.assign(this, { spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop, flipLeft });

        this.elapsedTime = 0;
        this.totalTime = this.frameCount * this.frameDuration;

    };

    drawFrame(tick, ctx, x, y, scale) {
        this.elapsedTime += tick;

        if (this.isDone()) {

            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                return;
            }
        }

        let frame = this.currentFrame();

        if (this.reverse) frame = this.frameCount - frame - 1;

        if(this.flipLeft){
            ctx.save();
            ctx.scale(-1,1);
        }
       
        ctx.drawImage(this.spritesheet,
            // current frame 
            this.xStart + frame * (this.width + this.framePadding), this.yStart, // source from sprite sheet
            // width and height of the image within the sprite sheet
            this.width, this.height,
            // where to draw the frame
            this.flipLeft ? -x - this.width * scale : x, y,
            // how big to draw the framee
            this.width * scale,
            this.height * scale);

        ctx.restore(); 
        // if (PARAMS.DEBUG) {
        //     ctx.strokeStyle = 'Green';
        //     ctx.strokeRect(x, y, this.width * scale, this.height * scale);
        // }
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
};
$("document").ready(function() {
        $("#ball").draggable({
          revert: false
        });
      
        // $("#maze").droppable({
        //   accept: '#ball',
        //   drop: function(event, ui) {
        //     $(this).append($(ui.draggable));
        //   }
        // });
});

function isColliding(mazeImg, ball) {
        const ballRect = ball.getBoundingClientRect();
        const mazeImgRect = mazeImg.getBoundingClientRect();

        /* Create a canvas to draw the mazeImg */
        const canvas = document.createElement('canvas');
        canvas.width = mazeImgRect.width;
        canvas.height = mazeImgRect.height;

        const context = canvas.getContext('2d', { willReadFrequently: true });
        context.drawImage(mazeImg, 0, 0, mazeImgRect.width, mazeImgRect.height);

        /* Check each pixel within the ball */
        for (let x = 0; x < ballRect.width; x++) {
                for (let y = 0; y < ballRect.height; y++) {
                        /* Get the maze pixel data */
                        const pixel = 
                                context.getImageData(ballRect.left + 
                                                     x - mazeImgRect.left, 
                                                     ballRect.top + 
                                                     y - mazeImgRect.top,
                                                     1, 1).data;
                        /* check if the pixel is transparent */
                        if (pixel[3] !== 0) { return true; }
                }
        }

        return false; 
}

setInterval(function(){
        const mazeImg = document.getElementById('maze');
        const ball = document.getElementById('ball');
        if (isColliding(mazeImg, ball)) {
                document.getElementById("title").innerText = "Collision"
        } else {
                document.getElementById("title").innerText = "";
        }
},10);
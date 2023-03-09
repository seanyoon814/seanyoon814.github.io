    // constants
    const COLOR_BG = "black";
    const COLOR_CUBE = "gold";
    const SPEED_X = 0.05; // rps
    const SPEED_Y = 0.15; // rps
    const SPEED_Z = 0.10; // rps
    const POINT3D = function(x, y, z) { this.x = x; this.y = y; this.z = z; };

    // set up the canvas and context
    var canvas = document.getElementById("cube")
    var ctx = canvas.getContext("2d");
    // dimensions
    var h = document.documentElement.clientHeight;
    var w = document.documentElement.clientWidth;
    var cx;
    var cy;
    var cz;
    var size;
    if(window.innerWidth <= 544)
    {
        canvas.width = w;
        canvas.height = h/2;
        ctx.fillStyle = COLOR_BG;
        ctx.strokeStyle = COLOR_CUBE;
        ctx.lineWidth = w / 150;
        cx = w / 2;
        cy = h / 12;
        cz = 0;
        ctx.shadowBlur = 10;
        size = h / 20;
    }
    else{
        canvas.width = w;
        canvas.height = h/2;
        ctx.fillStyle = COLOR_BG;
        ctx.strokeStyle = COLOR_CUBE;
        ctx.lineWidth = w / 150;
        cx = w / 4;
        cy = h / 4;
        cz = 0;
        ctx.shadowBlur = 40;
        size = h / 8;
    }

    // colours and lines
    // ctx.strokeStyle = "#1e4f9e"
    ctx.shadowColor = 'orange';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.lineCap = "round";

    // cube parameters
    var vertices = [
        new POINT3D(cx - size, cy - size, cz - size),
        new POINT3D(cx + size, cy - size, cz - size),
        new POINT3D(cx + size, cy + size, cz - size),
        new POINT3D(cx - size, cy + size, cz - size),
        new POINT3D(cx - size, cy - size, cz + size),
        new POINT3D(cx + size, cy - size, cz + size),
        new POINT3D(cx + size, cy + size, cz + size),
        new POINT3D(cx - size, cy + size, cz + size)
    ];
    var edges = [
        [0, 1], [1, 2], [2, 3], [3, 0], // back face
        [4, 5], [5, 6], [6, 7], [7, 4], // front face
        [0, 4], [1, 5], [2, 6], [3, 7] // connecting sides
    ];
    
    // set up the animation loop
    var timeDelta, timeLast = 0;
    requestAnimationFrame(loop);

    function loop(timeNow) {

        // calculate the time difference
        timeDelta = timeNow - timeLast;
        timeLast = timeNow;

        // background
        ctx.clearRect(0, 0, w, h);

        // rotate the cube along the z axis
        let angle = timeDelta * 0.001 * SPEED_Z * Math.PI * 2;
        for (let v of vertices) {
            let dx = v.x - cx;
            let dy = v.y - cy;
            let x = dx * Math.cos(angle) - dy * Math.sin(angle);
            let y = dx * Math.sin(angle) + dy * Math.cos(angle);
            v.x = x + cx;
            v.y = y + cy;
        }

        // rotate the cube along the x axis
        angle = timeDelta * 0.001 * SPEED_X * Math.PI * 2;
        for (let v of vertices) {
            let dy = v.y - cy;
            let dz = v.z - cz;
            let y = dy * Math.cos(angle) - dz * Math.sin(angle);
            let z = dy * Math.sin(angle) + dz * Math.cos(angle);
            v.y = y + cy;
            v.z = z + cz;
        }

        // rotate the cube along the y axis
        angle = timeDelta * 0.001 * SPEED_Y * Math.PI * 2;
        for (let v of vertices) {
            let dx = v.x - cx;
            let dz = v.z - cz;
            let x = dz * Math.sin(angle) + dx * Math.cos(angle);
            let z = dz * Math.cos(angle) - dx * Math.sin(angle);
            v.x = x + cx;
            v.z = z + cz;
        }

        // draw each edge
        for (let edge of edges) {
            ctx.beginPath();
            ctx.moveTo(vertices[edge[0]].x, vertices[edge[0]].y);
            ctx.lineTo(vertices[edge[1]].x, vertices[edge[1]].y);
            ctx.stroke();
        }

        // call the next frame
        requestAnimationFrame(loop);
    }

    const observer = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if(entry.isIntersecting){
                entry.target.classList.add('show');
            }
            else{
                entry.target.classList.remove('show');
            }
        })
    })
    // Animations

    const hiddenElements = document.querySelectorAll('.hidden');
    const fadeInElements = document.querySelectorAll('.fade-in');
    const fadeRightElements = document.querySelectorAll('.fade-right');
    hiddenElements.forEach((el) => observer.observe(el));
    fadeInElements.forEach((el) => observer.observe(el));
    fadeRightElements.forEach((el) => observer.observe(el));
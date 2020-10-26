class pytha_ctx {
  constructor(canvas, ctx, left_ang, animate) {
    this.canvas = canvas;
    this.ctx = ctx
    this.left_ang = left_ang
    this.animate = animate
    this.inc = 1.0;
    this.lbound = 3.14 / 6
    this.rbound = 3.14 / 3
    this.step = 3.14 / 500
    this.interval = 1
  }

  turn() {
    var new_ang = this.left_ang + this.inc * this.step
    if (new_ang < this.lbound || new_ang > this.rbound) {
      this.inc *= -1
      this.turn()
      return
    } else {
      this.left_ang = new_ang;
    }
  }
}

g_ctx = null

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  moveTo() {
    g_ctx.ctx.moveTo(this.x, this.y)
  }
  lineTo() {
    g_ctx.ctx.lineTo(this.x, this.y)
  }
  log() {
    console.log(`Point(${this.x}, ${this.y})`)
  }
}

class ray {
  constructor(start, end) {
    this.start = start
    this.end = end
  }

  rotate_reach(ang, scale) {
    var dif_x = this.end.x - this.start.x;
    var dif_y = this.end.y - this.start.y;
    var rot_res = rotate_vec(dif_x, dif_y, ang);
    return new Point(
      this.start.x + rot_res[0] * scale,
      this.start.y + rot_res[1] * scale
    )
  }

  log() {
    console.log(`Start point (${this.start.x}, ${this.start.y}), end point (${this.end.x}, ${this.end.y})`)
  }
}

class triangle {
  constructor(bl, br, left_ang = 3.14 / 4) {
    this.bl = bl
    this.br = br
    this.tp = new ray(bl, br).rotate_reach(-left_ang, Math.cos(left_ang));
  }
  draw() {
    var ctx = g_ctx.ctx
    ctx.beginPath()
    this.bl.moveTo()
    this.br.lineTo()
    this.tp.lineTo()
    ctx.closePath()
    ctx.fill()
  }
}

class cube {
  constructor(ray) {
    this.bl = ray.start
    this.br = ray.end
    this.tl = ray.rotate_reach(-3.14 / 2, 1)
    this.tr = ray.rotate_reach(-3.14 / 4, Math.sqrt(2))
  }
  draw() {
    var ctx = g_ctx.ctx
    ctx.beginPath()
    this.bl.moveTo()
    this.br.lineTo()
    this.tr.lineTo()
    this.tl.lineTo()
    ctx.closePath()
    ctx.fill()
  }
  log() {
    console.log("Cub");
    this.bl.log();
    this.br.log();
    this.tl.log();
    this.tr.log();
  }
}

function draw_patha_tree_rec(cub_bot_ray, ttl, tag="untagged", color="#006000") {
  if (ttl <= 0) {
    return;
  }
  var ctx = g_ctx.ctx
  var cub = new cube(cub_bot_ray);

  ctx.fillStyle = color

  cub.draw()
  var tri = new triangle(cub.tl, cub.tr, g_ctx.left_ang)
  ctx.fillStyle = "#eee"
  tri.draw()

  // left
  draw_patha_tree_rec(new ray(tri.bl, tri.tp), ttl - 1, "left", color_add(color, "#200000"))
  // right
  draw_patha_tree_rec(new ray(tri.tp, tri.br), ttl - 1, "right", color_add(color, "#000020"))
}

function draw_tree_instance(cub_bot_ray) {
  reset_canvas(g_ctx.canvas, g_ctx.ctx) 
  draw_patha_tree_rec(cub_bot_ray, 15);
  if (g_ctx.animate) {
    g_ctx.turn()
    setTimeout(function() { draw_tree_instance(cub_bot_ray); }, g_ctx.interval);
  }
}

function download_canvas(el, canvas) {
  var image_uri = canvas.toDataURL("image/jpg")
  el.href = image_uri
}

function draw_pythagoras_tree(canvas, ctx, animate) {
  console.log("draw pytha tree");
  g_ctx = new pytha_ctx(canvas, ctx, 3.14 / 4, animate) 
  var lx = canvas.width / 2 - 50
  var cub_bot_ray = new ray(
    new Point(lx, canvas.height - 50),
    new Point(lx + 100, canvas.height - 50));
  draw_tree_instance(cub_bot_ray)

  // setup download
  if (!animate) {
    var download_link = document.getElementById("download")
    download_link.style.display = 'block'
    download_link.onclick = function() { download_canvas(download_link, canvas); }
  }
}

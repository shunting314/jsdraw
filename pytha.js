// TODO save as png
//
// TODO have a control to tune angle and draw adaptively!!

class pytha_ctx {
  constructor(ctx, left_ang) {
    this.ctx = ctx
    this.left_ang = left_ang
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

function draw_pythagoras_tree(canvas, ctx) {
  console.log("draw pytha tree");
  g_ctx = new pytha_ctx(ctx, 3.14 / 3) 
  cub_bot_ray = new ray(
    new Point(canvas.width / 2 - 50, canvas.height - 50),
    new Point(canvas.width / 2 + 50, canvas.height - 50));
  draw_patha_tree_rec(cub_bot_ray, 15);
}

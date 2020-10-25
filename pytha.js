class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  moveTo(ctx) {
    ctx.moveTo(this.x, this.y)
  }
  lineTo(ctx) {
    ctx.lineTo(this.x, this.y)
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
  constructor(bl, br) {
    this.bl = bl
    this.br = br
    this.tp = new ray(bl, br).rotate_reach(-3.14 / 4, Math.sqrt(2) / 2);
  }
  draw() {
    ctx.beginPath()
    this.bl.moveTo(ctx)
    this.br.lineTo(ctx)
    this.tp.lineTo(ctx)
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
  draw(ctx) {
    ctx.beginPath()
    this.bl.moveTo(ctx)
    this.br.lineTo(ctx)
    this.tr.lineTo(ctx)
    this.tl.lineTo(ctx)
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

function draw_patha_tree_rec(ctx, cub_bot_ray, ttl, tag="untagged") {
  if (ttl <= 0) {
    return;
  }
  var cub = new cube(cub_bot_ray);
  ctx.fillStyle = "#ff0000"
  if (tag == "right") {
    ctx.fillStyle = "#cccccc";
  }
  cub.draw(ctx)
  var tri = new triangle(cub.tl, cub.tr)
  ctx.fillStyle = "#00ff00"
  if (tag == "right") {
    ctx.fillStyle = "#cc00cc";
  }
  tri.draw(ctx)

  // left
  draw_patha_tree_rec(ctx, new ray(tri.bl, tri.tp), ttl - 1, "left")
  // right
  draw_patha_tree_rec(ctx, new ray(tri.tp, tri.br), ttl - 1, "right")
}

function draw_pythagoras_tree(canvas, ctx) {
  console.log("draw pytha tree");
  cub_bot_ray = new ray(
    new Point(canvas.width / 2 - 50, canvas.height - 10),
    new Point(canvas.width / 2 + 50, canvas.height - 10));
  draw_patha_tree_rec(ctx, cub_bot_ray, 8);
}

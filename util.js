// util functions
function rand_int(start, end) {
  start = Math.floor(start);
  end = Math.floor(end);
  if (start >= end) {
    console.log(`Invalid input to rand_int: start ${start}, end ${end}`);
    return start;
  }
  width = end - start;
  return Math.floor((Math.random() * width) + start);
}

function http_get_params() {
  params = {}
  parts_by_que = location.href.split('?')
  if (parts_by_que.length < 2) { // no query string
    return params
  }
  for (var assignstr of parts_by_que[1].split('&')) {
    pair = assignstr.split('=')
    key = decodeURIComponent(pair[0])
    val = decodeURIComponent(pair[1])
    params[key] = val;
  }
  return params
}

function draw_pixel(ctx, x, y) {
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x + 1, y + 1);
  ctx.stroke();
}

function reset_canvas(canvas, ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function fill_canvas(canvas, ctx, clr) {
  ctx.fillStyle = clr
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function rotate_vec(x, y, ang) {
  x2 = Math.cos(ang);
  y2 = Math.sin(ang);
  xe = x * x2 - y * y2
  ye = x * y2 + y * x2;
  return [xe, ye]
}

function parse_color(color_str) {
  return [parseInt(color_str.substr(1, 2), 16),
    parseInt(color_str.substr(3, 2), 16),
    parseInt(color_str.substr(5, 2), 16)]
}

function color_add(lhs, rhs) {
  if (lhs.length != 7 || rhs.length != 7) {
    console.log(`Invalid input for color_add ${lhs}, ${rhs}`)
    return lhs;
  }
  var lhs_ar = parse_color(lhs)
  var rhs_ar = parse_color(rhs)
  var r = Math.min(255, lhs_ar[0] + rhs_ar[0])
  var g = Math.min(255, lhs_ar[1] + rhs_ar[1])
  var b = Math.min(255, lhs_ar[2] + rhs_ar[2])
  return to_rgbstr(r, g, b)
}

function to_rgbstr(r, g, b) {
  return "#" + r.toString(16).padStart(2, '0')
      + g.toString(16).padStart(2, '0')
      + b.toString(16).padStart(2, '0')
}

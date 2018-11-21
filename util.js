function randf() {
  let nargs = arguments.length;
  if (nargs === 0) return Math.random();
  if (nargs === 1) return arguments[0] * Math.random();
  let min = arguments[0];
  let max = arguments[1];
  return min + Math.random()*(max - min);
}

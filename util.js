function randi() {
  // randi() returns 0 or 1
  // randi(max) returns random interger in [0, max)
  // randi(min, max) return random integers in [min, max]
  if(arguments.length === 0) return randi(2); // 0 or 1
  else return Math.floor(randf(...arguments));
}

function randf() {
  // randf() returns a random number in [0, 1)
  // randf(max) returns a random number in [0, max)
  // randf(min, max) returns a random number in [min, max)
  let nargs = arguments.length;
  if (nargs === 0) return Math.random();
  if (nargs === 1) return arguments[0] * Math.random();
  let min = arguments[0];
  let max = arguments[1];
  return min + Math.random()*(max - min);
}

function randn(std) {
  // randn() returns random gaussian with mean 0, std 1
  // randn(std) returns zero-mean random gaussian with std
  if(arguments.length === 0) std = 1.0;
  if(this.cached) { 
    this.cached = false;
    return this.cachedValue; 
  }
  let u = 2*Math.random()-1;
  let v = 2*Math.random()-1;
  let r = u*u + v*v;
  if(r === 0 || r > 1) return randn(...arguments);
  let c = Math.sqrt(-2*Math.log(r)/r);
  this.cachedValue = v*c*std; // cache this
  this.cached = true;
  return u*c*std;
}

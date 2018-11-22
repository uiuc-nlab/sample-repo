// seedable pseudo-random number generation
// uses LCG algorithm if seeded, uses Math.random() otherwise
//
// rand()     return uniform random # in [0, 1)
// seed(#)    sets the seed and starts using LCG algorithm
// seed()     returns the seed
// unseed()   switches back to unseeded mode using Math.random();
// isSeeded() returns seeded status (true/false)

({rand, seed, unseed, isSeeded} = LCG());

function LCG() {
  // https://en.wikipedia.org/wiki/Linear_congruential_generator
  const m = 4294967296;
  const a = 1664525;
  const c = 1013904223;
  var seed = (Math.random() * m) >>> 0; // default seed
  var z = seed;
  var isSeeded = false;
  return {
    isSeeded: function() {
      return isSeeded;
    },
    seed: function(val) {
      if (val == null) {
        return (seed);
      } else {
        isSeeded = true;
        seed = val >>> 0;
      }
      z = seed;
    },
    unseed: function() {
      isSeeded = false;
      return seed;  // in case the user wants to save it
    },
    rand: function() {
      // if not seeded, use Math.random (faster)
      if (!isSeeded) return Math.random();
      // define the recurrence relationship
      z = (a * z + c) % m;
      return z / m; // return a float in [0, 1); (z % m) / m < 1 always
    }
  }
}

function randi(a, b) {
  // randi() returns 0 or 1
  // randi(a) returns random interger in [0, a)
  // randi(a, b) return random integers in [a, b)
  if(a == null) return Math.floor(2 * rand()); // 0 or 1
  if(b == null) return Math.floor(a * rand());
  return Math.floor(a + (b-a) * rand());
}

function randf(a, b) {
  // randf() returns a random float in [0, 1)
  // randf(a) returns a random float in [0, a)
  // randf(a, b) returns a random float in [a, b)
  if(a == null) return rand();
  if(b == null) return a * rand();
  return a + (b - a) * rand();
}

function randn(std) {
  // randn() returns random gaussian with mean 0, std 1
  // randn(std) returns zero-mean random gaussian with std
  if(arguments.length === 0) std = 1.0;
  if(this.cached) { 
    this.cached = false;
    return this.cachedValue; 
  }
  let u = 2*rand()-1;
  let v = 2*rand()-1;
  let r = u*u + v*v;
  if(r === 0 || r > 1) return randn(...arguments);
  let c = Math.sqrt(-2*Math.log(r)/r);
  this.cachedValue = v*c*std; // cache this
  this.cached = true;
  return u*c*std;
}

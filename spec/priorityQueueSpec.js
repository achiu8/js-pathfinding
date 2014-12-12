QUnit.module("PriorityQueue#add(element, priority");

QUnit.test("adds new element to queue if not present", function(assert) {
  var queue = new PriorityQueue();
  queue.add(1, 2);

  assert.equal(queue.size(), 1);
});

QUnit.test("sets element's priority value", function(assert) {
  var queue = new PriorityQueue();
  queue.add(1, 2);

  assert.equal(queue.queue[0].priority, 2);
});

QUnit.test("does not add duplicate element", function(assert) {
  var queue = new PriorityQueue();
  queue.add(1, 2);
  queue.add(1, 2);

  assert.equal(queue.size(), 1);
});

QUnit.test("updates element's priority if already present", function(assert) {
  var queue = new PriorityQueue();
  queue.add(1, 2);
  queue.add(1, 3);

  assert.equal(queue.size(), 1);
  assert.equal(queue.queue[0].priority, 3);
});

QUnit.module("PriorityQueue#pull");

QUnit.test("removes element with highest priority from queue", function(assert) {
  var queue = new PriorityQueue();
  queue.add(1, 5);
  queue.add(2, 1);
  queue.pull();

  assert.equal(queue.contains(1), false);
});

QUnit.test("decreases size of queue by 1 if not empty", function(assert) {
  var queue = new PriorityQueue();
  queue.add(1, 5);
  queue.add(2, 1);
  queue.pull();

  assert.equal(queue.size(), 1);
});

QUnit.test("returns the removed element", function(assert) {
  var queue = new PriorityQueue();
  queue.add(1, 5);
  queue.add(2, 1);

  assert.equal(queue.pull(), 1);
});

QUnit.test("returns null if queue empty", function(assert) {
  var queue = new PriorityQueue();

  assert.equal(queue.pull(), null);
});

QUnit.module("PriorityQueue#isEmpty");

QUnit.test("returns true if queue empty", function(assert) {
  var queue = new PriorityQueue();

  assert.equal(queue.isEmpty(), true);
});

QUnit.test("returns false if queue is not empty", function(assert) {
  var queue = new PriorityQueue();
  queue.add(1, 2);

  assert.equal(queue.isEmpty(), false);
});

QUnit.module("PriorityQueue#contains");

QUnit.test("returns true if queue contains element", function(assert) {
  var queue = new PriorityQueue();
  queue.add(1, 2);

  assert.equal(queue.contains(1), true);
});

QUnit.test("returns false if queue doesn't contain element", function(assert) {
  var queue = new PriorityQueue();
  queue.add(1, 2);

  assert.equal(queue.contains(2), false);
});

QUnit.module("PriorityQueue#size");

QUnit.test("returns the size of the queue", function(assert) {
  var queue = new PriorityQueue();
  queue.add(1, 2);

  assert.equal(queue.size(), 1);
});

QUnit.module("PriorityQueue#sortByPriority");

QUnit.test("sorts the queue by priority in descending order", function(assert) {
  var queue = new PriorityQueue();
  queue.add(1, 1);
  queue.add(2, 2);
  queue.add(3, 3);
  queue.add(4, 4);
  queue.sortByPriority();

  assert.equal(queue.queue[0].priority, 4);
  assert.equal(queue.queue[1].priority, 3);
  assert.equal(queue.queue[2].priority, 2);
  assert.equal(queue.queue[3].priority, 1);
});

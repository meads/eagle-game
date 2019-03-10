
function hitTest(a, b) {
  let deltaX = a.x - b.x
  let deltaY = a.y - b.y
  let distance = Math.sqrt(deltaX * deltaX +  deltaY * deltaY)
  let aCollisionRadius = a.height / 4
  let bCollisionRadius = b.height / 4
  
  return aCollisionRadius + bCollisionRadius > distance
}
  
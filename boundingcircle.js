class BoundingCircle {
    constructor(x, y, radius, visualRadius) {
        Object.assign(this, { x, y, radius, visualRadius});      
    };

    distance(A, B) {
        return Math.sqrt((B.x - A.x) * (B.x - A.x) + (B.y - A.y)*(B.y - A.y));
    };
    
    collide(A, B) {
        return (this.distance(A, B) < A.radius + B.radius);
    };
    
    canSee(A, B) { // if A can see B
        return (this.distance(A, B) < A.visualRadius + B.radius);
    }
    
};
const shipFactory = function(length) {
    return {
        length: length,
        hits: Array(length).fill(false),
        hit: function(position) {this.hits[position] = true},
        isSunk: function() {return this.hits.every(element => element === true)}
    }
};


export default shipFactory;
//module.exports = shipFactory;
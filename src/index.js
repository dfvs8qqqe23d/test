const constants = require('./constants');
const errors = require('./errors');
const isUnique = require('is-unique');
const isArray= require('is-array');
const intersect = require('intersect');
const cardUtils =require('./cardUtils');
const sort = require('./sort');

/**
 * Determines the point value of a hand of cards
 * @param {Array<String>} input
 * @throws {Error}
 * @returns {Number}
 */
function getTotal(input)
{
    return input.map(x=>cardUtils.getPointValue(x))(input).reduce((a, b) => a + b, 0);
}

/**
 * Returns a boolean representing if the total score of the cards causes the player to be bust
 * @param {Number} score
 * @returns{Boolean}
 */
function isBust(score)
{
    return score > constants.MAX_SCORE;
}

/**
 * Validates a hand for correctness
 * @param {Array<String>} hand 
 */
function validateHand(hand)
{
    if (!isArray(hand))
    {
        throw new errors.ValidationError('Input must be an array');
    }
    if (hand.length<constants.MINIMUM_HAND_SIZE)
    {
        throw new errors.ValidationError('Hand must contain a minimum of 2 cards');
    }
    hand.forEach(x=>
{
        if (typeof x!=='string')
        {
            throw new errors.ValidationError('Array must only be strings');
        }
    });
    if (!isUnique(hand))
    {
        throw new errors.ValidationError('Hand contains duplicate cards');
    }
}

/**
 * Validates the inputs
 * @param {*} handA 
 * @param {*} handB 
 */
function validateInput(handA,handB)
{
    validateHand(handA);
    validateHand(handB);
    //Assure we haven't recieve an invalid scenario where both players have the same card(s)
    if (intersect(handA,handB).length!==0)
    {
        throw new errors.ValidationError('Players cannot both have the same card(s)');
    }
    //other errors will be thrown during runtime relating to if a card is invalid or not
}

/**
 * Determines the winner between the hands of two players
 * @param {Array<String>} handA
 * @param {Array<String>} handB
 * @returns {Object}
 */
function determineWinner(handA,handB)
{
    try
    {
        validateInput(handA,handB);

        const totalA = getTotal(handA),
         totalB = getTotal(handB),

         bustA = isBust(totalA),
         bustB = isBust(totalB);

        if (bustA && bustB )
        {
            return {result:constants.OUTCOMES.DRAW};
        }
        else if (bustA)
        {
            return {result:constants.OUTCOMES.B_WINS};
        }
        else if (bustB)
        {
            return {result:constants.OUTCOMES.A_WINS};
        }
        //At this point we are assured that we both players have valid hands that are less than our max score

        if (totalA>totalB)
        {
            return {result:constants.OUTCOMES.A_WINS};
        }
        else if (totalB>totalA)
        {
            return {result:constants.OUTCOMES.B_WINS};
        }
        //Here both players have the same point value
        const sortedA = sort.sortHand(handA),
            sortedB = sort.sortHand(handB);
        //Now we loop through the hands to find who has the largest point

        for (let i =0, c= Math.min(sortedA.length,sortedB.length); i<c; i++)
        {
            let cardA = sortedA[i],
             cardB = sortedB[i],
             comparedValue = sort.compareValue(cardA,cardB);
            if (comparedValue === -1)
            {
                return {result:constants.OUTCOMES.A_WINS};
            }
            else if (comparedValue === 1)
            {
                return {result:constants.OUTCOMES.B_WINS};
            }
        }
        //This should only ever have to loop once
        let cardA = sortedA[0],
            cardB = sortedB[0],

            comparedValue = sort.compareSuit(cardA,cardB);
        if (comparedValue === -1)
        {
            return {result:constants.OUTCOMES.A_WINS};
        }
        else
        {
            return {result:constants.OUTCOMES.B_WINS};
        }
    }
    catch (err)
    {
        return {err:err};
    }
}


module.exports = {
    determineWinner,
    constants,
    errors
};
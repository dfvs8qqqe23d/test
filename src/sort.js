const cardUtils = require('./cardUtils'),
    constants = require('./constants');


function compareValue(cardA,cardB)
{
    let aVal = cardUtils.getPointValue(cardA),
    bVal = cardUtils.getPointValue(cardB);

   if (aVal<bVal)
   {
       return 1;
   }
   else if (aVal>bVal)
   {
       return -1;
   }

   //Check to see if they are nobility cards in which case we need to decide ordering that way
   if (cardUtils.isRoyalty(cardA))
   {
       let orderA = constants.ROYALTY_ORDER.indexOf(cardUtils.getCardValue(cardA)),
        orderB = constants.ROYALTY_ORDER.indexOf(cardUtils.getCardValue(cardB));

       if (orderA > orderB)
       {
           return -1;
       }
       else if (orderA < orderB)
       {
           return 1;
       }
   }
   return 0;
}

function compareSuit(cardA,cardB)
{
    let suitA = cardUtils.getSuit(cardA),
    suitB = cardUtils.getSuit(cardB);
    return constants.SUIT_ORDER.indexOf(suitA) < constants.SUIT_ORDER.indexOf(suitB) ? -1 :1;
}

function compare(cardA,cardB)
{
    let comparedValue =compareValue(cardA,cardB);
    if (comparedValue!==0)
    {
        return comparedValue;
    }
    return compareSuit(cardA,cardB);
}

function sortHand(hand)
{
    //Never mutate data
    let copiedHand = hand.slice(0);
    copiedHand.sort(compare);
    return copiedHand;
}

module.exports ={
    sortHand,
    compare,
    compareValue,
    compareSuit
};
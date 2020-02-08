const errors = require('./errors'),
    constants =require('./constants');


function getCardValue(card)
{
    return card.slice(0,-1);
}

function isRoyalty(card)
{
    let value =getCardValue(card);
    return constants.ROYALTY_ORDER.indexOf(value)!==-1;
}

function getSuit(card)
{
    const value = card[card.length -1];

    if (value === undefined || constants.SUIT_ORDER.indexOf(value)===-1)
    {
        throw new errors.InvalidCard(card);
    }
    return value;
}

function getPointValue(card)
{
    const value = constants.POINT_LOOKUP[getCardValue(card)];
    if (value === undefined)
    {
        throw new errors.InvalidCard(card);
    }
    return value;
}

module.exports =
{
    getCardValue,
    getSuit,
    getPointValue,
    isRoyalty
};
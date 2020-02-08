class LookupError extends Error
{
    constructor(card)
    {
      super(`Could not determine the point value of card '${card}'`);
    }
}

class ValidationError extends Error
{
    constructor(msg)
    {
      super(msg);
    }
}

class HandTooSmallError extends Error
{
    constructor()
    {
      super('Hand does not contain 2 or more cards');
    }
}

class InvalidCard extends Error
{
    constructor(card)
    {
      super(`Card ${card} is invalid`);
    }
}


  module.exports={
      LookupError,
      ValidationError,
      HandTooSmallError,
      InvalidCard
  };
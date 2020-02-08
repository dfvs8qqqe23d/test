const POINT_LOOKUP = {
    2:2,
    3:3,
    4:4,
    5:5,
    6:6,
    7:7,
    8:8,
    9:9,
    10:10,
    J:10,
    Q:10,
    K:10,
    A:11
},

 ROYALTY_ORDER = ['10','J','Q','K'],

 SUIT_ORDER = ['S', 'H', 'C', 'D'],

 /**
  * This is fascile seeing as we only have a boolean outcome, however this allows us to have additional possible outcomes states should we add on to the game
  */
 OUTCOMES =
{
    A_WINS:0,
    B_WINS:1,
    //Not actually possible currently
    DRAW :2
},
MINIMUM_HAND_SIZE =2,

 MAX_SCORE =21;

module.exports ={
    POINT_LOOKUP,
    SUIT_ORDER,
    ROYALTY_ORDER,
    OUTCOMES,
    MAX_SCORE,
    MINIMUM_HAND_SIZE
};
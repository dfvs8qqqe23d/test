const tape = require('tape');
const input = require('./tests.json');
const main = require('../src/');
const sort = require('../src/sort');

tape('Yoco testing data',function(t)
{
    input.forEach((element,index) => 
    {
        let result = main.determineWinner(element.playerA,element.playerB);

        if (result.error)
        {
            t.notOk(result.error, 'Should not have thrown error');
        }
        else
        {
            t.equal(result.result === main.constants.OUTCOMES.A_WINS, element.playerAWins, `Test - ${index}`);
        }
    });

    t.end();
});


tape('Sorting Value',function(t)
{
    const sorted = sort.sortHand(['AH','JC','QC','10H','KC']);

    t.deepEqual(sorted, ['AH','KC','QC','JC','10H'], 'Sorts correctly');

    t.end();
});

tape('Sorting Suite',function(t)
{
    const sorted = sort.sortHand(['JH','JC','JS','JD']);

    t.deepEqual(sorted, ['JS','JH','JC','JD'], 'Sorts correctly');

    t.end();
});
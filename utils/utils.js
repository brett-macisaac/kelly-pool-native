import AsyncStorage from '@react-native-async-storage/async-storage';

/*
* This function returns a random number between aMin and aMax (inclusive of both, i.e. [aMin, aMax]).

* Parameters:
    > aMin: the minimum value of the random number.
    > aMax: the maximum value of the random number.
*/
function GetRandom(aMin, aMax)
{
    return Math.floor(Math.random() * (aMax - aMin + 1)) + aMin;
}

/*
* Randomises the order of the given array.

* Parameters:
    > aArray: the array to randomise.
*/
function RandomiseArray(aArray)
{
    if (!Array.isArray(aArray))
    {
        console.log("The parameter is not an array.");
        return;
    }

    for (let i = aArray.length - 1; i > 0; --i)
    {
        const lIndexRandom = GetRandom(0, i);

        let lValueI = aArray[i];
        aArray[i] = aArray[lIndexRandom];
        aArray[lIndexRandom] = lValueI;
    }

}

async function SetInAsyncStorage(aKey, aValue)
{
    try 
    {
        await AsyncStorage.setItem(aKey, JSON.stringify(aValue));
    } 
    catch (error)
    {
        console.log(error);
    }

}

/*
* Retrieves data from device's internal storage through React Native's AsynStorage API.

* Parameters:
    > aKey: the key that corresponds to the data.
    > aAlt: the value that will be returned should the key have no corresponding value.
*/
async function GetFromAsyncStorage(aKey, aAlt = "")
{
    try 
    {
        const lData = await AsyncStorage.getItem(aKey);

        console.log("Data from internal storage: " + lData)

        return lData ? JSON.parse(lData) : aAlt;
    } 
    catch (error) 
    {
        console.log("Error!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log(error);
        return "";
    }
}

function OrdinalSuffix(aNum)
{
    if (typeof aNum !== 'number')
        return;

    const lNumAbs = Math.abs(aNum);

    if (lNumAbs > 3 && lNumAbs < 21)
        return "th";
    
    const lNumMod10 = lNumAbs % 10;

    if (lNumMod10 === 1)
        return "st";
    else if (lNumMod10 === 2)
        return "nd"
    else if (lNumMod10 === 3)
        return "rd"
    else
        return "th";
}

// An 'enum' for representing comparison operators.
const CompOps = Object.freeze(
    {
        E: 0,  // Equals (===)
        NE: 1, // Not Equals (!==)
        G: 2,  // Greater (>)
        L: 3,  // Less than (<)
        GE: 4, // Greater or Equal (>=)
        LE: 5  // Less than or Equal (<=)
    });

const utils =
{
    GetRandom: GetRandom,
    RandomiseArray: RandomiseArray,
    SetInAsyncStorage: SetInAsyncStorage,
    GetFromAsyncStorage: GetFromAsyncStorage,
    OrdinalSuffix: OrdinalSuffix,
    CompOps: CompOps
};

// Export functions.
export { utils as default };

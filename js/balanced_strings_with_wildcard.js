// Task
// A balanced string is one in which every character in the string appears an equal number of times as every other character.
//
// For example, "ab", "aaabbb" and "ababaabb" are balanced, but "abb" and "abbaa" are not.
//
// Additionally, strings may also include a wildcard character, "*". This wildcard character can represent any other character you wish. Furthermore, wildcards must represent another character; they cannot be left unused. A wild balanced string is a string in which all wildcards can be transformed into characters in such a way to produce a simple balanced string.
//
// This challenge involves writing a function balanced(s) to check whether s is balanced.
//
// Input is restricted to strings containing upper and lowercase alphabetical characters and the "*" wildcard character. The input string will match the regular expression
//
// ^[A-Za-z\*]*$
// Note that upper- and lower-cased characters such as "A" and "a" are treated as distinct for the purposes of balance.
//
// Sting input size is 0 <= n <= 500000.
//
// Examples
// balanced("a") ⟹ true
// balanced("ab") ⟹ true
// balanced("abc") ⟹ true
// balanced("abcb") ⟹ false
// balanced("Aaa") ⟹ false
// The prior five examples illustrate simple string balancing characteristics.
//
//
// balanced("abcb*") ⟹ false
// In the above example, one "*" was transformed into an "a", but without any further wildcards remaining, the "c" character cannot be balanced.
//
//
// balanced("abcb**") ⟹ true
// In the previous example, one "*" was transformed into a "c" and one "*" was transformed into an "a", balancing the string (i.e., either "abcbca" or "abcbac").
//
//
// balanced("***********") ⟹ true
// Above, the "*" characters can be made into any character, for example, "a", producing a balanced string.
//
//
// balanced("") ⟹ true
// The empty string is balanced.

const balanced = string => {
  let ar = [...string];
  let map = {};
  let wildCardCount = 0
  let maxFreq = 0

  const canBuild = (wildcardCount, frequency, numberOfUniqElements) =>{

    if(string === '"*MK********KS*M*****H**MPI"')
      console.log({wildcardCount: wildcardCount, frequency: frequency, numberOfUniqElements: numberOfUniqElements})
    numberOfCharsToAdd = 1
    totalElements = numberOfUniqElements * frequency

    while(wildcardCount > 0)
    {
      if(string === '"*MK********KS*M*****H**MPI"')
      console.log(wildcardCount / numberOfUniqElements)
      if(wildcardCount % numberOfUniqElements === 0){
        return true
      }
      totalNewChars = 1 * frequency

      if( totalNewChars <= wildcardCount){
        wildcardCount -= totalNewChars
        numberOfUniqElements += 1
        numberOfCharsToAdd++
      }else{
        break
      }
      if(string === '"*MK********KS*M*****H**MPI"')
        console.log({totalNewChars: totalNewChars, numberOfCharsToAdd: numberOfCharsToAdd, wildcardCount: wildcardCount, numberOfUniqElements: numberOfUniqElements})
    }
    if(wildcardCount == 0)
      return true
    else
      return false

  }
  ar.forEach(c =>{
    if(c === '*'){
      wildCardCount++
    }
    else{
          map[c] ? map[c]++ : (map[c] = 1);
          if(map[c] > maxFreq){
            maxFreq =  map[c]
          }
      }
  });

//   console.log(wildCardCount)
  const freq = new Set(Object.values(map))

  if(freq.size === 0 || freq.size === 1){


     if(wildCardCount == 0){
       return true;
     }
     else if(wildCardCount > 0 && freq.size === 0){
       return true
       }
  }
//  if(wildCardCount > 0)
 {


//       if(freq.size == 0){
//         return true
//       }
//       else if(wildCardCount ==1){
//         return false
//         }
    var count = 0
    Object.entries(map).forEach((tuple) =>{
      count++;
      f = tuple[1]

      if(f < maxFreq){
        wildCardCount -= (maxFreq- f)
      }
    });

    if(count == 52 && (wildCardCount % count) != 0){
      return false
    }

//   if(string == "a*aabc*****"){
//       console.log('aahh')
//     console.log(wildCardCount % count)
//     }
    if(wildCardCount<0)
      return false


//      if(wildCardCount >= count){
//         wildCardCount = wildCardCount % count
//         maxFreq += Math.floor(wildCardCount/maxFreq)
//       }


    if(wildCardCount === 0 || (wildCardCount % count) === 0 ){
      return true
    }

//    if (wildCardCount >= count)
//      return true

//    if(wildCardCount % count == 0){
//       return true
//     }

//   if(wildCardCount == 1)
//       {
//         return false
//       }

   return (canBuild(wildCardCount, maxFreq, count))
  }

//   if(string == "ab*"){
//       console.log('aahh')
//     }

   if(string == "*QANPIFKHGB*"){
      console.log('aahh2')
    console.log(maxFreq === wildCardCount)
    }


  if(maxFreq === wildCardCount || wildCardCount % maxFreq === 0)
    return true
  else
    return false
  };

// console.log(balanced("H****O*E*V*****BU**S***E*"))

console.log(balanced("aabb***"))

  // if(wildCardCount == 0){
  //     if((freq.size == 0 || freq.size == 1))
  //       return true
  //     else
  //       return false
  //   }












  const balanced = string => {
    let ar = [...string];
    let map = {};
    let wildCardCount = 0
    let maxFreq = 0

  //   check if with given params, we can expand the string from wildcards
    const canBuild = (wildcardCount, frequency, numberOfUniqElements) =>{
      numberOfCharsToAdd = 1
      totalElements = numberOfUniqElements * frequency

  //     if we already have 52 chars and after increasing frequency also, we are left with wildcards
      if(numberOfUniqElements == 52 && (wildCardCount % numberOfUniqElements) != 0){
        return false
      }

      while(wildcardCount > 0)
      {
        if(wildcardCount % numberOfUniqElements === 0){
          return true
        }
        totalNewChars = 1 * frequency

        if( totalNewChars <= wildcardCount){
          wildcardCount -= totalNewChars
          numberOfUniqElements += 1
          numberOfCharsToAdd++
        }else{
          break
        }
      }
      if(wildcardCount == 0)
        return true
      else
        return false
    }

  //   count * and frequency of each char
    ar.forEach(c =>{
      if(c === '*'){
        wildCardCount++
      }
      else{
            map[c] ? map[c]++ : (map[c] = 1);
            if(map[c] > maxFreq){
              maxFreq =  map[c]
            }
        }
    });


  //  balance string where freq is less than maxFreq
    var count = 0
    Object.entries(map).forEach((tuple) =>{
      count++;
      f = tuple[1]

      if(f < maxFreq){
        wildCardCount -= (maxFreq- f)
      }
    });

    return canBuild(wildCardCount, maxFreq, count)
  };

// A famous casino is suddenly faced with a sharp decline of their revenues. They decide to offer Texas hold'em also online. Can you help them by writing an algorithm that can rank poker hands?
//
// Task Specification
// Create a poker hand that has a method to compare itself to another poker hand:
//
// PokerHand.prototype.compareWith = function(hand) { ... };
// A poker hand has a constructor that accepts a string containing 5 cards:
//
// var hand = new PokerHand("KS 2H 5C JD TD");
// The characteristics of the string of cards are:
//
// A space is used as card seperator
// Each card consists of two characters
// The first character is the value of the card, valid characters are:
//
// 2, 3, 4, 5, 6, 7, 8, 9, T(en), J(ack), Q(ueen), K(ing), A(ce)
//
// The second character represents the suit, valid characters are:
//
// S(pades), H(earts), D(iamonds), C(lubs)
//
// The result of your poker hand compare can be one of these 3 options:
//
// var Result = {
//     "win": 1,
//     "loss": 2,
//     "tie": 3
// }
// Poker Hands
// Apply the standard Texas Hold'em rules for ranking the cards. (Ace is the highest valued card, as shown above.)
//
// In order, from highest-ranking to lowest-ranking (e.g., a Straight Flush beats a Four-of-a-Kind), the hands are:
//
// Straight Flush
//
// All five cards have the same suit, and can be arranged in sequential order.
// If two hands are both a straight flush, then the hand with the highest card value is the winner.
// If both hands have the same values, it's a tie.
// Four-of-a-Kind
//
// Four of the cards are the same face value and one non-matching card. Suit does not matter.
// If two hands are four-of-a-kind, then the hand with the higher value four-of-a-kind card is the winner.
// Full House
//
// Three cards of one face value and two of another. Suit does not matter.
// If two hands are both full houses, then the hand with the higher set of three wins.
// Flush
//
// All five cards are the same suit.
// If two hands are both a flush, follow high card rules.
// If both flushes have the same values, it's a tie.
// Straight
//
// The five cards can be arranged in sequential order. Suit does not have to match.
// If two hands are both a straight, then the hand with the highest face value wins.
// If both hands have the same values, it's a tie.
// Three-of-a-Kind
//
// Three cards with the same value, and two non-matching cards.
// If two hands are both three-of-a-kind, then the hand with the highest set of three wins.
// Two Pair
//
// Two sets of two matching cards, and a non-matching card, such as A,A,9,9,2.
// If two hands are both two pair, compare the highest set of two from each. Then compare the lowest set of two from each. If they match, follow high-card rules.
// If both hands have the same face values, it's a tie.
// One Pair
//
// One set of matching cards, and three non-matching cards, such as A,A,7,6,4.
// If two hands both have one pair, compare the sets. If they match, follow high-card rules for the remaining cards.
// If both hands have the same face values, it's a tie.
// High Card
//
// No matching values or suits, and the cards are not all in a sequence.
// To compare two high card hands, compare the highest value on each hand. If that matches, compare the next highest value, and so on.
// If all cards have the same value, it's a tie.


var Result = { "win": 1, "loss": 2, "tie": 3 }

Array.prototype.same = function(){
  return this.every(val => val === this[0])
}

class PokerHand {

  constructor(hand){
    this.cards = hand.split(" ").map((c) => new Card(c)).sort((a,b)=> a.value- b.value)
    this.values =  this.cards.map(card => card.value)
    this.suits =  this.cards.map(card => card.suit)
    this.valuesCount = this.values.reduce(this.group,{})
    this.duplicatesCount = Object.values(this.valuesCount).reduce(this.group, {})
    this.rank = this.setRank()
    this.value = this.setValue()
  }

// Strictly increasing
  stright(){
    return this.values[4] - this.values[0] === 4
  }
//  All cards of same suit
  flush(){
    return this.suits.same()
  }

  group(accumulator, curr){
    accumulator[curr] = accumulator[curr] ? accumulator[curr] + 1 : 1
    return accumulator
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  setRank(){
   return this.flush() && this.stright() && 1 ||
          this.duplicatesCount[4] && 2 || //Four of a kind
          this.duplicatesCount[3] && this.duplicatesCount[2] && 3 || //Full house
          this.flush() && 4 || //flush, same suit
          this.stright() && 5 || //stright, sequential
          this.duplicatesCount[3] && 6 || //three of kind
          this. duplicatesCount[2] == 2  && 7 ||//two pairs
          this. duplicatesCount[2] && 8 || //one pair
           9

  }

  setValue(){
//     if(this.rank ==8 ){
//       return Number.parseInt(this.getKeyByValue(this.valuesCount, 2))
//     }
    const val = this.values.sort((a, b) =>{

//       if value counts match, sort by value counts
      const valueCountDiff =  this.valuesCount[b] - this.valuesCount[a]
      if(valueCountDiff && valueCountDiff >0) return valueCountDiff

//       else sort by value
      return a-b
//           return b > a ? -1 : b === a ? 0 : 1

    }).join('')

//     return val
    return Number.parseInt(val)
  }
}

class Card{
  constructor(c){
    this.card = c
    this.value = this.setValue(c[0])
    this.suit = c[1]
  }

  setValue(value){

//     const order = "23456789TJQKA"
//     return String.fromCharCode([77 - order.indexOf(value)]);

    const padding = 0;
    switch(value){
      case "T": return 10 + padding
       case "J": return 11 + padding
       case "Q": return 12 + padding
       case "K": return 13 + padding
       case "A": return 14 + padding
       default: return ( Number.parseInt(value) + padding)
    }
  }
}

PokerHand.prototype.compareWith = function(hand){
    hand1 = this
    hand2 = hand
    console.log(hand1.cards)
    console.log(hand2.cards)
    console.log(hand1.rank)
    console.log(hand2.rank)
    console.log(hand1.value)
    console.log(hand2.value)
    if(hand1.rank === hand2.rank){
    if(hand1.value > hand2.value){
      return Result.win
    }else if(hand1.value < hand2.value){
      return Result.loss
    }else{
      return Result.tie
    }
  }
  return hand1.rank < hand2.rank ? Result.win : Result.loss
}

function assert(expected, player, opponent){
  	var p = new PokerHand(player);
  	var o = new PokerHand(opponent);
  	console.log(p.compareWith(o) == expected);
}

assert(Result.loss, "4S 5H 6H TS AC", "3S 5H 6H TS AC")

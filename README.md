The goal is to create a simplistic game of Memory, where we increase the difficulty per cleared level (Adding more cards to the game)

Step 1: Create necessary data file, we will need a lot of cards which all of them uses the same "back-image", for example a "?" on the backside.
It should have a front-image, a unique ID and a boolean "matched", so we can determine a match.

The match of 2 cards should be determined by comparing the pairId's of the cards.

Example of how a card should look:

const cards = [
{
    id: 1,
    pairId: "warrior1"
    frontImage: "/images/warrior.png,
    backImage: "images/hidden.png",
    isMatched: false,
},
{
    id: 2,
    pairId: "warrior1"
    frontImage: "/images/warrior.png,
    backImage: "images/hidden.png",
    isMatched: false,
}
]

Step 2: Create a reusable card component that uses the data from cards.
it should render front and backside
should handle flipping logic
accept props such as the card data.

Step 3: Create a "game container" which gets filled with play cards depending on "level", you will need to have a level variable that increases on each level completion.

Render the card components
Contain a level variable
Increase the level after all pairs are matched
Reset the level if the player fails (i.e. runs out of attempts)
You may choose whether a failed level allows retries or resets to level 0.

Step 4: Create function to be able to start a game.
This function should make the "gameboard" appear, and fill with cards. Perhaps starting with 6 cards, and for each level increase you add 2?

Step 5: Make sure cards are put into a new array which has been randomly sorted.

Step 6: Make a function that compares the 2 cards values "pairId", and if x.pairId === y.pairId, then make cards unclickable and make sure they dont turn back again.

Step 7: Add a counter for remaining attempts, add a timer (the player should be stressed out of his mind 😈)


//Written by yours truly, mr Alexander Hallgren
### Hearthzone MK.III

The third iteration of Hearthzone, my Hearthstone deck builder app, this version utilizes React and Redux for a cleaner flow of information across the app. 

## Sign Up and Login
Sign up and login functionality is complete: users can securely create an account using password encryption provided through the bcrypt module, such that the passwords stored on the PostgreSQL database are encrypted.

## Deck Building
Users can create decks from the 'My Decks' page, and specify which of the nine classes in Hearthstone the deck is for. Users can also use the searchbar to find Hearthstone cards, taking them to the search results page that lists cards relevant to the entered search term. Clicking on one of the cards takes the user to the card details page, which displays the card's standard and golden (animated) image, the type of the card, the set that it comes from, it's rarity, and the class it corresponds with. From this page, the user can select a deck they have made via a dropdown box to add the current card to their deck. Once the card is added to the deck, if they navigate back to the deck page, the card will be visible in the deck.

![first](/public/images/deck_before.png)
![second](/public/images/search_res.png)
![third](/public/images/ooh_volcanosaur.png)
![fourth](/public/images/added.png)
![fifth](/public/images/deck_after.png)



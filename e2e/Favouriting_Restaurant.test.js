Feature('Favorite Restaurant');

Scenario('Menyukai dan membatalkan suka restoran', async ({ I }) => {
  I.amOnPage('/#/detail/rqdv5juczeskfw1e867');
  I.seeElement('.add-favorite');

  I.click('.add-favorite');
  I.see('Remove from Favorite', '.add-favorite');

  I.amOnPage('/#/favorite');
  I.seeElement('li');
  I.see('Melting Pot', '.restaurant-name');

  I.amOnPage('/#/detail/rqdv5juczeskfw1e867');
  I.click('.add-favorite');
  I.see('Add to Favorite', '.add-favorite');

  I.amOnPage('/#/favorite');
  I.dontSeeElement('li');
});

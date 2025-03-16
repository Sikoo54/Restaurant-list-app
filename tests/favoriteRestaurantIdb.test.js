import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  const restaurantData = {
    id: 'rqdv5juczeskfw1e867',
    name: 'Test Restaurant',
    city: 'Test City',
    description: 'Test Description',
    rating: 4.5,
    pictureId: '10',
  };

  afterEach(async () => {
    (await FavoriteRestaurantIdb.getAllRestaurants()).forEach(
      async (restaurant) => {
        await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
      }
    );
  });

  it('should be able to add a restaurant to the favorites', async () => {
    await FavoriteRestaurantIdb.putRestaurant(restaurantData);
    const favorite = await FavoriteRestaurantIdb.getRestaurant(
      restaurantData.id
    );

    expect(favorite).toEqual(restaurantData);
  });

  it('should return all favorite restaurants', async () => {
    await FavoriteRestaurantIdb.putRestaurant(restaurantData);
    const favoriteRestaurants = await FavoriteRestaurantIdb.getAllRestaurants();

    expect(favoriteRestaurants).toEqual([restaurantData]);
  });

  it('should remove favorite restaurant when its ID is provided', async () => {
    await FavoriteRestaurantIdb.putRestaurant(restaurantData);
    await FavoriteRestaurantIdb.deleteRestaurant(restaurantData.id);
    const favorite = await FavoriteRestaurantIdb.getRestaurant(
      restaurantData.id
    );

    expect(favorite).toBeUndefined();
  });

  it('should not add a restaurant when it does not have the required property', async () => {
    const invalidRestaurant = { name: 'Invalid Restaurant' };

    await expect(
      FavoriteRestaurantIdb.putRestaurant(invalidRestaurant)
    ).rejects.toThrowError('Restaurant must have an ID!');

    const favoriteRestaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    expect(favoriteRestaurants).not.toContainEqual(invalidRestaurant);
  });
});

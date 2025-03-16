import Favorite from '../src/scripts/views/pages/favorite';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import { fireEvent, screen, waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom'; // Import matcher tambahan untuk jest

describe('Favorite Page Test', () => {
  const restaurantData = {
    id: '1',
    name: 'Ahsan Restaurant',
    city: 'Bali',
    description: 'Lorem Ipsum',
    rating: 4.9,
    pictureId: '11',
  };

  beforeAll(() => {
    window.alert = jest.fn();
  });

  beforeEach(async () => {
    await FavoriteRestaurantIdb.putRestaurant(restaurantData);
  });

  it('should remove a restaurant from favorites when click the "Remove from Favorite" button', async () => {
    document.body.innerHTML =
      '<div id="mainContent"><div id="favoriteContainer"></div></div>';

    await Favorite.render();
    await Favorite.afterRender();

    await waitFor(() => screen.getByText('Remove from Favorite'));

    const unfavoriteButton = screen.getByText('Remove from Favorite');
    const restaurantItem = unfavoriteButton.closest('li');

    fireEvent.click(unfavoriteButton);
    await waitFor(() => {
      expect(restaurantItem).not.toBeInTheDocument();
    });
    const favoriteRestaurant = await FavoriteRestaurantIdb.getRestaurant(
      restaurantData.id
    );
    expect(favoriteRestaurant).toBeUndefined();

    expect(restaurantItem).not.toBeInTheDocument();

    const message = screen.queryByText('No favorite restaurants yet.');
    expect(message).toBeInTheDocument();
  });
});

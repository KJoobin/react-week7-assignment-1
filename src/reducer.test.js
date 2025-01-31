import reducer from './reducer';

import {
  setRegions,
  setCategories,
  setRestaurants,
  setRestaurant,
  selectRegion,
  selectCategory,
  setLoginFields,
  setAccessToken,
  clearSession,
  setReviewFields,
} from './actions';

import { clear } from './services/storage';

jest.mock('./services/storage');

describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      regions: [],
      categories: [],
      restaurants: [],
      restaurant: null,
      selectedRegion: null,
      selectedCategory: null,
      loginFields: {
        email: '',
        password: '',
      },
      reviewFields: {
        score: '',
        description: '',
      },
      accessToken: '',
    };

    it('returns initialState', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('setRegions', () => {
    it('changes regions', () => {
      const initialState = {
        regions: [],
      };

      const regions = [
        { id: 1, name: '서울' },
      ];

      const state = reducer(initialState, setRegions(regions));

      expect(state.regions).toHaveLength(1);
    });
  });

  describe('setCategories', () => {
    it('changes categories', () => {
      const initialState = {
        categories: [],
      };

      const categories = [
        { id: 1, name: '한식' },
      ];

      const state = reducer(initialState, setCategories(categories));

      expect(state.categories).toHaveLength(1);
    });
  });

  describe('setRestaurants', () => {
    it('changes restaurants', () => {
      const initialState = {
        restaurants: [],
      };

      const restaurants = [
        { id: 1, name: '마법사주방' },
      ];

      const state = reducer(initialState, setRestaurants(restaurants));

      expect(state.restaurants).toHaveLength(1);
    });
  });

  describe('setRestaurant', () => {
    it('changes restaurant', () => {
      const initialState = {
        restaurant: null,
      };

      const restaurant = { id: 1, name: '마법사주방' };

      const state = reducer(initialState, setRestaurant(restaurant));

      expect(state.restaurant.id).toBe(1);
      expect(state.restaurant.name).toBe('마법사주방');
    });
  });

  describe('selectRegion', () => {
    it('changes selected region', () => {
      const initialState = {
        regions: [
          { id: 1, name: '서울' },
        ],
        selectedRegion: null,
      };

      const state = reducer(initialState, selectRegion(1));

      expect(state.selectedRegion).toEqual({
        id: 1,
        name: '서울',
      });
    });
  });

  describe('selectCategory', () => {
    it('changes selected category', () => {
      const initialState = {
        categories: [
          { id: 1, name: '한식' },
        ],
        selectedCategory: null,
      };

      const state = reducer(initialState, selectCategory(1));

      expect(state.selectedCategory).toEqual({
        id: 1,
        name: '한식',
      });
    });
  });

  describe('setLoginFields', () => {
    it('changes email value', () => {
      const initialState = {
        loginFields: {
          email: '',
          password: '',
        },
      };

      const state = reducer(initialState, setLoginFields({ name: 'email', value: 'tester@example.com' }));

      expect(state.loginFields).toEqual({
        email: 'tester@example.com',
        password: '',
      });
    });

    it('changes password value', () => {
      const previousState = {
        loginFields: {
          email: 'tester@example.com',
          password: '',
        },
      };

      const state = reducer(previousState, setLoginFields({ name: 'password', value: 'tester' }));

      expect(state.loginFields).toEqual({
        email: 'tester@example.com',
        password: 'tester',
      });
    });
  });

  describe('setAccessToken', () => {
    const initialState = {
      accessToken: '',
    };

    it('changes access token', () => {
      const state = reducer(initialState, setAccessToken({ accessToken: 'ACCESS_TOKEN' }));

      expect(state.accessToken).toEqual('ACCESS_TOKEN');
    });
  });

  describe('clearSession', () => {
    const mockClear = jest.fn();

    clear.mockImplementation(() => mockClear);

    const initialState = {
      accessToken: 'ACCESS_TOKEN',
    };

    beforeEach(() => {
      mockClear.mockClear();
    });

    it('clears acessToken', () => {
      const state = reducer(initialState, clearSession());

      expect(state.accessToken).toEqual('');
    });

    it('calls clear storage', () => {
      reducer(initialState, clearSession());

      expect(clear).toBeCalled();
    });
  });

  describe('setReviewFields', () => {
    it('changes review value', () => {
      const initialState = {
        reviewFields: {},
      };

      const state = reducer(initialState, setReviewFields({ name: 'score', value: '5' }));

      expect(state.reviewFields).toEqual({
        score: '5',
      });
    });

    it('changes description value', () => {
      const initialState = {
        reviewFields: {
          score: '5',
        },
      };

      const state = reducer(initialState, setReviewFields({ name: 'description', value: '훌륭하다 훌륭해!' }));

      expect(state.reviewFields).toEqual({
        score: '5',
        description: '훌륭하다 훌륭해!',
      });
    });
  });
});

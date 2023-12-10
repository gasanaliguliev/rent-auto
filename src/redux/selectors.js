export const selectItems = (state) => state.cars.items;

export const selectIsLoading = (state) => state.cars.isLoading;

export const selectError = (state) => state.cars.error;

export const selectItem = (state) => state.cars.item;

export const selectFavorite = (state) => state.cars.favorite;

export const selectFilter = (state) => state.filter.filter;

export const selectCarId = (state) => state.cars.carId;

export const selectVisibleCar = (state) => {
  const items = selectItems(state);
  const filter = selectFilter(state);

  if (items.length === 0 && filter === null) {
    return items;
  }
  const normolizedFilter = filter.toLowerCase().trim();
  return items
    .flat()
    .filter((item) => item.make.toLowerCase().includes(normolizedFilter));
};

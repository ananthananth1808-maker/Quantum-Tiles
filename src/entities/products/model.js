export const productKeys = {
  all: ['products'],
  lists: () => [...productKeys.all, 'list'],
  list: (filters) => [...productKeys.lists(), { filters }],
  details: () => [...productKeys.all, 'detail'],
  detail: (id) => [...productKeys.details(), id],
  related: () => [...productKeys.all, 'related'],
  relatedByCategory: (category) => [...productKeys.related(), category],
};
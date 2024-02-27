import { faker } from '@faker-js/faker';
import { Category } from './category.model';

export const generateSingleCategory = (): Category => {
  return {
    id: faker.number.int(),
    name: faker.commerce.productName(),
  };
};

export const generateManyCategories = (size = 10): Category[] => {
  return faker.helpers.multiple(generateSingleCategory, {
    count: size,
  });
};

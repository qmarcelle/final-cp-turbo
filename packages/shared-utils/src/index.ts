import _ from 'lodash';

export const greet = (name: string): string => `Hello, ${name}!`;

export const add = (a: number, b: number): number => a + b;

export const capitalizeText = (text: string): string => {
  return _.capitalize(text);
}; 
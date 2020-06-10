/**
 * Get class
 * @param target
 */
export const getClass = (target: any): any => {
  return target.prototype ? target : target.constructor;
};

/**
 * Get class name
 */
export const getClassName = (target: any): string => {
  return typeof target === 'function' ? target.name : target.constructor.name;
};

export const isString = (target: any): boolean => {
  return typeof target === 'string';
};

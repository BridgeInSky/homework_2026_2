'use strict';

/**
 * Объединяет два массива объектов по указанному ключу.
 *
 * Если в обоих массивах есть объекты с одинаковым значением ключа,
 * они сливаются в один объект. При совпадении свойств-массивов
 * они объединяются в один массив без дубликатов.
 *
 * @param {Array<Object>} arr1 - первый массив объектов
 * @param {Array<Object>} arr2 - второй массив объектов
 * @param {string} key - имя ключа, по которому идёт объединение
 *
 * @throws {TypeError} если arr1 или arr2 не массивы
 * @throws {TypeError} если key не является непустой строкой
 *
 * @example
 * const users = [{ id: 1, name: 'Alice' }];
 * const details = [{ id: 1, age: 25 }];
 * mergeBy(users, details, 'id');
 * // [{ id: 1, name: 'Alice', age: 25 }]
 *
 * @example
 * const arr1 = [{ id: 1, tags: ['js', 'react'] }];
 * const arr2 = [{ id: 1, tags: ['react', 'node'] }];
 * mergeBy(arr1, arr2, 'id');
 * // [{ id: 1, tags: ['js', 'react', 'node'] }]
 *
 * @returns {Array<Object>} массив объединённых объектов
 */
const mergeBy = function(arr1, arr2, key) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        throw new TypeError('mergeBy: arr1 и arr2 должны быть массивами');
    }

    if (typeof key !== 'string' || key.length === 0) {
        throw new TypeError('mergeBy: key должен быть непустой строкой');
    }

    const resultMap = {};

    arr1.forEach(obj => {
        const keyValue = obj[key];

        // Пропускаем объекты без ключа
        if (keyValue === undefined) return;

        resultMap[keyValue] = { ...obj };
    });

    arr2.forEach(obj => {
        const keyValue = obj[key];

        // Пропускаем объекты без ключа
        if (keyValue === undefined) return;

        if (resultMap[keyValue]) {
            const existing = resultMap[keyValue];

            Object.entries(obj).forEach(([prop, value]) => {
                if (prop === key) return;

                if (Array.isArray(existing[prop]) && Array.isArray(value)) {
                    existing[prop] = [...new Set([...existing[prop], ...value])];
                } else {
                    existing[prop] = value;
                }
            });
        } else {
            resultMap[keyValue] = { ...obj };
        }
    });

    return Object.values(resultMap);
};

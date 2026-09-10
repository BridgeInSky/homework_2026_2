/**
 * Объединяет два массива объектов по указанному ключу
 * 
 * @param {Array<Object>} arr1 - первый массив объектов
 * @param {Array<Object>} arr2 - второй массив объектов
 * @param {string} key - ключ для объединения объектов
 * 
 * @returns {Array<Object>} массив объединенных объектов
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
 */
const mergeBy = function(arr1, arr2, key) {
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
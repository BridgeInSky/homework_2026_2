/**
 * Дополнительные тесты для функции mergeBy
 * @module mergeBy-extra
 */

QUnit.module('Дополнительные тесты для mergeBy', function() {
    
    QUnit.test('Объединяет объекты с одинаковыми ключами', function(assert) {
        const arr1 = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' }
        ];
        const arr2 = [
            { id: 1, age: 25 },
            { id: 3, age: 30 }
        ];
        const expected = [
            { id: 1, name: 'Alice', age: 25 },
            { id: 2, name: 'Bob' },
            { id: 3, age: 30 }
        ];
        
        assert.deepEqual(mergeBy(arr1, arr2, 'id'), expected);
    });
    
    QUnit.test('Объединяет массивы без дубликатов', function(assert) {
        const arr1 = [{ id: 1, tags: ['js', 'react', 'vue'] }];
        const arr2 = [{ id: 1, tags: ['react', 'angular', 'vue'] }];
        const expected = [{ id: 1, tags: ['js', 'react', 'vue', 'angular'] }];
        
        assert.deepEqual(mergeBy(arr1, arr2, 'id'), expected);
    });
    
    QUnit.test('Объединяет несколько массивов в одном объекте', function(assert) {
        const arr1 = [{ id: 1, tags: ['js', 'react'], scores: [10, 20] }];
        const arr2 = [{ id: 1, tags: ['react', 'node'], scores: [20, 30] }];
        const expected = [
            { id: 1, tags: ['js', 'react', 'node'], scores: [10, 20, 30] }
        ];
        
        assert.deepEqual(mergeBy(arr1, arr2, 'id'), expected);
    });
    
    QUnit.test('Работает с пустыми массивами', function(assert) {
        const data = [{ id: 1, name: 'Alice' }];
        
        assert.deepEqual(mergeBy([], data, 'id'), data);
        assert.deepEqual(mergeBy(data, [], 'id'), data);
        assert.deepEqual(mergeBy([], [], 'id'), []);
    });
    
    QUnit.test('Не изменяет исходные массивы', function(assert) {
        const arr1 = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
        const arr2 = [{ id: 1, age: 25 }, { id: 3, age: 30 }];
        
        const copy1 = JSON.parse(JSON.stringify(arr1));
        const copy2 = JSON.parse(JSON.stringify(arr2));
        
        mergeBy(arr1, arr2, 'id');
        
        assert.deepEqual(arr1, copy1);
        assert.deepEqual(arr2, copy2);
    });
    
    QUnit.test('Работает с разными типами ключей', function(assert) {
        const arr1 = [{ name: 'Alice', age: 25 }];
        const arr2 = [{ name: 'Alice', city: 'Moscow' }];
        const expected = [{ name: 'Alice', age: 25, city: 'Moscow' }];
        
        assert.deepEqual(mergeBy(arr1, arr2, 'name'), expected);
    });
});
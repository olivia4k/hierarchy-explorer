const employees = require('../src/employees');

describe('transformTree', () => {
  test('transforms a tree with subordinates into a flattened map', () => {
    const inputTree = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      subordinates: [
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          subordinates: [
            {
              id: 3,
              firstName: 'Bob',
              lastName: 'Johnson',
            },
          ],
        },
      ],
    };

    const expectedOutput = new Map([
      [1, { id: 1, firstName: 'John', lastName: 'Doe', supervisor: [], subordinates: [2] }],
      [2, { id: 2, firstName: 'Jane', lastName: 'Smith', supervisor: [1], subordinates: [3] }],
      [3, { id: 3, firstName: 'Bob', lastName: 'Johnson', supervisor: [1, 2], subordinates: [] }],
    ]);

    expect(employees.getEmployeeMap(inputTree)).toEqual(expectedOutput);
  });

  test('handles a tree without subordinates', () => {
    const inputTree = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
    };

    const expectedOutput = new Map([
      [1, { id: 1, firstName: 'John', lastName: 'Doe', supervisor: [], subordinates: [] }],
    ]);

    expect(employees.getEmployeeMap(inputTree)).toEqual(expectedOutput);
  });
});

describe('getNameById', () => {
  test('returns empty string if id is falsy', () => {
    const result = employees.getNameById(
      null,
      new Map([[1, { firstName: 'John', lastName: 'Doe' }]])
    );
    expect(result).toBe('');
  });

  test('returns empty string if employeesMap is falsy', () => {
    const result = employees.getNameById(1, null);
    expect(result).toBe('');
  });

  test('returns empty string if employee not found in employeesMap', () => {
    const result = employees.getNameById(2, new Map([[1, { firstName: 'John', lastName: 'Doe' }]]));
    expect(result).toBe('');
  });

  test('returns full name from employeesMap', () => {
    const result = employees.getNameById(1, new Map([[1, { firstName: 'John', lastName: 'Doe' }]]));
    expect(result).toBe('John Doe');
  });
});

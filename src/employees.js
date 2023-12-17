/**
 * Constructs a hierarchical employee map based on the provided employee tree.
 *
 * @param {Object} tree - The root of the employee tree.
 * @property {string} tree.id - The unique identifier of the employee.
 * @property {string} tree.firstName - The first name of the employee.
 * @property {string} tree.lastName - The last name of the employee.
 * @property {Object[]} tree.subordinates - An array of subordinate employees.
 *
 * @returns {Map} - A Map representing the hierarchical employee structure.
 *                  Each key is an employee ID, and the corresponding value is an object
 *                  containing employee details along with supervisor and subordinate relationships.
 *                  The structure of the value object:
 *                    - firstName: The first name of the employee.
 *                    - lastName: The last name of the employee.
 *                    - id: The unique identifier of the employee.
 *                    - supervisor: An array of supervisor IDs.
 *                    - subordinates: An array of subordinate IDs.
 */
function getEmployeeMap(tree) {
  // Initialize a Map to store the hierarchical employee information
  const result = new Map();

  // Add the root employee to the Map
  result.set(tree.id, {
    firstName: tree.firstName,
    lastName: tree.lastName,
    id: tree.id,
    supervisor: [],
    subordinates: [],
  });

  /**
   * Recursively traverse the employee tree and populate the Map.
   *
   * @param {Object} employee - The current employee being processed.
   */
  function traverse(employee) {
    const id = employee.id;

    // Check if the employee has subordinates
    if (!employee.subordinates) {
      return;
    }

    // Iterate through the subordinates and update the Map
    for (const subordinate of employee.subordinates) {
      // Update the subordinates array of the current employee
      result.get(id).subordinates.push(subordinate.id);

      // Create a new entry for the subordinate in the Map
      // Employee information is stored in an object according to the requirements
      result.set(subordinate.id, {
        firstName: subordinate.firstName,
        lastName: subordinate.lastName,
        id: subordinate.id,
        supervisor: result.get(id).supervisor.concat(id),
        subordinates: [],
      });

      // Recursively traverse the subordinate's subtree
      traverse(subordinate);
    }
  }

  // Start the traversal from the root of the employee tree
  traverse(tree);

  // Return the populated Map representing the hierarchical employee structure
  return result;
}

/**
 * Retrieves the full name of an employee based on their unique identifier from an employee map.
 *
 * @param {string} id - The unique identifier of the employee.
 * @param {Map} employeesMap - A Map containing employee details with unique identifiers as keys.
 *   Each value in the Map is an object with properties:
 *     - firstName: The first name of the employee.
 *     - lastName: The last name of the employee.
 *
 * @returns {string} - The full name of the employee (concatenation of first name and last name).
 *   Returns an empty string if the provided ID is falsy, the employeesMap is falsy,
 *   or if there is no corresponding employee with the given ID in the map.
 */
function getNameById(id, employeesMap) {
  // Check for falsy values and ensure the employee exists in the map
  if (!id || !employeesMap || !employeesMap.get(id)) {
    return '';
  }

  // Retrieve the employee's first and last names from the map
  const firstName = employeesMap.get(id).firstName;
  const lastName = employeesMap.get(id).lastName;

  // Concatenate the first and last names to form the full name
  const fullName = firstName + ' ' + lastName;

  // Return the full name of the employee
  return fullName;
}

module.exports = { getEmployeeMap, getNameById };

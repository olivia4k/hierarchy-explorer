import { useState, useEffect } from 'react';
import './App.css';
import employeesTree from './data/employee-structure.json';
import { getEmployeeMap, getNameById } from './employees.js';

/**
 * The main application component that renders the Check the hierarchy.
 *
 * @returns {JSX.Element} - A React JSX element representing the App component.
 */
function App() {
  const [currentEmployee, setCurrentEmployee] = useState('');
  const [employeesMap, setEmployeesMap] = useState('');

  // Effect hook to initialize the employee map when the component mounts
  useEffect(() => {
    setEmployeesMap(getEmployeeMap(employeesTree));
  }, []);

  return (
    <div className='app'>
      <Header />
      <div className='employee-container'>
        <Employees
          employeesMap={employeesMap}
          currentEmployee={currentEmployee}
          setCurrentEmployee={setCurrentEmployee}
        />
        <HierarchyTree
          employeesMap={employeesMap}
          currentEmployee={currentEmployee}
        />
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className='header'>
      <h1>Check the hierarchy</h1>
    </header>
  );
}

/**
 * Displays a dropdown list of employees based on the provided employee map.
 *
 * @param {Object} props - The component's properties.
 * @property {Map} props.employeesMap - Map containing employee details with unique identifiers as keys.
 * @property {function} props.setCurrentEmployee - A function to set the currently selected employee.
 * @property {string} props.currentEmployee - The unique identifier of the currently selected employee.
 *
 * @returns {JSX.Element} - A React JSX element representing the Employees component.
 */
function Employees({ employeesMap, setCurrentEmployee, currentEmployee }) {
  return (
    <div>
      <select
        value={currentEmployee}
        onChange={(e) => {
          setCurrentEmployee(e.target.value);
        }}>
        <option
          value=''
          disabled>
          Select an employee
        </option>
        {[...employeesMap].map(([key, value]) => (
          <option
            className={`${currentEmployee === key ? 'active' : ' '}`}
            key={key}
            value={key}>
            {getNameById(key, employeesMap)}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * Displays a hierarchy tree showing the supervisors of the currently selected employee.
 *
 * @param {Object} props - The component's properties.
 * @property {string} props.currentEmployee - The unique identifier of the currently selected employee.
 * @property {Map} props.employeesMap - Map containing employee details with unique identifiers as keys.
 *
 * @returns {JSX.Element} - A React JSX element representing the HierarchyTree component.
 */
function HierarchyTree({ currentEmployee, employeesMap }) {
  let supervisorsLists = [];

  if (currentEmployee) {
    supervisorsLists = employeesMap.get(currentEmployee).supervisor;
  }

  return (
    <div>
      <ul>
        {supervisorsLists.map((item, index) => (
          <li key={index}>
            {getNameById(item, employeesMap)}
            <div className='arrow'>🡫</div>
          </li>
        ))}
        <li className='special'>{getNameById(currentEmployee, employeesMap)}</li>
      </ul>
    </div>
  );
}

export default App;

'use client';
/* App.tsx */
import React, { useState } from 'react';
import dummyData from './data';
import { Fruit } from './types';

function App() {
  const [fruits, setFruits] = useState<Fruit[]>(dummyData);
  const [newFruit, setNewFruit] = useState<Fruit>({ id: 0, name: '', description: '', color: '' });
  const [filter, setFilter] = useState<string>('');
  const [editItemId, setEditItemId] = useState<number | null>(null);

  const handleCreate = (name: string, color: string) => {
    if (name.trim() === '' || color.trim() === '') {
      return;
    }

    if (editItemId !== null) {
      setFruits((prevFruits) =>
        prevFruits.map((fruit) =>
          fruit.id === editItemId ? { ...fruit, name, color } : fruit
        )
      );
      setEditItemId(null);
    } else {
      setFruits([...fruits, { ...newFruit, id: fruits.length + 1, name, color }]);
    }

    setNewFruit({ id: 0, name: '', description: '', color: '' });
  };

  const handleEdit = (id: number, updatedFruit: Fruit) => {
    setNewFruit(updatedFruit);
    setEditItemId(id);
  };

  const handleDelete = (id: number) => {
    setFruits((prevFruits) => prevFruits.filter((fruit) => fruit.id !== id));
  };

  const filteredFruits = fruits.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className='container'>
    <div className="create">
      <h1>Fruit CRUD App</h1>
      <form>
        <input
          type="text"
          value={newFruit.name}
          onChange={(e) => setNewFruit({ ...newFruit, name: e.target.value })}
          placeholder="Enter name"
        />
        <input
          type="text"
          value={newFruit.color}
          onChange={(e) => setNewFruit({ ...newFruit, color: e.target.value })}
          placeholder="Enter color"
        />
        <button
          type="button"
          onClick={() => handleCreate(newFruit.name, newFruit.color)}
          className={editItemId !== null ? 'button-update' : ''}
        >
          {editItemId !== null ? 'Update' : 'Create'}
        </button>
      </form>
      </div>
      <div className="App" >
      <label>Filter by Name:</label>
      <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Color</th>
            <th>Actions</th>
          </tr>
        </thead>
<tbody>
  {filteredFruits.map((item) => (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td style={{ color: item.color }}>{item.color}</td>
      <td>
        <button className='tButton' onClick={() => handleEdit(item.id, item)}>Edit</button>
        <button className='tButton' onClick={() => handleDelete(item.id)}>Delete</button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const EventPriceCalculator = ({ event }) => {
  const { services } = useSelector((state) => state.services);
  const [selectedServices, setSelectedServices] = useState([]);
  const [customItems, setCustomItems] = useState([]);
  const [newCustomItem, setNewCustomItem] = useState({
    name: '',
    price: '',
    description: ''
  });

  const handleServiceSelect = (serviceId) => {
    const service = services.find(s => s._id === serviceId);
    if (service) {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleAddCustomItem = () => {
    if (newCustomItem.name && newCustomItem.price) {
      setCustomItems([...customItems, newCustomItem]);
      setNewCustomItem({ name: '', price: '', description: '' });
    }
  };

  const handleRemoveService = (index) => {
    const updated = [...selectedServices];
    updated.splice(index, 1);
    setSelectedServices(updated);
  };

  const handleRemoveCustomItem = (index) => {
    const updated = [...customItems];
    updated.splice(index, 1);
    setCustomItems(updated);
  };

  const calculateTotal = () => {
    const servicesTotal = selectedServices.reduce((sum, s) => sum + parseFloat(s.price || 0), 0);
    const customTotal = customItems.reduce((sum, i) => sum + parseFloat(i.price || 0), 0);
    return (servicesTotal + customTotal).toFixed(2);
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-medium mb-4">Price Calculator</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Add Services</label>
        <select
          onChange={(e) => handleServiceSelect(e.target.value)}
          className="w-full p-2 border rounded"
          value=""
        >
          <option value="">Select a service</option>
          {services.map(s => (
            <option key={s._id} value={s._id}>
              {s.name} - ${s.price}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Add Custom Item</label>
        <div className="grid grid-cols-3 gap-2">
          <input
            type="text"
            placeholder="Item name"
            value={newCustomItem.name}
            onChange={(e) => setNewCustomItem({...newCustomItem, name: e.target.value})}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={newCustomItem.price}
            onChange={(e) => setNewCustomItem({...newCustomItem, price: e.target.value})}
            className="p-2 border rounded"
          />
          <button
            onClick={handleAddCustomItem}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Selected Items</h4>
        <div className="space-y-2">
          {selectedServices.map((service, i) => (
            <div key={`service-${i}`} className="flex justify-between items-center p-2 bg-white rounded shadow">
              <span>{service.name}</span>
              <div className="flex items-center gap-2">
                <span>${service.price}</span>
                <button 
                  onClick={() => handleRemoveService(i)}
                  className="text-red-500"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
          {customItems.map((item, i) => (
            <div key={`custom-${i}`} className="flex justify-between items-center p-2 bg-white rounded shadow">
              <span>{item.name}</span>
              <div className="flex items-center gap-2">
                <span>${item.price}</span>
                <button 
                  onClick={() => handleRemoveCustomItem(i)}
                  className="text-red-500"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
        <span className="font-medium">Total Estimate:</span>
        <span className="font-bold">${calculateTotal()}</span>
      </div>
    </div>
  );
};

export default EventPriceCalculator;

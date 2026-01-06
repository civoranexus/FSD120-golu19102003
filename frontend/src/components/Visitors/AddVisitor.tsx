import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

interface Companion {
  name: string;
  age?: number;
  relation?: string;
}

const AddVisitor: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    purpose: 'personal',
    purposeDetails: '',
    expectedArrival: '',
    expectedDeparture: '',
    vehicleNumber: '',
    idProofType: '',
    idProofNumber: '',
    notes: '',
    companions: [] as Companion[]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCompanionChange = (index: number, field: keyof Companion, value: string | number | undefined) => {
    const updatedCompanions = [...formData.companions];
    updatedCompanions[index] = { ...updatedCompanions[index], [field]: value };
    setFormData(prev => ({ ...prev, companions: updatedCompanions }));
  };

  const addCompanion = () => {
    setFormData(prev => ({
      ...prev,
      companions: [...prev.companions, { name: '', age: undefined, relation: '' }]
    }));
  };

  const removeCompanion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      companions: prev.companions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const visitorData = {
        ...formData,
        idProof: formData.idProofType ? {
          type: formData.idProofType,
          number: formData.idProofNumber
        } : undefined
      };

      await axios.post('/visitors', visitorData);
      navigate('/visitors');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create visitor request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Visitor</h1>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Visitor Basic Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Visitor Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  pattern="[6-9][0-9]{9}"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="9876543210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Number
                </label>
                <input
                  type="text"
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="MH12AB1234"
                />
              </div>
            </div>
          </div>

          {/* Visit Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Visit Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purpose of Visit *
                </label>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="personal">Personal Visit</option>
                  <option value="delivery">Delivery</option>
                  <option value="service">Service/Maintenance</option>
                  <option value="business">Business</option>
                  <option value="emergency">Emergency</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Arrival *
                </label>
                <input
                  type="datetime-local"
                  name="expectedArrival"
                  value={formData.expectedArrival}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Departure
                </label>
                <input
                  type="datetime-local"
                  name="expectedDeparture"
                  value={formData.expectedDeparture}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Purpose Details
              </label>
              <textarea
                name="purposeDetails"
                value={formData.purposeDetails}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Additional details about the visit..."
              />
            </div>
          </div>

          {/* ID Proof (Optional) */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">ID Proof (Optional)</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID Proof Type
                </label>
                <select
                  name="idProofType"
                  value={formData.idProofType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select ID Type</option>
                  <option value="aadhaar">Aadhaar Card</option>
                  <option value="pan">PAN Card</option>
                  <option value="driving_license">Driving License</option>
                  <option value="voter_id">Voter ID</option>
                  <option value="passport">Passport</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID Proof Number
                </label>
                <input
                  type="text"
                  name="idProofNumber"
                  value={formData.idProofNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter ID number"
                />
              </div>
            </div>
          </div>

          {/* Companions */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Companions</h2>
              <button
                type="button"
                onClick={addCompanion}
                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                Add Companion
              </button>
            </div>

            {formData.companions.map((companion, index) => (
              <div key={index} className="border border-gray-200 rounded p-3 mb-3">
                <div className="flex justify-between items-start">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
                    <input
                      type="text"
                      placeholder="Name"
                      value={companion.name}
                      onChange={(e) => handleCompanionChange(index, 'name', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Age"
                      value={companion.age || ''}
                      onChange={(e) => handleCompanionChange(index, 'age', e.target.value ? parseInt(e.target.value) : undefined)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Relation"
                      value={companion.relation || ''}
                      onChange={(e) => handleCompanionChange(index, 'relation', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCompanion(index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {formData.companions.length === 0 && (
              <div className="text-gray-500 text-center py-4">
                No companions added. Click "Add Companion" to add visitors accompanying the main visitor.
              </div>
            )}
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any additional information about the visitor..."
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/visitors')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Visitor Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVisitor;

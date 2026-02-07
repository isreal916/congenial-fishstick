import React, { useState } from 'react';
import supabase from '../utils/supabase';

import './App.css';




function App() {
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    fullname: '',
    membership: '',
    status: '',
    phone: '',
    address: '',
    qualifications: '',
    serviceinstitute: '',
    serviceother: '',
    awards: '',
    hobbies: '',
    otherinfo: '',
    sponsor1: '',
    sponsor1no: '',
    sponsor2: '',
    sponsor2no: '',
    chairman: '',
    district: '',
    taxfile: ''
  });

  const totalSteps = 6;

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    console.log(formData);
    
  };

  // Submit to Supabase
  const submitToSupabase = async () => {
    setLoading(true);
    setError('');

    const submissionData = {
      ...formData,
      submitted_at: new Date().toISOString(),
      status: 'pending'
    };

    try {
      const { data, error: submitError } = await supabase
        .from('nominations')
        .insert([submissionData])
        .select();

      if (submitError) throw submitError;

      setSuccess(true);
    } catch (err) {
      setError('Submission failed: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Next step handler
  const nextStep = () => {
    if (current < totalSteps - 1) {
      setCurrent(current + 1);
      setError('');
    } else {
      submitToSupabase();
    }
  };

  // Previous step handler
  const prevStep = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setError('');
    }
  };

  const progressWidth = ((current + 1) / totalSteps) * 100;

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h3 className="text-center">2025 Council Election Nomination Portal</h3>

        <div className="progress my-4">
          <div 
            className="progress-bar" 
            style={{ width: `${progressWidth}%` }}
          ></div>
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {!success ? (
          <form>
            {/* STEP 1: Personal Details */}
            {current === 0 && (
              <div className="step active">
                <h4>Personal Details</h4>

                <label htmlFor="fullname">Full Name</label>
                <input
                  id="fullname"
                  type="text"
                  className="form-control mb-2"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="membership">Membership Number</label>
                <input
                  id="membership"
                  type="text"
                  className="form-control mb-2"
                  name="membership"
                  value={formData.membership}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="status">Membership Status</label>
                <input
                  id="status"
                  type="text"
                  className="form-control mb-2"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  className="form-control mb-2"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="address">Contact Address</label>
                <textarea
                  id="address"
                  className="form-control mb-2"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            )}

            {/* STEP 2: Academic & Professional */}
            {current === 1 && (
              <div className="step active">
                <h4>Academic & Professional</h4>

                <label htmlFor="qualifications">Qualifications</label>
                <textarea
                  id="qualifications"
                  className="form-control mb-2"
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleChange}
                  required
                ></textarea>

                <label htmlFor="serviceInstitute">Service to Institute</label>
                <textarea
                  id="serviceinstitute"
                  className="form-control mb-2"
                  name="serviceinstitute"
                  value={formData.serviceinstitute}
                  onChange={handleChange}
                  required
                ></textarea>

                <label htmlFor="serviceOther">Service to Other Bodies</label>
                <textarea
                  id="serviceother"
                  className="form-control mb-2"
                  name="serviceother"
                  value={formData.serviceother}
                  onChange={handleChange}
                  required
                ></textarea>

                <label htmlFor="awards">Awards</label>
                <textarea
                  id="awards"
                  className="form-control mb-2"
                  name="awards"
                  value={formData.awards}
                  onChange={handleChange}
                  required
                ></textarea>

                <label htmlFor="hobbies">Hobbies</label>
                <textarea
                  id="hobbies"
                  className="form-control mb-2"
                  name="hobbies"
                  value={formData.hobbies}
                  onChange={handleChange}
                  required
                ></textarea>

                <label htmlFor="otherInfo">Other Relevant Information (max 200 words)</label>
                <textarea
                  id="otherinfo"
                  className="form-control mb-2"
                  name="otherinfo"
                  value={formData.otherinfo}
                  onChange={handleChange}
                  maxLength="200"
                  required
                ></textarea>
              </div>
            )}

            {/* STEP 3: Sponsors */}
            {current === 2 && (
              <div className="step active">
                <h4>Sponsors</h4>

                <label htmlFor="sponsor1">Sponsor 1 Name</label>
                <input
                  id="sponsor1"
                  className="form-control mb-2"
                  name="sponsor1"
                  value={formData.sponsor1}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="sponsor1no">Sponsor 1 Membership Number</label>
                <input
                  id="sponsor1no"
                  className="form-control mb-2"
                  name="sponsor1no"
                  value={formData.sponsor1no}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="sponsor2">Sponsor 2 Name</label>
                <input
                  id="sponsor2"
                  className="form-control mb-2"
                  name="sponsor2"
                  value={formData.sponsor2}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="sponsor2no">Sponsor 2 Membership Number</label>
                <input
                  id="sponsor2no"
                  className="form-control mb-2"
                  name="sponsor2no"
                  value={formData.sponsor2no}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {/* STEP 4: District Society */}
            {current === 3 && (
              <div className="step active">
                <h4>District Society</h4>

                <label htmlFor="chairman">District Chairman Name</label>
                <input
                  id="chairman"
                  className="form-control mb-2"
                  name="chairman"
                  value={formData.chairman}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="district">District Society</label>
                <select
                  id="district"
                  className="form-select mb-2"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select District</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Abuja">Abuja</option>
                  <option value="Ibadan">Ibadan</option>
                </select>
              </div>
            )}

            {/* STEP 5: Tax Clearance */}
            {current === 4 && (
              <div className="step active">
                <h4>Tax Clearance</h4>

                <label htmlFor="taxfile">Tax Document Reference</label>
                <input
                  id="taxfile"
                  className="form-control mb-2"
                  name="taxfile"
                  value={formData.taxfile}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {/* STEP 6: Review & Submit */}
            {current === 5 && (
              <div className="step active">
                <h4>Review & Submit</h4>
                <p>Please confirm all details before submission.</p>
              </div>
            )}

            <div className="d-flex justify-content-between mt-4">
              {current > 0 && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={prevStep}
                  disabled={loading}
                >
                  Back
                </button>
              )}
              
              <button
                type="button"
                className="btn btn-primary"
                onClick={nextStep}
                disabled={loading}
              >
                {loading ? 'Submitting...' : current === totalSteps - 1 ? 'Submit' : 'Next'}
              </button>
            </div>
          </form>
        ) : (
          <div className="alert alert-success mt-3">
            Submission Successful!
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
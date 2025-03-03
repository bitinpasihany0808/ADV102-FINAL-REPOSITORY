import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function UpdateForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const contactId = new URLSearchParams(location.search).get('id');

  const [data, setData] = useState({
    id: '',
    name: '',
    contact: '',
    email: '',
    address: '',
  });

  useEffect(() => {
    if (contactId) {
      fetch(`http://localhost/Cntct-master/Backend_Components/PHP/crudcontact/fetchContact.php?id=${contactId}`)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            const contactData = data[0];
            setData({
              id: contactData.form_id,
              name: contactData.contact_name,
              contact: contactData.contact_number,
              email: contactData.contact_email,
              address: contactData.contact_address,
            });
          }
        })
        .catch(error => console.log(error));
    }
  }, [contactId]);

  async function updateContactDataHandler(data) {
    if (data.name === '') {
      alert('Please enter Full Name');
      return;
    }
    if (data.contact === '') {
      alert('Please enter Contact Number');
      return;
    }
    if (data.email === '') {
      alert('Please enter Email Address');
      return;
    }
    if (data.address === '') {
      alert('Please enter Address');
      return;
    }
  
    try {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      const url = `http://localhost/Cntct-master/Backend_Components/PHP/crudcontact/updateContact.php?id=${data.id}`;
  
      const response = await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data),
      });
  
      const responseData = await response.json();
      console.log(responseData);
  
      if (response.ok) {
        alert(responseData[0].Message);
        if (window.confirm('Do you want to Proceed to Contact Manager?')) {
          navigate('/Manager');
        }
      } else {
        alert('Failed to update contact information');
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred while updating contact information');
    }
  }
  
  


  return (
    <>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Update Contact</h2>
          </div>
          <form className="mt-8 space-y-6">
            <div className="rounded-full bg-gray-100 h-32 w-32 mx-auto mb-4">
              <img
                className="object-cover rounded-full w-full h-full"
                src="https://www.citypng.com/public/uploads/preview/png-round-blue-contact-user-profile-icon-11639786938sxvzj5ogua.png"
                alt="profile"
              />
            </div>
            <div className="center rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
                <label htmlFor="full_name" className="block text-gray-700 font-bold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="full_name"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                  value={data.name}
                  onChange={(e) => {
                    setData((prevData) => ({ ...prevData, name: e.target.value }));
                  }}
                />
              </div>
              <div className="pt-4 mb-4">
                <label
                  htmlFor="contact_number"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contact_number"
                  name="contact_number"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                  placeholder="Contact Number"
                  value={data.contact}
                  onChange={(e) => {
                    setData((prevData) => ({ ...prevData, contact: e.target.value }));
                  }}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  value={data.email}
                  onChange={(e) => {
                    setData((prevData) => ({ ...prevData, email: e.target.value }));
                  }}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
                  Address
                </label>
                <textarea
                  id="address"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                  placeholder="Address"
                  value={data.address}
                  onChange={(e) => {
                    setData((prevData) => ({ ...prevData, address: e.target.value }));
                  }}
                />
              </div>
            </div>
            <div>
              <button
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                onClick={() => updateContactDataHandler(data)} 
              >
                Update Contact
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}


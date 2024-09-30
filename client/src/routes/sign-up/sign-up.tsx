import React, { useState } from 'react';

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [nationality, setNationality] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [job, setJob] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [role, setRole] = useState<string>('tourist'); 


  const getAge = (dob: string): number => {
    const todaysdate = new Date();
    const birthday = new Date(dob);
    const monthdiff= todaysdate.getMonth() - birthday.getMonth();
    let age = todaysdate.getFullYear() - birthday.getFullYear();
    if (monthdiff < 0 || (monthdiff === 0 && todaysdate.getDate() < birthday.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (dob && getAge(dob) < 18) {
        setError('You must be above 18 years old to register.');
      }
    else {
      setError('');


      // INSERT FORM VALIDATION HERE
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url('src/assets/mtn.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white rounded-lg shadow-2xl w-1/2 h-1/2 grid grid-cols-1 overflow-hidden backdrop-blur-md bg-opacity-70">
        <div className="flex flex-col justify-center items-center p-12 space-y-8">
          <div className="flex flex-col items-center">
            <img
              src="src/assets/logo.png"
              alt="Logo"
              className="w-50 h-50 mb-7 object-contain"
            />
            <h2 className="text-5xl font-extrabold text-purple-600 mb-4 text-center leading-snug">
              Register Account
            </h2>
            <hr className="w-full border-t-2 border-purple-500 mb-6" />
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-6 pb-8">
           
            <div>
              <label className="block text-gray-700 font-semibold text-lg mb-2">Role</label>
              <select
                title="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200"
              >
                <option value="tourist">Tourist</option>
                <option value="tourguide">Tour Guide</option>
                <option value="advertiser">Advertiser</option>
                <option value="seller">Seller</option>
              </select>
            </div>

            {role === 'tourist' && (
              <>
                <div>
                  <label className="block text-gray-700 font-semibold text-lg mb-2">Email</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold text-lg mb-2">Username</label>
                  <input
                    required
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200"
                    placeholder="Enter your username"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold text-lg mb-2">Password</label>
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200"
                    placeholder="Enter your password"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold text-lg mb-2">Mobile Number</label>
                  <input
                    required
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200"
                    placeholder="Enter your mobile number"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold text-lg mb-2">Nationality</label>
                  <input
                    required
                    type="text"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200"
                    placeholder="Enter your nationality"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold text-lg mb-2">Date of Birth</label>
                  <input
                    title="DOB"
                    required
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold text-lg mb-2">Job</label>
                  <input
                    required
                    type="text"
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200"
                    placeholder="Enter your job"
                  />
                </div>
              </>
            )}

            {role !== 'tourist' && (
              <>
                <div>
                  <label className="block text-gray-700 font-semibold text-lg mb-2">Username</label>
                  <input
                    required
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200"
                    placeholder="Enter your username"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold text-lg mb-2">Email</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold text-lg mb-2">Password</label>
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-200"
                    placeholder="Enter your password"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-transform duration-200 transform hover:scale-105 shadow-lg"
            >
              Register
            </button>
            {error && (
              <p className="text-red-500 text-center mt-4">
                {error}
              </p>
            )}
            <div className="text-center ">
              Already have an account? <a href="/" className="text-purple-700 hover:text-purple-600 underline">Sign In</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
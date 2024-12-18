import { useState, useEffect } from "react";
import axios from "axios";
import { TouristProfileData } from "../routes/_app/Tourist/tourist_profile/tourist_profile_data";

// interface UserProfileInfo {
//   username: string;
//   email: string;
//   password: String,
//   mobileNumber: String,
//   dateOfBirth:Date,
//   nationality: String,
//   Occupation: String,
//   wallet: Number
// }

const readTouristProfile = (username: string | undefined) => {
  const [user, setUser] = useState<TouristProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const ReadProfile = async () => {
      try {
        const response = await axios.get(`/traventure/api/tourist/${username}`);

        setUser(response.data);
      } catch (err) {
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    ReadProfile();
  }, [username]);

  return { user, loading, error };
};

export default readTouristProfile;

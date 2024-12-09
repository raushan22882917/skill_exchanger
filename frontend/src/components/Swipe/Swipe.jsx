import UserProfileCard from "./UserProfileCard";
import Axios from 'axios';
import { defaultUser } from "../utils/defaultUser";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../utils/AlertProvider';
import { useLoading } from "../utils/LoadingProvider";

Axios.defaults.withCredentials = true;

export default function Swipe() {
  const [currProfile, setCurrProfile] = useState({ ...defaultUser });
  const [potentials, setPotentials] = useState([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const { alert, setAlert } = useAlert();
  const { setIsLoading } = useLoading();

  function showNext() {
    console.log(`index = ${index}, list length = ${potentials.length}`);
    if (potentials.length === 0 || index >= potentials.length) {
      console.log("No more potential matches.");
      setAlert({
        message: "Reached the end of potential matches.",
        type: "info",
      });
      setCurrProfile(defaultUser);
      navigate("/user/profile");
    } else {
      console.log(`Showing profile: ${potentials[index].username}`);
      setCurrProfile(potentials[index]);
      setIndex(index + 1);
    }
  }

  useEffect(() => {
    async function handleFetch() {
      setIsLoading(true);
      try {
        const response = await Axios.get(`${import.meta.env.VITE_BACKEND_URL}swipe`);
        if (response.status === 200) {
          console.log("Potential matches:", response.data);
          setPotentials(response.data.potentialMatchesBySkills || []);
        } else {
          throw new Error("Unexpected response status.");
        }
      } catch (err) {
        console.error("Fetching matches failed:", err.message);
        setAlert({
          message: err.response?.data?.message || "Error fetching matches.",
          type: "error",
        });
        navigate("/user/login");
      } finally {
        setIsLoading(false);
      }
    }

    handleFetch();
  }, []);

  useEffect(() => {
    if (potentials.length > 0) showNext();
  }, [potentials]);

  return (
    <div className="flex items-center justify-center">
      {potentials.length > 0 && currProfile.username ? (
        <UserProfileCard currProfile={currProfile} showNext={showNext} />
      ) : (
        <div className="flex items-center justify-center h-screen text-center text-gray-500 dark:text-gray-400 py-4">
          You have run out of potential matches! Come again later or update your skills & interests.
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import TourGuideProfile from "./tourguide_profile";
import { useParams } from "react-router-dom";
import { ITourGuide } from "./ITourGuide";
import { useGetTourGuide } from "../../../custom_hooks/tourGuideGetUpdate";

export const TourGuide_Profile = () => {
  const { username } = useParams();
  const { user, loading, error } = useGetTourGuide(username);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>${error}</div>;
  if (!user) return <div>No user found</div>;
  return <TourGuideProfile tourGuide={user as ITourGuide}></TourGuideProfile>;
};

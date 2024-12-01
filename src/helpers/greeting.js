import { user } from "../data/user";

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning, " + user.name + "!";
  if (hour < 18) return "Good afternoon, " + user.name + "!";
  return "Good evening, " + user.name + "!";
};

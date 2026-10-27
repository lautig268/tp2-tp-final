import registerUser from "./registerUser.js";
import loginUser from "./loginUser.js";
import getProfile from "./getProfile.js";

function makeAuthUseCases(deps) {
  return {
    register: (data) => registerUser(data, deps),
    login: (data) => loginUser(data, deps),
    getProfile: (actor) => getProfile(actor, deps),
  };
}

export default makeAuthUseCases;
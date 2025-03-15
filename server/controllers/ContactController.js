import User from "../models/UserModel.js";

// Search contacts by name or email
export const search = async (request, response, next) => {
  try {
    const { searchTerms } = request.body;
    const loggedInUserId = request.userId; // Get logged-in user ID from request

    if (!searchTerms.trim()) {
      return response.status(400).json({ message: "Search term is required" });
    }

    const regex = new RegExp(searchTerms, "i"); // Case-insensitive search

    const users = await User.find({
      _id: { $ne: loggedInUserId }, // Exclude logged-in user
      $or: [
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } },
        { email: { $regex: regex } },
      ],
    });
    response.status(200).json({ users });
  } catch (error) {
    console.error("Error searching users:", error);
    response.status(500).json({ message: "Internal server error" });
  }
};

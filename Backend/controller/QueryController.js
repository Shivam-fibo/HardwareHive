import Query from "../model/QueryModel.js";

export const createQuery = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const newQuery = new Query({ name, email, subject, message });
    await newQuery.save();

    res.status(201).json({ message: "Query submitted successfully", data: newQuery });
  } catch (error) {
    console.error("Error saving query:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getAllQueries = async (req, res) => {
    try {
      const queries = await Query.find(); 
      console.log(queries)
      res.status(200).json({ queries });
    } catch (error) {
      console.error("Error fetching queries:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
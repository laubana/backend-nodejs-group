const ObjectId = require("mongoose").Types.ObjectId;
const Thread = require("../model/Thread");

const addThread = async (req, res) => {
  try {
    const newThread = await Thread.create({});

    res
      .status(201)
      .json({ message: "Thread created successfully.", data: newThread });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getThread = async (req, res) => {
  try {
    const { threadId } = req.query;

    if (!threadId) {
      return res
        .status(400)
        .json({ message: "Invalid input. Please try again." });
    }

    const watch = Thread.collection.watch([
      {
        $match: { "documentKey._id": new ObjectId(threadId) },
      },
    ]);
    watch.on("change", async (change) => {
      const thread = await Thread.findOne({ _id: threadId });

      if (thread.status === "closed") {
        await watch.close();
        res.status(200).json({ message: "" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server failed." });
  }
};

module.exports = { getThread, addThread };

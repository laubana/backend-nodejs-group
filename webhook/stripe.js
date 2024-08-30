const express = require("express");
const router = express.Router();
const Event = require("../model/Event");
const Thread = require("../model/Thread");
const Transaction = require("../model/Transaction");

const webhook = async (req, res) => {
  const event = req.body;

  // console.log(`${event.type} :: ${event.id}`);

  if (event.type === "charge.succeeded") {
    // console.log(event);

    const amount = event.data.object.amount;
    const chargeId = event.data.object.id;
    const description = event.data.object.metadata.description;
    const eventId = event.data.object.metadata.eventId;
    const receiptUrl = event.data.object.receipt_url;
    const userId = event.data.object.metadata.userId;

    // await Transaction.create({
    //   amount,
    //   chargeId,
    //   description,
    //   receiptUrl,
    //   user: userId,
    // });

    // await Event.findByIdAndUpdate(eventId, {
    //   isActive: true,
    // })
    //   .lean()
    //   .exec();
  } else if (event.type === "charge.refunded") {
    // console.log(event);

    const amount = event.data.object.amount;
    const chargeId = event.data.object.id;

    // await Transaction.findOneAndUpdate(
    //   { chargeId },
    //   { $inc: { amount: -amount } },
    //   { new: true }
    // )
    //   .lean()
    //   .exec();
  } else if (event.type === "charge.refund.updated") {
    // console.log(event);

    const threadId = event.data.object.metadata.threadId;

    // await Thread.findByIdAndUpdate(threadId, {
    //   status: "closed",
    // })
    //   .lean()
    //   .exec();
  }

  res.json({ received: true });
};

router.route("/stripe").post(webhook);

module.exports = router;

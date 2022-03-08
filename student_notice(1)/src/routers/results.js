const express = require("express");
const auth = require("../middleware/auth");
const results = require("../models/results");
const router = new express.Router();

router.patch("/results/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["subject", "marks", "status"];
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid ipdates!" });
  }
  try {
    const result = await results.findById(req.params.id);
    updates.forEach(update => (result[update] = req.body[update]));
    await result.save();
    // const result = await results.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    if (result) {
      return res.status(404).send();
    }
    res.send(result);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/results/:id", async (req, res) => {
  try {
    const result = await results.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(404).send();
    }
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/results", async (req, res) => {
  try {
    const result = await results.find({});
    res.send(result);
  } catch (e) {
    res.status(500).send();
  }
  // results

  //   .find({})
  //   .then(results => {
  //     res.send(results);
  //   })
  //   .catch(e => {
  //     res.status(500).send();
  //   });
});

router.get("/results/:id", async (req, res) => {
  const _id = req.params.id;
  console.log(_id);
  try {
    const result = await results.findOne({ owner: _id });

    if (!result) {
      return res.status(404).send();
    }

    res.send(result);
  } catch (e) {
    res.status(500).send();
  }
});
// const _id = req.params.id;
// results
//   .findById(_id)
//   .then result => {
//     if ( result) {
//       return res.status(404).send();
//     }
//     res.send result);
//   })
//   .catch(e => {
//     res.status(500).send();
//   });

router.post("/result", auth, async (req, res) => {
  console.log(req.user);
  const result = new results({
    ...req.body,
    // owner: req.user._id,
  });

  try {
    await result.save();
    res.status(201).send(result);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
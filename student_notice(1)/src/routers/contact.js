const express = require("express");
const auth = require("../middleware/auth");
const contacts = require("../models/contact");
const router = new express.Router();

router.get("/getcontact", async (req, res) => {
  try {
    const contact = await contacts.find({});
    res.send(contact);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/contact", async (req, res) => {
  console.log(req.body);
  const contact = new contacts({
    ...req.body,
  });

  try {
    await contact.save();
    res.status(201).send(contact);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;



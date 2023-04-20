const express = require("express");
const router = express.Router();
const FormData = require("form-data");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).render("index");
  // res.status(200).render("index");
});

router.get("/a", function (req, res, next) {
  res.send("Hello World!");
});


/* POST. */
router.post("/", function (req, res, next) {
  const { name, phone, address, info, total } = req.body;
  const form = new FormData();
  const url =
    "https://docs.google.com/forms/u/0/d/e/1FAIpQLScjE2lrkTWx8E5faTIn44ZkMpRTODlb2xI9b1KccxZUVIjTpg/formResponse";
  form.append("entry.161406939", name);
  form.append("entry.606228871", phone);
  form.append("entry.339452079", address);
  form.append("entry.384110532", info);
  form.append("entry.1851030978", total);
  form.submit(url, (err) => {
    res.json({ success: true });
  });
});



module.exports = router;

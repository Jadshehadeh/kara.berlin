const express = require("express");
const router = express.Router();
const fs = require("fs");
// const path = require("path");
// const multer = require("multer");
const File = require("./file.model");

router.post("/upload", UploadFiles);
// router.get("/get", getDetails);
// router.put("/update/:id", updateDetails);
// router.delete("/:id", _delete);

module.exports = router;

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, DIR);
//   },
//   filename: (req, file, cb) => {
//     const fileName = file.originalname.toLowerCase().split(' ').join('-');
//     cb(null, uuidv4() + '-' + fileName)
//   }
// });

// var upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype == "text/plain" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//     }
//   }
// });

// router.post('/upload', upload.array('filesCollection', 10), (req, res, next) => {

//   const reqFiles = [];
//   // const url = req.protocol + '://' + req.get('host')
//   for (var i = 0; i < req.files.length; i++) {
//       reqFiles.push(url + '/public/' + req.files[i].filename)
//   }

//   const files = new Files({
//       _id: new mongoose.Types.ObjectId(),
//       path: reqFiles
//   });

//   user.save().then(result => {
//       res.status(201).json({
//           message: "Done upload!",
//           userCreated: {
//               _id: result._id,
//               filesCollection: result.filesCollection
//           }
//       })
//   }).catch(err => {
//       console.log(err),
//           res.status(500).json({
//               error: err
//           });
//   })

// })

async function UploadFiles(req, res, next) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const base_dir = "./data/uploads";
  const user_folder = base_dir + "/" + req.body.user + "/";
  const category_folder = user_folder + req.body.category + "/";
  const year_folder = category_folder + req.body.year + "/";

  if (!fs.existsSync(user_folder)) {
    fs.mkdirSync(user_folder);
  }
  if (!fs.existsSync(category_folder)) {
    fs.mkdirSync(category_folder);
  }
  if (!fs.existsSync(year_folder)) {
    fs.mkdirSync(year_folder);
  }

  if (req.files.files instanceof Array) {
    const multipleFiles = req.files.files;
    for (var i = 0; i < multipleFiles.length; i++) {
      // console.log(req.files);
      // console.log(req.body);
      var newPath = (year_folder + Date.now() + "-" + multipleFiles[i].name)
        .replace(/ /g, "")
        .toLowerCase();
      multipleFiles[i].mv(newPath),
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).send(err);
          }
        };
      var file = new File({
        userId: req.body.userId,
        path_: newPath,
      });
      file.save();

      // res.type("application/json");
      // res.send(
      //   JSON.parse(
      //     JSON.stringify({
      //       fileName: multipleFiles[i].name,
      //       filePath: newPath,
      //     })
      //   )
      // );
    }
    await res.send("Uploaded Successfully!");
  } else {
    let sampleFile;
    let uploadPath;

    sampleFile = req.files.files;
    const base_dir = "./data/uploads";
    const user_folder = base_dir + "/" + req.body.user + "/";
    const category_folder = user_folder + req.body.category + "/";
    const year_folder = category_folder + req.body.year + "/";
    uploadPath = year_folder + sampleFile.name;

    if (!fs.existsSync(user_folder)) {
      fs.mkdirSync(user_folder);
    }
    if (!fs.existsSync(category_folder)) {
      fs.mkdirSync(category_folder);
    }
    if (!fs.existsSync(year_folder)) {
      fs.mkdirSync(year_folder);
    }
    sampleFile.mv(uploadPath),
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
      };
    var file = new File({
      userId: req.body.userId,
      path_: uploadPath,
    });
    file.save();
    res.type("application/json");
    res.send(
      JSON.parse(
        JSON.stringify({ fileName: sampleFile.name, filePath: uploadPath })
      )
    );
    // res.json({ fileName: sampleFile.name, filePath: uploadPath });
  }
}

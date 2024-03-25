const multer = require("multer");
const { v4: uuid } = require("uuid");
const mime = require("mime-types");

// 01st
// const upload = multer({ dest: "uploads" });
//multer를 사용해서 업로드 할 목적지(폴더)를 생성하고자 upload변수 생성

// 02nd
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, uuid() + "." + mime.extension(file.mimetype));
  },
}); // cb는 callback을 의미

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    //   if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    //     cb(null, true);
    //   } else {
    //     cb(new Error("png 혹은 jpeg만 업로드 가능합니다."), false);
    //   }

    //  const imgType = [image/png","imgae/jpeg"]
    // if (["image/png", "image/jpeg"].includes(file.mimetype)) {
    if (["image/png", "image/jpeg"].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("jpg/png 이미지만 업로드 가능"), false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
  // fileFilter: function () {}
});
// const upload = multer({ storage, fileFilter:function(){} }); //storage:storage, key와 value값이 같으면 한번만 써도 됨!

module.exports = { upload };

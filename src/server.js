const express = require("express");
const app = express();
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// require는 가져오기만 하는거고.. config는 설정까지 해준다...?:/

const { upload } = require("./middleweares/imgeUpload");

// app.use(express.static("uploads"));
// http://localhost:3000/abc.jpg
app.use("/uploads", express.static("uploads"));
// http://localhost:3000/uploads/abc.jpg
// 내가 만든 폴더 이름! uploads 폴더에 접근하라는 의미!!

const server = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db연결완료");
    app.use(express.json());
    // 미들웨어_app.____는 전부 미들웨어라고 보면됨!!!! 미들웨어를 앱에 붙여주는 역할을 하는게 app.___() 함수..

    app.post("/upload", upload.single("image"), async function (req, res) {
      // <form><input tytpe=file name=image></form>
      try {
        console.log(req.file);
        return res.send(req.file);
      } catch (error) {
        return res.status(500).send({ error: error.message });
        // 여기서 오는 error은 catch의 error에서 옴..:/
      }
    });
  } catch (error) {
    console.log("db연결실패");
  }
};

app.listen(3000);
server();

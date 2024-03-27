const express = require("express");
const app = express();
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// require는 가져오기만 하는거고.. config는 설정까지 해준다...?:/

// const { upload } = require("./middleweares/imgeUpload");
const { imageRouter } = require("./routes/imageRouter");
const { userRouter } = require("./routes/userRouter");

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

    app.use("/upload", imageRouter);
    app.use("/user", userRouter);
    // userRouter파일에서 module.exports해온걸 받아서 사용하기 위한 코드
    app.listen(3000);
  } catch (error) {
    console.log("db연결실패");
  }
};

server();

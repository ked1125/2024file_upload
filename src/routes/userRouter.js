//w전역변수 설정
const { User } = require("../models/User");
// models폴더의 User파일(스키마)에서 데이터 가져오기위해 require로 처리해줌.
const express = require("express");
// const { Router } = require("express"); // express패키지중 Router를 콕 찝어 사용할경우엔 해당코드로 사용가능
// npm i express로 받아온 express폴더 및 파일에서 Router를 가져오기 위해 require사용
const userRouter = express.Router();
// const userRouter = Router();
const { hash, compare } = require("bcryptjs");
const { upload } = require("../middleweares/imgeUpload");
// hash는 password 암호화

userRouter.post("/reg", async function (req, res) {
  // post는 회원가입!!
  // try~catch 시작, catch부분 먼저 작성 후 try 작성 본격적으로 시작하기.
  try {
    const password = await hash(req.body.password, 10);

    console.log(password);
    // const user = await new User(req.body).save();
    // user라는 새로운 객체 생성, save()는 정해져있는 함수임!
    const user = await new User({
      ...req.body,
      password,
    }).save();
    // const user = await new User({ password: password }).save();
    // 앞에적힌 password 는 User.js 스키마에서 나온 password고, 뒤에적힌 password는 같은 파일 내 const password로 선언해준데서 가져옴
    // req.body는 통채로 다 넣는건데, 그 중 password만 뽑아서 넣으려면 꼭 {중괄호} 안에 넣고싶은 요소를 작성해야 한다.
    // req.body는 이미 {중괄호}를 내포하고 있다고 생각하면 됨!!! 그래서 (req.body)라고 적어도 되는데, ({req.body})로쓰면 {{}}중괄호 죽복되는거니까 안됨!!
    // {중괄호 안쪽에 req.body} 쓰고싶으면 ...로 깊은복사?해줘야함

    return res.send({ user });
    // ★중괄호 안쪽은 항상!!!!!!!!!!! 키:밸류 라는걸 꼭 숙지!
    // return res.send({ password : password });
    //
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

userRouter.post("/login", async function (req, res) {
  try {
    // 로그인?
    // console.log(req.body);
    const user = await User.findOne({ useremail: req.body.useremail });
    const isValid = await compare(req.body.password, user.password);
    if (!isValid) {
      return res
        .status(400)
        .send({ error: "입력하신 정보가 올바르지 않습니다." });
    }
    console.log(isValid);
    // console.log(user);
    return res.send({
      message: "로그인 완료!",
      emai: user.useremail,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

userRouter.get("/member", async function (req, res) {
  try {
    const user = await User.find({});
    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

userRouter.put(
  "/reg_modi/:userId",
  // ㄱ. 포스트맨에서의 파라미터값 속 userId가 들어감
  upload.single("avatar"),
  // ㄴ. 포스트맨에서 key값  avatar가 들어감
  async function (req, res) {
    try {
      const userId = req.params.userId;
      // const {userId} = req.params
      const { username } = req.body;
      // ㄷ. 포스트맨의 key값 username이 들어감
      const { filename, originalname } = req.file;
      // ㄹ. req.file에 포스트맨 바디속 value값인 이미지파일이 들어감

      const image = { filename, originalname };
      // const image={filename:filename,originalname:originalname}
      // {중괄호 안쪽}은 무조건!! key:value 의 형태를 띈다!
      const update = await User.findOneAndUpdate(
        { _id: userId },
        // 데이터(전체문서)중에서 _id값을 찾겠다는 의미.
        { username, image },
        // { usename: username, image:image }
        // 변경 시켜줄 값 _ Schema파일안에서 확인해주시면됩니당
        { new: true }
        // 입력함과 동시에 바로 반영하겠다는 의미
      );
      return res.send({ update });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }
);

module.exports = { userRouter };
// 해당 파일을 서버에서 받아 사용하기위한 코드 (배포느낌??)

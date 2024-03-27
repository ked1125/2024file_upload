const { Router } = require("express");
const imageRouter = Router();
const { upload } = require("../middleweares/imgeUpload");
const { Image } = require("../models/Image");

imageRouter.post("/", upload.array("images", 5), async function (req, res) {
  // <form><input tytpe=file name=image></form>
  try {
    // console.log(req.files);
    // 터미널창에 출력하는애

    // const {title} = req.boy

    //single file 업로드시
    //     const image = await new Image({
    //       filename: req.file.filename,
    //       originalFileName: req.file.originalname,
    //       title: req.body.title,
    //     }).save();

    // return res.send({ image });

    const { title, content } = req.body;

    const images = [];

    req.files.forEach(function (item) {
      images.push({
        originalname: item.originalname,
        filename: item.filename,
        // originalname이랑 filename이라는 단어는
        // 이미지 send했을 때 기준 노드몬에 출력된 키값 그대로임!
      });
    });

    const image = await new Image({
      title,
      content,
      images,
      // title:title,content:content,images:images
    }).save();

    console.log(images);

    return res.send({ image });
    // 바디값? 화면에 출력하는애!!ㅎㅎ
  } catch (error) {
    return res.status(500).send({ error: error.message });
    // 여기서 오는 error은 catch의 error에서 옴..:/
  }
});

module.exports = { imageRouter };

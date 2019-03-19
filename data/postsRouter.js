const router = require("express").Router();

const db = require("./db.js");

//-------- New Post  --------//
router.post("/", (req, res) => {
  const newPost = res.body;
  if (newPost.title && newPost.contents) {
    db.insert(newPost)
      .then(post => {
        res.status(201).json(newPost);
      })
      .catch(err => {
        res.status(501).json({ message: "Failed to add Post" });
      });
  } else {
    res.status(400).json({
      Message: "Please provide title and contents for the post."
    });
  }
});

//------Get all Posts-------//
router.get("/", (req, res) => {
  db.find()
    .then(posts => {
      res.status(202).json(posts);
    })
    .catch(err => {
      res.status(501).json({ message: "Failed To Get Posts" });
    });
});

// // --------------------------------- DELETE -----------------------------------//
router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then(remove => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(500).json("Homie beat me up, cant get it!");
    });
});

// --------------------------------- PUT -----------------------------------//
router.put("/:id", async (req, res) => {
  try {
    const post = await post.update(req.params.id, req.body);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "I cant find post! Oh nooo!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error Error! Cant update post!"
    });
  }
});

module.exports = router;

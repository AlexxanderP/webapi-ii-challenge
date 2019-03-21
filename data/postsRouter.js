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

//-------- Get Posts By Id--------//

router.get("/:id", (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(407).json({ message: "That user doesn't exist" });
    });
});

// // --------------------------------- DELETE -----------------------------------//
router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then(remove => {
      res.status(203).end();
    })
    .catch(error => {
      res.status(500).json("Homie beat me up, cant get it!");
    });
});

// --------------------------------- PUT -----------------------------------//
router.put("/:id", (req, res) => {
  const { title, contents } = req.body;

  db.findById(req.params.id)
    .then(post => {
      if (post) {
        if (title && contents) {
          db.update(req.params.id, req.body).then(post => {
            res.status(205).json(req.body);
          });
        } else {
          res.status(400).json({
            message: "Please provide a post"
          });
        }
      } else {
        res.status(404).json({ message: "That post doesn't exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update post" });
    });
});

module.exports = router;

const router = require("express").Router();
const Person = require("../../models/Person");
const Classes = require("../../models/Classes");

// @ Route    POST api/class/createclass
// @ Desc     lets user create a class
// @ Access   Private
router.post("/createclass", (req, res) => {
  const { classname, sessions, hours, classroom, instructor, startDate, endDate, startTime, endTime, students, days, classNote, isRequired, isTrade } = req.body.payload;
  if (!classname && !sessions && !hours && !classroom && !startDate && !endDate && !startTime && !endTime && !students)
    return res.json({ msg: "Please fill out fields" });
  Classes.schema.methods.createClass(classname, sessions, hours, classroom, instructor, startDate, endDate, startTime, endTime, students, days, classNote, isRequired, isTrade)
    .then((course) => {
      return res.json({ msg: `${course} class has been created`})
    }).catch((err) => console.log(err));
});

// @ Route    GET api/class/classes
// @ Desc     gets all the classes that are active
// @ Access   Public
router.get('/classes', (req, res) => {
  Classes.find()
    .populate('instructor students')
    .then((classes) => {
      return res.json({ classes: classes });
    }).catch(err => console.log(err))
});


// @ Route    POST api/class/removeclass
// @ Desc     remove class from database
// @ Access   Public
router.post('/removeclass', (req, res) => {
  const { id } = req.body.payload;
  Classes.findByIdAndDelete({ _id: id })
    .then((course) => {
      course.students.map(s => {
        Person.findById({ _id: s }).then(deletedClass => {
          deletedClass.class = deletedClass.class.filter(c => c != id)
          deletedClass.save()
        }).catch(err => console.log(err))
      })
      res.json({
        msg: `${course.classname} has been deleted`,
      });

    }).catch((err) => res.json({ msg: err }));
});

// @ Route    POST api/class/removestudent
// @ Desc     remove student from class
// @ Access   Public
router.post('/removestudent', (req, res) => {
  const { courseId, studentId } = req.body.payload;
  Classes.schema.methods.removeFromClass(courseId, studentId).then(student => {
    res.json({
      msg: `student been removed from class`,
    });
  }).catch(err => console.log(err))

});

// @ Route    POST api/class/removerequiredclass
// @ Desc     remove class from being a required class
// @ Access   Public
router.post('/removerequiredclass', (req, res) => {
  const { payload } = req.body;

  Classes.schema.methods.removeFromRequiredClasses(payload).then(removed => {
    res.json({
      msg: `${removed} has been removed from being required`,
    });
  }).catch(err => console.log(err))

});

// @ Route    POST api/class/removetradeclass
// @ Desc     remove class from being a trade class
// @ Access   Public
router.post('/removetradeclass', (req, res) => {
  const { payload } = req.body;

  Classes.schema.methods.removeFromTradeClasses(payload).then(removed => {
    res.json({
      msg: `${removed} has been removed from being a trade`,
    });
  }).catch(err => console.log(err))

});

// @ Route    POST api/class/editclass
// @ Desc     lets user edit a class
// @ Access   Private
router.post("/updateclass", (req, res) => {
  const { id, classname, sessions, hours, classroom, startDate, endDate, startTime, endTime, days, classNote } = req.body.payload;
  Classes.schema.methods.editClass(id, sessions, hours, classroom, startDate, endDate, startTime, endTime, days, classNote)
    .then((course) => {
      res.json({ msg: `${classname} class has been updated` })
    }).catch((err) => console.log(err));
});

// @ Route    POST api/class/addstudent
// @ Desc     lets user add a student to a class
// @ Access   Private
router.post("/addstudent", (req, res) => {
  const { studentToAddId, courseId } = req.body.payload;
  if (!studentToAddId && !courseId)
    return res.json({ msg: "Please select Student to add" });

  Classes.schema.methods.addStudent(studentToAddId, courseId)
    .then((course) => {
      res.json({
        course: course,
        msg: `Student has been added`,
      })
    }).catch((err) => console.log(err));
});

// @ Route    POST api/class/graduateclass
// @ Desc     Lets user graduate active class
// @ Access   Private
router.post("/graduateclass", (req, res) => {
  const { id } = req.body.payload;
  if (!id) return res.json({ msg: "error graduating class" });
  Classes.schema.methods.graduate(id)
    .then((classname) => {
      res.json({
        msg: `${classname} has been graduated`,
      })
    }).catch((err) => console.log(err));
});

module.exports = router;
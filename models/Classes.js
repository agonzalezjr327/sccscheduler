const mongoose = require("mongoose");
const Person = require("./Person");

/**
 * Classes Model
 * ==========
 */
const ClassesSchema = new mongoose.Schema({
  classname: {
    type: String,
    trim: true,
    required: [true, "Please fill out class name"],
  },
  hours: {
    type: Number,
    trim: true,
    required: [true, "Please fill out hours"],
  },
  sessions: {
    type: Number,
    trim: true,
    required: [true, "Please fill out sessions"],
  },
  classroom: {
    type: String,
    trim: true,
    required: [true, "Please fill out classroom"],
  },
  instructor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
      index: true,
      required: [true, "Please fill out instructor"],
    },
  ],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
      index: true,
    },
  ],
  startDate: {
    type: String,
    trim: true,
    required: [true, "Please fill out start date"],
  },
  endDate: {
    type: String,
    trim: true,
    required: [true, "Please fill out end date"],
  },
  startTime: {
    type: String,
    trim: true,
    required: [true, "Please fill out start time"],
  },
  endTime: {
    type: String,
    trim: true,
    required: [true, "Please fill out end time"],
  },
  isActive: {
    type: Boolean,
    trim: true,
    default: true,
  },
  isRequired: {
    type: Boolean,
    trim: true,
    default: false,
  },
  isTrade: {
    type: Boolean,
    trim: true,
    default: false,
  },
  classNote: {
    type: String,
    trim: true,
  },
  days: {
    type: Array,
    trim: true,
    required: [true, "Please select days"],
  },
});

let trades = [];
// creates a new class and adds students
ClassesSchema.methods.createClass = async function (
  classname,
  sessions,
  hours,
  classroom,
  instructor,
  startDate,
  endDate,
  startTime,
  endTime,
  students,
  days,
  classNote,
  isRequired,
  isTrade,
) {
  const course = await Classes.create({
    classname: classname,
    sessions: sessions,
    hours: hours,
    classroom: classroom,
    instructor: instructor,
    startDate: startDate,
    endDate: endDate,
    startTime: startTime,
    endTime: endTime,
    students: students,
    days: days,
    classNote: classNote,
    isRequired: isRequired,
    isTrade: isTrade
  });

  // takes student off waiting list and adds class to student classes taken (array in schema)
  let allTrades = await Classes.find({isTrade: true});
  students?.map((person) => {
    allTrades.filter(t => {
      if(!trades.includes(t.classname)){
        trades.push(t.classname)
      }
    })
    Person.findOne({ _id: `${person}` })
      .then((s) => {
        if (classname.toLowerCase() === "orientation") {
          s.orientation = false;
        }

        let isTrade = trades.filter(
          (t) => t.toLowerCase() === classname.toLowerCase()
        );
        if (isTrade.length > 0) {
          s.trade = "";
        }
        s.class.push(course._id);
        s.save();
      })
      .catch((err) => console.log(err));
  });
  return classname;
};

// edits the class
ClassesSchema.methods.editClass = async function (
  id,
  sessions,
  hours,
  classroom,
  startDate,
  endDate,
  startTime,
  endTime,
  days,
  classNote
) {
  Classes.findById({ _id: id })
    .then((c) => {
      c.sessions = sessions;
      c.hours = hours;
      c.classroom = classroom;
      c.startDate = startDate;
      c.endDate = endDate;
      c.startTime = startTime;
      c.endTime = endTime;
      c.days = days;
      c.classNote = classNote;
      c.save();
    })
    .catch((err) => console.log(err));
};

// removes student from class
ClassesSchema.methods.removeFromClass = async function (classId, studentId) {
  // takes student off classes taken (array in schema)
  let student = await Person.findOne({ _id: studentId })
    .then((p) => {
      p.class = p.class.filter((course) => course != classId);
      p.save();
    })
    .catch((err) => console.log(err));

  // takes student off classes taken (array in schema)
  Classes.findOne({ _id: classId })
    .then((c) => {
      c.students = c.students.filter((student) => student != studentId);
      c.save();
    })
    .catch((err) => console.log(err));
  return student;
};

// removes class from required classes
ClassesSchema.methods.removeFromRequiredClasses = async function (removedClass) {
   await Classes.updateMany({classname: removedClass}, {$set: {isRequired: false}})
  return removedClass;
};

// removes class from trade classes
ClassesSchema.methods.removeFromTradeClasses = async function (removedClass) {
   await Classes.updateMany({classname: removedClass}, {$set: {isTrade: false}})
  return removedClass;
};

// adds a student to an existing class
ClassesSchema.methods.addStudent = async function (studentId, classId) {
  // adds class to students class taken/In progress (array in schema)
  let allTrades = await Classes.find({isTrade: true});
    allTrades.filter(t => {
      if(!trades.includes(t.classname)){
        trades.push(t.classname)
      }
    })
  // adds student to class roster
  let newClass = await Classes.findOne({ _id: classId })
    .then((c) => {
      c.students.push(studentId);
      c.save();
      Person.findOne({ _id: studentId })
      .then((p) => {
      
          let isTrade = trades.filter(t => t.toLowerCase() === c.classname.toLowerCase());
          if (isTrade.length > 0) {
            p.trade = '';
          }
          p.class.push(classId);
          p.save();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
  return newClass;
};

// graduates active class
ClassesSchema.methods.graduate = async function (id) {
  let graduated = await Classes.findOne({ _id: id })
    .then((c) => {
      if (c.classname.toLowerCase() === "graduation") {
        c.students.forEach((s) => {
          Person.findOne({ _id: s._id })
            .then((p) => {
              p.isGraduated = true;
              p.save();
            })
            .catch((err) => console.log(err));
        });
      }
      if (c.classname.toLowerCase() === "orientation") {
        c.students.forEach((s) => {
          Person.findOne({ _id: s._id })
            .then((p) => {
              p.orientation = false;
              p.save();
            })
            .catch((err) => console.log(err));
        });
      }
      c.isActive = false;
      c.save();
      return c.classname;
    })
    .catch((err) => console.log(err));
  return graduated;
};

const Classes = mongoose.model("Classes", ClassesSchema);
module.exports = Classes;

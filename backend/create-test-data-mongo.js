// MongoDB script to create test data
// Run this in MongoDB shell: mongosh erp_college --file create-test-data-mongo.js

// Switch to the database
use erp_college;

// Clear existing data (optional)
db.users.deleteMany({});
db.students.deleteMany({});
db.teachers.deleteMany({});
db.classes.deleteMany({});
db.subjects.deleteMany({});
db.attendance.deleteMany({});
db.results.deleteMany({});
db.announcements.deleteMany({});

print("🧹 Existing data cleared");

// Create admin user
const adminUser = {
  _id: ObjectId(),
  name: "Admin User",
  email: "admin@erp.com",
  password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // admin123
  role: "admin",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

db.users.insertOne(adminUser);
print("✅ Admin user created");

// Create teacher user
const teacherUser = {
  _id: ObjectId(),
  name: "John Smith",
  email: "john.smith@erp.com",
  password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // teacher123
  role: "teacher",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

db.users.insertOne(teacherUser);
print("✅ Teacher user created");

// Create student user
const studentUser = {
  _id: ObjectId(),
  name: "Student 1",
  email: "student1@erp.com",
  password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // student123
  role: "student",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

db.users.insertOne(studentUser);
print("✅ Student user created");

// Create teacher profile
const teacherProfile = {
  _id: ObjectId(),
  userId: teacherUser._id,
  name: "John Smith",
  email: "john.smith@erp.com",
  employeeId: "T001",
  subject: "Mathematics",
  phone: "+1234567890",
  address: "123 Teacher St, City",
  qualification: "MSc Mathematics",
  experience: 5,
  salary: 50000,
  createdAt: new Date(),
  updatedAt: new Date()
};

db.teachers.insertOne(teacherProfile);
print("✅ Teacher profile created");

// Create class
const class1 = {
  _id: ObjectId(),
  name: "Class 10",
  section: "A",
  capacity: 30,
  teacherId: teacherProfile._id,
  createdAt: new Date(),
  updatedAt: new Date()
};

db.classes.insertOne(class1);
print("✅ Class created");

// Create student profile
const studentProfile = {
  _id: ObjectId(),
  userId: studentUser._id,
  name: "Student 1",
  email: "student1@erp.com",
  rollNo: "S001",
  classId: class1._id,
  section: "A",
  phone: "+1234567001",
  address: "1 Student St, City",
  bloodGroup: "A+",
  parentName: "Parent of Student 1",
  parentPhone: "+1234567001",
  createdAt: new Date(),
  updatedAt: new Date()
};

db.students.insertOne(studentProfile);
print("✅ Student profile created");

// Create announcement
const announcement = {
  _id: ObjectId(),
  title: "Welcome to New Academic Year",
  content: "Welcome back students! We hope you had a great summer break. The new academic year begins with exciting opportunities and challenges.",
  authorId: adminUser._id,
  isActive: true,
  priority: "high",
  createdAt: new Date(),
  updatedAt: new Date()
};

db.announcements.insertOne(announcement);
print("✅ Announcement created");

print("\n🎉 Test data creation completed!");
print("\n🔑 Login Credentials:");
print("Admin: admin@erp.com / admin123");
print("Teacher: john.smith@erp.com / teacher123");
print("Student: student1@erp.com / student123");

print("\n📊 Database Summary:");
print("Users:", db.users.countDocuments());
print("Students:", db.students.countDocuments());
print("Teachers:", db.teachers.countDocuments());
print("Classes:", db.classes.countDocuments());
print("Announcements:", db.announcements.countDocuments());

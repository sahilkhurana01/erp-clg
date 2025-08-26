const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get results for a specific class by exam type
exports.getClassResults = async (req, res) => {
  try {
    const { classId } = req.params;
    const { examType } = req.query;
    
    const whereClause = {};
    if (examType) {
      whereClause.examType = examType;
    }
    
    // Get students in the class and their results
    const students = await prisma.student.findMany({
      where: { classId: classId },
      include: {
        results: {
          where: whereClause,
          include: {
            subject: true
          }
        }
      }
    });
    
    res.json({
      success: true,
      data: students
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Get results for a specific student
exports.getStudentResults = async (req, res) => {
  try {
    const { studentId } = req.params;
    
    const results = await prisma.result.findMany({
      where: { studentId: studentId },
      include: {
        subject: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json({
      success: true,
      data: results
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Create a new result
exports.createResult = async (req, res) => {
  try {
    const result = await prisma.result.create({ 
      data: req.body,
      include: {
        student: true,
        subject: true
      }
    });
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Update a result
exports.updateResult = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await prisma.result.update({ 
      where: { id: id }, 
      data: req.body,
      include: {
        student: true,
        subject: true
      }
    });
    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Delete a result
exports.deleteResult = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.result.delete({ where: { id: id } });
    res.json({ 
      success: true,
      message: 'Result deleted successfully' 
    });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Bulk create results
exports.bulkCreateResults = async (req, res) => {
  try {
    const { results } = req.body;
    
    if (!Array.isArray(results)) {
      return res.status(400).json({
        success: false,
        error: 'Results must be an array'
      });
    }
    
    const createdResults = await prisma.result.createMany({
      data: results
    });
    
    res.status(201).json({
      success: true,
      message: `${createdResults.count} results created successfully`,
      count: createdResults.count
    });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Legacy functions for backward compatibility
exports.getAllResults = async (req, res) => {
  try {
    const results = await prisma.result.findMany({
      include: {
        student: true,
        subject: true
      }
    });
    res.json({
      success: true,
      data: results
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

exports.getResultById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await prisma.result.findUnique({ 
      where: { id: id },
      include: {
        student: true,
        subject: true
      }
    });
    
    if (!result) {
      return res.status(404).json({ 
        success: false,
        error: 'Result not found' 
      });
    }
    
    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Plus, Trash2, GraduationCap } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Course {
  id: string
  name: string
  credits: number
  grade: string
}

const gradePoints: Record<string, number> = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  "D-": 0.7,
  F: 0.0,
}

export function GPACalculator() {
  // State for courses
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "Course 1", credits: 3, grade: "A" },
    { id: "2", name: "Course 2", credits: 4, grade: "B+" },
    { id: "3", name: "Course 3", credits: 3, grade: "A-" },
  ])
  const [newCourseName, setNewCourseName] = useState("")
  const [newCourseCredits, setNewCourseCredits] = useState(3)
  const [newCourseGrade, setNewCourseGrade] = useState("A")

  // Calculated values
  const [gpa, setGpa] = useState(0)
  const [totalCredits, setTotalCredits] = useState(0)
  const [totalGradePoints, setTotalGradePoints] = useState(0)

  // Calculate GPA
  useEffect(() => {
    let credits = 0
    let points = 0

    courses.forEach((course) => {
      credits += course.credits
      points += course.credits * gradePoints[course.grade]
    })

    setTotalCredits(credits)
    setTotalGradePoints(points)
    setGpa(credits > 0 ? points / credits : 0)
  }, [courses])

  // Add a new course
  const addCourse = () => {
    if (newCourseName.trim() === "") return

    const newCourse: Course = {
      id: Date.now().toString(),
      name: newCourseName,
      credits: newCourseCredits,
      grade: newCourseGrade,
    }

    setCourses([...courses, newCourse])
    setNewCourseName("")
    setNewCourseCredits(3)
    setNewCourseGrade("A")
  }

  // Remove a course
  const removeCourse = (id: string) => {
    setCourses(courses.filter((course) => course.id !== id))
  }

  // Update course details
  const updateCourse = (id: string, field: keyof Course, value: string | number) => {
    setCourses(courses.map((course) => (course.id === id ? { ...course, [field]: value } : course)))
  }

  // Get GPA classification
  const getGpaClassification = (gpa: number) => {
    if (gpa >= 3.7) return "Excellent (A)"
    if (gpa >= 3.0) return "Good (B)"
    if (gpa >= 2.0) return "Satisfactory (C)"
    if (gpa >= 1.0) return "Poor (D)"
    return "Failing (F)"
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <CardTitle>GPA Calculator</CardTitle>
        </div>
        <CardDescription>Calculate your Grade Point Average (GPA) based on your courses and credits</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="overflow-hidden">
              <div className="bg-primary p-4">
                <h3 className="text-lg font-medium text-primary-foreground">Current GPA</h3>
              </div>
              <CardContent className="p-4">
                <div className="text-4xl font-bold">{gpa.toFixed(2)}</div>
                <p className="text-sm text-muted-foreground mt-2">{getGpaClassification(gpa)}</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="bg-primary p-4">
                <h3 className="text-lg font-medium text-primary-foreground">Total Credits</h3>
              </div>
              <CardContent className="p-4">
                <div className="text-4xl font-bold">{totalCredits}</div>
                <p className="text-sm text-muted-foreground mt-2">Credit hours</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="bg-primary p-4">
                <h3 className="text-lg font-medium text-primary-foreground">Grade Points</h3>
              </div>
              <CardContent className="p-4">
                <div className="text-4xl font-bold">{totalGradePoints.toFixed(1)}</div>
                <p className="text-sm text-muted-foreground mt-2">Total quality points</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Your Courses</h3>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Grade Points</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <Input
                        value={course.name}
                        onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={course.credits.toString()}
                        onValueChange={(value) => updateCourse(course.id, "credits", Number.parseInt(value))}
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue placeholder="Credits" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6].map((credit) => (
                            <SelectItem key={credit} value={credit.toString()}>
                              {credit}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select value={course.grade} onValueChange={(value) => updateCourse(course.id, "grade", value)}>
                        <SelectTrigger className="w-20">
                          <SelectValue placeholder="Grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(gradePoints).map((grade) => (
                            <SelectItem key={grade} value={grade}>
                              {grade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>{(course.credits * gradePoints[course.grade]).toFixed(1)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => removeCourse(course.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="grid gap-4 md:grid-cols-4 items-end">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="course-name">Course Name</Label>
                <Input
                  id="course-name"
                  value={newCourseName}
                  onChange={(e) => setNewCourseName(e.target.value)}
                  placeholder="Enter course name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course-credits">Credits</Label>
                <Select
                  value={newCourseCredits.toString()}
                  onValueChange={(value) => setNewCourseCredits(Number.parseInt(value))}
                >
                  <SelectTrigger id="course-credits">
                    <SelectValue placeholder="Credits" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((credit) => (
                      <SelectItem key={credit} value={credit.toString()}>
                        {credit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="course-grade">Grade</Label>
                <Select value={newCourseGrade} onValueChange={setNewCourseGrade}>
                  <SelectTrigger id="course-grade">
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(gradePoints).map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Button onClick={addCourse} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Course
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-start space-x-2">
              <BarChart className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p>
                  GPA Scale: A/A+ (4.0), A- (3.7), B+ (3.3), B (3.0), B- (2.7), C+ (2.3), C (2.0), C- (1.7), D+ (1.3), D
                  (1.0), D- (0.7), F (0.0)
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

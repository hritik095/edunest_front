import React, { useEffect, useState } from "react";
import "./dashbord.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import Loading from "../../components/loading/Loading";

const Dashboard = () => {
  const { mycourse, fetchMyCourse } = CourseData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        await fetchMyCourse();
      } catch (error) {
        console.error("Error loading enrolled courses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [fetchMyCourse]);

  return (
    <div className="student-dashboard">
      <h2>All Enrolled Courses</h2>
      <div className="dashboard-content">
        {loading ? (
          <Loading />
        ) : mycourse && mycourse.length > 0 ? (
          mycourse.map((course) => <CourseCard key={course._id} course={course} />)
        ) : (
          <p>No courses enrolled yet</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

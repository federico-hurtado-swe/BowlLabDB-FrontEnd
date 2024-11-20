import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./EmployeeReviewsStyles.module.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const EmployeeReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewReport, setReviewReport] = useState({});

  useEffect(() => {
    // Fetch all reviews on component mount
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/reviews/find/all"
        );
        setReviews(response.data);

        const reportResponse = await axios.get(
          "http://localhost:8080/api/reviews/review-report"
        );
        setReviewReport(reportResponse.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  // Prepare data for the bar graph
  const chartData = {
    labels: Object.keys(reviewReport), // Star ratings (1, 2, 3, 4, 5)
    datasets: [
      {
        label: "Review Counts",
        data: Object.values(reviewReport), // Counts for each star rating
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Star Ratings",
        },
      },
      y: {
        title: {
          display: true,
          text: "Count",
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Ensures only whole numbers are displayed
          callback: function (value) {
            return Number.isInteger(value) ? value : null; // Filter out non-integers (safety check)
          },
        },
      },
    },
  };

  return (
    <section className={styles.reviewsSection}>
      <h2>Employee Reviews</h2>
      <p>Welcome to the Employee Reviews page. Manage customer reviews here.</p>

      <div className={styles.viewReviews}>
        <h3>All Customer Reviews</h3>
        <ul>
          {Array.isArray(reviews) && reviews.length > 0 ? (
            reviews.map((review) => (
              <li key={review.id}>
                <p>
                  <strong>Stars:</strong> {review.stars_given}
                </p>
                <p>
                  <strong>Description:</strong> {review.description}
                </p>
              </li>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </ul>
      </div>
      <div className={styles.reviewChart}>
        <h3>Review Star Distribution</h3>
        {Object.keys(reviewReport).length > 0 ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
    </section>
  );
};

export default EmployeeReviews;

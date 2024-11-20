import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./EmployeeReviewsStyles.module.css";

const EmployeeReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch all reviews on component mount
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/reviews/find/all"
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

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
    </section>
  );
};

export default EmployeeReviews;

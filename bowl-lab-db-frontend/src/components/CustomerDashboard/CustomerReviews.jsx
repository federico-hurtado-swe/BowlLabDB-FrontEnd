import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./CustomerReviewsStyles.module.css";

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    written_by: "", // This will be set dynamically
    stars_given: 0,
    description: "",
  });

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

    // Get customer ID from localStorage and set it
    const customerData = JSON.parse(localStorage.getItem("customer"));
    if (customerData && customerData.id) {
      setNewReview((prev) => ({
        ...prev,
        written_by: customerData.id,
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateReview = async () => {
    try {
      await axios.post("http://localhost:8080/api/reviews/create", newReview);
      alert("Review created successfully!");
      setNewReview((prev) => ({ ...prev, stars_given: 0, description: "" })); // Reset input fields
      // Refresh reviews
      // Refresh reviews with the correct URL
      const response = await axios.get(
        "http://localhost:8080/api/reviews/find/all"
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error creating review:", error);
      alert("Failed to create review.");
    }
  };

  return (
    <section className={styles.reviewsSection}>
      <h2>Customer Reviews</h2>
      <p>Welcome to the Customer Reviews page. Create and view reviews here.</p>

      <div className={styles.createReview}>
        <h3>Create a Review</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateReview();
          }}
        >
          <label>
            Stars Given:
            <input
              type="number"
              name="stars_given"
              value={newReview.stars_given}
              onChange={handleInputChange}
              min="1"
              max="5"
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={newReview.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </label>
          <button type="submit">Submit Review</button>
        </form>
      </div>

      <div className={styles.viewReviews}>
        <h3>Existing Reviews</h3>
        <ul>
          {Array.isArray(reviews) ? (
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

export default CustomerReviews;

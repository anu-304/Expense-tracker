import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/Home.css";
import trend from "../images/refund2.png";
import transactions from "../images/money1.png";
import chart from "../images/market3.png";
import calcform from "../images/top4.png";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 200,
    });
  }, []);

  const features = [
    {
      title: "Track Expenses",
      content: "Easily record all your transactions and keep track of your daily, weekly, or monthly spending. Whether it's groceries, rent, or a night out, logging your expenses helps you stay aware of your spending habits.",
      image: transactions,
      alt: "expense-pic",
      animation: "fade-right",
    },
    {
      title: "View Trends",
      content: "Analyze your spending trends over time with our visual reports. Identify where most of your money goes and understand your financial habits, making it easier to adjust and improve your financial strategy.",
      image: trend,
      alt: "trend-pic",
      animation: "fade-left",
    },
    {
      title: "Chart Expenses",
      content: "Visualize your spending with comprehensive charts and graphs that break down your expenses by category, date, or custom filters. These insights help you make more informed financial decisions.",
      image: chart,
      alt: "chart-pic",
      animation: "fade-right",
    },
    {
      title: "Calculate Savings",
      content: "Set savings goals and calculate how much you need to set aside each month to reach them. Track your progress toward your financial goals and find ways to save more effectively.",
      image: calcform,
      alt: "calc-pic",
      animation: "fade-left",
    },
  ];

  return (
    <div className="home-body mb-5">
      <div className="text-center" data-aos="fade-up">
        <h1 className="home-title">Expense Tracker</h1>
        <p className="home-subtitle">
          Keep your finances in check and reach your financial goals
        </p>
      </div>

      {features.map((feature, index) => (
        <div
          className={`row feature-row ${
            index % 2 === 0 ? "feature-row-reverse" : ""
          }`}
          key={index}
        >
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div className="feature-content" data-aos={feature.animation}>
              <h3>{feature.title}</h3>
              <p>{feature.content}</p>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-center">
            <img
              className="feature-image img-fluid shadow mb-3"
              src={feature.image}
              alt={feature.alt}
            />
          </div>
        </div>
      ))}

      <h2 className="testimonials-title text-center mb-4 mt-5" data-aos="fade-up">
        User Testimonials
      </h2>
      <div className="container-fluid">
        <div className="row text-center d-flex justify-content-between">
          <div className="col-lg-2 col-md-4 col-6 mb-4" data-aos="flip-left">
            <div className="card card-testimonials w-100">
              <div className="card-body card-testimonials">
                <p className="card-text">
                  "Expense Tracker makes it so simple to track my spending every month!"
                </p>
                <p className="card-text">- Priya K.</p>
              </div>
            </div>
          </div>
            <div className="col-lg-2 col-md-4 col-6 mb-4" data-aos="flip-right">
              <div className="card card-testimonials w-100">
                <div className="card-body card-testimonials">
                  <p className="card-text">
                    "This app has helped me save and reach my goals faster than ever."
                  </p>
                  <p className="card-text">- Arjun R.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6 mb-4" data-aos="flip-up">
              <div className="card card-testimonials w-100">
                <div className="card-body card-testimonials">             
                  <p className="card-text">
                    "It's great for anyone serious about managing their finances effectively."
                  </p>
                  <p className="card-text">- Meena S.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6 mb-4" data-aos="flip-down">
              <div className="card card-testimonials w-100">
                <div className="card-body card-testimonials">              
                  <p className="card-text">
                    "I’ve tried others, but Expense Tracker is by far the best!"
                  </p>
                  <p className="card-text">- Ravi P.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6 mb-4" data-aos="zoom-in">
              <div className="card card-testimonials w-100">
                <div className="card-body card-testimonials">
                  <p className="card-text">
                    "It has helped me make smarter financial choices every month."
                  </p>
                  <p className="card-text">- Lakshmi M.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Home;

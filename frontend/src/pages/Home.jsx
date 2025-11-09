import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const cards = [
    { title: "Student", text: "Apply for courses and upload transcripts", path: "/student" },
    { title: "Institute", text: "Manage courses and admissions", path: "/institute" },
    { title: "Company", text: "Post jobs and find candidates", path: "/company" },
    { title: "Admin", text: "System management", path: "/admin" },
    { title: "Career Tips", text: "Get advice for your career", path: "/career-tips" },
    { title: "Scholarships", text: "Find available scholarships", path: "/scholarships" },
    { title: "Events", text: "Check career fairs and workshops", path: "/events" },
    { title: "Resources", text: "Access learning materials", path: "/resources" },
    { title: "News", text: "Latest updates from institutions", path: "/news" },
    { title: "Job Alerts", text: "Receive job notifications", path: "/job-alerts" },
    { title: "Profile", text: "Manage your account details", path: "/profile" },
    { title: "Messages", text: "Connect with institutions", path: "/messages" },
    { title: "Applications", text: "View submitted applications", path: "/applications" },
    { title: "Reports", text: "Generate system reports", path: "/reports" },
    { title: "Settings", text: "Manage preferences", path: "/settings" },
    { title: "Help Center", text: "Get assistance and FAQs", path: "/help" },
  ];

  return (
    <div className="container my-5 pb-5"> {/* Added pb-5 for bottom padding */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-white mb-3">Career Guidance Platform</h1>
        <p className="lead text-c7c9d3">Your gateway to education and career opportunities in Lesotho</p>
      </div>
      
      <h2 className="text-center mb-4 text-white">Explore the Platform</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mb-5"> {/* Added mb-5 for bottom margin */}
        {cards.map((card, index) => (
          <div className="col" key={index}>
            <div className="card h-100 shadow text-center p-3 border-0 rounded-4 card-dark">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold text-white">{card.title}</h5>
                <p className="card-text text-c7c9d3 flex-grow-1">{card.text}</p>
                <button className="btn btn-gradient mt-auto">Open</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

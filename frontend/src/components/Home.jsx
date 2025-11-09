import React from "react";

const Home = () => {
  const cards = [
    {
      title: "Student Management",
      description: "Manage student profiles, track progress, and view academic records.",
      buttonText: "Open Student Dashboard",
      icon: "?????"
    },
    {
      title: "Institute Management", 
      description: "Manage educational institutions, courses, and faculty members.",
      buttonText: "Open Institute Dashboard",
      icon: "??"
    },
    {
      title: "Company Management",
      description: "Manage company profiles, job postings, and recruitment processes.",
      buttonText: "Open Company Dashboard", 
      icon: "??"
    },
    {
      title: "Admin Dashboard",
      description: "System administration, user management, and platform analytics.",
      buttonText: "Open Admin Dashboard",
      icon: "??"
    }
  ];

  return (
    <div className="container-fluid">
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center py-3 mb-4 border-bottom border-secondary">
        <h1 className="h3 text-white mb-0">Career Guidance Platform</h1>
      </header>

      {/* Dashboard Cards */}
      <div className="row g-4">
        {cards.map((card, index) => (
          <div key={index} className="col-xl-3 col-lg-4 col-md-6">
            <div className="card card-dark h-100 shadow">
              <div className="card-body d-flex flex-column">
                <div className="d-flex align-items-center mb-3">
                  <span className="fs-1 me-3">{card.icon}</span>
                  <h5 className="card-title text-white mb-0">{card.title}</h5>
                </div>
                <p className="card-text text-c7c9d3 flex-grow-1">
                  {card.description}
                </p>
                <button className="btn btn-gradient w-100 mt-auto">
                  {card.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

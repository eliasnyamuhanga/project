
import { useState } from "react";
import "./App.css";

const initialProjects = [
  {
    id: 1,
    name: "CampusOS",
    description: "A digital platform for university students.",
    category: "Education",
    status: "In Progress",
    progress: 65,
  },
  {
    id: 2,
    name: "DreamStack BizPilot",
    description: "Business management for small businesses.",
    category: "Business",
    status: "Planning",
    progress: 20,
  },
  {
    id: 3,
    name: "BiasharaSmart",
    description: "Sales, expenses and inventory management.",
    category: "Business",
    status: "Completed",
    progress: 100,
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">DreamStack<span>.</span></h2>

      <p className="menu-label">WORKSPACE</p>

      <nav>
        <a className="active" href="#dashboard">▦ Dashboard</a>
        <a href="#projects">▣ My Projects</a>
        <a href="#add-project">＋ Add Project</a>
      </nav>

      <div className="sidebar-bottom">
        <div className="avatar">DS</div>
        <div>
          <strong>DreamStack Studio</strong>
          <small>Project Workspace</small>
        </div>
      </div>
    </aside>
  );
}

function StatCard({ title, value, description }) {
  return (
    <div className="stat-card">
      <p>{title}</p>
      <h2>{value}</h2>
      <small>{description}</small>
    </div>
  );
}

function ProjectCard({ project, onDelete, onStatusChange }) {
  return (
    <article className="project-card">
      <div className="project-top">
        <span className="project-category">{project.category}</span>

        <button
          className="delete-btn"
          onClick={() => onDelete(project.id)}
          aria-label={`Delete ${project.name}`}
        >
          ✕
        </button>
      </div>

      <h3>{project.name}</h3>
      <p className="description">{project.description}</p>

      <div className="progress-info">
        <span>Progress</span>
        <strong>{project.progress}%</strong>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${project.progress}%` }}
        />
      </div>

      <div className="project-footer">
        <select
          value={project.status}
          onChange={(event) =>
            onStatusChange(project.id, event.target.value)
          }
          aria-label={`Status of ${project.name}`}
        >
          <option>Planning</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <span className="project-id">DS-{project.id}</span>
      </div>
    </article>
  );
}

function App() {
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "Business",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  function addProject(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.description.trim()) {
      alert("Please enter the project name and description.");
      return;
    }

    const newProject = {
      id: Date.now(),
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category,
      status: "Planning",
      progress: 0,
    };

    setProjects((previousProjects) => [
      newProject,
      ...previousProjects,
    ]);

    setForm({
      name: "",
      description: "",
      category: "Business",
    });
  }

  function deleteProject(id) {
    setProjects((previousProjects) =>
      previousProjects.filter((project) => project.id !== id)
    );
  }

  function changeStatus(id, newStatus) {
    setProjects((previousProjects) =>
      previousProjects.map((project) => {
        if (project.id === id) {
          const progress =
            newStatus === "Completed"
              ? 100
              : newStatus === "In Progress"
                ? Math.max(project.progress, 25)
                : Math.min(project.progress, 20);

          return { ...project, status: newStatus, progress };
        }

        return project;
      })
    );
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || project.status === filter;

    return matchesSearch && matchesFilter;
  });

  const completed = projects.filter(
    (project) => project.status === "Completed"
  ).length;

  const inProgress = projects.filter(
    (project) => project.status === "In Progress"
  ).length;

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <div>
            <p className="breadcrumb">Workspace / Dashboard</p>
            <h1>Project Dashboard</h1>
          </div>

          <div className="user-profile">
            <div className="avatar">E</div>
            <span>Founder</span>
          </div>
        </header>

        <section className="welcome-section">
          <div>
            <p className="eyebrow">DREAMSTACK STUDIO</p>
            <h2>Build something amazing.</h2>
            <p>Manage your ideas, projects and progress in one place.</p>
          </div>
        </section>

        <section className="stats-grid">
          <StatCard
            title="Total Projects"
            value={projects.length}
            description="All registered projects"
          />

          <StatCard
            title="In Progress"
            value={inProgress}
            description="Projects being developed"
          />

          <StatCard
            title="Completed"
            value={completed}
            description="Successfully completed"
          />
        </section>

        <section className="form-section" id="add-project">
          <div className="section-heading">
            <div>
              <h2>Add a New Project</h2>
              <p>Register your next idea or client project.</p>
            </div>
          </div>

          <form className="project-form" onSubmit={addProject}>
            <input
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="Project name"
              aria-label="Project name"
            />

            <input
              name="description"
              value={form.description}
              onChange={handleInputChange}
              placeholder="Project description"
              aria-label="Project description"
            />

            <select
              name="category"
              value={form.category}
              onChange={handleInputChange}
              aria-label="Project category"
            >
              <option>Business</option>
              <option>Education</option>
              <option>Technology</option>
              <option>Personal</option>
            </select>

            <button type="submit" className="primary-btn">
              + Add Project
            </button>
          </form>
        </section>

        <section className="projects-section" id="projects">
          <div className="section-heading">
            <div>
              <h2>My Projects</h2>
              <p>Track and manage your development work.</p>
            </div>

            <span className="project-count">
              {filteredProjects.length} Projects
            </span>
          </div>

          <div className="filters">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search projects..."
              aria-label="Search projects"
            />

            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              aria-label="Filter projects"
            >
              <option>All</option>
              <option>Planning</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <div className="projects-grid">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onDelete={deleteProject}
                  onStatusChange={changeStatus}
                />
              ))
            ) : (
              <div className="empty-state">
                <h3>No projects found</h3>
                <p>Try another search or add a new project.</p>
              </div>
            )}
          </div>
        </section>

        <footer>
          © 2026 DreamStack Studio. Built with React.
        </footer>
      </main>
    </div>
  );
}

export default App;

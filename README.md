# 🌐 CQU Initiation & Innovation — Website

A modern, full-stack web application built with **React.js + Vite** on the frontend and **FastAPI + PostgreSQL** on the backend, built to empower the student innovation community at CQUniversity. Students can explore events, apply for workshops, join the community, read the blog, and submit content — with real form submissions backed by a working API.


## 🚀 Features

- Fully responsive UI (Desktop + Mobile)
- Clean navigation across Home | Projects | Team | Events | Blog | Join Us
- **Working Join and Bootcamp application forms** — submissions are sent to the backend, stored in the database, and trigger an email notification
- Blog submission and browsing
- Dynamic Events section with categories
- Modern UI with cards, icons, hover effects, and gradient backgrounds
- Component-based frontend architecture for scalability
- REST API backend with database migrations and seed data


## 🛠 Tech Stack

**Frontend**

| Technology | Purpose |
|---|---|
| React.js | Core UI library |
| Vite | Fast development + build setup |
| Axios | API requests to the backend |
| React Router DOM | Page navigation |
| JavaScript (ES6+) | Logic & interactions |
| HTML5 + CSS3 | Layout & styling |

**Backend**

| Technology | Purpose |
|---|---|
| FastAPI | REST API framework |
| PostgreSQL | Database |
| SQLAlchemy + Alembic | ORM and database migrations |
| Poetry | Python dependency management |
| Mailgun (via httpx) | Email notifications on form submission |
| Docker | Containerized backend + database |


## 📁 Project Structure

```
├── src/                    # React frontend
│   ├── apiClient.js         # Axios client used by forms to call the backend
│   ├── components/          # JoinForm, BootCampForm, Header, Footer, etc.
│   └── pages/                # Home, Team, Blog, Events, Projects, Join
│
├── backend/                # FastAPI backend
│   ├── src/
│   │   ├── api/routers/      # blog, event, member, project, forms
│   │   ├── api/schemas/      # Pydantic request/response schemas
│   │   ├── models/           # SQLAlchemy models (incl. form submissions)
│   │   ├── config/           # Settings, database config, Mailgun settings
│   │   └── utils/            # Session helper, email notification sender
│   └── database/
│       ├── versions/         # Alembic migrations
│       └── seeders/           # Seed data for local development
│
├── Framework.md
├── Process.md
└── README.md
```


## 📦 Setup & Installation

### Frontend

**1. Clone the repository:**
```bash
git clone https://github.com/prajitabhandari1234/WebsiteDevelopment.git
```

**2. Move into the project folder:**
```bash
cd WebsiteDevelopment
```

**3. Install dependencies:**
```bash
npm install
```

**4. Start the development server:**
```bash
npm run dev
```

Your app will open at:
📌 http://localhost:5173/

### Backend

**1. Move into the backend folder:**
```bash
cd backend
```

**2. Copy the example environment file and fill in your values:**
```bash
cp .env.example .env
```

**3. Install dependencies with Poetry:**
```bash
poetry install
poetry lock
```

**4. Run database migrations:**
```bash
poetry run alembic upgrade head
```

**5. Start the API server:**
```bash
poetry run uvicorn src.main:app --reload
```

The API will be available at:
📌 http://localhost:8000/

> Alternatively, run everything with Docker:
> ```bash
> docker-compose up
> ```


## 🔮 Roadmap / Future Enhancements

- Admin dashboard + authentication for blog publishing
- Content moderation and notifications for admins
- Expanded event categories and filtering


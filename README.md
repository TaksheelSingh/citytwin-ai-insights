
# AI-Powered Digital Twin for Smart Cities

This project provides a comprehensive digital twin platform for smart city management, featuring real-time traffic analysis, air quality monitoring, and energy consumption tracking with AI-powered predictions.

## Features

- **Interactive Dashboard** with real-time data visualization
- **Traffic Analysis** with LSTM-based predictive modeling
- **Air Quality Monitoring** with regression-based forecasting
- **Energy Consumption Tracking** with cluster analysis
- **Interactive Maps** using Leaflet.js and OpenStreetMap
- **Responsive Design** for desktop and mobile devices

## Project Structure

The project follows a monolithic architecture with these key components:

```
📦 citytwin-ai-insights
 ┣ 📂 frontend (React.js)
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components
 ┃ ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📂 api
 ┃ ┃ ┣ 📂 hooks
 ┃ ┃ ┣ 📂 lib
 ┃ ┃ ┗ 📜 main.tsx
 ┃ ┣ 📜 index.html
 ┣ 📂 backend (FastAPI)
 ┃ ┣ 📂 app
 ┃ ┃ ┣ 📂 api
 ┃ ┃ ┣ 📂 models
 ┃ ┃ ┣ 📂 services
 ┃ ┃ ┗ 📜 main.py
 ┃ ┣ 📂 ml
 ┃ ┃ ┣ 📂 traffic
 ┃ ┃ ┣ 📂 air_quality
 ┃ ┃ ┗ 📂 energy
 ┣ 📂 database
 ┃ ┣ 📂 migrations
 ┃ ┣ 📂 schemas
 ┃ ┗ 📂 seeds
 ┣ 📂 docker
 ┃ ┣ 📜 Dockerfile.frontend
 ┃ ┣ 📜 Dockerfile.backend
 ┃ ┗ 📜 docker-compose.yml
 ┣ 📜 .env.example
 ┗ 📜 README.md
```

## Technology Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- shadcn/ui component library
- Recharts for data visualization
- Leaflet.js with React-Leaflet for mapping
- Axios for API requests
- React Query for state management

### Backend (Currently Mocked)
- FastAPI (Python)
- Pydantic for data validation
- SQLAlchemy for PostgreSQL integration
- PyMongo for MongoDB integration
- TensorFlow/PyTorch for ML models:
  - LSTM for traffic prediction
  - Regression models for air quality forecasting
  - K-means clustering for energy consumption patterns

### Database (Currently Mocked)
- PostgreSQL for structured data
- MongoDB for sensor data

### DevOps
- Docker & Docker Compose
- Environment variables for configuration

## Getting Started

### Prerequisites

- Node.js & npm
- Python 3.8+ (for backend once implemented)
- Docker & Docker Compose (for containerization)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd citytwin-ai-insights
```

2. Install frontend dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:8080
```

## Current Implementation Status

This repository currently provides a frontend implementation with mock API data. The backend FastAPI service and database integrations will be implemented in future versions.

## Future Development

- Implement the FastAPI backend with real AI models
- Connect to actual PostgreSQL and MongoDB databases
- Add real-time data integration with city IoT sensors
- Implement user authentication and authorization
- Add administrative tools for city managers
- Create mobile app versions

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenStreetMap for mapping data
- Recharts for visualization components
- Shadcn UI for the component library

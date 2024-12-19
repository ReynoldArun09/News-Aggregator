# Docker Setup

## Docker (Development)

1 Build Docker Image

- docker build -t news-aggregator-dev -f Dockerfile.dev .

2 Run Docker Image

- docker run -d -p 5173:5173 --name newsaggregator news-aggregator-dev

## Docker (build)

1 Build Docker Image

- docker build -t news-aggregator-build -f Dockerfile.build .

2 Run Docker Image

- docker run -d -p 5174:5174 --name newsaggregatorbuild news-aggregator-build

## Docker (docker compose)

1 Run Docker Compose

- docker-compose up

2 To stop

- docker-compose down

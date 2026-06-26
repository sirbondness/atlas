default:
    @just --list

frontend:
    cd frontend && npm run dev

backend:
    cd backend && .venv/bin/python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

install-frontend:
    cd frontend && npm install

install-backend:
    cd backend && python3 -m venv .venv && .venv/bin/python -m pip install --upgrade pip && .venv/bin/python -m pip install -r requirements.txt

install:
    just install-frontend
    just install-backend

dev:
    bash -c 'just frontend & just backend; wait'
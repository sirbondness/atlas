set shell := ["fish", "-c"]

default:
    @just --list


frontend:
    cd frontend && npm run dev

backend:
    cd backend && source .venv/bin/activate.fish && python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

install-backend:
    cd backend && python3 -m venv .venv && source .venv/bin/activate.fish && python -m pip install -r requirements.txt

install-frontend:
    cd frontend && npm install

install:
    just install-frontend
    just install-backend

dev:
    fish -c 'just frontend & just backend; wait'

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.status import router as status_router
from modules.docker import get_docker_status

app = FastAPI(title="Atlas API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(status_router)


@app.get("/")
async def root():
    return {"name": "Atlas API", "status": "running"}

@app.get("/docker")
async def docker():
    return get_docker_status()

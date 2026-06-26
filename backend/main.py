from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.v1.status import router as status_router
from api.v1.docker import router as docker_router

app = FastAPI(title="Atlas API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(status_router)
app.include_router(docker_router)


@app.get("/")
async def root():
    return {
        "name": "Atlas API",
        "status": "running",
        "version": "0.1.0",
    }
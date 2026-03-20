from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from logging import getLogger
from datetime import datetime, timezone
from Models import CustomerCreate


logger = getLogger(__name__)

startup_time: datetime | None = None


# ------------------------------------------------------------------------------
# Application Lifespan
# ------------------------------------------------------------------------------


@asynccontextmanager
async def lifespan(app: FastAPI):
    global startup_time
    startup_time = datetime.now(timezone.utc)
    logger.info("Application started at %s", startup_time.isoformat())
    yield
    logger.info("Application shutting down")


app = FastAPI(
    title="Hotel API",
    version="1.0.0",
    lifespan=lifespan,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["Status"])
def health_check():
    """Returns service health and uptime."""
    uptime_seconds = (
        (datetime.now(timezone.utc) - startup_time).total_seconds()
        if startup_time
        else None
    )
    return {
        "status": "healthy",
        "uptime_seconds": uptime_seconds,
        "started_at": startup_time.isoformat() if startup_time else None,
    }


@app.get("/", tags=["Status"])
def root():
    return {"message": "Hotel API is running", "version": "1.0.0"}


# ------------------------------------------------------------------------------
# Endpoints for Hotel
# ------------------------------------------------------------------------------


@app.post("/customer", tags=["Customer"], status_code=201)
def create_customer(customer: CustomerCreate):
    """Create a new customer record."""
    return {"message": "Customer created successfully", "customer": customer}

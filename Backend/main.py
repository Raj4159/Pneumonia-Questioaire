from fastapi import FastAPI
from routes.predict import router as predict_router
from routes.signup import router as signup_router
from routes.login import router as login_router
from routes.question import question_router
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the prediction router with a prefix
app.include_router(signup_router, prefix="/auth", tags=["signup"])
app.include_router(login_router, prefix="/auth", tags=["login"])
app.include_router(predict_router, prefix="/api", tags=["predict"])
app.include_router(question_router,prefix="/api",tags=["question"])


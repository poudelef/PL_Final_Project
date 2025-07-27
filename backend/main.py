from fastapi import FastAPI

from backend.apps.routes.users import router 
from backend.apps.routes.landlord import router as landlord_router
app = FastAPI()


app.include_router(router)
app.include_router(landlord_router)

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from learning_layer import SmartAI
from datetime import datetime
import uvicorn

app = FastAPI()
ai = SmartAI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# قاعدة بيانات مؤقتة
users = {}

@app.post("/chat")
async def chat(req: Request):
    data = await req.json()
    user_id = data.get("user_id")
    message = data.get("message")

    user = users.get(user_id, {"count": 0, "last_reset": datetime.now()})

    # نظام المجاني
    if user["count"] >= 6:
        return {"error": "limit reached (6 requests / 3 hours)"}

    response = ai.ask(message)

    user["count"] += 1
    users[user_id] = user

    return {"response": response}


@app.get("/")
def home():
    return {"status": "Nexora Running 🚀"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

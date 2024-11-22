Here is the full `README.md` markdown file:


# Plans API

This is a RESTful API for managing plans, allowing users to create, view, and filter plans.

---

## Installation

### Clone the Repository
```bash
git clone https://github.com/your-repo/plans-api.git
cd plans-api
```

### Install Dependencies
```bash
npm install
```

### Create a `.env` File
```bash
echo "MONGODB_URI=paste your mongodb uri" > .env
```

### Run the Server
```bash
npm start
```

The server will be accessible at `http://localhost:5000`.

---

## API Endpoints

### 1. Create a Plan

**HTTP Request:**
```http
POST /api/plans
Content-Type: application/json
```

**Request Body:**
```json
{
  "firstName": "Alice",
  "location": "Los Angeles",
  "category": "Social",
  "time": "4:00 PM",
  "date": "2024-12-01",
  "peopleInvited": 5,
  "longitude": -118.2437,
  "latitude": 34.0522
}
```

**Response:**
```json
{
  "message": "Plan created successfully",
  "plan": {
    "firstName": "Alice",
    "location": "Los Angeles",
    "category": "Social",
    "time": "4:00 PM",
    "date": "2024-12-01T00:00:00.000Z",
    "peopleInvited": 5,
    "status": "open",
    "coordinates": {
      "type": "Point",
      "coordinates": [-118.2437, 34.0522]
    },
    "createdBy": "USER_ID"
  }
}
```

---

### 2. Get All Plans

**HTTP Request:**
```http
GET /api/plans
```

**Response:**
```json
[
  {
    "_id": "PLAN_ID",
    "firstName": "Alice",
    "location": "Los Angeles",
    "category": "Social",
    "time": "4:00 PM",
    "date": "2024-12-01T00:00:00.000Z",
    "peopleInvited": 5,
    "status": "open",
    "coordinates": {
      "type": "Point",
      "coordinates": [-118.2437, 34.0522]
    },
    "createdBy": "USER_ID"
  }
]
```

---

### 3. Filter Plans

**HTTP Request:**
```http
GET /api/plans/filter
```

**Example Query Parameters:**
```http
?category=Social&dateFilter=upcoming
```

**Example for Location-based Filtering:**
```http
?latitude=34.0522&longitude=-118.2437&distance=10
```

**Response:**
```json
[
  {
    "_id": "PLAN_ID",
    "firstName": "Alice",
    "location": "Los Angeles",
    "category": "Social",
    "time": "4:00 PM",
    "date": "2024-12-01T00:00:00.000Z",
    "peopleInvited": 5,
    "status": "open",
    "coordinates": {
      "type": "Point",
      "coordinates": [-118.2437, 34.0522]
    },
    "createdBy": "USER_ID"
  }
]
```

---

## Database Models

### Plan Schema
```javascript
const planSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  time: { type: String, required: true },
  date: { type: Date, required: true },
  peopleInvited: { type: Number, required: true, min: 0, max: 8 },
  status: { type: String, enum: ['open', 'full'], default: 'open' },
  coordinates: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
```

---



## MongoDB Setup

### Start MongoDB
```bash
mongod
```

### `.env` File
```bash
MONGODB_URI=paste your mongodb uri
```

---

## Conclusion

This API provides functionalities for managing plans with features like filtering by date, category, and location. It also supports geospatial queries for location-based filtering.

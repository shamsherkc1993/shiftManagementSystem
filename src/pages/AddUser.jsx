import { UserContext } from "../useContext/UserContext";
import { useContext, useState } from "react";
import style from "./AddUser.module.css";
import { Row, Col, Form, Button } from "react-bootstrap";

const AddUser = () => {
  const { URL } = useContext(UserContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    level: "",
    country: "",
    username: "",
    zipCode: "",
    city: "",
    street: "",
    availableDays: [],
    startTime: "",
    endTime: "",
    workHour: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const days = new Set(prev.availableDays);
        checked ? days.add(value) : days.delete(value);
        return { ...prev, availableDays: Array.from(days) };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const formatTime = (datetimeStr) => {
    const d = new Date(datetimeStr);
    return d
      .toISOString()
      .split("T")
      .join("/")
      .split(".")[0]
      .replace(/-/g, "/");
  };

  const createUser = async (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      phone,
      level,
      country,
      username,
      zipCode,
      city,
      street,
      availableDays,
      startTime,
      endTime,
      workHour,
    } = formData;

    const availableDayObj = {
      sunday: availableDays.includes("Sunday"),
      monday: availableDays.includes("Monday"),
      tuesday: availableDays.includes("Tuesday"),
      wednesday: availableDays.includes("Wednesday"),
      thursday: availableDays.includes("Thursday"),
      friday: availableDays.includes("Friday"),
      saturday: availableDays.includes("Saturday"),
    };

    const finalUser = {
      id: Math.random().toString(36).substr(2, 4),
      Last_name: lastName,
      First_name: firstName,
      username: username,
      email: email,
      phone: phone,
      image: "https://unsplash.com/photos/man-wearing-gray-shirt-MYbhN8KaaEc",
      country: country,
      userLevel: level,
      address: [
        {
          ZipCode: zipCode,
          city: city,
          country: country,
          street: street,
        },
      ],
      shiftDetails: [
        {
          availableDay: [availableDayObj],
          startTime: formatTime(startTime),
          endTime: formatTime(endTime),
          totalWorkHour: workHour,
        },
      ],
    };

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalUser),
      });

      const result = await response.json();
      console.log(result);
      alert("User posted in correct format!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit");
    }
  };

  return (
    <div className={style.mainDiv}>
      <Row>
        <h3>Add New Employee Detail</h3>
        <Col>
          <Form onSubmit={createUser}>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>First name</Form.Label>
                <Form.Control
                  name="firstName"
                  required
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  name="lastName"
                  required
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" required onChange={handleChange} />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Phone</Form.Label>
                <Form.Control name="phone" required onChange={handleChange} />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Level</Form.Label>
                <Form.Control name="level" required onChange={handleChange} />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Country</Form.Label>
                <Form.Control name="country" required onChange={handleChange} />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  required
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Zip Code</Form.Label>
                <Form.Control name="zipCode" required onChange={handleChange} />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>City</Form.Label>
                <Form.Control name="city" required onChange={handleChange} />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Street</Form.Label>
                <Form.Control name="street" required onChange={handleChange} />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Available Days</Form.Label>
                <div>
                  {[
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ].map((day) => (
                    <div key={day}>
                      <input
                        type="checkbox"
                        name="availableDays"
                        value={day}
                        onChange={handleChange}
                      />
                      <label>{day}</label>
                    </div>
                  ))}
                </div>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                  name="startTime"
                  type="datetime-local"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>End Time</Form.Label>
                <Form.Control
                  name="endTime"
                  type="datetime-local"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Total Work Hour</Form.Label>
                <Form.Control
                  name="workHour"
                  type="number"
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <br />
            <Button type="submit">Submit Form</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default AddUser;

import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { UserContext } from "../useContext/UserContext";
import { useParams } from "react-router";

const UserEdit = () => {
  const { URL } = useContext(UserContext); // Get base URL from context
  const { id } = useParams(); // Get user ID from URL

  // Form data state
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

  // Fetch user data when component loads
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const res = await fetch(`${URL}/${id}`);
    const user = await res.json();

    // Get data from nested structure (if it exists)
    const shift = user.shiftDetails?.[0] || {};
    const address = user.address?.[0] || {};
    const available = shift.availableDay?.[0] || {};

    // Convert available days object to array of selected days
    const selectedDays = Object.keys(available).filter((day) => available[day]);

    // Update form with fetched data
    setFormData({
      firstName: user.First_name || "",
      lastName: user.Last_name || "",
      email: user.email || "",
      phone: user.phone || "",
      level: user.userLevel || "",
      country: user.country || "",
      username: user.username || "",
      zipCode: address.ZipCode || "",
      city: address.city || "",
      street: address.street || "",
      availableDays: selectedDays.map(
        (day) => day.charAt(0).toUpperCase() + day.slice(1)
      ),
      startTime: shift.startTime?.replaceAll("/", "-") || "",
      endTime: shift.endTime?.replaceAll("/", "-") || "",
      workHour: shift.totalWorkHour || "",
    });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkbox input (availableDays)
    if (type === "checkbox") {
      setFormData((prev) => {
        const days = new Set(prev.availableDays);
        if (checked) {
          days.add(value);
        } else {
          days.delete(value);
        }
        return { ...prev, availableDays: Array.from(days) };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Format datetime to match server format
  const formatDateTime = (date) => {
    const d = new Date(date);
    return d
      .toISOString()
      .split("T")
      .join("/")
      .split(".")[0]
      .replace(/-/g, "/");
  };

  // Submit updated user
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare days object
    const allDays = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const availableDay = {};
    allDays.forEach((day) => {
      availableDay[day] = formData.availableDays.includes(
        day.charAt(0).toUpperCase() + day.slice(1)
      );
    });

    // Create new object for user
    const updatedUser = {
      id: id,
      First_name: formData.firstName,
      Last_name: formData.lastName,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      image: "https://unsplash.com/photos/man-wearing-gray-shirt-MYbhN8KaaEc", // Example
      country: formData.country,
      userLevel: formData.level,
      address: [
        {
          ZipCode: formData.zipCode,
          city: formData.city,
          country: formData.country,
          street: formData.street,
        },
      ],
      shiftDetails: [
        {
          availableDay: [availableDay],
          startTime: formatDateTime(formData.startTime),
          endTime: formatDateTime(formData.endTime),
          totalWorkHour: formData.workHour,
        },
      ],
    };

    // Send PUT request to update user
    try {
      await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      alert("User updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div>
      <h3>Edit User</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col}>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Level</Form.Label>
            <Form.Control
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Country</Form.Label>
            <Form.Control
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col}>
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>City</Form.Label>
            <Form.Control
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col}>
            <Form.Label>Street</Form.Label>
            <Form.Control
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
            />
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
                    checked={formData.availableDays.includes(day)}
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
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Total Work Hour</Form.Label>
            <Form.Control
              name="workHour"
              type="number"
              value={formData.workHour}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <br />
        <Button type="submit" variant="success">
          Update User
        </Button>
      </Form>
    </div>
  );
};

export default UserEdit;

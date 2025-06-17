Repository: shamsherkc1993/shiftmanagementsystem
Files analyzed: 27

Estimated tokens: 50.4k

Directory structure:
└── shamsherkc1993-shiftmanagementsystem/
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
├── public/
└── src/
├── App.jsx
├── db.json
├── main.jsx
├── assets/
├── commonComponents/
│ ├── Buttons.jsx
│ ├── Footer.jsx
│ ├── Header.jsx
│ ├── MainContentTheme.jsx
│ ├── SideBar.jsx
│ ├── Sidebar.module.css
│ └── TableContent.jsx
├── customHooks/
│ └── AllHooks.jsx
├── pages/
│ ├── AddUser.jsx
│ ├── AddUser.module.css
│ ├── CreateNewShift.jsx
│ ├── Dashboard.jsx
│ ├── Dashboard.module.css
│ ├── Shift.jsx
│ ├── Shift.module.css
│ ├── UserEdit.jsx
│ ├── ViewUserDetail.jsx
│ └── ViewUserDetail.module.css
└── useContext/
└── UserContext.jsx

================================================
FILE: README.md
================================================

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

================================================
FILE: eslint.config.js
================================================
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
{ ignores: ['dist'] },
{
files: ['**/*.{js,jsx}'],
languageOptions: {
ecmaVersion: 2020,
globals: globals.browser,
parserOptions: {
ecmaVersion: 'latest',
ecmaFeatures: { jsx: true },
sourceType: 'module',
},
},
plugins: {
'react-hooks': reactHooks,
'react-refresh': reactRefresh,
},
rules: {
...js.configs.recommended.rules,
...reactHooks.configs.recommended.rules,
'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
'react-refresh/only-export-components': [
'warn',
{ allowConstantExport: true },
],
},
},
]

================================================
FILE: index.html
================================================

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SHIFTMANAGEMENT</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

================================================
FILE: package.json
================================================
{
"name": "shiftmanagement",
"private": true,
"version": "0.0.0",
"type": "module",
"scripts": {
"dev": "vite",
"build": "vite build",
"lint": "eslint .",
"preview": "vite preview"
},
"dependencies": {
"bootstrap": "^5.3.6",
"react": "^19.1.0",
"react-bootstrap": "^2.10.10",
"react-datetime-picker": "^6.0.1",
"react-dom": "^19.1.0",
"react-router": "^7.6.0"
},
"devDependencies": {
"@eslint/js": "^9.25.0",
"@types/react": "^19.1.2",
"@types/react-dom": "^19.1.2",
"@vitejs/plugin-react": "^4.4.1",
"eslint": "^9.25.0",
"eslint-plugin-react-hooks": "^5.2.0",
"eslint-plugin-react-refresh": "^0.4.19",
"globals": "^16.0.0",
"vite": "^6.3.5"
}
}

================================================
FILE: vite.config.js
================================================
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
plugins: [react()],
})

================================================
FILE: src/App.jsx
================================================
import SideBar from "./commonComponents/SideBar";
import MainContentTheme from "./commonComponents/MainContentTheme";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { UserContext } from "./useContext/UserContext";
import {
URL,
headingSVG,
filterSVG,
downloadSVG,
} from "./customHooks/AllHooks";
import { useNavigate } from "react-router";
function App() {
const [userDetailData, setUserDetailData] = useState([]);
async function getUserDetailData() {
let response = await fetch(URL);
let data = await response.json();
setUserDetailData(data);
}
useEffect(() => {
getUserDetailData();
}, []);

//CommonViewData page content
const [searchTerm, setSearchTerm] = useState("");
const [toast, setToast] = useState(null);
const [currentPage, setCurrentPage] = useState(1);
const [usersPerPage] = useState(5);
const indexOfLastUser = currentPage \* usersPerPage;
const indexOfFirstUser = indexOfLastUser - usersPerPage;

//filter part
const filteredUsers = userDetailData.filter(
(user) =>
user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
`${user.First_name} ${user.Last_name}`
.toLowerCase()
.includes(searchTerm.toLowerCase()) ||
user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
user.phone.toLowerCase().includes(searchTerm.toLowerCase())
);
const paginate = (pageNumber) => {
setCurrentPage(pageNumber);
};

const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

// delete function
const handleDelete = async (id) => {
let response = await fetch(`${URL}/${id}`, {
method: "delete",
});
await response.json();
setToast(id);
getUserDetailData();
};

//Edit user detail
const navigate = useNavigate();
const handleEdit = (id) => {
navigate("/edituser/" + id);
};

return (
<>
<UserContext.Provider
value={{
          userDetailData,
          setUserDetailData,
          URL,
          getUserDetailData,
          filterSVG,
          downloadSVG,
          filteredUsers,
          searchTerm,
          setSearchTerm,
          toast,
          setToast,
          currentPage,
          setCurrentPage,
          usersPerPage,
          indexOfLastUser,
          indexOfFirstUser,
          handleDelete,
          paginate,
          totalPages,
          currentUsers,
          navigate,
          handleEdit,
        }} >
<Container fluid>

<div
style={{
              width: "100%",
              backgroundColor: "#8d99ae",
              borderRadius: "5px",
            }} >
<h3 style={{ color: "#fff", textAlign: "center", padding: "15px" }}>
<span></span>
<svg
style={{
                  height: "40px",
                  width: "40px",
                  padding: "5px",
                  color: "#10d5cf",
                }}
id="Layer_1"
data-name="Layer 1"
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 119.92 122.88" >
<title>schedule-calendar</title>
<path d={headingSVG} />
</svg>
Shift Management <span style={{ color: "#10d5cf" }}>System</span>
</h3>
</div>
<Row>
<Col xs={2}>
<SideBar />
</Col>
<Col xs={10}>
<MainContentTheme />
</Col>
</Row>
</Container>
</UserContext.Provider>
</>
);
}

export default App;

================================================
FILE: src/db.json
================================================
{
"users": [
{
"id": "2",
"First_name": "Ervin",
"Last_name": "Howell",
"username": "Antonette",
"email": "Shanna@melissa.tv",
"phone": "010-692-6593 x091253",
"image": "https://unsplash.com/photos/man-wearing-gray-shirt-MYbhN8KaaEc",
"country": "USA",
"userLevel": "seniorw",
"address": [
{
"ZipCode": "Victor Plains",
"city": "Suite 879",
"country": "USA",
"street": "90566-7771"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": true,
"monday": true,
"tuesday": false,
"wednesday": false,
"thursday": false,
"friday": false,
"saturday": false
}
],
"startTime": "2025/05/29/10:50:00",
"endTime": "2025/05/29/10:50:00",
"totalWorkHour": "4"
}
]
},
{
"id": "3",
"Last_name": "Bauch",
"First_name": "Clementine",
"username": "Samantha",
"email": "Nathan@yesenia.net",
"phone": "1-463-123-4447",
"image": "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
"country": "Canada",
"userLevel": "mid-level",
"address": [
{
"ZipCode": "Douglas Extension",
"city": "Suite 847",
"country": "McKenziehaven",
"street": "59590-4157"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": true,
"monday": false,
"tuesday": true,
"wednesday": true,
"thursday": true,
"friday": false,
"saturday": true
}
],
"startTime": "2025/05/16/10:00:00",
"endTime": "2025/05/16/18:00:00",
"totalWorkHour": "8"
}
]
},
{
"id": "11",
"Last_name": "Graham",
"First_name": "Leanne",
"username": "Bret",
"email": "Sincere@april.biz",
"phone": "1-770-736-8031 x56442",
"image": "data:image/png;base64,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",
"country": "India",
"userLevel": "junior",
"address": [
{
"ZipCode": "Kulas Light",
"city": "Apt. 556",
"country": "Gwenborough",
"street": "92998-3874"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": true,
"monday": true,
"tuesday": false,
"wednesday": false,
"thursday": true,
"friday": false,
"saturday": true
}
],
"startTime": "2025/05/16/12:30:00",
"endTime": "2025/05/16/21:30:00",
"totalWorkHour": "10"
}
]
},
{
"id": "12",
"Last_name": "Howell",
"First_name": "Ervin",
"username": "Antonette",
"email": "Shanna@melissa.tv",
"phone": "010-692-6593 x09125",
"image": "data:image/jpeg;base64,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",
"country": "USA",
"userLevel": "senior",
"address": [
{
"ZipCode": "Victor Plains",
"city": "Suite 879",
"country": "Wisokyburgh",
"street": "90566-7771"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": false,
"monday": true,
"tuesday": true,
"wednesday": true,
"thursday": true,
"friday": true,
"saturday": false
}
],
"startTime": "2025/05/16/09:00:00",
"endTime": "2025/05/16/17:00:00",
"totalWorkHour": "8"
}
]
},
{
"id": "13",
"Last_name": "Bauch",
"First_name": "Clementine",
"username": "Samantha",
"email": "Nathan@yesenia.net",
"phone": "1-463-123-4447",
"image": "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
"country": "Canada",
"userLevel": "mid-level",
"address": [
{
"ZipCode": "Douglas Extension",
"city": "Suite 847",
"country": "McKenziehaven",
"street": "59590-4157"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": true,
"monday": false,
"tuesday": true,
"wednesday": true,
"thursday": true,
"friday": false,
"saturday": true
}
],
"startTime": "2025/05/16/10:00:00",
"endTime": "2025/05/16/18:00:00",
"totalWorkHour": "8"
}
]
},
{
"id": "14",
"Last_name": "Lebsack",
"First_name": "Patricia",
"username": "Karianne",
"email": "Julianne.OConner@kory.org",
"phone": "493-170-9623 x156",
"image": "https://unsplash.com/photos/woman-wearing-black-jacket-7YVZYZeITc8",
"country": "UK",
"userLevel": "junior",
"address": [
{
"ZipCode": "Hoeger Mall",
"city": "Apt. 692",
"country": "South Elvis",
"street": "53919-4257"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": false,
"monday": true,
"tuesday": true,
"wednesday": true,
"thursday": true,
"friday": true,
"saturday": false
}
],
"startTime": "2025/05/16/08:00:00",
"endTime": "2025/05/16/16:00:00",
"totalWorkHour": "8"
}
]
},
{
"id": "15",
"Last_name": "Dietrich",
"First_name": "Chelsey",
"username": "Kamren",
"email": "Lucio_Hettinger@annie.ca",
"phone": "(254)954-1289",
"image": "https://unsplash.com/photos/man-in-blue-shirt-LNRyGwIJr5c",
"country": "Australia",
"userLevel": "senior",
"address": [
{
"ZipCode": "Skiles Walks",
"city": "Suite 351",
"country": "Roscoeview",
"street": "33263"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": true,
"monday": true,
"tuesday": false,
"wednesday": true,
"thursday": true,
"friday": false,
"saturday": true
}
],
"startTime": "2025/05/16/11:00:00",
"endTime": "2025/05/16/19:00:00",
"totalWorkHour": "8"
}
]
},
{
"id": "16",
"Last_name": "Weissnat",
"First_name": "Dennis",
"username": "Leopoldo_Corkery",
"email": "Karley_Dach@jasper.info",
"phone": "1-477-935-8478 x6430",
"image": "https://unsplash.com/photos/man-wearing-black-sunglasses-6W4F62sN_yI",
"country": "Germany",
"userLevel": "mid-level",
"address": [
{
"ZipCode": "Norberto Crossing",
"city": "Apt. 950",
"country": "South Christy",
"street": "23505-1337"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": false,
"monday": true,
"tuesday": true,
"wednesday": true,
"thursday": true,
"friday": true,
"saturday": false
}
],
"startTime": "2025/05/16/07:00:00",
"endTime": "2025/05/16/15:00:00",
"totalWorkHour": "8"
}
]
},
{
"id": "7",
"Last_name": "Runolfsdottir",
"First_name": "Kurtis",
"username": "Elwyn.Skiles",
"email": "Telly.Hoeger@billy.biz",
"phone": "210.067.6132",
"image": "https://unsplash.com/photos/man-wearing-gray-shirt-MYbhN8KaaEc",
"country": "France",
"userLevel": "junior",
"address": [
{
"ZipCode": "Rex Trail",
"city": "Suite 280",
"country": "Howemouth",
"street": "58804-1099"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": true,
"monday": false,
"tuesday": true,
"wednesday": true,
"thursday": true,
"friday": false,
"saturday": true
}
],
"startTime": "2025/05/16/13:00:00",
"endTime": "2025/05/16/21:00:00",
"totalWorkHour": "8"
}
]
},
{
"id": "18",
"Last_name": "Reichert",
"First_name": "Nicholas",
"username": "Maxime_Nienow",
"email": "Sherwood@rosamond.me",
"phone": "586.493.6943 x140",
"image": "https://unsplash.com/photos/man-wearing-black-shirt-7YVZYZeITc8",
"country": "Japan",
"userLevel": "senior",
"address": [
{
"ZipCode": "Ellsworth Summit",
"city": "Suite 729",
"country": "Aliyaview",
"street": "45169"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": true,
"monday": true,
"tuesday": false,
"wednesday": true,
"thursday": true,
"friday": false,
"saturday": true
}
],
"startTime": "2025/05/16/14:00:00",
"endTime": "2025/05/16/22:00:00",
"totalWorkHour": "8"
}
]
},
{
"id": "19",
"Last_name": "DuBuque",
"First_name": "Glenna",
"username": "Delphine",
"email": "Chaim_McDermott@dana.io",
"phone": "(775)976-6794 x41206",
"image": "https://unsplash.com/photos/woman-wearing-white-shirt-NoW1WZ4wE3k",
"country": "Brazil",
"userLevel": "mid-level",
"address": [
{
"ZipCode": "Dayna Park",
"city": "Suite 449",
"country": "Bartholomebury",
"street": "76495-3109"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": false,
"monday": true,
"tuesday": true,
"wednesday": true,
"thursday": true,
"friday": true,
"saturday": false
}
],
"startTime": "2025/05/16/10:30:00",
"endTime": "2025/05/16/18:30:00",
"totalWorkHour": "8"
}
]
},
{
"id": "20",
"Last_name": "Morar",
"First_name": "Clementina",
"username": "Moriah.Stanton",
"email": "Rey.Padberg@karina.biz",
"phone": "024-648-3804",
"image": "https://unsplash.com/photos/woman-wearing-pink-top-JZo15KJsRyc",
"country": "Spain",
"userLevel": "junior",
"address": [
{
"ZipCode": "Kattie Turnpike",
"city": "Suite 198",
"country": "Lebsackbury",
"street": "31428-2261"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": true,
"monday": false,
"tuesday": true,
"wednesday": true,
"thursday": true,
"friday": false,
"saturday": true
}
],
"startTime": "2025/05/16/09:30:00",
"endTime": "2025/05/16/17:30:00",
"totalWorkHour": "8"
}
]
},
{
"id": "21",
"Last_name": "Graham",
"First_name": "Leanne",
"username": "Bret",
"email": "Sincere@april.biz",
"phone": "1-770-736-8031 x56442",
"image": "data:image/png;base64,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",
"country": "India",
"userLevel": "junior",
"address": [
{
"ZipCode": "Kulas Light",
"city": "Apt. 556",
"country": "Gwenborough",
"street": "92998-3874"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": true,
"monday": true,
"tuesday": false,
"wednesday": false,
"thursday": true,
"friday": false,
"saturday": true
}
],
"startTime": "2025/05/16/12:30:00",
"endTime": "2025/05/16/21:30:00",
"totalWorkHour": "10"
}
]
},
{
"id": "22",
"Last_name": "Howell",
"First_name": "Ervin",
"username": "Antonette",
"email": "Shanna@melissa.tv",
"phone": "010-692-6593 x09125",
"image": "data:image/jpeg;base64,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",
"country": "USA",
"userLevel": "senior",
"address": [
{
"ZipCode": "Victor Plains",
"city": "Suite 879",
"country": "Wisokyburgh",
"street": "90566-7771"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": false,
"monday": true,
"tuesday": true,
"wednesday": true,
"thursday": true,
"friday": true,
"saturday": false
}
],
"startTime": "2025/05/16/09:00:00",
"endTime": "2025/05/16/17:00:00",
"totalWorkHour": "8"
}
]
},
{
"id": "23",
"Last_name": "Bauch",
"First_name": "Clementine",
"username": "Samantha",
"email": "Nathan@yesenia.net",
"phone": "1-463-123-4447",
"image": "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
"country": "Canada",
"userLevel": "mid-level",
"address": [
{
"ZipCode": "Douglas Extension",
"city": "Suite 847",
"country": "McKenziehaven",
"street": "59590-4157"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": true,
"monday": false,
"tuesday": true,
"wednesday": true,
"thursday": true,
"friday": false,
"saturday": true
}
],
"startTime": "2025/05/16/10:00:00",
"endTime": "2025/05/16/18:00:00",
"totalWorkHour": "8"
}
]
},
{
"id": "24",
"Last_name": "Lebsack",
"First_name": "Patricia",
"username": "Karianne",
"email": "Julianne.OConner@kory.org",
"phone": "493-170-9623 x156",
"image": "https://unsplash.com/photos/woman-wearing-black-jacket-7YVZYZeITc8",
"country": "UK",
"userLevel": "junior",
"address": [
{
"ZipCode": "Hoeger Mall",
"city": "Apt. 692",
"country": "South Elvis",
"street": "53919-4257"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": false,
"monday": true,
"tuesday": true,
"wednesday": true,
"thursday": true,
"friday": true,
"saturday": false
}
],
"startTime": "2025/05/16/08:00:00",
"endTime": "2025/05/16/16:00:00",
"totalWorkHour": "8"
}
]
},
{
"id": "25",
"Last_name": "Dietrich",
"First_name": "Chelsey",
"username": "Kamren",
"email": "Lucio_Hettinger@annie.ca",
"phone": "(254)954-1289",
"image": "https://unsplash.com/photos/man-in-blue-shirt-LNRyGwIJr5c",
"country": "Australia",
"userLevel": "senior",
"address": [
{
"ZipCode": "Skiles Walks",
"city": "Suite 351",
"country": "Roscoeview",
"street": "33263"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": true,
"monday": true,
"tuesday": false,
"wednesday": true,
"thursday": true,
"friday": false,
"saturday": true
}
],
"startTime": "2025/05/16/11:00:00",
"endTime": "2025/05/16/19:00:00",
"totalWorkHour": "8"
}
]
},
{
"id": "26",
"Last_name": "Weissnat",
"First_name": "Dennis",
"username": "Leopoldo_Corkery",
"email": "Karley_Dach@jasper.info",
"phone": "1-477-935-8478 x6430",
"image": "https://unsplash.com/photos/man-wearing-black-sunglasses-6W4F62sN_yI",
"country": "Germany",
"userLevel": "mid-level",
"address": [
{
"ZipCode": "Norberto Crossing",
"city": "Apt. 950",
"country": "South Christy",
"street": "23505-1337"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": false,
"monday": true,
"tuesday": true,
"wednesday": true,
"thursday": true,
"friday": true,
"saturday": false
}
],
"startTime": "2025/05/16/07:00:00",
"endTime": "2025/05/16/15:00:00",
"totalWorkHour": "8"
}
]
},
{
"id": "27",
"Last_name": "Runolfsdottir",
"First_name": "Kurtis",
"username": "Elwyn.Skiles",
"email": "Telly.Hoeger@billy.biz",
"phone": "210.067.6132",
"image": "https://unsplash.com/photos/man-wearing-gray-shirt-MYbhN8KaaEc",
"country": "France",
"userLevel": "junior",
"address": [
{
"ZipCode": "Rex Trail",
"city": "Suite 280",
"country": "Howemouth",
"street": "58804-1099"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": true,
"monday": false,
"tuesday": true,
"wednesday": true,
"thursday": true,
"friday": false,
"saturday": true
}
],
"startTime": "2025/05/16/13:00:00",
"endTime": "2025/05/16/21:00:00",
"totalWorkHour": "8"
}
]
},
{
"id": "28",
"Last_name": "Reichert",
"First_name": "Nicholas",
"username": "Maxime_Nienow",
"email": "Sherwood@rosamond.me",
"phone": "586.493.6943 x140",
"image": "https://unsplash.com/photos/man-wearing-black-shirt-7YVZYZeITc8",
"country": "Japan",
"userLevel": "senior",
"address": [
{
"ZipCode": "Ellsworth Summit",
"city": "Suite 729",
"country": "Aliyaview",
"street": "45169"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": true,
"monday": true,
"tuesday": false,
"wednesday": true,
"thursday": true,
"friday": false,
"saturday": true
}
],
"startTime": "2025/05/16/14:00:00",
"endTime": "2025/05/16/22:00:00",
"totalWorkHour": "8"
}
]
},
{
"id": "29",
"Last_name": "DuBuque",
"First_name": "Glenna",
"username": "Delphine",
"email": "Chaim_McDermott@dana.io",
"phone": "(775)976-6794 x41206",
"image": "https://unsplash.com/photos/woman-wearing-white-shirt-NoW1WZ4wE3k",
"country": "Brazil",
"userLevel": "mid-level",
"address": [
{
"ZipCode": "Dayna Park",
"city": "Suite 449",
"country": "Bartholomebury",
"street": "76495-3109"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": false,
"monday": true,
"tuesday": true,
"wednesday": true,
"thursday": true,
"friday": true,
"saturday": false
}
],
"startTime": "2025/05/16/10:30:00",
"endTime": "2025/05/16/18:30:00",
"totalWorkHour": "8"
}
]
},
{
"id": "30",
"Last_name": "Morar",
"First_name": "Clementina",
"username": "Moriah.Stanton",
"email": "Rey.Padberg@karina.biz",
"phone": "024-648-3804",
"image": "https://unsplash.com/photos/woman-wearing-pink-top-JZo15KJsRyc",
"country": "Spain",
"userLevel": "junior",
"address": [
{
"ZipCode": "Kattie Turnpike",
"city": "Suite 198",
"country": "Lebsackbury",
"street": "31428-2261"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": true,
"monday": false,
"tuesday": true,
"wednesday": true,
"thursday": true,
"friday": false,
"saturday": true
}
],
"startTime": "2025/05/16/09:30:00",
"endTime": "2025/05/16/17:30:00",
"totalWorkHour": "8"
}
]
},
{
"id": "31",
"Last_name": "Graham",
"First_name": "Leanne",
"username": "Bret",
"email": "Sincere@april.biz",
"phone": "1-770-736-8031 x56442",
"image": "data:image/png;base64,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",
"country": "India",
"userLevel": "junior",
"address": [
{
"ZipCode": "Kulas Light",
"city": "Apt. 556",
"country": "Gwenborough",
"street": "92998-3874"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": true,
"monday": true,
"tuesday": false,
"wednesday": false,
"thursday": true,
"friday": false,
"saturday": true
}
],
"startTime": "2025/05/16/12:30:00",
"endTime": "2025/05/16/21:30:00",
"totalWorkHour": "10"
}
]
},
{
"id": "32",
"Last_name": "Howell",
"First_name": "Ervin",
"username": "Antonette",
"email": "Shanna@melissa.tv",
"phone": "010-692-6593 x09125",
"image": "data:image/jpeg;base64,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",
"country": "USA",
"userLevel": "senior",
"address": [
{
"ZipCode": "Victor Plains",
"city": "Suite 879",
"country": "Wisokyburgh",
"street": "90566-7771"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": false,
"monday": true,
"tuesday": true,
"wednesday": true,
"thursday": true,
"friday": true,
"saturday": false
}
],
"startTime": "2025/05/16/09:00:00",
"endTime": "2025/05/16/17:00:00",
"totalWorkHour": "8"
}
]
},
{
"id": "33",
"Last_name": "Bauch",
"First_name": "Clementine",
"username": "Samantha",
"email": "Nathan@yesenia.net",
"phone": "1-463-123-4447",
"image": "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
"country": "Canada",
"userLevel": "mid-level",
"address": [
{
"ZipCode": "Douglas Extension",
"city": "Suite 847",
"country": "McKenziehaven",
"street": "59590-4157"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": true,
"monday": false,
"tuesday": true,
"wednesday": true,
"thursday": true,
"friday": false,
"saturday": true
}
],
"startTime": "2025/05/16/10:00:00",
"endTime": "2025/05/16/18:00:00",
"totalWorkHour": "8"
}
]
},
{
"id": "34",
"Last_name": "samir",
"First_name": "khan",
"username": "Karianne",
"email": "Julianne.OConner@kory.org",
"phone": "493-170-9623 x156",
"image": "https://unsplash.com/photos/woman-wearing-black-jacket-7YVZYZeITc8",
"country": "UK",
"userLevel": "junior",
"address": [
{
"ZipCode": "Hoeger Mall",
"city": "Apt. 692",
"country": "South Elvis",
"street": "53919-4257"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": false,
"monday": true,
"tuesday": true,
"wednesday": true,
"thursday": true,
"friday": true,
"saturday": false
}
],
"startTime": "2025/05/16/08:00:00",
"endTime": "2025/05/16/16:00:00",
"totalWorkHour": "8"
}
]
},
{
"id": "35",
"Last_name": "Dietrich",
"First_name": "Chelsey",
"username": "Kamren",
"email": "Lucio_Hettinger@annie.ca",
"phone": "(254)954-1289",
"image": "https://unsplash.com/photos/man-in-blue-shirt-LNRyGwIJr5c",
"country": "Australia",
"userLevel": "senior",
"address": [
{
"ZipCode": "Skiles Walks",
"city": "Suite 351",
"country": "Roscoeview",
"street": "33263"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": true,
"monday": true,
"tuesday": false,
"wednesday": true,
"thursday": true,
"friday": false,
"saturday": true
}
],
"startTime": "2025/05/16/11:00:00",
"endTime": "2025/05/16/19:00:00",
"totalWorkHour": "8"
}
]
},
{
"id": "36",
"Last_name": "Weissnat",
"First_name": "Dennis",
"username": "Leopoldo_Corkery",
"email": "Karley_Dach@jasper.info",
"phone": "1-477-935-8478 x6430",
"image": "https://unsplash.com/photos/man-wearing-black-sunglasses-6W4F62sN_yI",
"country": "Germany",
"userLevel": "mid-level",
"address": [
{
"ZipCode": "Norberto Crossing",
"city": "Apt. 950",
"country": "South Christy",
"street": "23505-1337"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": false,
"monday": true,
"tuesday": true,
"wednesday": true,
"thursday": true,
"friday": true,
"saturday": false
}
],
"startTime": "2025/05/16/07:00:00",
"endTime": "2025/05/16/15:00:00",
"totalWorkHour": "8"
}
]
},
{
"id": "37",
"Last_name": "Runolfsdottir",
"First_name": "Kurtis",
"username": "Elwyn.Skiles",
"email": "Telly.Hoeger@billy.biz",
"phone": "210.067.6132",
"image": "https://unsplash.com/photos/man-wearing-gray-shirt-MYbhN8KaaEc",
"country": "France",
"userLevel": "junior",
"address": [
{
"ZipCode": "Rex Trail",
"city": "Suite 280",
"country": "Howemouth",
"street": "58804-1099"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": true,
"monday": false,
"tuesday": true,
"wednesday": true,
"thursday": true,
"friday": false,
"saturday": true
}
],
"startTime": "2025/05/16/13:00:00",
"endTime": "2025/05/16/21:00:00",
"totalWorkHour": "8"
}
]
},
{
"id": "38",
"Last_name": "Reichert",
"First_name": "Nicholas",
"username": "Maxime_Nienow",
"email": "Sherwood@rosamond.me",
"phone": "586.493.6943 x140",
"image": "https://unsplash.com/photos/man-wearing-black-shirt-7YVZYZeITc8",
"country": "Japan",
"userLevel": "senior",
"address": [
{
"ZipCode": "Ellsworth Summit",
"city": "Suite 729",
"country": "Aliyaview",
"street": "45169"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": true,
"monday": true,
"tuesday": false,
"wednesday": true,
"thursday": true,
"friday": false,
"saturday": true
}
],
"startTime": "2025/05/16/14:00:00",
"endTime": "2025/05/16/22:00:00",
"totalWorkHour": "8"
}
]
},
{
"id": "39",
"Last_name": "rakesh",
"First_name": "Nicholas",
"username": "Maxime_Nienow",
"email": "Sherwood@rosamond.me",
"phone": "586.493.6943 x140",
"image": "https://unsplash.com/photos/man-wearing-black-shirt-7YVZYZeITc8",
"country": "Japan",
"userLevel": "senior",
"address": [
{
"ZipCode": "Ellsworth Summit",
"city": "Suite 729",
"country": "Aliyaview",
"street": "45169"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": true,
"monday": true,
"tuesday": false,
"wednesday": true,
"thursday": true,
"friday": false,
"saturday": true
}
],
"startTime": "2025/05/16/14:00:00",
"endTime": "2025/05/16/22:00:00",
"totalWorkHour": "8"
}
]
},
{
"id": "39",
"Last_name": "ranish",
"First_name": "Nicholas",
"username": "Maxime_Nienow",
"email": "Sherwood@rosamond.me",
"phone": "586.493.6943 x140",
"image": "https://unsplash.com/photos/man-wearing-black-shirt-7YVZYZeITc8",
"country": "Japan",
"userLevel": "senior",
"address": [
{
"ZipCode": "Ellsworth Summit",
"city": "Suite 729",
"country": "Aliyaview",
"street": "45169"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": true,
"monday": true,
"tuesday": false,
"wednesday": true,
"thursday": true,
"friday": false,
"saturday": true
}
],
"startTime": "2025/05/16/14:00:00",
"endTime": "2025/05/16/22:00:00",
"totalWorkHour": "8"
}
]
},
{
"id": "1oxn",
"Last_name": "pandey",
"First_name": "lunika",
"username": "lunikakan",
"email": "lunika@gmail.com",
"phone": "578493934",
"image": "https://unsplash.com/photos/man-wearing-gray-shirt-MYbhN8KaaEc",
"country": "pakistan",
"userLevel": "senior",
"address": [
{
"ZipCode": "7583475",
"city": "lahore",
"country": "pakistan",
"street": "7583"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": true,
"monday": true,
"tuesday": false,
"wednesday": true,
"thursday": true,
"friday": false,
"saturday": false
}
],
"startTime": "2025/05/28/12:01:00",
"endTime": "2025/05/31/12:01:00",
"totalWorkHour": "20"
}
]
},
{
"id": "4hlj",
"Last_name": "bahadur",
"First_name": "hari",
"username": "haribdr",
"email": "hari@bahadur.com",
"phone": "987637",
"image": "https://unsplash.com/photos/man-wearing-gray-shirt-MYbhN8KaaEc",
"country": "japan",
"userLevel": "mid",
"address": [
{
"ZipCode": "7868",
"city": "osaka",
"country": "japan",
"street": "43989"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": true,
"monday": true,
"tuesday": false,
"wednesday": false,
"thursday": false,
"friday": false,
"saturday": false
}
],
"startTime": "2025/05/30/04:33:00",
"endTime": "2025/05/31/08:37:00",
"totalWorkHour": "10"
}
]
},
{
"id": "f6t8",
"Last_name": "bahadur",
"First_name": "hari kumar",
"username": "haribdr",
"email": "hari@bahadur.com",
"phone": "987637",
"image": "https://unsplash.com/photos/man-wearing-gray-shirt-MYbhN8KaaEc",
"country": "japan",
"userLevel": "mid",
"address": [
{
"ZipCode": "7868",
"city": "osaka",
"country": "japan",
"street": "43989"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": true,
"monday": true,
"tuesday": false,
"wednesday": false,
"thursday": false,
"friday": false,
"saturday": false
}
],
"startTime": "2025/05/30/04:33:00",
"endTime": "2025/05/31/08:37:00",
"totalWorkHour": "10"
}
]
},
{
"id": "jt58",
"Last_name": "katwal",
"First_name": "shyam",
"username": "shyam12",
"email": "shyam@test.com",
"phone": "97868",
"image": "https://unsplash.com/photos/man-wearing-gray-shirt-MYbhN8KaaEc",
"country": "india",
"userLevel": "senior",
"address": [
{
"ZipCode": "7678",
"city": "delhi",
"country": "india",
"street": "45678"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": true,
"monday": false,
"tuesday": false,
"wednesday": true,
"thursday": false,
"friday": false,
"saturday": false
}
],
"startTime": "2025/05/30/05:37:00",
"endTime": "2025/05/28/07:42:00",
"totalWorkHour": "8"
}
]
},
{
"id": "7lzi",
"Last_name": "gea",
"First_name": "fea",
"username": "gae",
"email": "gae",
"phone": "35423",
"image": "https://unsplash.com/photos/man-wearing-gray-shirt-MYbhN8KaaEc",
"country": "agd",
"userLevel": "adg",
"address": [
{
"ZipCode": "564",
"city": "vd",
"country": "agd",
"street": "345"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": true,
"monday": false,
"tuesday": false,
"wednesday": false,
"thursday": false,
"friday": false,
"saturday": false
}
],
"startTime": "2025/05/28/07:41:00",
"endTime": "2025/05/28/08:41:00",
"totalWorkHour": "43"
}
]
},
{
"id": "nxqk",
"Last_name": "gea",
"First_name": "gea",
"username": "af",
"email": "eag",
"phone": "54",
"image": "https://unsplash.com/photos/man-wearing-gray-shirt-MYbhN8KaaEc",
"country": "fea",
"userLevel": "gae",
"address": [
{
"ZipCode": "435",
"city": "a",
"country": "fea",
"street": "gae"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": false,
"monday": false,
"tuesday": false,
"wednesday": false,
"thursday": false,
"friday": true,
"saturday": false
}
],
"startTime": "2025/05/09/04:43:00",
"endTime": "2025/05/15/04:43:00",
"totalWorkHour": "3"
}
]
},
{
"id": "aafv",
"Last_name": "gae",
"First_name": "542",
"username": "aeg",
"email": "fea",
"phone": "fad",
"image": "https://unsplash.com/photos/man-wearing-gray-shirt-MYbhN8KaaEc",
"country": "gae",
"userLevel": "gae",
"address": [
{
"ZipCode": "gea",
"city": "gae",
"country": "gae",
"street": "gae"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": false,
"monday": false,
"tuesday": false,
"wednesday": false,
"thursday": false,
"friday": false,
"saturday": true
}
],
"startTime": "2025/05/14/04:46:00",
"endTime": "2025/05/06/04:46:00",
"totalWorkHour": "4"
}
]
},
{
"id": "qmpk",
"Last_name": "gae",
"First_name": "gea",
"username": "gea",
"email": "gea",
"phone": "3",
"image": "https://unsplash.com/photos/man-wearing-gray-shirt-MYbhN8KaaEc",
"country": "gae",
"userLevel": "ga",
"address": [
{
"ZipCode": "gae",
"city": "gae",
"country": "gae",
"street": "gae"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": false,
"monday": true,
"tuesday": false,
"wednesday": false,
"thursday": false,
"friday": false,
"saturday": false
}
],
"startTime": "2025/05/28/04:56:00",
"endTime": "2025/05/28/07:52:00",
"totalWorkHour": "4"
}
]
},
{
"id": "lyoq",
"Last_name": "gea",
"First_name": "eaf",
"username": "gea",
"email": "gae",
"phone": "aeg",
"image": "https://unsplash.com/photos/man-wearing-gray-shirt-MYbhN8KaaEc",
"country": "gea",
"userLevel": "gae",
"address": [
{
"ZipCode": "aeg",
"city": "gea",
"country": "gea",
"street": "gea"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": true,
"monday": false,
"tuesday": false,
"wednesday": false,
"thursday": false,
"friday": false,
"saturday": false
}
],
"startTime": "2025/05/28/09:54:00",
"endTime": "2025/05/23/04:54:00",
"totalWorkHour": "3"
}
]
},
{
"id": "orgt",
"Last_name": "ae",
"First_name": "fa",
"username": "age",
"email": "gea",
"phone": "ge",
"image": "https://unsplash.com/photos/man-wearing-gray-shirt-MYbhN8KaaEc",
"country": "gae",
"userLevel": "age",
"address": [
{
"ZipCode": "ge",
"city": "aeg",
"country": "gae",
"street": "aeg"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": false,
"monday": false,
"tuesday": true,
"wednesday": false,
"thursday": false,
"friday": false,
"saturday": false
}
],
"startTime": "2025/05/30/04:56:00",
"endTime": "2025/05/22/04:56:00",
"totalWorkHour": "3"
}
]
},
{
"id": "ch7o",
"Last_name": "gea",
"First_name": "gae",
"username": "gea",
"email": "eag",
"phone": "gea",
"image": "https://unsplash.com/photos/man-wearing-gray-shirt-MYbhN8KaaEc",
"country": "eag",
"userLevel": "gea",
"address": [
{
"ZipCode": "gea",
"city": "ega",
"country": "eag",
"street": "aeg"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": false,
"monday": false,
"tuesday": true,
"wednesday": false,
"thursday": false,
"friday": false,
"saturday": false
}
],
"startTime": "2025/05/23/04:57:00",
"endTime": "2025/05/22/04:57:00",
"totalWorkHour": "4"
}
]
},
{
"id": "zeve",
"Last_name": "gae",
"First_name": "gea",
"username": "aeg",
"email": "gae",
"phone": "age",
"image": "https://unsplash.com/photos/man-wearing-gray-shirt-MYbhN8KaaEc",
"country": "gea",
"userLevel": "gae",
"address": [
{
"ZipCode": "aeg",
"city": "aeg",
"country": "gea",
"street": "ega"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": false,
"monday": true,
"tuesday": false,
"wednesday": false,
"thursday": false,
"friday": false,
"saturday": false
}
],
"startTime": "2025/05/15/04:58:00",
"endTime": "2025/05/14/04:58:00",
"totalWorkHour": "3"
}
]
},
{
"id": "77h2",
"Last_name": "gae",
"First_name": "aef",
"username": "aeg",
"email": "gae",
"phone": "age",
"image": "https://unsplash.com/photos/man-wearing-gray-shirt-MYbhN8KaaEc",
"country": "gea",
"userLevel": "gae",
"address": [
{
"ZipCode": "aeg",
"city": "aeg",
"country": "gea",
"street": "ega"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": false,
"monday": true,
"tuesday": false,
"wednesday": false,
"thursday": false,
"friday": false,
"saturday": false
}
],
"startTime": "2025/05/15/04:58:00",
"endTime": "2025/05/14/04:58:00",
"totalWorkHour": "3"
}
]
},
{
"id": "5fso",
"Last_name": "ae",
"First_name": "aef",
"username": "eag",
"email": "aeg",
"phone": "gae",
"image": "https://unsplash.com/photos/man-wearing-gray-shirt-MYbhN8KaaEc",
"country": "eag",
"userLevel": "gae",
"address": [
{
"ZipCode": "gea",
"city": "aeg",
"country": "eag",
"street": "eag"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": false,
"monday": false,
"tuesday": true,
"wednesday": false,
"thursday": false,
"friday": false,
"saturday": false
}
],
"startTime": "2025/05/28/08:00:00",
"endTime": "2025/05/17/05:00:00",
"totalWorkHour": "3"
}
]
},
{
"id": "zix1",
"Last_name": "gea",
"First_name": "age",
"username": "aeg",
"email": "gea",
"phone": "gea",
"image": "https://unsplash.com/photos/man-wearing-gray-shirt-MYbhN8KaaEc",
"country": "gea",
"userLevel": "gea",
"address": [
{
"ZipCode": "ega",
"city": "eag",
"country": "gea",
"street": "ega"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": false,
"monday": true,
"tuesday": false,
"wednesday": false,
"thursday": false,
"friday": false,
"saturday": false
}
],
"startTime": "2025/05/15/05:02:00",
"endTime": "2025/05/14/05:02:00",
"totalWorkHour": "3"
}
]
},
{
"id": "ubyo",
"Last_name": "gea",
"First_name": "age",
"username": "aeg",
"email": "gea",
"phone": "gea",
"image": "https://unsplash.com/photos/man-wearing-gray-shirt-MYbhN8KaaEc",
"country": "gea",
"userLevel": "gea",
"address": [
{
"ZipCode": "ega",
"city": "eag",
"country": "gea",
"street": "ega"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": false,
"monday": true,
"tuesday": false,
"wednesday": false,
"thursday": false,
"friday": false,
"saturday": false
}
],
"startTime": "2025/05/15/05:02:00",
"endTime": "2025/05/14/05:02:00",
"totalWorkHour": "3"
}
]
},
{
"id": "mi7q",
"Last_name": "gea",
"First_name": "age",
"username": "aeg",
"email": "gea",
"phone": "gea",
"image": "https://unsplash.com/photos/man-wearing-gray-shirt-MYbhN8KaaEc",
"country": "gea",
"userLevel": "gea",
"address": [
{
"ZipCode": "ega",
"city": "eag",
"country": "gea",
"street": "ega"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": false,
"monday": true,
"tuesday": false,
"wednesday": false,
"thursday": false,
"friday": false,
"saturday": false
}
],
"startTime": "2025/05/15/05:02:00",
"endTime": "2025/05/14/05:02:00",
"totalWorkHour": "3"
}
]
},
{
"id": "3zhg",
"Last_name": "tw",
"First_name": "eq",
"username": "age",
"email": "eg@gmail.com",
"phone": "523",
"image": "https://unsplash.com/photos/man-wearing-gray-shirt-MYbhN8KaaEc",
"country": "ge",
"userLevel": "ge",
"address": [
{
"ZipCode": "34",
"city": "gae",
"country": "ge",
"street": "3"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": false,
"monday": false,
"tuesday": false,
"wednesday": false,
"thursday": false,
"friday": true,
"saturday": false
}
],
"startTime": "2025/05/16/08:26:00",
"endTime": "2025/05/02/08:26:00",
"totalWorkHour": "43"
}
]
},
{
"id": "gl19",
"Last_name": "t3",
"First_name": "e",
"username": "fae",
"email": "fe@gmai.com",
"phone": "34",
"image": "https://unsplash.com/photos/man-wearing-gray-shirt-MYbhN8KaaEc",
"country": "fa",
"userLevel": "fe",
"address": [
{
"ZipCode": "34",
"city": "fa",
"country": "fa",
"street": "34"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": false,
"monday": true,
"tuesday": false,
"wednesday": false,
"thursday": false,
"friday": false,
"saturday": false
}
],
"startTime": "2025/05/01/08:26:00",
"endTime": "2025/05/12/08:26:00",
"totalWorkHour": "34"
}
]
},
{
"id": "esq0",
"Last_name": "aef",
"First_name": "efa",
"username": "fae",
"email": "ea@gfa.com",
"phone": "34",
"image": "https://unsplash.com/photos/man-wearing-gray-shirt-MYbhN8KaaEc",
"country": "ef",
"userLevel": "ef",
"address": [
{
"ZipCode": "34",
"city": "fa",
"country": "ef",
"street": "234"
}
],
"shiftDetails": [
{
"availableDay": [
{
"sunday": true,
"monday": false,
"tuesday": false,
"wednesday": false,
"thursday": false,
"friday": false,
"saturday": false
}
],
"startTime": "2025/05/08/08:28:00",
"endTime": "2025/05/01/08:28:00",
"totalWorkHour": "34"
}
]
}
]
}

================================================
FILE: src/main.jsx
================================================
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css';
createRoot(document.getElementById('root')).render(
<BrowserRouter>
<App />
</BrowserRouter>
)

================================================
FILE: src/commonComponents/Buttons.jsx
================================================
import React from "react";
import { Button } from "react-bootstrap";

const Buttons = () => {
return (
<>
<Button style={{ padding: "5px 20px" }}>click</Button>
</>
);
};

export default Buttons;

================================================
FILE: src/commonComponents/Footer.jsx
================================================
import React from 'react'

const Footer = () => {
return (
<>

<h1>Footer</h1>
</>
)
}

export default Footer

================================================
FILE: src/commonComponents/Header.jsx
================================================
import React from "react";
import { Route, Routes } from "react-router";
import Dashboard from "../pages/Dashboard";
import Shift from "../pages/Shift";
import AddUser from "../pages/AddUser";
import CreateNewShift from "../pages/CreateNewShift";
import ViewUserDetail from "../pages/ViewUserDetail";
import UserEdit from "../pages/UserEdit";

const Header = () => {
return (
<>
<Routes>
<Route path="/" element={<Dashboard />}>
Dashboard
</Route>
<Route path="/viewshift" element={<Shift />} />
<Route path="/createshift" element={<CreateNewShift />} />
<Route path="/adduser" element={<AddUser />} />
<Route path="/viewuser" element={<ViewUserDetail />} />
<Route path="/edituser/:id" element={<UserEdit />} />
<Route path="/\*" element={<h1>pg not found</h1>} />
</Routes>
</>
);
};

export default Header;

================================================
FILE: src/commonComponents/MainContentTheme.jsx
================================================
import React from 'react'
import Header from './Header'

const MainContentTheme = () => {
return (
<>

<Header/>
</>
)
}

export default MainContentTheme

================================================
FILE: src/commonComponents/SideBar.jsx
================================================
import React from 'react'
import { Link } from 'react-router';
import Dashboard from '../pages/Dashboard';
import Shift from '../pages/Shift';
import style from './Sidebar.module.css'
import ViewUserDetail from '../pages/ViewUserDetail';

const SideBar = () => {
const dashBoardSVg = "M23.77 0h185.92c13.09 0 23.77 10.69 23.77 23.77v185.92c0 13.02-10.75 23.77-23.77 23.77H23.77C10.72 233.46 0 222.74 0 209.69V23.77C0 10.65 10.65 0 23.77 0zM302.3 278.5h185.93c13.02 0 23.77 10.75 23.77 23.77V488.2c0 13-10.78 23.77-23.77 23.77H302.3c-6.5 0-12.45-2.69-16.75-6.97-4.33-4.37-7.02-10.31-7.02-16.8V302.27c0-13.12 10.65-23.77 23.77-23.77zm181.91 27.78h-177.9v177.9h177.9v-177.9zM302.3 0h185.93C501.25 0 512 10.75 512 23.77v185.92c0 13.02-10.75 23.77-23.77 23.77H302.3c-13.05 0-23.77-10.72-23.77-23.77V23.77C278.53 10.65 289.18 0 302.3 0zm181.91 27.79h-177.9v177.88h177.9V27.79zM23.77 278.5h185.92c13.09 0 23.77 10.68 23.77 23.77V488.2c0 13.01-10.75 23.77-23.77 23.77H23.77C10.75 511.97 0 501.21 0 488.2V302.27c0-13.12 10.65-23.77 23.77-23.77zm181.9 27.78H27.79v177.9h177.88v-177.9zm0-278.49H27.79v177.88h177.88V27.79z"

const shiftSVG = "M294.24 17.11C294.24 7.69 303.53 0 315.1 0c11.59 0 20.87 7.64 20.87 17.11v74.84c0 9.43-9.28 17.12-20.87 17.12-11.57 0-20.86-7.65-20.86-17.12V17.11zm47.99 330.77 22.56 21.37 44.71-45.4c4.18-4.25 6.78-7.63 11.93-2.35l16.71 17.08c5.46 5.42 5.18 8.58.01 13.66l-63.85 62.74c-10.88 10.68-9 11.35-20.05.36l-40.14-39.9c-2.28-2.5-2.04-5 .45-7.52l19.38-20.07c2.93-3.04 5.26-2.85 8.29.03zm35.59-109.77c36.98 0 70.56 15.04 94.83 39.34 24.31 24.25 39.35 57.8 39.35 94.86 0 36.99-15.04 70.56-39.3 94.83-24.32 24.31-57.89 39.35-94.88 39.35-37.03 0-70.56-15.04-94.84-39.3-24.32-24.27-39.34-57.86-39.34-94.88 0-37.06 15.04-70.61 39.31-94.89l.69-.63c24.24-23.9 57.53-38.68 94.18-38.68zm78.74 55.41c-20.09-20.11-47.96-32.59-78.74-32.59-30.5 0-58.14 12.26-78.19 32.03l-.55.59c-20.15 20.15-32.62 48.01-32.62 78.76 0 30.75 12.46 58.6 32.61 78.75 20.1 20.13 47.98 32.6 78.75 32.6 30.76 0 58.65-12.47 78.77-32.59 20.11-20.11 32.58-48 32.58-78.76 0-30.75-12.47-58.61-32.61-78.79zM56.81 242.28c-1.18 0-2.24-5.2-2.24-11.57 0-6.38.94-11.53 2.24-11.53h56.94c1.19 0 2.25 5.2 2.25 11.53 0 6.39-.94 11.57-2.25 11.57H56.81zm90.78 0c-1.19 0-2.24-5.2-2.24-11.57 0-6.38.93-11.53 2.24-11.53h56.94c1.18 0 2.24 5.2 2.24 11.53 0 6.39-.94 11.57-2.24 11.57h-56.94zm90.77 0c-1.18 0-2.24-5.2-2.24-11.57 0-6.38.93-11.53 2.24-11.53h56.94c1.18 0 2.24 5.15 2.24 11.49a175.09 175.09 0 0 0-16.44 11.61h-42.74zM56.94 308.52c-1.18 0-2.24-5.2-2.24-11.57 0-6.39.93-11.59 2.24-11.59h56.94c1.18 0 2.24 5.2 2.24 11.59 0 6.37-.93 11.57-2.24 11.57H56.94zm90.77 0c-1.18 0-2.24-5.2-2.24-11.57 0-6.39.93-11.59 2.24-11.59h56.94c1.18 0 2.24 5.2 2.24 11.59 0 6.37-.93 11.57-2.24 11.57h-56.94zM57.06 374.8c-1.18 0-2.24-5.2-2.24-11.59 0-6.37.94-11.57 2.24-11.57H114c1.19 0 2.25 5.2 2.25 11.57 0 6.39-.94 11.59-2.25 11.59H57.06zm90.78 0c-1.19 0-2.25-5.2-2.25-11.59 0-6.37.94-11.57 2.25-11.57h56.94c1.18 0 2.24 5.2 2.24 11.57 0 6.39-.94 11.59-2.24 11.59h-56.94zM106.83 17.11c0-9.42 9.29-17.11 20.86-17.11 11.58 0 20.86 7.64 20.86 17.11v74.84c0 9.43-9.32 17.12-20.86 17.12-11.57 0-20.86-7.65-20.86-17.12V17.11zM22.98 163.64h397.39V77.46c0-2.94-1.18-5.53-3.08-7.43-1.9-1.9-4.61-3.08-7.44-3.08h-38.1c-6.37 0-11.57-5.2-11.57-11.57 0-6.38 5.2-11.58 11.57-11.58h38.1c9.34 0 17.7 3.77 23.82 9.88 6.13 6.14 9.88 14.5 9.88 23.83v136.81c-7.59-2.62-15.41-4.73-23.43-6.29v-21.38h.25H22.98v223.16c0 2.95 1.19 5.53 3.08 7.43 1.9 1.9 4.61 3.08 7.43 3.08h188.86c2.15 8.02 4.86 15.84 8.12 23.36H33.71c-9.3 0-17.7-3.75-23.82-9.89C3.77 427.72 0 419.36 0 410.02V77.55c0-9.29 3.77-17.7 9.89-23.82 6.12-6.13 14.48-9.89 23.82-9.89h40.68c6.37 0 11.57 5.2 11.57 11.57 0 6.39-5.2 11.59-11.57 11.59H33.71c-2.96 0-5.53 1.18-7.43 3.08-1.91 1.9-3.1 4.59-3.1 7.43v86.16h-.2v-.03zm158.95-96.69c-6.38 0-11.58-5.2-11.58-11.57 0-6.38 5.2-11.58 11.58-11.58h77.54c6.39 0 11.59 5.2 11.59 11.58 0 6.37-5.2 11.57-11.59 11.57h-77.54z";

const userSVG = "M252 223.98c12.02-.99 20.25-7.75 25.85-17.5l.04-.07c5.67-9.89 8.68-22.89 10.19-36.11.79-6.99 1.26-14.3 1.74-21.7 2.35-36.56 4.9-76.02 46.42-92.81a70.634 70.634 0 0 1 19.66-4.81c14.35-1.4 29 1.55 41.64 8.79 12.65 7.24 23.3 18.77 29.66 34.48 2.92 7.23 4.93 15.34 5.81 24.32v.16c-.12 22.05 3.41 53.02 12.99 75.74 6.9 16.34 16.92 28.37 30.93 29.51.57.04 1 .55.96 1.12l-.06.27c-2.6 7.34-14.6 12.99-28.95 15.74 21.34 5.19 36.15 11.45 46.18 22.5C507.4 277.2 512 297.44 512 331.06c0 2.22-1.8 4.02-4.02 4.02H340.75c.28-1.38.44-2.81.44-4.28v-13.99c0-12.25-3.13-24.11-8.54-34.95 10.16 4.16 20.36 6.46 30.57 6.77 26.58.8 53.74-11.89 81.55-40.27-4.04-.95-8.34-1.87-12.89-2.78l-.65-.14c-3.89-.77-9.37-1.86-15.02-3.43-1.95-.3-3.84-.66-5.66-1.11-5.66-1.37-10.65-3.48-14.38-6.41-5.7-4.46-8.53-10.76-6.63-19.19-17.06 10.65-34.98 10.61-51.95-.36l-1.09-.61c-.09 5-3.26 19.8-8.1 22.75-7.36 4.47-18.91 6.56-27.93 8.04-11.14-7.78-23.71-13.33-36.61-15.82-4.1-.79-8.22-1.59-12.17-2.52-.23-.46-.44-.93-.61-1.41-.19-.55.1-1.15.64-1.34l.28-.05zm-56.14-21.31c.21-.25.44-.47.7-.67l1.48-1.4c10.95-10.28 19.02-17.86 17.46-36.34-.05-.92.17-1.87.71-2.69a4.268 4.268 0 0 1 5.9-1.22c.76.5 1.53.9 2.31 1.18.64.24 1.26.38 1.83.41 1.11.06 1.68.06 1.83.02.15-.12.43-.86.83-2l5.44-15.4c.68-2.61.74-4.47.34-5.71-.17-.54-.46-.94-.83-1.18l-.16-.09c-.66-.35-1.6-.47-2.68-.38-2.39.18-5.18 1.33-7.66 3.21-.9.68-2.08 1.01-3.29.8a4.284 4.284 0 0 1-3.5-4.93c4.03-23.5 2.19-38.8-2.82-49.24-4.38-9.15-11.38-14.7-18.96-18.84-16.83 12.9-28.68 14.37-40.49 15.83-9.78 1.2-19.54 2.42-32.46 11.35-6.15 4.26-10.23 9.4-12.32 15.39-2.1 6.03-2.26 13.03-.56 20.95.26.86.25 1.8-.08 2.7-.81 2.22-3.27 3.35-5.49 2.54-1.28-.47-2.61-1.01-3.9-1.42-5.05-1.76-8.63-2.58-10.01.6-.11 1.01-.18 2.58-.23 4.2v.03c-.06 2.3-.06 4.71 0 5.96v.06c.15 2.96.8 6.88 2.22 10.17.89 2.08 2.07 3.83 3.54 4.67.73.41 1.56.6 2.42.61 1.06.02 2.24-.2 3.48-.57a4.273 4.273 0 0 1 5.66 3.93c.46 19.35 9.05 26.75 19.49 35.74l4.35 3.78c6.86 6.1 13.96 10.28 21.08 12.43 5.48 1.14 11.21 1.26 16.71.55 3.83-.5 7.52-1.4 10.94-2.63 4.94-2.33 9.79-5.74 14.48-10.27l2.24-2.13zm8.09 4.1c8.99 30 33.07 34.68 56.71 39.24 32.07 6.2 63.48 36.49 63.48 70.8v13.99c0 2.36-1.93 4.29-4.28 4.29H4.28c-2.36 0-4.28-1.93-4.28-4.29v-12.65c0-41.24 33.35-65.6 67.05-70.11 24.59-3.28 49.4-6.62 58.16-36.5l-.48-.43-4.26-3.72c-11.1-9.56-20.39-17.56-22.16-37.03l-.98.01c-2.27-.03-4.47-.55-6.53-1.72-3.31-1.88-5.63-5.09-7.19-8.71-1.86-4.31-2.69-9.33-2.89-13.12v-.08c-.06-1.39-.06-4.05 0-6.6v-.04c.07-2.21.18-4.36.35-5.58.05-.37.15-.71.28-1.04 2.33-6.48 5.89-8.58 10.59-8.45l-3.09-2.05c-1.68-20.97 3.23-57.35-19.54-64.23 43.08-53.24 92.73-82.19 130.02-34.84 44.92 2.36 62.93 73.74 27.11 103.79l-.21 1.76c1.41-.42 2.81-.69 4.15-.79 2.66-.21 5.19.22 7.33 1.35l.41.25c2.16 1.27 3.82 3.25 4.7 5.97.89 2.77.92 6.32-.25 10.66l-5.6 15.9c-.9 2.57-1.73 4.38-3.55 5.83l-.35.25c-1.8 1.28-3.99 1.76-7.25 1.59l-1.56-.17c-.36 17.68-9 25.84-20.31 36.47zm-6.42 6.75c-13.09 18.08-51.29 18.47-65.56 4.12-3.56 14.83-12.8 25.08-26.47 31.75 39.2 23.9 77.83 23.19 115.85-5.01-14.62-6.63-22.01-17.22-23.82-30.86zm198.82-13.45c18.17-20.1 23.01-33.65 20.61-60.73-.39-4.33-1.03-8.73-1.92-13.19-14.82-6.87-24.52-21.97-29.48-44.66-5.93 43.2-58.98 41.34-72.32 49.2 0 3.64-.09 7.07-.17 10.37-.61 22.23 1.04 34.06 12.23 51.81 1.87 2.97 3.7 5.84 5.91 8.22 17.82 19.22 48.29 16.82 65.14-1.02z"

const iconStyle = {height:'15px', width: '15px', marginRight: '5px'}

return (
<>

<div className={style.divStyle}>
<Link to='/' element={<Dashboard/>}> <svg style={iconStyle} xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 511.97"><path fillRule="nonzero" d={dashBoardSVg} /></svg>Dashboard</Link>

        <Link to='/addUser' element={<Shift/>}><svg style={iconStyle} xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 335.09"><path fillRule="nonzero" d={userSVG}/></svg>Add User</Link>

        <Link to='/viewuser' element={<ViewUserDetail/>}><svg style={iconStyle} xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 506.49"><path fillRule="nonzero" d={shiftSVG}/></svg>View User</Link>

        <Link to='/viewshift' element={<Shift/>}><svg style={iconStyle} xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 506.49"><path fillRule="nonzero" d={shiftSVG}/></svg>View Shift</Link>

        <Link to='/createshift' element={<ViewUserDetail/>}><svg style={iconStyle} xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 506.49"><path fillRule="nonzero" d={shiftSVG}/></svg>Create Shift</Link>








      </div>




    </>

)
}

export default SideBar

================================================
FILE: src/commonComponents/Sidebar.module.css
================================================
.divStyle {
background-color: #10d5cf;
height: 100vh;
padding: 10px;
border-radius: 5px;
}

.divStyle a {
display: block;
margin: 20px 0;
text-decoration: none;
color: #fff;
font-size: 18px;
font-weight: 700;
padding: 10px 0 10px 10px;
transition: 0.5s;
border-radius: 5px;
}

.divStyle a:hover,
.divStyle a:focus {
background-color: #8d99ae;
transition: 0.5s;
}

================================================
FILE: src/commonComponents/TableContent.jsx
================================================
import React from "react";
import { UserContext } from "../useContext/UserContext";
import { useContext } from "react";
import { Button, Table, Form, Pagination, Toast } from "react-bootstrap";
import style from "../pages/ViewUserDetail.module.css";
import editImg from "../assets/edit.png";
import deleteImg from "../assets/delete.png";

const TableContent = () => {
const { URL, searchTerm, handleDelete, currentUsers, handleEdit } =
useContext(UserContext);
return (
<>

<Table striped bordered hover>
<thead>
<tr>
<th>Profile</th>
<th>Name</th>
<th>Email</th>
<th>Phone</th>
<th>Level</th>
<th>Address</th>
<th>Shift</th>
<th>Action</th>
</tr>
</thead>
<tbody>
{currentUsers.length > 0 ? (
currentUsers.map((item) => (
<tr key={item.id}>
<td>
<img src={item.image} className={style.userImg} alt="User" />
</td>
<td>
{item.Last_name} {item.First_name}
</td>
<td>{item.email}</td>
<td>{item.phone}</td>
<td>{item.userLevel}</td>
<td>
{item.address.map((addr, addrIndex) => (
<div key={addrIndex}>
<p>
{addr.ZipCode}, {addr.country},
</p>
<p>
{addr.city}, {addr.street}
</p>
</div>
))}
</td>
<td>
{item.shiftDetails.map((shift, shiftIndex) => (
<div key={shiftIndex} className="shift-details">
<p>
{shift.startTime} - {shift.endTime}
</p>
</div>
))}
</td>
<td>
<Button
variant="none"
className={style.EditDeleteBtn}
onClick={() => handleEdit(item.id)} >
<img src={editImg} alt="edit" />
</Button>
<Button
variant="none"
className={style.EditDeleteBtn}
onClick={() => handleDelete(item.id)} >
<img src={deleteImg} alt="delete" className="img-fluid" />
</Button>
</td>
</tr>
))
) : (
<tr>
<td colSpan="9" className="text-center">
No users found matching "{searchTerm}"
</td>
</tr>
)}
</tbody>
</Table>
</>
);
};

export default TableContent;

================================================
FILE: src/customHooks/AllHooks.jsx
================================================
//main url link
export const URL = "http://localhost:3000/users";

//SVG Links
export const headingSVG =
"M108.68,122.88H11.24A11.28,11.28,0,0,1,0,111.64V22.55A11.28,11.28,0,0,1,11.24,11.31H21.61V25.14a12.35,12.35,0,0,0,4.67,9.61,14.55,14.55,0,0,0,18.31,0,12.35,12.35,0,0,0,4.67-9.61V11.31H70.2V25.14a12.35,12.35,0,0,0,4.67,9.61,14.55,14.55,0,0,0,18.31,0,12.35,12.35,0,0,0,4.67-9.61V11.31h10.83a11.3,11.3,0,0,1,11.24,11.24v89.09a11.27,11.27,0,0,1-11.24,11.24ZM83.58,56.77h16.1a2.07,2.07,0,0,1,2.06,2v13.4a2.07,2.07,0,0,1-2.06,2H83.58a2.06,2.06,0,0,1-2-2V58.82a2.05,2.05,0,0,1,2-2Zm-31.51,0H68.18a2.06,2.06,0,0,1,2,2v13.4a2.07,2.07,0,0,1-2,2H52.07a2.06,2.06,0,0,1-2-2V58.82a2.06,2.06,0,0,1,2-2Zm-31.84,0H36.34a2.06,2.06,0,0,1,2,2v13.4a2.07,2.07,0,0,1-2,2H20.23a2.06,2.06,0,0,1-2.05-2V58.82a2.05,2.05,0,0,1,2.05-2ZM83.58,85.26h16.1a2.07,2.07,0,0,1,2.06,2v13.4a2.06,2.06,0,0,1-2.06,2.05H83.58a2.06,2.06,0,0,1-2-2.05V87.31a2.06,2.06,0,0,1,2-2Zm-31.51,0H68.18a2.06,2.06,0,0,1,2,2v13.4a2.06,2.06,0,0,1-2,2.05H52.07a2.06,2.06,0,0,1-2-2.05V87.31a2.07,2.07,0,0,1,2-2Zm-31.84,0H36.34a2.06,2.06,0,0,1,2,2v13.4a2.06,2.06,0,0,1-2,2.05H20.23a2.06,2.06,0,0,1-2.05-2.05V87.31a2.06,2.06,0,0,1,2.05-2ZM78.6,4.45C78.6,2,81,0,84,0s5.43,2,5.43,4.45V25.14c0,2.46-2.42,4.45-5.43,4.45s-5.42-2-5.42-4.45V4.45ZM30,4.45C30,2,32.44,0,35.44,0s5.42,2,5.42,4.45V25.14c0,2.46-2.42,4.45-5.42,4.45S30,27.6,30,25.14V4.45ZM3.6,43.86v66.58a8.87,8.87,0,0,0,8.84,8.84h95a8.87,8.87,0,0,0,8.85-8.84V43.86Z";
export const filterSVG =
"M9.96,0h102.96c2.744,0,5.232,1.117,7.035,2.919c1.801,1.803,2.924,4.288,2.924,7.032v102.201 c0,2.74-1.123,5.229-2.924,7.031c-1.803,1.805-4.291,2.918-7.035,2.918H9.96c-2.745,0-5.233-1.113-7.035-2.918 C1.123,117.381,0,114.893,0,112.152V9.951c0-2.745,1.123-5.229,2.925-7.032C4.727,1.117,7.215,0,9.96,0L9.96,0z M80.629,41.732 h7.365V17.8c0-1.031,0.416-1.96,1.088-2.634c0.678-0.674,1.605-1.088,2.633-1.088c1.029,0,1.961,0.414,2.631,1.088 c0.674,0.674,1.092,1.603,1.092,2.634v23.932h7.359c2.205,0,4.01,1.804,4.01,4.009l0,0c0,2.206-1.805,4.009-4.01,4.009h-7.359 v36.488c0,1.027-0.418,1.959-1.092,2.629c-0.67,0.672-1.602,1.092-2.631,1.092c-1.027,0-1.955-0.42-2.633-1.092 c-0.672-0.67-1.088-1.602-1.088-2.629V49.75h-7.365c-2.205,0-4.008-1.804-4.008-4.009l0,0 C76.621,43.536,78.424,41.732,80.629,41.732L80.629,41.732z M50.165,58.956h7.362V17.8c0-1.031,0.417-1.96,1.091-2.634 c0.671-0.674,1.603-1.088,2.633-1.088c1.022,0,1.956,0.414,2.628,1.088c0.674,0.674,1.088,1.603,1.088,2.634v41.155h7.365 c2.205,0,4.01,1.804,4.01,4.009l0,0c0,2.205-1.805,4.01-4.01,4.01h-7.365v19.264c0,1.027-0.414,1.959-1.088,2.629 c-0.672,0.672-1.605,1.092-2.628,1.092c-1.031,0-1.962-0.42-2.633-1.092c-0.674-0.67-1.091-1.602-1.091-2.629V66.975h-7.362 c-2.205,0-4.009-1.805-4.009-4.01l0,0C46.155,60.759,47.959,58.956,50.165,58.956L50.165,58.956z M19.971,41.35h7.194V17.8 c0-1.031,0.419-1.96,1.094-2.634c0.671-0.674,1.603-1.088,2.63-1.088c1.026,0,1.957,0.414,2.631,1.088 c0.674,0.674,1.088,1.603,1.088,2.634V41.35h7.53c2.205,0,4.009,1.804,4.009,4.009l0,0c0,2.205-1.804,4.009-4.009,4.009h-7.53 v36.871c0,1.027-0.415,1.959-1.088,2.629c-0.674,0.672-1.605,1.092-2.631,1.092c-1.028,0-1.959-0.42-2.63-1.092 c-0.674-0.67-1.094-1.602-1.094-2.629V49.368h-7.194c-2.205,0-4.009-1.804-4.009-4.009l0,0 C15.962,43.153,17.766,41.35,19.971,41.35L19.971,41.35z M91.715,95.18c2.205,0,4.203,0.895,5.658,2.346l0.006-0.004 c1.449,1.451,2.346,3.453,2.346,5.668c0,2.199-0.896,4.201-2.346,5.652l-0.012,0.018c-1.455,1.445-3.457,2.338-5.652,2.338 c-2.209,0-4.213-0.896-5.662-2.344l-0.123-0.139c-1.377-1.439-2.227-3.387-2.227-5.525c0-2.215,0.9-4.217,2.35-5.668 C87.502,96.074,89.506,95.18,91.715,95.18L91.715,95.18z M94.449,100.447c-0.691-0.693-1.66-1.123-2.734-1.123 c-1.064,0-2.033,0.432-2.732,1.131c-0.697,0.697-1.135,1.662-1.135,2.734c0,1.025,0.4,1.955,1.043,2.646l0.092,0.084 c0.699,0.699,1.668,1.131,2.732,1.131c1.074,0,2.043-0.426,2.734-1.123l0.008-0.008c0.691-0.695,1.127-1.662,1.127-2.73 c0-1.072-0.436-2.037-1.135-2.734l0.006-0.002L94.449,100.447L94.449,100.447z M61.249,95.18c2.205,0,4.207,0.895,5.658,2.346 l0.004-0.004c1.451,1.451,2.35,3.453,2.35,5.668c0,2.205-0.898,4.203-2.354,5.658l0.004,0.006 c-1.445,1.447-3.451,2.344-5.662,2.344c-2.202,0-4.199-0.896-5.655-2.344l-0.014-0.018c-1.448-1.451-2.339-3.447-2.339-5.646 c0-2.215,0.897-4.217,2.348-5.668l0.132-0.123C57.159,96.025,59.109,95.18,61.249,95.18L61.249,95.18z M63.982,100.447 c-0.697-0.693-1.662-1.123-2.734-1.123c-1.028,0-1.959,0.391-2.648,1.037l-0.083,0.094c-0.7,0.697-1.134,1.662-1.134,2.734 c0,1.068,0.428,2.035,1.125,2.73l0.009,0.008c0.691,0.697,1.659,1.123,2.73,1.123c1.068,0,2.031-0.432,2.734-1.131l0.006,0.002 l0.002-0.002c0.695-0.695,1.123-1.662,1.123-2.73c0-1.072-0.432-2.037-1.131-2.734l0.006-0.002L63.982,100.447L63.982,100.447z M30.89,95.18c2.211,0,4.216,0.895,5.661,2.342c1.451,1.451,2.351,3.453,2.351,5.668c0,2.205-0.9,4.203-2.354,5.658l0.003,0.006 c-1.445,1.447-3.45,2.344-5.661,2.344c-2.202,0-4.201-0.896-5.658-2.344l-0.012-0.018c-1.448-1.451-2.342-3.447-2.342-5.646 c0-2.215,0.896-4.217,2.348-5.668l0.131-0.123C26.797,96.025,28.748,95.18,30.89,95.18L30.89,95.18z M33.621,100.455 c-0.697-0.699-1.665-1.131-2.731-1.131c-1.028,0-1.959,0.391-2.647,1.037l-0.085,0.094c-0.7,0.697-1.131,1.662-1.131,2.734 c0,1.068,0.429,2.035,1.123,2.73l0.009,0.008c0.691,0.697,1.662,1.123,2.733,1.123c1.066,0,2.034-0.432,2.731-1.131l0.006,0.002 l0.003-0.002c0.696-0.695,1.125-1.662,1.125-2.73C34.754,102.117,34.323,101.152,33.621,100.455L33.621,100.455z M112.92,4.981 H9.96c-1.369,0-2.611,0.56-3.51,1.463c-0.903,0.9-1.463,2.145-1.463,3.507v102.201c0,1.361,0.56,2.607,1.463,3.506 c0.899,0.906,2.142,1.461,3.51,1.461h102.96c1.369,0,2.611-0.555,3.51-1.461c0.902-0.898,1.463-2.145,1.463-3.506V9.951 c0-1.363-0.561-2.607-1.463-3.507C115.531,5.541,114.289,4.981,112.92,4.981L112.92,4.981z";
export const downloadSVG =
"M.723 313.756c-2.482-10.26 1.698-18.299 8.38-23.044a23.417 23.417 0 018.018-3.632c2.877-.7 5.88-.865 8.764-.452 8.127 1.166 15.534 6.417 18.013 16.677a632.525 632.525 0 014.317 19.091c1.566 7.418 2.52 12.234 3.418 16.772 4.445 22.443 7.732 36.512 16.021 43.526 8.775 7.423 25.366 9.985 57.167 9.985h268.042c29.359 0 44.674-2.807 52.736-10.093 7.768-7.023 10.805-20.735 14.735-41.777l.007-.043a1038.93 1038.93 0 013.426-17.758c1.298-6.427 2.722-13.029 4.34-19.703 2.484-10.256 9.886-15.503 18.008-16.677 2.861-.41 5.846-.242 8.722.449 2.905.699 5.679 1.935 8.068 3.633 6.672 4.741 10.843 12.762 8.38 22.997l-.011.044a494.136 494.136 0 00-3.958 17.974c-1.011 5.023-2.169 11.215-3.281 17.178l-.008.043c-5.792 31.052-10.544 52.357-26.462 67.319-15.681 14.741-40.245 20.977-84.699 20.977H124.823c-46.477 0-72.016-5.596-88.445-20.144-16.834-14.909-21.937-36.555-28.444-69.403-1.316-6.654-2.582-13.005-3.444-17.126-1.213-5.781-2.461-11.434-3.767-16.813zm165.549-143.439l65.092 68.466.204-160.91h47.595l-.204 160.791 66.774-70.174 34.53 32.848-125.184 131.556-123.336-129.729 34.529-32.848zm65.325-115.413l.028-22.041h47.594l-.028 22.041h-47.594zm.046-36.254L231.666 0h47.595l-.024 18.65h-47.594z";

================================================
FILE: src/pages/AddUser.jsx
================================================
import { UserContext } from "../useContext/UserContext";
import { useContext, useState } from "react";
import style from "./AddUser.module.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import ViewUserDetail from "./ViewUserDetail";

const AddUser = () => {
const { URL } = useContext(UserContext);
const [addMessage, setAddMessage] = useState("");
console.log(addMessage);

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
      setAddMessage(result);
    } catch (err) {
      console.error(err);
      alert("Failed to submit");
    }

};

const resetForm = () => {
setFormData({
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
setAddMessage("");
};

return (

<div className={style.mainDiv}>
{!addMessage ? (
<>
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
type="text"
/>
</Form.Group>
<Form.Group as={Col}>
<Form.Label>Last name</Form.Label>
<Form.Control
name="lastName"
required
onChange={handleChange}
type="text"
/>
</Form.Group>
<Form.Group as={Col}>
<Form.Label>Email</Form.Label>
<Form.Control
name="email"
required
onChange={handleChange}
type="email"
/>
</Form.Group>
</Row>
<Row className="mb-4">
<Form.Group as={Col}>
<Form.Label>Phone</Form.Label>
<Form.Control
name="phone"
required
onChange={handleChange}
type="phone"
/>
</Form.Group>
<Form.Group as={Col}>
<Form.Label>Level</Form.Label>
<Form.Control
name="level"
required
onChange={handleChange}
type="text"
/>
</Form.Group>
<Form.Group as={Col}>
<Form.Label>Country</Form.Label>
<Form.Control
name="country"
required
onChange={handleChange}
type="text"
/>
</Form.Group>
</Row>
<Row className="mb-4">
<Form.Group as={Col}>
<Form.Label>Username</Form.Label>
<Form.Control
name="username"
required
onChange={handleChange}
type="text"
/>
</Form.Group>
<Form.Group as={Col}>
<Form.Label>Zip Code</Form.Label>
<Form.Control
name="zipCode"
required
onChange={handleChange}
type="number"
/>
</Form.Group>
<Form.Group as={Col}>
<Form.Label>City</Form.Label>
<Form.Control
name="city"
required
onChange={handleChange}
type="text"
/>
</Form.Group>
</Row>
<Row className="mb-4">
<Form.Group as={Col}>
<Form.Label>Street</Form.Label>
<Form.Control
name="street"
required
onChange={handleChange}
type="number"
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
<Button type="submit" variant="success">
Submit Form
</Button>
</Form>
</Col>
</Row>
</>
) : (
<>
<h3 style={{ color: "brown" }}>New User Added</h3>
<ViewUserDetail />
<br />
<Button onClick={resetForm} variant="primary">
Add New Employee
</Button>
</>
)}
</div>
);
};

export default AddUser;

================================================
FILE: src/pages/AddUser.module.css
================================================
.mainDiv {
font-size: 12px;
border: 1px solid #8d99ae;
border-radius: 5px;
padding: 30px;
}
.checkboxLabel {
margin-left: 10px;
}

.mainDiv h3 {
padding-bottom: 30px;
color: #10d5cf;
}

================================================
FILE: src/pages/CreateNewShift.jsx
================================================
import React from 'react'

const CreateNewShift = () => {
return (
<>

<h1>create new shift</h1>
</>
)
}

export default CreateNewShift

================================================
FILE: src/pages/Dashboard.jsx
================================================
import React, { useState } from "react";
import style from "./Dashboard.module.css";
import { UserContext } from "../useContext/UserContext";
import { useContext } from "react";
import { Container, Col, Row, Pagination } from "react-bootstrap";

const Dashboard = () => {
const { userDetailData } = useContext(UserContext);
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(40);

const indexOfLastItem = currentPage \* itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = userDetailData.slice(indexOfFirstItem, indexOfLastItem);
const totalPages = Math.ceil(userDetailData.length / itemsPerPage);

const paginate = (pageNumber) => setCurrentPage(pageNumber);

return (
<>

<div className={style.maindiv}>
<Container>
<Row>
<h3>All Employee List</h3>
<Col className={style.cols}>
{currentItems.map((user) => (
<p className={style.para} key={user.id}>
{user.First_name} {user.Last_name}
</p>
))}

              {userDetailData.length > itemsPerPage && (
                <Pagination className="mt-3">
                  <Pagination.First
                    onClick={() => paginate(1)}
                    disabled={currentPage === 1}
                  />
                  <Pagination.Prev
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  />

                  {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}

                  <Pagination.Next
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                  <Pagination.Last
                    onClick={() => paginate(totalPages)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>

);
};

export default Dashboard;

================================================
FILE: src/pages/Dashboard.module.css
================================================
.maindiv {
border: 1px solid #8d99ae;
border-radius: 5px;
padding-top: 20px;
padding-left: 20px;
}
.maindiv h3 {
padding-bottom: 30px;
color: #10d5cf;
}

.cols {
display: flex;
flex-wrap: wrap;
}
.para {
padding: 10px 20px;
flex: 20%;
border: 1px solid #10d5cf;
margin: 5px;
color: #a5b8b7;
transition: 0.5s;
}

.para:hover,
.para:focus {
border: 1px solid #023634;
transition: 0.5s;
}

================================================
FILE: src/pages/Shift.jsx
================================================
import React from 'react'
import { useContext } from 'react';
import { Button, Table, Form, Pagination} from 'react-bootstrap';
import style from './Shift.module.css'
import { UserContext } from '../useContext/UserContext';

const Shift = () => {
// const {userDetailData} = useContext(UserContext)

return (
<>

<div className={style.maindiv}>
<h3>hi</h3>
<div className={style.secondMainDiv}>
<Table striped bordered hover size="sm">
<thead>
<tr>
<th>#</th>
<th>Year</th>
<th>Month</th>
<th>Date</th>
<th>Employee</th>
<th>Action</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>2025</td>
<td>05</td>
<td>25</td>
<td>Ram</td>
<td>edit</td>

              </tr>
            </tbody>
          </Table>
        </div>
      </div>

    </>

)
}

export default Shift

================================================
FILE: src/pages/Shift.module.css
================================================
.maindiv {
border: 1px solid #8d99ae;
padding-top: 10px;
}

.maindiv h3 {
padding-left: 40px;
}

.secondMainDiv {
font-size: 12px;
}

================================================
FILE: src/pages/UserEdit.jsx
================================================
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

================================================
FILE: src/pages/ViewUserDetail.jsx
================================================
import { UserContext } from "../useContext/UserContext";
import { useContext } from "react";
import { Form, Pagination } from "react-bootstrap";
import style from "./ViewUserDetail.module.css";
import TableContent from "../commonComponents/TableContent";

const ViewUserDetail = () => {
const {
URL,
filterSVG,
downloadSVG,
filteredUsers,
searchTerm,
toast,
setSearchTerm,
currentPage,
setCurrentPage,
usersPerPage,
paginate,
totalPages,
} = useContext(UserContext);

return (
<>

<div className={style.mainDiv}>
{!toast ? (
<div className={style.secondDiv}>
<Form.Control
type="search"
placeholder="Search by name, email, phone..."
className={style.searchFeild}
value={searchTerm}
onChange={(e) => {
setSearchTerm(e.target.value);
setCurrentPage(1); // Reset to first page when searching
}}
/>
<a href="#" className={style.topBtn}>
<svg
                className={style.styleSVG}
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnslink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="122.879px"
                height="122.102px"
                viewBox="0 0 122.879 122.102"
                enableBackground="new 0 0 122.879 122.102"
                xmlSpace="preserve"
              >
<g>
<path d={filterSVG} />
</g>
</svg>{" "}
Filters
</a>

            <a href="#" className={style.topBtn}>
              <svg
                className={style.styleSVG}
                xmlns="http://www.w3.org/2000/svg"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                imageRendering="optimizeQuality"
                fillRule="evenodd"
                clipRule="evenodd"
                viewBox="0 0 512 437.242"
              >
                <path fillRule="nonzero" d={downloadSVG} />
              </svg>{" "}
              Download
            </a>
          </div>
        ) : (
          <h3 className={style.toast}>USER {toast} DELETED</h3>
        )}

        <TableContent />
        {filteredUsers.length > usersPerPage && (
          <div className="d-flex justify-content-center mt-3">
            <Pagination>
              <Pagination.First
                onClick={() => paginate(1)}
                disabled={currentPage === 1}
              />
              <Pagination.Prev
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              />

              {/* Show page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </Pagination.Item>
                )
              )}

              <Pagination.Next
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
              <Pagination.Last
                onClick={() => paginate(totalPages)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        )}
      </div>
    </>

);
};

export default ViewUserDetail;

================================================
FILE: src/pages/ViewUserDetail.module.css
================================================
.mainDiv {
border: 1px solid #8d99ae;
border-radius: 5px;
padding-top: 20px;
padding-left: 20px;
}

.secondDiv {
margin-bottom: 10px;
display: flex;
}

.userImg {
height: 40px;
width: 40px;
}

.searchFeild {
width: 80vh !important;
height: 50px;
}
.styleSVG {
height: 20px;
width: 20px;
}
.mainDiv table {
font-size: 12px;
}

.EditDeleteBtn img {
height: 20px;
width: 20px;
}

.topBtn {
margin: 10px 30px;
text-decoration: none;
color: #8d99ae;
}

tbody,
td,
tfoot,
th,
thead,
tr {
padding-top: 28px !important;
}

.toast {
text-align: center;
padding: 5px;
font-weight: 500;
font-size: 14px;
color: brown;
}

================================================
FILE: src/useContext/UserContext.jsx
================================================
import { createContext } from "react";

export const UserContext = createContext(null); //default value

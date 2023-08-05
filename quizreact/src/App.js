import React from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/Auth/Login";

//import Sidebar from "./components/SideBar";

import Users from "./pages/Users/Users-List";
import AddNewUsers from "./pages/Users/Add-New-Users";
import EditUsers from "./pages/Users/Edit-Users";

import Subjects from "./pages/Subjects/Subjects-List";
import AddNewSubjects from "./pages/Subjects/Add-New-Subjects";
import EditSubjects from "./pages/Subjects/Edit-Subjects";

import SubjectLevel from "./pages/SubjectLevel/Subjectlevel-List";
import AddNewSubjectLevel from "./pages/SubjectLevel/Add-New-Subjectlevel";
import EditSubjectLevel from "./pages/SubjectLevel/Edit-Subjectlevel";

import SubLevel from "./pages/SubLevel/Sublevel-List";
import AddNewSubLevel from "./pages/SubLevel/Add-New-Sublevel";
import EditSubLevel from "./pages/SubLevel/Edit-Sublevel";

import Topics from "./pages/Topics/Topics-List";
import AddNewTopics from "./pages/Topics/Add-New-Topics";
import EditTopics from "./pages/Topics/Edit-Topics";

import Questions from "./pages/Questions/Question-List";
import AddNewQuestions from "./pages/Questions/Add-New-Question";
import EditQuestions from "./pages/Questions/Edit-Question";

import TryFree from "./pages/frontend/TryFree/TryFree";
import SelectSubject from "./pages/frontend/SelectSubject/SelectSubject";
import UserLogin from "./pages/frontend/Auth/Login";
import SelectLevel from "./pages/frontend/SelectLevel/SelectLevel";
import SelectSubLevel from "./pages/frontend/SelectSubLevel/SelectSubLevel";

import SelectTopic from "./pages/frontend/SelectTopic/SelectTopic";
import QuestionAnswer from "./pages/frontend/QuestionAnswer/QuestionAnswer";


import { Container } from "react-bootstrap";
import "font-awesome/css/font-awesome.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Container fluid>
          <div className="d-flex flex-column flex-md-row">
            <Routes>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/add-new-users" element={<AddNewUsers />} />
              <Route path="/admin/edit-users/:id" element={<EditUsers />} />

              <Route path="/admin/subjects" element={<Subjects />} />
              <Route
                path="/admin/add-new-subjects"
                element={<AddNewSubjects />}
              />
              <Route
                path="/admin/edit-subjects/:id"
                element={<EditSubjects />}
              />

              <Route path="/admin/subjectlevel" element={<SubjectLevel />} />
              <Route
                path="/admin/add-new-subjectlevel"
                element={<AddNewSubjectLevel />}
              />
              <Route
                path="/admin/edit-subjectlevel/:id"
                element={<EditSubjectLevel />}
              />

              <Route path="/admin/sublevel" element={<SubLevel />} />
              <Route
                path="/admin/add-new-sublevel"
                element={<AddNewSubLevel />}
              />
              <Route
                path="/admin/edit-sublevel/:id"
                element={<EditSubLevel />}
              />

              <Route path="/admin/topics" element={<Topics />} />
              <Route path="/admin/add-new-topics" element={<AddNewTopics />} />
              <Route path="/admin/edit-topics/:id" element={<EditTopics />} />
              <Route path="/admin/questions" element={<Questions />} />
              <Route path="/admin/add-new-questions" element={<AddNewQuestions />} />
              <Route path="/admin/edit-questions" element={<EditQuestions />} />
              {/* <Route path="/admin/edit-topics" element={<EditTopics />} /> */}

              {/* User Routing  */}

              <Route path="/try-free" element={<TryFree />} />
              <Route path="/" element={<UserLogin />} />
              <Route path="/select-subject" element={<SelectSubject />} />
              <Route path="/select-level/:id" element={<SelectLevel />} />
              <Route path="/select-topic/:id" element={<SelectTopic />} />
              {/* <Route path="/select-level" element={<SelectLevel />} /> */}
              <Route path="/select-sub-level/:id" element={<SelectSubLevel />} />

              {/* <Route path="/select-topic/" element={<SelectTopic />} /> */}
              <Route path="/question-answer/:id" element={<QuestionAnswer />} />
            </Routes>
          </div>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;

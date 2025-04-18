import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Layout from './components/Layout';
import Home from './pages/public/Home';
import Activities from './pages/public/Activities';
import Events from './pages/public/Events';
import Mission from './pages/public/Mission';
import Contact from './pages/public/Contact';
import AboutPage from './pages/public/AboutPage';
import BlogPage from './pages/public/Blog';
import GalleryPage from './pages/public/Gallery';
import DonatePage from './pages/public/Donate';
import Schedule from './pages/public/Schedule';
import Login from './pages/public/Login';
import Signup from './pages/public/Signup';
import BlogDetail from './pages/public/BlogDetail';
import SubscribersList from './pages/admin/SubscribersList';
import UserList from './pages/admin/UserList';
import Welcome from './pages/member/Home';
import Forum from './pages/member/Forum';
import Groups from './pages/member/Groups';
import Library from './pages/member/Library';
import Mentorship from './pages/member/Mentorship';
import Notifications from './pages/member/Notifications';
import Programs from './pages/member/Programs';
import Resources from './pages/member/Resources';
import Event from './pages/member/Events';
import CreateEventPage from './pages/admin/CreateEvent';
import EventPage from './pages/admin/Events';
import CreateBlog from './pages/admin/CreateBlog';
import Blogs from './pages/admin/Blogs';
import AdminRoute from './components/routes/AdminRoute';
import MemberRoute from './components/routes/MemberRoute';
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/events" element={<Events />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            {/* Route publique */}
            
            {/* Route protégée avec le Layout pour les membres */}
            <Route path="/member" element={
              <MemberRoute>
                <Layout />
              </MemberRoute>
            }>
              <Route path="welcome" element={<Welcome />} />
              <Route path="forum" element={<Forum />} />
              <Route path="groups" element={<Groups />} />
              <Route path="library" element={<Library />} />
              <Route path="mentorship" element={<Mentorship />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="programs" element={<Programs />} />
              <Route path="resources" element={<Resources />} />
              <Route path="events" element={<Event />} />
              {/* Vous pouvez ajouter d'autres routes pour les membres ici */}
              <Route path="home" element={<Welcome />} />
              {/* ... */}
            </Route>
            {/* Route protégée avec le Layout pour les administrateurs */}
            <Route path="/admin" element={
              <AdminRoute>
                <Layout />
              </AdminRoute>
            }>
              <Route path="subscribers" element={<SubscribersList />} />
              <Route path="users" element={<UserList />} />
              <Route path="create-event" element={<CreateEventPage />} />
              <Route path="events" element={<EventPage />} />
              <Route path="create-blog" element={<CreateBlog />} />
              <Route path="blogs" element={<Blogs />} />
              {/* Vous pouvez ajouter d'autres routes pour les administrateurs ici */}
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
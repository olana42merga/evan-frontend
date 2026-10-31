import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Posts from '../pages/public/Posts';
import Contact from '../pages/public/Contact';
import Login from '../pages/public/Login';
import Register from '../pages/auth/Register'; // <-- Added Register import
import Giving from '../pages/public/Giving';

import MemberDashboard from '../pages/member/Dashboard';
import DailyVerse from '../pages/member/DailyVerse';
import SendGift from '../pages/member/SendGift';
import MyGifts from '../pages/member/MyGifts';
import MemberMessages from '../pages/member/Messages';
import Profile from '../pages/member/Profile';
import MemberPhotos from '../pages/member/MemberPhotos';
import MemberPdfs from '../pages/member/MemberPdfs';

import AdminDashboard from '../pages/admin/AdminDashboard';
import Members from '../pages/admin/Members';
import Admins from '../pages/admin/Admins';
import Verses from '../pages/admin/Verses';
import Programs from '../pages/admin/Programs';
import Photos from '../pages/admin/Photos';
import Pdfs from '../pages/admin/Pdfs';
import AdminPosts from '../pages/admin/Posts';
import Gifts from '../pages/admin/Gifts';
import AdminMessages from '../pages/admin/Messages';
import Settings from '../pages/admin/Settings';

function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> {/* <-- Added Register route */}
      <Route path="/giving" element={<Giving />} />

      {/* Member */}
      <Route path="/member/dashboard" element={<ProtectedRoute role="MEMBER"><MemberDashboard /></ProtectedRoute>} />
      <Route path="/member/verse" element={<ProtectedRoute role="MEMBER"><DailyVerse /></ProtectedRoute>} />
      <Route path="/member/send-gift" element={<ProtectedRoute role="MEMBER"><SendGift /></ProtectedRoute>} />
      <Route path="/member/my-gifts" element={<ProtectedRoute role="MEMBER"><MyGifts /></ProtectedRoute>} />
      <Route path="/member/messages" element={<ProtectedRoute role="MEMBER"><MemberMessages /></ProtectedRoute>} />
      <Route path="/member/photos" element={<ProtectedRoute role="MEMBER"><MemberPhotos /></ProtectedRoute>} />
      <Route path="/member/pdfs" element={<ProtectedRoute role="MEMBER"><MemberPdfs /></ProtectedRoute>} />
      <Route path="/member/profile" element={<ProtectedRoute role="MEMBER"><Profile /></ProtectedRoute>} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={<ProtectedRoute role="ADMIN"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/members" element={<ProtectedRoute role="ADMIN"><Members /></ProtectedRoute>} />
      <Route path="/admin/admins" element={<ProtectedRoute role="ADMIN"><Admins /></ProtectedRoute>} />
      <Route path="/admin/verses" element={<ProtectedRoute role="ADMIN"><Verses /></ProtectedRoute>} />
      <Route path="/admin/programs" element={<ProtectedRoute role="ADMIN"><Programs /></ProtectedRoute>} />
      <Route path="/admin/photos" element={<ProtectedRoute role="ADMIN"><Photos /></ProtectedRoute>} />
      <Route path="/admin/pdfs" element={<ProtectedRoute role="ADMIN"><Pdfs /></ProtectedRoute>} />
      <Route path="/admin/posts" element={<ProtectedRoute role="ADMIN"><AdminPosts /></ProtectedRoute>} />
      <Route path="/admin/gifts" element={<ProtectedRoute role="ADMIN"><Gifts /></ProtectedRoute>} />
      <Route path="/admin/messages" element={<ProtectedRoute role="ADMIN"><AdminMessages /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute role="ADMIN"><Settings /></ProtectedRoute>} />
    </Routes>
  );
}

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Edit3, 
  Save, 
  ArrowLeft,
  Camera,
  Shield,
  Bell,
  Globe,
  LogOut,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Scissors,
  Users,
  Star,
  Calendar,
  Settings,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { logout } from '../store/slices/authSlice';
import { toggleLanguage } from '../store/slices/languageSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, userType } = useSelector((state) => state.auth);
  const { language } = useSelector((state) => state.language);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    profileImage: null
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [preferences, setPreferences] = useState({
    notifications: true,
    smsAlerts: true,
    emailUpdates: false,
    language: 'en'
  });

  const [stats, setStats] = useState({
    totalVisits: 0,
    completedServices: 0,
    totalCustomers: 0,
    rating: 0
  });

  const texts = {
    en: {
      profile: 'Profile',
      editProfile: 'Edit Profile',
      saveChanges: 'Save Changes',
      cancel: 'Cancel',
      backToDashboard: 'Back to Dashboard',
      personalInfo: 'Personal Information',
      contactInfo: 'Contact Information',
      preferences: 'Preferences',
      security: 'Security',
      dangerZone: 'Danger Zone',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      address: 'Address',
      city: 'City',
      profilePicture: 'Profile Picture',
      changePhoto: 'Change Photo',
      removePhoto: 'Remove Photo',
      changePassword: 'Change Password',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm Password',
      notifications: 'Push Notifications',
      smsAlerts: 'SMS Alerts',
      emailUpdates: 'Email Updates',
      language: 'Language',
      english: 'English',
      gujarati: 'ગુજરાતી',
      logout: 'Logout',
      deleteAccount: 'Delete Account',
      deleteWarning: 'This action cannot be undone. Your account and all data will be permanently deleted.',
      customerStats: 'Your Activity',
      barberStats: 'Shop Statistics',
      totalVisits: 'Total Visits',
      completedServices: 'Services Completed',
      totalCustomers: 'Total Customers',
      rating: 'Average Rating',
      memberSince: 'Member Since',
      lastActive: 'Last Active',
      profileUpdated: 'Profile updated successfully!',
      passwordChanged: 'Password changed successfully!',
      invalidPassword: 'Current password is incorrect',
      passwordMismatch: 'Passwords do not match',
      weakPassword: 'Password must be at least 6 characters',
      logoutConfirm: 'Are you sure you want to logout?',
      deleteConfirm: 'Are you sure you want to delete your account?',
      saving: 'Saving...',
      updating: 'Updating...'
    },
    gu: {
      profile: 'પ્રોફાઈલ',
      editProfile: 'પ્રોફાઈલ સંપાદિત કરો',
      saveChanges: 'ફેરફારો સાચવો',
      cancel: 'રદ કરો',
      backToDashboard: 'ડેશબોર્ડ પર પાછા જાઓ',
      personalInfo: 'વ્યક્તિગત માહિતી',
      contactInfo: 'સંપર્ક માહિતી',
      preferences: 'પસંદગીઓ',
      security: 'સુરક્ષા',
      dangerZone: 'જોખમી વિસ્તાર',
      name: 'પૂરું નામ',
      email: 'ઈમેઈલ સરનામું',
      phone: 'ફોન નંબર',
      address: 'સરનામું',
      city: 'શહેર',
      profilePicture: 'પ્રોફાઈલ ફોટો',
      changePhoto: 'ફોટો બદલો',
      removePhoto: 'ફોટો દૂર કરો',
      changePassword: 'પાસવર્ડ બદલો',
      currentPassword: 'હાલનો પાસવર્ડ',
      newPassword: 'નવો પાસવર્ડ',
      confirmPassword: 'પાસવર્ડની પુષ્ટિ',
      notifications: 'પુશ નોટિફિકેશન',
      smsAlerts: 'SMS અલર્ટ',
      emailUpdates: 'ઈમેઈલ અપડેટ',
      language: 'ભાષા',
      english: 'English',
      gujarati: 'ગુજરાતી',
      logout: 'લૉગઆઉટ',
      deleteAccount: 'એકાઉન્ટ ડિલીટ કરો',
      deleteWarning: 'આ ક્રિયા પાછી કરી શકાતી નથી. તમારું એકાઉન્ટ અને બધો ડેટા કાયમ માટે ડિલીટ થઈ જશે.',
      customerStats: 'તમારી પ્રવૃત્તિ',
      barberStats: 'દુકાનના આંકડા',
      totalVisits: 'કુલ મુલાકાતો',
      completedServices: 'પૂર્ણ થયેલી સેવાઓ',
      totalCustomers: 'કુલ ગ્રાહકો',
      rating: 'સરેરાશ રેટિંગ',
      memberSince: 'સભ્ય બન્યા ત્યારથી',
      lastActive: 'છેલ્લી વખત સક્રિય',
      profileUpdated: 'પ્રોફાઈલ સફળતાપૂર્વક અપડેટ થયું!',
      passwordChanged: 'પાસવર્ડ સફળતાપૂર્વક બદલાયો!',
      invalidPassword: 'હાલનો પાસવર્ડ ખોટો છે',
      passwordMismatch: 'પાસવર્ડ મેળ ખાતા નથી',
      weakPassword: 'પાસવર્ડ ઓછામાં ઓછા 6 અક્ષરોનો હોવો જોઈએ',
      logoutConfirm: 'શું તમે ખરેખર લૉગઆઉટ કરવા માગો છો?',
      deleteConfirm: 'શું તમે ખરેખર તમારું એકાઉન્ટ ડિલીટ કરવા માગો છો?',
      saving: 'સેવ કરી રહ્યાં છીએ...',
      updating: 'અપડેટ કરી રહ્યાં છીએ...'
    }
  };

  const t = texts[language];

  // Initialize profile data
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        profileImage: user.profileImage || null
      });
    }

    // Mock stats data - replace with actual API calls
    setStats({
      totalVisits: userType === 'customer' ? 24 : 0,
      completedServices: userType === 'customer' ? 18 : 156,
      totalCustomers: userType === 'barber' ? 89 : 0,
      rating: userType === 'barber' ? 4.6 : 0
    });

    setPreferences({
      notifications: true,
      smsAlerts: true,
      emailUpdates: false,
      language: language
    });
  }, [user, userType, language]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleLanguageToggle = () => {
    dispatch(toggleLanguage());
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(t.profileUpdated);
      setIsEditing(false);
    } catch (error) {
      toast.error('Error updating profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('Please fill all password fields');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error(t.weakPassword);
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error(t.passwordMismatch);
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(t.passwordChanged);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordChange(false);
    } catch (error) {
      toast.error(t.invalidPassword);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm(t.logoutConfirm)) {
      dispatch(logout());
      navigate('/');
      toast.success(language === 'gu' ? 'સફળતાપૂર્વક લૉગઆઉટ થયા' : 'Successfully logged out');
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm(t.deleteConfirm)) {
      // Implement account deletion
      toast.error('Account deletion feature coming soon');
    }
  };

  const getDashboardPath = () => {
    return userType === 'customer' ? '/customer/dashboard' : '/barber/dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate(getDashboardPath())}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t.profile}</h1>
                <p className="text-gray-600">
                  {userType === 'customer' ? 'Customer Profile' : 'Barber Profile'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  {t.editProfile}
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors flex items-center"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    {isLoading ? t.saving : t.saveChanges}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setProfileData({
                        name: user.name || '',
                        email: user.email || '',
                        phone: user.phone || '',
                        address: user.address || '',
                        city: user.city || '',
                        profileImage: user.profileImage || null
                      });
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    {t.cancel}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card & Stats */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  {profileData.profileImage ? (
                    <img 
                      src={profileData.profileImage} 
                      alt="Profile" 
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-primary" />
                  )}
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{profileData.name || user?.name}</h2>
              <p className="text-gray-600 mb-2">{profileData.email || user?.email}</p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {t.memberSince} Jan 2024
                </span>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                {userType === 'customer' ? (
                  <Users className="w-5 h-5 mr-2 text-primary" />
                ) : (
                  <Scissors className="w-5 h-5 mr-2 text-primary" />
                )}
                {userType === 'customer' ? t.customerStats : t.barberStats}
              </h3>
              
              <div className="space-y-4">
                {userType === 'customer' ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.totalVisits}</span>
                      <span className="font-semibold text-primary">{stats.totalVisits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.completedServices}</span>
                      <span className="font-semibold text-secondary">{stats.completedServices}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.totalCustomers}</span>
                      <span className="font-semibold text-primary">{stats.totalCustomers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.completedServices}</span>
                      <span className="font-semibold text-secondary">{stats.completedServices}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.rating}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="font-semibold">{stats.rating}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <User className="w-5 h-5 mr-2 text-primary" />
                {t.personalInfo}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.name}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  ) : (
                    <p className="py-3 text-gray-900">{profileData.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.email}
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  ) : (
                    <p className="py-3 text-gray-900 flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      {profileData.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.phone}
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  ) : (
                    <p className="py-3 text-gray-900 flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      {profileData.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.city}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="city"
                      value={profileData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  ) : (
                    <p className="py-3 text-gray-900 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      {profileData.city}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.address}
                  </label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  ) : (
                    <p className="py-3 text-gray-900">{profileData.address || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-primary" />
                {t.security}
              </h3>
              
              {!showPasswordChange ? (
                <button
                  onClick={() => setShowPasswordChange(true)}
                  className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/90 transition-colors flex items-center"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  {t.changePassword}
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.currentPassword}
                    </label>
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.newPassword}
                    </label>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.confirmPassword}
                    </label>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={handlePasswordSubmit}
                      disabled={isLoading}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors flex items-center"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      ) : (
                        <CheckCircle className="w-4 h-4 mr-2" />
                      )}
                      {isLoading ? t.updating : 'Update Password'}
                    </button>
                    <button
                      onClick={() => {
                        setShowPasswordChange(false);
                        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                      }}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      {t.cancel}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-primary" />
                {t.preferences}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell className="w-5 h-5 mr-3 text-gray-400" />
                    <span className="text-gray-700">{t.notifications}</span>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('notifications')}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      preferences.notifications ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      preferences.notifications ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-gray-400" />
                    <span className="text-gray-700">{t.smsAlerts}</span>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('smsAlerts')}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      preferences.smsAlerts ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      preferences.smsAlerts ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3 text-gray-400" />
                    <span className="text-gray-700">{t.emailUpdates}</span>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('emailUpdates')}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      preferences.emailUpdates ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      preferences.emailUpdates ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 mr-3 text-gray-400" />
                    <span className="text-gray-700">{t.language}</span>
                  </div>
                  <button
                    onClick={handleLanguageToggle}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm"
                  >
                    {language === 'en' ? t.gujarati : t.english}
                  </button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
                {t.dangerZone}
              </h3>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div>
                    <h4 className="font-medium text-gray-900">{t.logout}</h4>
                    <p className="text-sm text-gray-600">Sign out of your account</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {t.logout}
                  </button>
                </div>

                <hr className="border-gray-200" />

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                  <div>
                    <h4 className="font-medium text-red-600">{t.deleteAccount}</h4>
                    <p className="text-sm text-gray-600 max-w-md">{t.deleteWarning}</p>
                  </div>
                  <button
                    onClick={handleDeleteAccount}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {t.deleteAccount}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
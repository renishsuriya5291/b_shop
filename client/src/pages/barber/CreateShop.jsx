import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Image, 
  Save, 
  ArrowLeft,
  Scissors,
  Star,
  Users,
  Camera,
  Plus,
  X,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const CreateShop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { language } = useSelector((state) => state.language);
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '',
    phone: '',
    whatsapp: '',
    openingTime: '09:00',
    closingTime: '20:00',
    workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    services: [],
    shopImages: []
  });

  const [newService, setNewService] = useState({ name: '', price: '', duration: '' });
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [errors, setErrors] = useState({});

  // Predefined services for Gujarat barber shops
  const commonServices = {
    en: [
      { name: 'Hair Cut', price: '50', duration: '30' },
      { name: 'Beard Trim', price: '30', duration: '15' },
      { name: 'Shave', price: '25', duration: '20' },
      { name: 'Hair Wash', price: '20', duration: '10' },
      { name: 'Mustache Trim', price: '15', duration: '10' },
      { name: 'Face Clean', price: '100', duration: '45' },
      { name: 'Hair Color', price: '200', duration: '90' },
      { name: 'Massage', price: '150', duration: '30' }
    ],
    gu: [
      { name: 'વાળ કાપવા', price: '50', duration: '30' },
      { name: 'દાઢી ટ્રિમ', price: '30', duration: '15' },
      { name: 'શેવ', price: '25', duration: '20' },
      { name: 'વાળ ધોવા', price: '20', duration: '10' },
      { name: 'મુસ્તાશ ટ્રિમ', price: '15', duration: '10' },
      { name: 'ફેસ ક્લીન', price: '100', duration: '45' },
      { name: 'વાળનો રંગ', price: '200', duration: '90' },
      { name: 'માલિશ', price: '150', duration: '30' }
    ]
  };

  const cities = [
    'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar',
    'Junagadh', 'Gandhinagar', 'Anand', 'Mehsana', 'Morbi', 'Navsari'
  ];

  const workingDayOptions = {
    en: [
      { key: 'monday', label: 'Monday' },
      { key: 'tuesday', label: 'Tuesday' },
      { key: 'wednesday', label: 'Wednesday' },
      { key: 'thursday', label: 'Thursday' },
      { key: 'friday', label: 'Friday' },
      { key: 'saturday', label: 'Saturday' },
      { key: 'sunday', label: 'Sunday' }
    ],
    gu: [
      { key: 'monday', label: 'સોમવાર' },
      { key: 'tuesday', label: 'મંગળવાર' },
      { key: 'wednesday', label: 'બુધવાર' },
      { key: 'thursday', label: 'ગુરુવાર' },
      { key: 'friday', label: 'શુક્રવાર' },
      { key: 'saturday', label: 'શનિવાર' },
      { key: 'sunday', label: 'રવિવાર' }
    ]
  };

  const texts = {
    en: {
      title: 'Create Your Barber Shop',
      subtitle: 'Set up your shop profile to start managing customers',
      backToDashboard: 'Back to Dashboard',
      basicInfo: 'Basic Information',
      shopName: 'Shop Name',
      shopNamePlaceholder: 'Enter your shop name',
      description: 'Description',
      descriptionPlaceholder: 'Brief description of your shop...',
      contactInfo: 'Contact Information',
      address: 'Address',
      addressPlaceholder: 'Enter shop address',
      city: 'City',
      pincode: 'Pin Code',
      pincodePlaceholder: '380001',
      phone: 'Phone Number',
      phonePlaceholder: '+91 98765 43210',
      whatsapp: 'WhatsApp Number',
      whatsappPlaceholder: '+91 98765 43210',
      businessHours: 'Business Hours',
      openingTime: 'Opening Time',
      closingTime: 'Closing Time',
      workingDays: 'Working Days',
      services: 'Services & Pricing',
      servicesSubtitle: 'Add services you offer with pricing',
      addService: 'Add Service',
      serviceName: 'Service Name',
      price: 'Price (₹)',
      duration: 'Duration (min)',
      addQuickServices: 'Add Common Services',
      shopImages: 'Shop Images',
      imagesSubtitle: 'Upload photos of your shop (optional)',
      uploadImage: 'Upload Image',
      createShop: 'Create Shop',
      creating: 'Creating...',
      required: 'This field is required',
      validPhone: 'Please enter a valid phone number',
      validPincode: 'Please enter a valid pincode',
      minServices: 'Please add at least one service',
      shopCreated: 'Shop created successfully!',
      errorCreating: 'Error creating shop. Please try again.'
    },
    gu: {
      title: 'તમારી નાઈની દુકાન બનાવો',
      subtitle: 'ગ્રાહકોનું સંચાલન શરૂ કરવા માટે તમારી દુકાનનો પ્રોફાઈલ સેટ કરો',
      backToDashboard: 'ડેશબોર્ડ પર પાછા જાઓ',
      basicInfo: 'મૂળભૂત માહિતી',
      shopName: 'દુકાનનું નામ',
      shopNamePlaceholder: 'તમારી દુકાનનું નામ દાખલ કરો',
      description: 'વર્ણન',
      descriptionPlaceholder: 'તમારી દુકાનનું ટૂંકું વર્ણન...',
      contactInfo: 'સંપર્ક માહિતી',
      address: 'સરનામું',
      addressPlaceholder: 'દુકાનનું સરનામું દાખલ કરો',
      city: 'શહેર',
      pincode: 'પિન કોડ',
      pincodePlaceholder: '380001',
      phone: 'ફોન નંબર',
      phonePlaceholder: '+91 98765 43210',
      whatsapp: 'વોટ્સએપ નંબર',
      whatsappPlaceholder: '+91 98765 43210',
      businessHours: 'ધંધાના કલાકો',
      openingTime: 'ખુલવાનો સમય',
      closingTime: 'બંધ થવાનો સમય',
      workingDays: 'કામના દિવસો',
      services: 'સેવાઓ અને કિંમત',
      servicesSubtitle: 'તમે આપતી સેવાઓ કિંમત સાથે ઉમેરો',
      addService: 'સેવા ઉમેરો',
      serviceName: 'સેવાનું નામ',
      price: 'કિંમત (₹)',
      duration: 'સમય (મિનિટ)',
      addQuickServices: 'સામાન્ય સેવાઓ ઉમેરો',
      shopImages: 'દુકાનના ફોટો',
      imagesSubtitle: 'તમારી દુકાનના ફોટો અપલોડ કરો (વૈકલ્પિક)',
      uploadImage: 'ફોટો અપલોડ કરો',
      createShop: 'દુકાન બનાવો',
      creating: 'બનાવી રહ્યાં છીએ...',
      required: 'આ ફીલ્ડ આવશ્યક છે',
      validPhone: 'કૃપા કરીને યોગ્ય ફોન નંબર દાખલ કરો',
      validPincode: 'કૃપા કરીને યોગ્ય પિન કોડ દાખલ કરો',
      minServices: 'કૃપા કરીને ઓછામાં ઓછી એક સેવા ઉમેરો',
      shopCreated: 'દુકાન સફળતાપૂર્વક બનાવાઈ!',
      errorCreating: 'દુકાન બનાવવામાં ભૂલ. કૃપા કરીને ફરીથી પ્રયાસ કરો.'
    }
  };

  const t = texts[language];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleWorkingDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter(d => d !== day)
        : [...prev.workingDays, day]
    }));
  };

  const handleAddService = () => {
    if (!newService.name || !newService.price || !newService.duration) {
      toast.error(language === 'gu' ? 'બધી ફીલ્ડ ભરો' : 'Please fill all fields');
      return;
    }

    setFormData(prev => ({
      ...prev,
      services: [...prev.services, { ...newService, id: Date.now() }]
    }));

    setNewService({ name: '', price: '', duration: '' });
    setShowServiceForm(false);
    toast.success(language === 'gu' ? 'સેવા ઉમેરાઈ' : 'Service added');
  };

  const handleRemoveService = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== serviceId)
    }));
  };

  const handleAddQuickService = (service) => {
    const serviceExists = formData.services.some(s => s.name === service.name);
    if (serviceExists) {
      toast.error(language === 'gu' ? 'સેવા પહેલેથી ઉમેરેલ છે' : 'Service already added');
      return;
    }

    setFormData(prev => ({
      ...prev,
      services: [...prev.services, { ...service, id: Date.now() }]
    }));
    toast.success(language === 'gu' ? 'સેવા ઉમેરાઈ' : 'Service added');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = t.required;
    if (!formData.address.trim()) newErrors.address = t.required;
    if (!formData.phone.trim()) {
      newErrors.phone = t.required;
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = t.validPhone;
    }
    if (!formData.pincode.trim()) {
      newErrors.pincode = t.required;
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = t.validPincode;
    }
    if (formData.services.length === 0) newErrors.services = t.minServices;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error(language === 'gu' ? 'કૃપા કરીને બધી ફીલ્ડ યોગ્ય રીતે ભરો' : 'Please fill all required fields correctly');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(t.shopCreated);
      navigate('/barber/dashboard');
    } catch (error) {
      toast.error(t.errorCreating);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/barber/dashboard')}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
                <p className="text-gray-600">{t.subtitle}</p>
              </div>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Scissors className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Scissors className="w-5 h-5 mr-2 text-primary" />
              {t.basicInfo}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.shopName} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t.shopNamePlaceholder}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.description}
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder={t.descriptionPlaceholder}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-primary" />
              {t.contactInfo}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.address} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder={t.addressPlaceholder}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.address ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.city}
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.pincode} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder={t.pincodePlaceholder}
                  maxLength={6}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.pincode ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.pincode && <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.phone} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={t.phonePlaceholder}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.phone ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.whatsapp}
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  placeholder={t.whatsappPlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-primary" />
              {t.businessHours}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.openingTime}
                </label>
                <input
                  type="time"
                  name="openingTime"
                  value={formData.openingTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.closingTime}
                </label>
                <input
                  type="time"
                  name="closingTime"
                  value={formData.closingTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t.workingDays}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {workingDayOptions[language].map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleWorkingDayToggle(key)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                      formData.workingDays.includes(key)
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Star className="w-5 h-5 mr-2 text-primary" />
                {t.services}
              </h2>
              <button
                type="button"
                onClick={() => setShowServiceForm(true)}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t.addService}
              </button>
            </div>

            <p className="text-gray-600 mb-6">{t.servicesSubtitle}</p>
            
            {errors.services && <p className="mb-4 text-sm text-red-600">{errors.services}</p>}

            {/* Add Service Form */}
            {showServiceForm && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder={t.serviceName}
                    value={newService.name}
                    onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder={t.price}
                    value={newService.price}
                    onChange={(e) => setNewService(prev => ({ ...prev, price: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder={t.duration}
                    value={newService.duration}
                    onChange={(e) => setNewService(prev => ({ ...prev, duration: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={handleAddService}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowServiceForm(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Quick Services */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">{t.addQuickServices}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {commonServices[language].map((service, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleAddQuickService(service)}
                    className="p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
                  >
                    <div className="font-medium text-gray-900">{service.name}</div>
                    <div className="text-sm text-gray-600">₹{service.price} • {service.duration} min</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Added Services */}
            {formData.services.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Added Services</h3>
                <div className="space-y-3">
                  {formData.services.map((service) => (
                    <div key={service.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-900">{service.name}</span>
                        <span className="text-gray-600 ml-2">₹{service.price} • {service.duration} min</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveService(service.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Shop Images */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
              <Camera className="w-5 h-5 mr-2 text-primary" />
              {t.shopImages}
            </h2>
            <p className="text-gray-600 mb-6">{t.imagesSubtitle}</p>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">{t.uploadImage}</p>
              <button
                type="button"
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Choose Files
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-4 px-6 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg font-semibold flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  {t.creating}
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-3" />
                  {t.createShop}
                </>
              )}
            </button>
            
            <p className="text-center text-gray-600 mt-4 text-sm">
              {language === 'gu' 
                ? 'દુકાન બનાવ્યા પછી તમે તરત જ ગ્રાહકો સ્વીકારવાનું શરૂ કરી શકો છો'
                : 'After creating your shop, you can immediately start accepting customers'
              }
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateShop;
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Clock, 
  User, 
  Phone, 
  Search, 
  Settings, 
  ToggleLeft, 
  ToggleRight,
  UserCheck,
  Calendar,
  Star,
  Camera,
  MessageSquare,
  Plus,
  ChevronRight,
  Scissors,
  Timer,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const BarberDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.auth);
  const { language } = useSelector((state) => state.language);
  const [shop, setShop] = useState(null);
  const [queue, setQueue] = useState([]);
  const [currentServing, setCurrentServing] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [customerHistory, setCustomerHistory] = useState([]);

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate loading shop data
    setTimeout(() => {
      setShop({
        id: 1,
        name: language === 'gu' ? 'પ્રીમિયમ હેર સલૂન' : 'Premium Hair Salon',
        address: language === 'gu' ? 'એલિસબ્રિજ, અમદાવાદ' : 'Ellis Bridge, Ahmedabad',
        phone: '+91 98765 43210',
        rating: 4.5,
        totalCustomers: 156,
        completedToday: 12
      });

      setCurrentServing({
        id: 1,
        name: language === 'gu' ? 'રાજેશ પટેલ' : 'Rajesh Patel',
        phone: '+91 98765 43210',
        tokenNumber: 'T001',
        startTime: '10:30 AM',
        preferences: {
          hairStyle: language === 'gu' ? 'ફેડ કટ' : 'Fade Cut',
          beardStyle: language === 'gu' ? 'ફુલ બીયર્ડ ટ્રિમ' : 'Full Beard Trim',
          notes: language === 'gu' ? 'બાજુ ઓછા કરવા' : 'Keep sides short',
          photos: ['photo1.jpg', 'photo2.jpg']
        }
      });

      setQueue([
        {
          id: 2,
          name: language === 'gu' ? 'અમિત શર્મા' : 'Amit Sharma',
          phone: '+91 87654 32109',
          tokenNumber: 'T002',
          waitTime: '15 min',
          preferences: {
            hairStyle: language === 'gu' ? 'બઝ કટ' : 'Buzz Cut',
            beardStyle: language === 'gu' ? 'ક્લીન શેવ' : 'Clean Shave',
            notes: language === 'gu' ? 'ઝડપથી કરવું' : 'Quick service needed'
          }
        },
        {
          id: 3,
          name: language === 'gu' ? 'વિકાસ ગુપ્તા' : 'Vikas Gupta',
          phone: '+91 76543 21098',
          tokenNumber: 'T003',
          waitTime: '30 min',
          preferences: {
            hairStyle: language === 'gu' ? 'લેયર કટ' : 'Layer Cut',
            beardStyle: language === 'gu' ? 'મુસ્તાશ ટ્રિમ' : 'Mustache Trim',
            notes: language === 'gu' ? 'નિયમિત ગ્રાહક' : 'Regular customer'
          }
        },
        {
          id: 4,
          name: language === 'gu' ? 'રોહિત મહેતા' : 'Rohit Mehta',
          phone: '+91 65432 10987',
          tokenNumber: 'T004',
          waitTime: '45 min',
          preferences: {
            hairStyle: language === 'gu' ? 'કર્લી કટ' : 'Curly Cut',
            beardStyle: language === 'gu' ? 'બોક્સર્ડ બીયર્ડ' : 'Boxed Beard',
            notes: language === 'gu' ? 'વાળ પાતળા છે' : 'Thin hair texture'
          }
        }
      ]);

      setIsLoading(false);
    }, 1000);
  }, [language]);

  const handleCallNext = () => {
    if (queue.length === 0) {
      toast.error(language === 'gu' ? 'કોઈ ગ્રાહક રાહ જોઈ રહ્યા નથી' : 'No customers waiting');
      return;
    }

    const nextCustomer = queue[0];
    setCurrentServing(nextCustomer);
    setQueue(prev => prev.slice(1));
    toast.success(
      language === 'gu' 
        ? `${nextCustomer.name} ને કૉલ કર્યા` 
        : `Called ${nextCustomer.name}`
    );
  };

  const handleCompleteService = () => {
    if (!currentServing) return;
    
    setCurrentServing(null);
    setShop(prev => ({ ...prev, completedToday: prev.completedToday + 1 }));
    toast.success(
      language === 'gu' 
        ? 'સેવા પૂર્ણ થઈ' 
        : 'Service completed'
    );
  };

  const toggleAvailability = () => {
    setIsAvailable(!isAvailable);
    toast.success(
      language === 'gu' 
        ? isAvailable ? 'તમે હવે વ્યસ્ત છો' : 'તમે હવે ઉપલબ્ધ છો'
        : isAvailable ? 'You are now busy' : 'You are now available'
    );
  };

  const texts = {
    en: {
      welcome: 'Welcome back',
      dashboard: 'Barber Dashboard',
      currentServing: 'Currently Serving',
      callNext: 'Call Next Customer',
      completeService: 'Complete Service',
      waitingCustomers: 'Waiting Customers',
      noCustomers: 'No customers waiting',
      customerQueue: 'Customer Queue',
      preferences: 'Preferences',
      notes: 'Notes',
      photos: 'Reference Photos',
      searchPlaceholder: 'Search customers...',
      todayStats: "Today's Stats",
      served: 'Served',
      waiting: 'Waiting',
      rating: 'Rating',
      status: 'Status',
      available: 'Available',
      busy: 'Busy',
      hairStyle: 'Hair Style',
      beardStyle: 'Beard Style',
      tokenNumber: 'Token',
      waitTime: 'Wait Time',
      phone: 'Phone',
      createShop: 'Create Shop',
      noShopMessage: 'You need to create a shop first to manage customers.',
      settings: 'Settings'
    },
    gu: {
      welcome: 'ફરીથી સ્વાગત',
      dashboard: 'નાઈનું ડેશબોર્ડ',
      currentServing: 'હાલમાં સેવા આપી રહ્યા છીએ',
      callNext: 'આગલા ગ્રાહકને બોલાવો',
      completeService: 'સેવા પૂર્ણ કરો',
      waitingCustomers: 'રાહ જોઈ રહેલા ગ્રાહકો',
      noCustomers: 'કોઈ ગ્રાહક રાહ જોઈ રહ્યા નથી',
      customerQueue: 'ગ્રાહકોની લાઈન',
      preferences: 'પસંદગીઓ',
      notes: 'નોંધો',
      photos: 'સંદર્ભ ફોટો',
      searchPlaceholder: 'ગ્રાહકો શોધો...',
      todayStats: 'આજના આંકડા',
      served: 'સેવા આપેલ',
      waiting: 'રાહ જોઈ રહેલા',
      rating: 'રેટિંગ',
      status: 'સ્થિતિ',
      available: 'ઉપલબ્ધ',
      busy: 'વ્યસ્ત',
      hairStyle: 'વાળનો સ્ટાઈલ',
      beardStyle: 'દાઢીનો સ્ટાઈલ',
      tokenNumber: 'ટોકન',
      waitTime: 'રાહ જોવાનો સમય',
      phone: 'ફોન',
      createShop: 'દુકાન બનાવો',
      noShopMessage: 'ગ્રાહકોનું સંચાલન કરવા માટે તમારે પહેલા દુકાન બનાવવી પડશે.',
      settings: 'સેટિંગ્સ'
    }
  };

  const t = texts[language];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">{language === 'gu' ? 'લોડ કરી રહ્યાં છીએ...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Scissors className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t.createShop}</h2>
          <p className="text-gray-600 mb-6">{t.noShopMessage}</p>
          <button 
            onClick={() => navigate('/barber/create-shop')}
            className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <Plus className="w-5 h-5 inline mr-2" />
            {t.createShop}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t.dashboard}</h1>
              <p className="text-gray-600">{t.welcome}, {user?.name || 'Barber'}</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Status Toggle */}
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                  {isAvailable ? t.available : t.busy}
                </span>
                <button onClick={toggleAvailability}>
                  {isAvailable ? (
                    <ToggleRight className="w-8 h-8 text-green-500" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-red-500" />
                  )}
                </button>
              </div>
              <button 
                onClick={() => navigate('/barber/settings')}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Shop Info & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Shop Info */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{shop.name}</h2>
                <p className="text-gray-600 mb-1">{shop.address}</p>
                <p className="text-gray-600 flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  {shop.phone}
                </p>
                <div className="flex items-center mt-2">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{shop.rating}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">{t.todayStats}</div>
                <div className="text-2xl font-bold text-primary">{shop.completedToday}</div>
                <div className="text-sm text-gray-600">{t.served}</div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.customerQueue}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t.waiting}</span>
                <span className="text-xl font-bold text-secondary">{queue.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t.rating}</span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="font-semibold">{shop.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Currently Serving */}
        {currentServing && (
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg shadow-sm p-6 mb-6 border-l-4 border-primary">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <UserCheck className="w-5 h-5 mr-2 text-primary" />
                {t.currentServing}
              </h3>
              <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">
                {currentServing.tokenNumber}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{currentServing.name}</h4>
                    <p className="text-gray-600 flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      {currentServing.phone}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <Timer className="w-4 h-4 mr-1" />
                      Started: {currentServing.startTime}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-white/50 rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-medium text-gray-700">{t.hairStyle}:</span>
                        <p className="text-gray-900">{currentServing.preferences.hairStyle}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">{t.beardStyle}:</span>
                        <p className="text-gray-900">{currentServing.preferences.beardStyle}</p>
                      </div>
                    </div>
                    {currentServing.preferences.notes && (
                      <div className="mt-3 pt-3 border-t border-white/30">
                        <span className="text-sm font-medium text-gray-700">{t.notes}:</span>
                        <p className="text-gray-900">{currentServing.preferences.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                {currentServing.preferences.photos && (
                  <div>
                    <span className="text-sm font-medium text-gray-700 flex items-center mb-2">
                      <Camera className="w-4 h-4 mr-1" />
                      {t.photos}
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {currentServing.preferences.photos.map((photo, index) => (
                        <div key={index} className="bg-white/50 rounded-lg p-2 text-center">
                          <Camera className="w-8 h-8 text-gray-400 mx-auto" />
                          <span className="text-xs text-gray-600">Photo {index + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <button 
                  onClick={handleCompleteService}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {t.completeService}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Call Next Button */}
        {!currentServing && queue.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <button 
              onClick={handleCallNext}
              className="w-full bg-primary text-white py-4 px-6 rounded-lg hover:bg-primary/90 transition-colors text-lg font-semibold flex items-center justify-center"
            >
              <UserCheck className="w-6 h-6 mr-3" />
              {t.callNext}
            </button>
          </div>
        )}

        {/* Queue Management */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                {t.waitingCustomers} ({queue.length})
              </h3>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Queue List */}
          <div className="divide-y divide-gray-200">
            {queue.length === 0 ? (
              <div className="p-8 text-center">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-500 mb-2">{t.noCustomers}</h4>
              </div>
            ) : (
              queue
                .filter(customer => 
                  customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  customer.phone.includes(searchTerm)
                )
                .map((customer, index) => (
                  <div key={customer.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{customer.name}</h4>
                          <p className="text-gray-600 flex items-center">
                            <Phone className="w-4 h-4 mr-1" />
                            {customer.phone}
                          </p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                              {customer.tokenNumber}
                            </span>
                            <span className="text-sm text-gray-500 flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {customer.waitTime}
                            </span>
                          </div>
                        </div>
                      </div>

                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>

                    {/* Customer Preferences */}
                    <div className="mt-4 ml-14 bg-gray-50 rounded-lg p-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <span className="text-sm font-medium text-gray-700">{t.hairStyle}:</span>
                          <p className="text-gray-900">{customer.preferences.hairStyle}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">{t.beardStyle}:</span>
                          <p className="text-gray-900">{customer.preferences.beardStyle}</p>
                        </div>
                      </div>
                      {customer.preferences.notes && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <span className="text-sm font-medium text-gray-700 flex items-center">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            {t.notes}:
                          </span>
                          <p className="text-gray-900">{customer.preferences.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarberDashboard;
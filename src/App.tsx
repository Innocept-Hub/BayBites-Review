import React, { useState } from 'react';
import { 
  Utensils, 
  Armchair, 
  ShoppingBag, 
  Bike, 
  Star, 
  MessageSquare, 
  Phone, 
  User, 
  Mail, 
  Calendar, 
  Sparkles, 
  Download, 
  MapPin
} from 'lucide-react';
import { BAYBITES_LOGO_BASE64 } from './assets/logoBase64';

interface ServiceRating {
  id: string;
  label: string;
  value: number;
}

const INITIAL_METRICS: ServiceRating[] = [
  { id: 'foodQuality', label: 'Food & Taste', value: 5 },
  { id: 'service', label: 'Service Speed & Hospitality', value: 5 },
  { id: 'ambiance', label: 'Ambiance & Atmosphere', value: 5 },
  { id: 'cleanliness', label: 'Cleanliness & Hygiene', value: 5 },
  { id: 'value', label: 'Value for Money', value: 5 },
];

export default function App() {
  const [diningType, setDiningType] = useState<'Dine-in' | 'Takeaway' | 'Delivery'>('Dine-in');
  const [tableNo, setTableNo] = useState('');
  const [serverName, setServerName] = useState('');
  const [satisfactionEmoji, setSatisfactionEmoji] = useState<'Dissatisfied' | 'Neutral' | 'Satisfied' | ''>('Satisfied');
  const [starRating, setStarRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [metrics, setMetrics] = useState<ServiceRating[]>(INITIAL_METRICS);
  const [comments, setComments] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [specialOccasion, setSpecialOccasion] = useState('');
  const [visitDate, setVisitDate] = useState(() => new Date().toISOString().split('T')[0]);

  const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/93uvriJXZz5uzYZF9';
  const starLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent!'];

  const handleMetricChange = (id: string, value: number) => {
    setMetrics(prev => prev.map(m => m.id === id ? { ...m, value } : m));
  };

  const generateReviewSummary = () => {
    let summary = comments.trim();
    if (!summary) {
      summary = `Had a fantastic dining experience at Bay Bites Restaurant & Party Hall Dubai! Delicious food, wonderful service, and great atmosphere. Overall satisfaction: ${satisfactionEmoji || 'Satisfied'}, ${starRating}/5 stars.`;
    }
    return summary;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!customerPhone.trim()) {
      alert('Please enter your phone number');
      return;
    }

    const reviewText = generateReviewSummary();
    try {
      navigator.clipboard.writeText(reviewText);
    } catch {
      // Ignore if clipboard blocked
    }

    // Open Google Maps in new window or redirect
    const win = window.open(GOOGLE_MAPS_URL, '_blank');
    if (!win) {
      window.location.href = GOOGLE_MAPS_URL;
    }
  };

  const handleDownloadStandaloneHtml = () => {
    const a = document.createElement('a');
    a.href = '/BayBites-Feedback-SingleFile.html';
    a.download = 'BayBites-Feedback-Form.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-stone-800 flex flex-col justify-between" style={{
      backgroundImage: 'radial-gradient(#e5e7eb 1.5px, transparent 1.5px)',
      backgroundSize: '20px 20px'
    }}>
      {/* Top Banner Toolbar */}
      <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-200 px-3 py-2 sm:px-4 sm:py-2.5 shadow-md">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-stone-200">
              Bay Bites Dubai
            </span>
          </div>

          <button
            onClick={handleDownloadStandaloneHtml}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[#E31E24] hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow transition-all cursor-pointer hover:shadow-red-500/25 active:scale-95"
            title="Download standalone HTML file with embedded logo"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .html</span>
          </button>
        </div>
      </header>

      {/* Main Feedback Form Container */}
      <main className="flex-1 py-3 px-2 sm:py-6 sm:px-4 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-stone-200/80 overflow-hidden my-auto transition-all">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-b from-stone-900 to-[#1A1A1A] px-4 pt-6 pb-5 sm:px-6 sm:pt-8 sm:pb-6 text-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#E31E24] opacity-20 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-500 opacity-20 rounded-full blur-2xl pointer-events-none"></div>
            
            {/* Logo Container */}
            <div className="inline-block bg-white p-2.5 px-5 sm:p-3 sm:px-6 rounded-xl sm:rounded-2xl shadow-lg mb-3 transform hover:scale-105 transition-transform duration-300 border border-stone-100">
              <img 
                src={BAYBITES_LOGO_BASE64} 
                alt="BayBites Logo" 
                className="h-11 sm:h-14 object-contain mx-auto"
              />
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">Customer Feedback</h1>
            <p className="mt-1 sm:mt-2 text-stone-300 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
              We value your dining experience! Share your thoughts so we can serve you even better.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="p-3.5 sm:p-6 space-y-3.5 sm:space-y-5">

            {/* Dining Type & Details */}
            <div className="bg-stone-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-stone-200/80">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5">
                <Utensils className="inline-block w-3.5 h-3.5 text-[#E31E24] mr-1.5 -mt-0.5" />
                Dining Type & Details
              </label>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-3 mb-3">
                <button
                  type="button"
                  onClick={() => setDiningType('Dine-in')}
                  className={`p-2 sm:p-2.5 text-center rounded-xl border font-semibold text-xs sm:text-sm transition-all cursor-pointer flex flex-col items-center justify-center ${
                    diningType === 'Dine-in'
                      ? 'border-[#E31E24] bg-red-50 text-[#E31E24] shadow-sm'
                      : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <Armchair className="w-4 h-4 mb-1" />
                  <span>Dine-in</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDiningType('Takeaway')}
                  className={`p-2 sm:p-2.5 text-center rounded-xl border font-semibold text-xs sm:text-sm transition-all cursor-pointer flex flex-col items-center justify-center ${
                    diningType === 'Takeaway'
                      ? 'border-[#E31E24] bg-red-50 text-[#E31E24] shadow-sm'
                      : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 mb-1" />
                  <span>Takeaway</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDiningType('Delivery')}
                  className={`p-2 sm:p-2.5 text-center rounded-xl border font-semibold text-xs sm:text-sm transition-all cursor-pointer flex flex-col items-center justify-center ${
                    diningType === 'Delivery'
                      ? 'border-[#E31E24] bg-red-50 text-[#E31E24] shadow-sm'
                      : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <Bike className="w-4 h-4 mb-1" />
                  <span>Delivery</span>
                </button>
              </div>

              {diningType === 'Dine-in' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">
                      Table No. <span className="font-normal text-stone-400">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={tableNo}
                      onChange={(e) => setTableNo(e.target.value)}
                      placeholder="e.g. Table 12"
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">
                      Server Name <span className="font-normal text-stone-400">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={serverName}
                      onChange={(e) => setServerName(e.target.value)}
                      placeholder="e.g. Ahmed"
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Overall Satisfaction */}
            <div className="bg-red-50/50 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-red-100 text-center space-y-3">
              <h3 className="text-xs sm:text-sm font-bold text-stone-800 uppercase tracking-wide">Overall Satisfaction</h3>
              
              {/* Emojis */}
              <div className="flex justify-center items-center gap-5 sm:gap-8">
                {(['Dissatisfied', 'Neutral', 'Satisfied'] as const).map(type => {
                  const isSelected = satisfactionEmoji === type;
                  const icons = {
                    Dissatisfied: '😠',
                    Neutral: '😐',
                    Satisfied: '😊'
                  };
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSatisfactionEmoji(type)}
                      className={`text-center transition-all duration-200 cursor-pointer ${
                        isSelected 
                          ? 'scale-108 filter-none opacity-100' 
                          : 'grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:-translate-y-0.5'
                      }`}
                    >
                      <div className="text-2xl sm:text-3xl mb-0.5">{icons[type]}</div>
                      <span className={`text-[11px] sm:text-xs font-semibold block ${isSelected ? 'text-[#E31E24]' : 'text-stone-600'}`}>
                        {type}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Star Rating */}
              <div className="pt-2 border-t border-red-100/80">
                <div className="flex justify-center items-center gap-1.5 sm:gap-2 text-2xl sm:text-3xl">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const active = (hoverRating || starRating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setStarRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className={`transition-all duration-150 cursor-pointer ${
                          active ? 'text-amber-500 scale-110' : 'text-stone-300 hover:text-amber-300'
                        }`}
                      >
                        <Star className={`w-6 h-6 sm:w-7 sm:h-7 ${active ? 'fill-amber-400 text-amber-500' : 'fill-none'}`} />
                      </button>
                    );
                  })}
                </div>
                <span className="text-xs font-semibold text-amber-600 mt-1 block h-4">
                  {starRating ? `${starRating} / 5 Stars — ${starLabels[starRating]}` : ''}
                </span>
              </div>
            </div>

            {/* Service Breakdown */}
            <div className="bg-stone-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-stone-200/80">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2 mb-2">
                <span className="text-[11px] sm:text-xs font-bold text-stone-700 uppercase tracking-wider">Service Breakdown</span>
                {/* Desktop column legend */}
                <div className="hidden sm:flex items-center w-[160px] justify-between text-[10px] font-bold text-stone-400 text-center pr-1">
                  <span className="w-6">POOR</span>
                  <span className="w-6">FAIR</span>
                  <span className="w-6">GOOD</span>
                  <span className="w-6">GREAT</span>
                  <span className="w-6">EXC</span>
                </div>
                {/* Mobile column legend */}
                <div className="flex sm:hidden items-center w-[130px] justify-between text-[10px] font-bold text-stone-400 text-center pr-0.5">
                  <span className="w-5">1</span>
                  <span className="w-5">2</span>
                  <span className="w-5">3</span>
                  <span className="w-5">4</span>
                  <span className="w-5">5</span>
                </div>
              </div>

              <div className="space-y-2.5 sm:space-y-3">
                {metrics.map(metric => (
                  <div key={metric.id} className="flex items-center justify-between py-1 text-xs sm:text-sm">
                    <span className="font-medium text-stone-700 flex-1 min-w-0 pr-2 leading-tight">{metric.label}</span>
                    <div className="flex items-center justify-between w-[130px] sm:w-[160px] shrink-0">
                      {[1, 2, 3, 4, 5].map(val => (
                        <label key={val} className="w-5 sm:w-6 flex items-center justify-center cursor-pointer m-0">
                          <input
                            type="radio"
                            name={metric.id}
                            value={val}
                            checked={metric.value === val}
                            onChange={() => handleMetricChange(metric.id, val)}
                            className="w-4 h-4 sm:w-5 sm:h-5 accent-[#E31E24] cursor-pointer"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments / Suggestions */}
            <div>
              <label htmlFor="comments" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                <MessageSquare className="inline-block w-3.5 h-3.5 text-[#E31E24] mr-1 -mt-0.5" />
                Your Feedback / Suggestions
              </label>
              <textarea
                id="comments"
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Tell us about food quality, taste, service or anything we can improve..."
                className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 sm:p-3 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:bg-white transition-all resize-none"
              />
            </div>

            {/* Contact Details */}
            <div className="space-y-3 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    <User className="inline-block w-3.5 h-3.5 text-stone-400 mr-1 -mt-0.5" />
                    Your Name <span className="text-[#E31E24]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    <Phone className="inline-block w-3.5 h-3.5 text-stone-400 mr-1 -mt-0.5" />
                    Mobile No. <span className="text-[#E31E24]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+971 50 000 0000"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  <Mail className="inline-block w-3.5 h-3.5 text-stone-400 mr-1 -mt-0.5" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="sarah@example.com"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:bg-white transition-all"
                />
              </div>

              {/* Special Occasions Field */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    <Sparkles className="inline-block w-3.5 h-3.5 text-amber-500 mr-1 -mt-0.5" />
                    Special Occasion
                  </label>
                  <select
                    value={specialOccasion}
                    onChange={(e) => setSpecialOccasion(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:bg-white transition-all"
                  >
                    <option value="">-- None / General Visit --</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Wedding Anniversary">Wedding Anniversary</option>
                    <option value="Business Lunch">Business Lunch</option>
                    <option value="Family Gathering">Family Gathering</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    <Calendar className="inline-block w-3.5 h-3.5 text-stone-400 mr-1 -mt-0.5" />
                    Date of Visit
                  </label>
                  <input
                    type="date"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button linking to Google Maps */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#E31E24] to-red-700 hover:from-red-600 hover:to-[#E31E24] text-white font-bold py-3 px-5 sm:py-3.5 sm:px-6 rounded-xl shadow-lg hover:shadow-red-500/30 transform active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span>Review us on Google</span>
              </button>
              <p className="text-center text-[11px] sm:text-xs text-stone-400 mt-2">
                Clicking submit will copy your feedback and take you directly to Bay Bites on Google.
              </p>
            </div>

          </form>

          {/* Footer */}
          <div className="bg-stone-100 px-4 py-3 border-t border-stone-200 text-center">
            <p className="text-[11px] sm:text-xs text-stone-500">
              Thank you for choosing <span className="font-bold text-[#E31E24]">BayBites Dubai</span>. We look forward to serving you again soon!
            </p>
          </div>

        </div>
      </main>

      {/* Subtle bottom credit */}
      <footer className="text-center py-2.5 text-xs text-stone-400">
        BayBites Dubai • Customer Feedback & Google Review Portal
      </footer>
    </div>
  );
}

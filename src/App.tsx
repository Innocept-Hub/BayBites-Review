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
  Copy, 
  Check, 
  ExternalLink, 
  Code2, 
  CheckCircle2, 
  AlertCircle 
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

  // UI state
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [showCodeModal, setShowCodeModal] = useState(false);

  const starLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent!'];

  const handleMetricChange = (id: string, value: number) => {
    setMetrics(prev => prev.map(m => m.id === id ? { ...m, value } : m));
  };

  const generateWhatsappMessage = () => {
    let msg = `🍽️ *BAYBITES DUBAI - CUSTOMER FEEDBACK* 🍽️\n`;
    msg += `------------------------------------\n\n`;
    msg += `👤 *Customer Details:*\n`;
    msg += `• *Name:* ${customerName.trim() || 'Guest'}\n`;
    msg += `• *Mobile:* ${customerPhone.trim() || 'N/A'}\n`;
    msg += `• *Email:* ${customerEmail.trim() || 'N/A'}\n\n`;

    msg += `📍 *Visit Info:*\n`;
    msg += `• *Type:* ${diningType}\n`;
    if (diningType === 'Dine-in') {
      msg += `• *Table:* ${tableNo.trim() || 'N/A'}\n`;
      msg += `• *Server:* ${serverName.trim() || 'N/A'}\n`;
    }
    msg += `• *Date:* ${visitDate || 'N/A'}\n`;
    if (specialOccasion) {
      msg += `• *Occasion:* 🎉 ${specialOccasion}\n`;
    }
    msg += `\n`;

    msg += `⭐ *Overall Satisfaction:* ${satisfactionEmoji || 'Not Specified'}\n`;
    msg += `⭐ *Star Rating:* ${starRating ? starRating + '/5 Stars' : 'Not Specified'}\n\n`;

    msg += `📊 *Detailed Breakdown:*\n`;
    metrics.forEach(m => {
      msg += `• *${m.label}*: ${m.value}/5 ⭐\n`;
    });
    msg += `\n`;

    msg += `💬 *Comments / Suggestions:*\n"${comments.trim() || 'None provided'}"\n\n`;
    msg += `------------------------------------\n`;
    msg += `_Submitted via BayBites Online Feedback Portal_`;
    return msg;
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

    const message = generateWhatsappMessage();
    setSubmittedMessage(message);

    const targetWhatsappNumber = '971554266044';
    const whatsappUrl = `https://wa.me/${targetWhatsappNumber}?text=${encodeURIComponent(message)}`;

    // Try opening WhatsApp in new tab
    const win = window.open(whatsappUrl, '_blank');
    if (!win) {
      window.location.href = whatsappUrl;
    }
  };

  const getStandaloneHtml = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BayBites - Customer Feedback Form</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brandRed: '#E31E24',
                        brandDark: '#1A1A1A',
                        brandAccent: '#22C55E',
                        brandWarmBg: '#FAF6F0'
                    },
                    fontFamily: {
                        sans: ['Plus Jakarta Sans', 'sans-serif'],
                    }
                }
            }
        }
    </script>

    <style>
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #FAF6F0;
            background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
            background-size: 24px 24px;
        }

        .rating-star {
            transition: all 0.2s ease;
            cursor: pointer;
        }
        .rating-star:hover,
        .rating-star.active {
            color: #F59E0B;
            transform: scale(1.15);
        }

        .emoji-option {
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            filter: grayscale(80%);
            opacity: 0.6;
        }

        .emoji-option:hover,
        .emoji-option.selected {
            filter: grayscale(0%);
            opacity: 1;
            transform: translateY(-4px) scale(1.1);
        }

        .rating-circle {
            appearance: none;
            -webkit-appearance: none;
            width: 22px;
            height: 22px;
            border: 2px solid #D1D5DB;
            border-radius: 50%;
            outline: none;
            cursor: pointer;
            transition: all 0.15s ease-in-out;
            position: relative;
        }

        .rating-circle:checked {
            border-color: #E31E24;
            background-color: #E31E24;
            box-shadow: 0 0 0 3px rgba(227, 30, 36, 0.2);
        }

        .rating-circle:checked::after {
            content: '';
            position: absolute;
            top: 5px;
            left: 5px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: white;
        }

        ::-webkit-scrollbar {
            width: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
            background: #E31E24;
            border-radius: 3px;
        }
    </style>
</head>
<body class="min-h-screen py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-center">

    <div class="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-stone-200/60 overflow-hidden my-auto">
        
        <!-- Header Banner with embedded logo -->
        <div class="bg-gradient-to-b from-stone-900 to-brandDark px-6 pt-8 pb-6 text-center relative overflow-hidden">
            <div class="absolute -top-10 -right-10 w-32 h-32 bg-brandRed opacity-20 rounded-full blur-2xl"></div>
            <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-500 opacity-20 rounded-full blur-2xl"></div>
            
            <!-- Embedded Logo -->
            <div class="inline-block bg-white p-3 px-6 rounded-2xl shadow-lg mb-4 transform hover:scale-105 transition-transform duration-300">
                <img src="${BAYBITES_LOGO_BASE64}" 
                     alt="BayBites Logo" 
                     class="h-14 md:h-16 object-contain mx-auto">
            </div>

            <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Customer Feedback</h1>
            <p class="mt-2 text-stone-300 text-sm sm:text-base max-w-md mx-auto">
                We value your dining experience in Dubai! Share your thoughts so we can serve you even better.
            </p>
        </div>

        <!-- Form Body -->
        <form id="feedbackForm" onsubmit="handleFormSubmit(event)" class="p-6 sm:p-8 space-y-6">

            <div class="bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200/80">
                <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-3">
                    <i class="fa-solid fa-utensils text-brandRed mr-2"></i> Dining Type & Details
                </label>
                <div class="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                    <label class="cursor-pointer">
                        <input type="radio" name="diningType" value="Dine-in" checked class="peer hidden" onchange="toggleDineInFields(true)">
                        <div class="p-2.5 sm:p-3 text-center rounded-xl border border-stone-300 bg-white peer-checked:border-brandRed peer-checked:bg-red-50 peer-checked:text-brandRed font-semibold text-xs sm:text-sm text-stone-600 transition-all">
                            <i class="fa-solid fa-chair block text-base mb-1"></i> Dine-in
                        </div>
                    </label>
                    <label class="cursor-pointer">
                        <input type="radio" name="diningType" value="Takeaway" class="peer hidden" onchange="toggleDineInFields(false)">
                        <div class="p-2.5 sm:p-3 text-center rounded-xl border border-stone-300 bg-white peer-checked:border-brandRed peer-checked:bg-red-50 peer-checked:text-brandRed font-semibold text-xs sm:text-sm text-stone-600 transition-all">
                            <i class="fa-solid fa-bag-shopping block text-base mb-1"></i> Takeaway
                        </div>
                    </label>
                    <label class="cursor-pointer">
                        <input type="radio" name="diningType" value="Delivery" class="peer hidden" onchange="toggleDineInFields(false)">
                        <div class="p-2.5 sm:p-3 text-center rounded-xl border border-stone-300 bg-white peer-checked:border-brandRed peer-checked:bg-red-50 peer-checked:text-brandRed font-semibold text-xs sm:text-sm text-stone-600 transition-all">
                            <i class="fa-solid fa-motorcycle block text-base mb-1"></i> Delivery
                        </div>
                    </label>
                </div>

                <div id="dineInFields" class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-medium text-stone-500 mb-1">Table No. (Optional)</label>
                        <input type="text" id="tableNo" placeholder="e.g. Table 12" class="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-brandRed focus:border-transparent transition-all">
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-stone-500 mb-1">Server Name (Optional)</label>
                        <input type="text" id="serverName" placeholder="e.g. Ahmed" class="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-brandRed focus:border-transparent transition-all">
                    </div>
                </div>
            </div>

            <div class="bg-red-50/50 p-5 rounded-2xl border border-red-100 text-center space-y-4">
                <h3 class="text-sm font-bold text-stone-800 uppercase tracking-wide">Overall Satisfaction</h3>
                
                <div class="flex justify-center items-center gap-6 sm:gap-10">
                    <div onclick="selectEmoji('Dissatisfied')" id="emoji-Dissatisfied" class="emoji-option text-center">
                        <div class="text-3xl sm:text-4xl mb-1">😠</div>
                        <span class="text-xs font-semibold text-stone-600 block">Dissatisfied</span>
                    </div>
                    <div onclick="selectEmoji('Neutral')" id="emoji-Neutral" class="emoji-option text-center">
                        <div class="text-3xl sm:text-4xl mb-1">😐</div>
                        <span class="text-xs font-semibold text-stone-600 block">Neutral</span>
                    </div>
                    <div onclick="selectEmoji('Satisfied')" id="emoji-Satisfied" class="emoji-option text-center">
                        <div class="text-3xl sm:text-4xl mb-1">😊</div>
                        <span class="text-xs font-semibold text-stone-600 block">Satisfied</span>
                    </div>
                </div>

                <div class="pt-2 border-t border-red-100/80">
                    <div class="flex justify-center items-center gap-2 text-3xl text-stone-300" id="starContainer">
                        <i class="fa-solid fa-star rating-star" onclick="setStarRating(1)" data-star="1"></i>
                        <i class="fa-solid fa-star rating-star" onclick="setStarRating(2)" data-star="2"></i>
                        <i class="fa-solid fa-star rating-star" onclick="setStarRating(3)" data-star="3"></i>
                        <i class="fa-solid fa-star rating-star" onclick="setStarRating(4)" data-star="4"></i>
                        <i class="fa-solid fa-star rating-star" onclick="setStarRating(5)" data-star="5"></i>
                    </div>
                    <span id="starRatingText" class="text-xs font-medium text-amber-600 mt-1 block h-4">5 / 5 Stars - Excellent!</span>
                </div>
            </div>

            <div class="bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200/80 space-y-4">
                <div class="flex justify-between items-center border-b border-stone-200 pb-2">
                    <span class="text-xs font-bold text-stone-700 uppercase tracking-wider">Service Breakdown</span>
                    <div class="flex text-[10px] font-bold text-stone-400 space-x-3 sm:space-x-4 pr-1">
                        <span>POOR</span>
                        <span>FAIR</span>
                        <span>GOOD</span>
                        <span>GREAT</span>
                        <span>EXCELLENT</span>
                    </div>
                </div>

                <div id="metricsList" class="space-y-3">
                    <!-- Dynamic Rating Rows -->
                </div>
            </div>

            <div>
                <label for="comments" class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    <i class="fa-solid fa-comment-dots text-brandRed mr-1"></i> Your Feedback / Suggestions
                </label>
                <textarea id="comments" rows="3" placeholder="Tell us about food quality, taste, service or anything we can improve..." class="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-brandRed focus:bg-white transition-all resize-none"></textarea>
            </div>

            <div class="space-y-4 pt-2">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">Your Name <span class="text-brandRed">*</span></label>
                        <input type="text" id="customerName" required placeholder="e.g. Sarah Jenkins" class="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-brandRed focus:bg-white transition-all">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">Mobile No. <span class="text-brandRed">*</span></label>
                        <input type="tel" id="customerPhone" required placeholder="+971 50 000 0000" class="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-brandRed focus:bg-white transition-all">
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">Email Address</label>
                    <input type="email" id="customerEmail" placeholder="sarah@example.com" class="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-brandRed focus:bg-white transition-all">
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                            <i class="fa-solid fa-cake-candles text-amber-500 mr-1"></i> Special Occasion
                        </label>
                        <select id="specialOccasion" class="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-brandRed focus:bg-white transition-all">
                            <option value="">-- None / General Visit --</option>
                            <option value="Birthday">Birthday</option>
                            <option value="Wedding Anniversary">Wedding Anniversary</option>
                            <option value="Business Lunch">Business Lunch</option>
                            <option value="Family Gathering">Family Gathering</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">Date of Visit</label>
                        <input type="date" id="visitDate" class="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-brandRed focus:bg-white transition-all">
                    </div>
                </div>
            </div>

            <div class="pt-2">
                <button type="submit" class="w-full bg-gradient-to-r from-brandRed to-red-700 hover:from-red-600 hover:to-brandRed text-white font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-red-500/30 transform active:scale-[0.99] transition-all flex items-center justify-center space-x-2 text-base cursor-pointer">
                    <i class="fa-brands fa-whatsapp text-xl"></i>
                    <span>Submit via WhatsApp</span>
                </button>
                <p class="text-center text-xs text-stone-400 mt-2">
                    Clicking submit will redirect you to WhatsApp to send your formatted feedback directly to BayBites.
                </p>
            </div>

        </form>

        <!-- Footer -->
        <div class="bg-stone-100 px-6 py-4 border-t border-stone-200 text-center">
            <p class="text-xs text-stone-500">
                Thank you for choosing <span class="font-bold text-brandRed">BayBites Dubai</span>. We look forward to serving you again soon!
            </p>
        </div>

    </div>

    <!-- JavaScript Implementation -->
    <script>
        const metrics = [
            { id: 'foodQuality', label: 'Food & Taste' },
            { id: 'service', label: 'Service Speed & Hospitality' },
            { id: 'ambiance', label: 'Ambiance & Atmosphere' },
            { id: 'cleanliness', label: 'Cleanliness & Hygiene' },
            { id: 'value', label: 'Value for Money' }
        ];

        let selectedEmoji = 'Satisfied';
        let selectedStarRating = 5;

        window.addEventListener('DOMContentLoaded', () => {
            const metricsContainer = document.getElementById('metricsList');
            metrics.forEach(metric => {
                const row = document.createElement('div');
                row.className = 'flex items-center justify-between py-1 text-sm';
                row.innerHTML = \`
                    <span class="text-xs sm:text-sm font-medium text-stone-700">\${metric.label}</span>
                    <div class="flex items-center space-x-3 sm:space-x-5">
                        \${[1, 2, 3, 4, 5].map(val => \`
                            <label class="cursor-pointer">
                                <input type="radio" name="\${metric.id}" value="\${val}" class="rating-circle" \${val === 5 ? 'checked' : ''}>
                            </label>
                        \`).join('')}
                    </div>
                \`;
                metricsContainer.appendChild(row);
            });

            const today = new Date().toISOString().split('T')[0];
            document.getElementById('visitDate').value = today;
            setStarRating(5);
            selectEmoji('Satisfied');
        });

        function toggleDineInFields(show) {
            const container = document.getElementById('dineInFields');
            if (show) {
                container.classList.remove('hidden');
            } else {
                container.classList.add('hidden');
            }
        }

        function selectEmoji(type) {
            selectedEmoji = type;
            document.querySelectorAll('.emoji-option').forEach(el => el.classList.remove('selected'));
            const target = document.getElementById('emoji-' + type);
            if (target) {
                target.classList.add('selected');
            }
        }

        function setStarRating(rating) {
            selectedStarRating = rating;
            const stars = document.querySelectorAll('.rating-star');
            const labels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent!'];
            
            stars.forEach((star, index) => {
                if (index < rating) {
                    star.classList.add('active');
                } else {
                    star.classList.remove('active');
                }
            });

            document.getElementById('starRatingText').innerText = rating + ' / 5 Stars - ' + labels[rating];
        }

        function handleFormSubmit(event) {
            event.preventDefault();

            const diningType = document.querySelector('input[name="diningType"]:checked')?.value || 'Dine-in';
            const tableNo = document.getElementById('tableNo').value.trim() || 'N/A';
            const serverName = document.getElementById('serverName').value.trim() || 'N/A';
            const comments = document.getElementById('comments').value.trim() || 'None provided';
            const customerName = document.getElementById('customerName').value.trim();
            const customerPhone = document.getElementById('customerPhone').value.trim();
            const customerEmail = document.getElementById('customerEmail').value.trim() || 'N/A';
            const specialOccasion = document.getElementById('specialOccasion').value || 'None';
            const visitDate = document.getElementById('visitDate').value || 'N/A';

            let ratingsSummary = '';
            metrics.forEach(m => {
                const val = document.querySelector(\`input[name="\${m.id}"]:checked\`)?.value || '5';
                ratingsSummary += '• *' + m.label + '*: ' + val + '/5 ⭐\\n';
            });

            const targetWhatsappNumber = "971554266044";

            let message = '🍽️ *BAYBITES DUBAI - CUSTOMER FEEDBACK* 🍽️\\n';
            message += '------------------------------------\\n\\n';
            
            message += '👤 *Customer Details:*\\n';
            message += '• *Name:* ' + customerName + '\\n';
            message += '• *Mobile:* ' + customerPhone + '\\n';
            message += '• *Email:* ' + customerEmail + '\\n\\n';

            message += '📍 *Visit Info:*\\n';
            message += '• *Type:* ' + diningType + '\\n';
            if (diningType === 'Dine-in') {
                message += '• *Table:* ' + tableNo + '\\n';
                message += '• *Server:* ' + serverName + '\\n';
            }
            message += '• *Date:* ' + visitDate + '\\n';
            if (specialOccasion !== 'None') {
                message += '• *Occasion:* 🎉 ' + specialOccasion + '\\n';
            }
            message += '\\n';

            message += '⭐ *Overall Satisfaction:* ' + (selectedEmoji ? selectedEmoji : 'Not Specified') + '\\n';
            message += '⭐ *Star Rating:* ' + (selectedStarRating ? selectedStarRating + '/5 Stars' : 'Not Specified') + '\\n\\n';

            message += '📊 *Detailed Breakdown:*\\n' + ratingsSummary + '\\n';

            message += '💬 *Comments / Suggestions:*\\n"' + comments + '"\\n\\n';
            message += '------------------------------------\\n';
            message += '_Submitted via BayBites Online Feedback Portal_';

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = 'https://wa.me/' + targetWhatsappNumber + '?text=' + encodedMessage;

            window.location.href = whatsappUrl;
        }
    </script>
</body>
</html>`;
  };

  const handleDownloadHtml = () => {
    const html = getStandaloneHtml();
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'BayBites-Feedback-SingleFile.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyHtml = async () => {
    try {
      const html = getStandaloneHtml();
      await navigator.clipboard.writeText(html);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    } catch {
      alert('Unable to copy to clipboard.');
    }
  };

  const handleCopyWhatsapp = async () => {
    try {
      const msg = submittedMessage || generateWhatsappMessage();
      await navigator.clipboard.writeText(msg);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    } catch {
      alert('Unable to copy message.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-stone-800 flex flex-col justify-between" style={{
      backgroundImage: 'radial-gradient(#e5e7eb 1.5px, transparent 1.5px)',
      backgroundSize: '24px 24px'
    }}>
      {/* Top Banner Toolbar */}
      <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-200 px-4 py-3 shadow-md">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Logo Embedded
            </span>
            <span className="text-xs sm:text-sm font-medium text-stone-300 hidden md:inline">
              Self-contained HTML with 100% offline Base64 BayBites Logo
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadHtml}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow transition-all cursor-pointer hover:shadow-red-500/25 active:scale-95"
              title="Download standalone HTML file with embedded logo"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .html</span>
            </button>

            <button
              onClick={handleCopyHtml}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-medium rounded-lg transition-all cursor-pointer active:scale-95"
              title="Copy single-file HTML code"
            >
              {copiedCode ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-400" />
                  <span>Copy HTML</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowCodeModal(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-300 text-xs rounded-lg transition-all cursor-pointer"
              title="View single-file HTML source"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Inspect</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Feedback Form Container */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-stone-200/80 overflow-hidden my-auto transition-all">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-b from-stone-900 to-[#1A1A1A] px-6 pt-8 pb-7 text-center relative overflow-hidden">
            {/* Ambient visual orbs */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#E31E24] opacity-25 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-amber-500 opacity-20 rounded-full blur-3xl pointer-events-none"></div>
            
            {/* Logo Container with Base64 embedded logo */}
            <div className="inline-block bg-white p-3.5 px-7 rounded-2xl shadow-xl mb-4 transform hover:scale-105 transition-transform duration-300 border border-stone-100">
              <img 
                src={BAYBITES_LOGO_BASE64} 
                alt="BayBites Logo" 
                className="h-14 sm:h-16 object-contain mx-auto"
              />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Customer Feedback</h1>
            <p className="mt-2 text-stone-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              We value your dining experience in Dubai! Share your thoughts so we can serve you even better.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 space-y-6">

            {/* Dining Type & Details */}
            <div className="bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200/80">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-3">
                <Utensils className="inline-block w-3.5 h-3.5 text-[#E31E24] mr-2 -mt-0.5" />
                Dining Type & Details
              </label>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setDiningType('Dine-in')}
                  className={`p-3 text-center rounded-xl border font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                    diningType === 'Dine-in'
                      ? 'border-[#E31E24] bg-red-50 text-[#E31E24] shadow-sm'
                      : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <Armchair className="w-4 h-4 mx-auto mb-1" />
                  Dine-in
                </button>

                <button
                  type="button"
                  onClick={() => setDiningType('Takeaway')}
                  className={`p-3 text-center rounded-xl border font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                    diningType === 'Takeaway'
                      ? 'border-[#E31E24] bg-red-50 text-[#E31E24] shadow-sm'
                      : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 mx-auto mb-1" />
                  Takeaway
                </button>

                <button
                  type="button"
                  onClick={() => setDiningType('Delivery')}
                  className={`p-3 text-center rounded-xl border font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                    diningType === 'Delivery'
                      ? 'border-[#E31E24] bg-red-50 text-[#E31E24] shadow-sm'
                      : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <Bike className="w-4 h-4 mx-auto mb-1" />
                  Delivery
                </button>
              </div>

              {diningType === 'Dine-in' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-medium text-stone-500 mb-1">Table No. (Optional)</label>
                    <input
                      type="text"
                      value={tableNo}
                      onChange={(e) => setTableNo(e.target.value)}
                      placeholder="e.g. Table 12"
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-500 mb-1">Server Name (Optional)</label>
                    <input
                      type="text"
                      value={serverName}
                      onChange={(e) => setServerName(e.target.value)}
                      placeholder="e.g. Ahmed"
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Overall Satisfaction */}
            <div className="bg-red-50/50 p-5 rounded-2xl border border-red-100 text-center space-y-4">
              <h3 className="text-xs sm:text-sm font-bold text-stone-800 uppercase tracking-wider">Overall Satisfaction</h3>
              
              {/* Emojis */}
              <div className="flex justify-center items-center gap-6 sm:gap-10">
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
                          ? 'scale-110 filter-none opacity-100' 
                          : 'grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:-translate-y-1'
                      }`}
                    >
                      <div className="text-3xl sm:text-4xl mb-1">{icons[type]}</div>
                      <span className={`text-xs font-semibold block ${isSelected ? 'text-[#E31E24]' : 'text-stone-600'}`}>
                        {type}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Star Rating */}
              <div className="pt-2 border-t border-red-100/80">
                <div className="flex justify-center items-center gap-2 text-3xl">
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
                        <Star className={`w-7 h-7 sm:w-8 sm:h-8 ${active ? 'fill-amber-400 text-amber-500' : 'fill-none'}`} />
                      </button>
                    );
                  })}
                </div>
                <span className="text-xs font-semibold text-amber-600 mt-1.5 block min-h-[1.2rem]">
                  {starRating ? `${starRating} / 5 Stars — ${starLabels[starRating]}` : ''}
                </span>
              </div>
            </div>

            {/* Service Breakdown */}
            <div className="bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200/80 space-y-3.5">
              <div className="flex justify-between items-center border-b border-stone-200 pb-2.5">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">Service Breakdown</span>
                <div className="flex text-[10px] font-bold text-stone-400 space-x-2.5 sm:space-x-4 pr-1">
                  <span>POOR</span>
                  <span>FAIR</span>
                  <span>GOOD</span>
                  <span>GREAT</span>
                  <span>EXCELLENT</span>
                </div>
              </div>

              <div className="space-y-3">
                {metrics.map(metric => (
                  <div key={metric.id} className="flex items-center justify-between py-1 text-sm">
                    <span className="text-xs sm:text-sm font-medium text-stone-700">{metric.label}</span>
                    <div className="flex items-center space-x-3 sm:space-x-5">
                      {[1, 2, 3, 4, 5].map(val => (
                        <label key={val} className="cursor-pointer p-0.5">
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
              <label htmlFor="comments" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                <MessageSquare className="inline-block w-3.5 h-3.5 text-[#E31E24] mr-1.5 -mt-0.5" />
                Your Feedback / Suggestions
              </label>
              <textarea
                id="comments"
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Tell us about food quality, taste, service or anything we can improve..."
                className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:bg-white transition-all resize-none"
              />
            </div>

            {/* Contact Details */}
            <div className="space-y-4 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:bg-white transition-all"
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
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:bg-white transition-all"
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
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:bg-white transition-all"
                />
              </div>

              {/* Special Occasions Field */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    <Sparkles className="inline-block w-3.5 h-3.5 text-amber-500 mr-1 -mt-0.5" />
                    Special Occasion
                  </label>
                  <select
                    value={specialOccasion}
                    onChange={(e) => setSpecialOccasion(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:bg-white transition-all"
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
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#E31E24] to-red-700 hover:from-red-600 hover:to-[#E31E24] text-white font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-red-500/30 transform active:scale-[0.99] transition-all flex items-center justify-center space-x-2 text-base cursor-pointer"
              >
                <span className="text-xl">💬</span>
                <span>Submit via WhatsApp</span>
              </button>
              <p className="text-center text-xs text-stone-400 mt-2">
                Clicking submit will redirect you to WhatsApp to send your formatted feedback directly to BayBites (+971 55 426 6044).
              </p>
            </div>

          </form>

          {/* Submission Preview Card if user submitted */}
          {submittedMessage && (
            <div className="mx-6 sm:mx-8 mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl animate-fadeIn">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Feedback Formatted & Ready</span>
                </div>
                <button
                  onClick={handleCopyWhatsapp}
                  className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-white border border-emerald-300 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  {copiedMessage ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedMessage ? 'Copied' : 'Copy Message'}
                </button>
              </div>
              <pre className="text-xs text-emerald-950 font-mono bg-white/70 p-3 rounded-xl overflow-x-auto whitespace-pre-wrap border border-emerald-100">
                {submittedMessage}
              </pre>
            </div>
          )}

          {/* Footer */}
          <div className="bg-stone-100 px-6 py-4 border-t border-stone-200 text-center">
            <p className="text-xs text-stone-500">
              Thank you for choosing <span className="font-bold text-[#E31E24]">BayBites Dubai</span>. We look forward to serving you again soon!
            </p>
          </div>

        </div>
      </main>

      {/* Code Inspector Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-stone-200">
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-stone-900 text-base">Single Contained HTML with Embedded Logo</h3>
                <p className="text-xs text-stone-500">All styles, fonts, scripts, and the BayBites logo are self-contained in this single file.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyHtml}
                  className="px-3 py-1.5 bg-[#E31E24] hover:bg-red-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>
                <button
                  onClick={() => setShowCodeModal(false)}
                  className="text-stone-400 hover:text-stone-600 text-lg font-bold p-1 rounded-lg"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-4 flex-1 overflow-auto bg-stone-900 text-stone-200 text-xs font-mono">
              <pre className="whitespace-pre-wrap">{getStandaloneHtml()}</pre>
            </div>
            <div className="px-6 py-3 bg-stone-50 border-t border-stone-200 flex justify-between items-center text-xs text-stone-500">
              <span>File size: ~166 KB (self-contained with high-res PNG logo data URI)</span>
              <button
                onClick={handleDownloadHtml}
                className="text-[#E31E24] font-bold hover:underline flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" /> Download HTML
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subtle bottom credit */}
      <footer className="text-center py-3 text-xs text-stone-400">
        BayBites Dubai • Online Customer Feedback Portal
      </footer>
    </div>
  );
}

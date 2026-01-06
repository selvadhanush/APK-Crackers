import React, { useState } from 'react';
import {
    MdBusiness,
    MdEmail,
    MdPhone,
    MdLocationOn,
    MdCheckCircle,
    MdStore,
    MdPerson,
    MdLock,
    MdArrowForward,
    MdArrowBack,
    MdUploadFile,
    MdClose
} from 'react-icons/md';
import { FaIdCard, FaFileAlt, FaStore as FaStoreLicense, FaFire, FaIndustry, FaWarehouse, FaTruck, FaCertificate } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import showToast from '../../utils/toast';
import API from '../../../api';
import { ImageIcon } from 'lucide-react';

const SellerRegister = () => {
    const navigate = useNavigate();

    // Load saved step from localStorage or default to 1
    const [currentStep, setCurrentStep] = useState(() => {
        const saved = localStorage.getItem('sellerRegStep');
        return saved ? parseInt(saved) : 1;
    });

    const [loading, setLoading] = useState(false);
    const [checkingEmail, setCheckingEmail] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(() => {
        return localStorage.getItem('sellerPending') === 'true';
    });

    // Step 1: Basic Registration Data - Load from localStorage
    const [registrationData, setRegistrationData] = useState(() => {
        const saved = localStorage.getItem('sellerRegData');
        return saved ? JSON.parse(saved) : {
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            businessName: '',
            businessType: '',
            businessAddress: '',
            city: '',
            state: '',
            pincode: ''
        };
    });

    // Step 2 & 3: KYC Data - Load text fields from localStorage
    const [kycData, setKycData] = useState(() => {
        const saved = localStorage.getItem('sellerKycData');
        return saved ? JSON.parse(saved) : {
            // Step 2: Basic KYC
            panCard: null,
            aadhaarFront: null,
            aadhaarBack: null,
            gstCertificate: null,
            gstNumber: '',
            incorporationCertificate: null,
            cinOrLlpin: '',
            // Step 3: PESO Licenses
            le1Manufacturing: null,
            le1LicenseNumber: '',
            le1ExpiryDate: '',
            le2Shop: null,
            le2LicenseNumber: '',
            le2ExpiryDate: '',
            le3Storage: null,
            le3LicenseNumber: '',
            le3ExpiryDate: '',
            le5Le6SaleTransport: null,
            le5Le6LicenseNumber: '',
            le5Le6ExpiryDate: '',
            // Step 3: NEERI QR
            neeriQRCertificate: null,
            neeriQRNumber: '',
            neeriQRExpiry: ''
        };
    });

    const [previews, setPreviews] = useState({});

    const totalSteps = 3;
    const EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

    // Check if saved data has expired on component mount
    React.useEffect(() => {
        const savedTimestamp = localStorage.getItem('sellerRegTimestamp');
        if (savedTimestamp) {
            const currentTime = new Date().getTime();
            const savedTime = parseInt(savedTimestamp);
            const timeDiff = currentTime - savedTime;

            if (timeDiff > EXPIRY_TIME) {
                console.log('Saved form data expired, clearing...');
                clearFormData();
            }
        }
    }, []);

    // Save current step to localStorage whenever it changes
    React.useEffect(() => {
        localStorage.setItem('sellerRegStep', currentStep.toString());
        localStorage.setItem('sellerRegTimestamp', new Date().getTime().toString());
    }, [currentStep]);

    // Save registration data to localStorage whenever it changes
    React.useEffect(() => {
        localStorage.setItem('sellerRegData', JSON.stringify(registrationData));
        localStorage.setItem('sellerRegTimestamp', new Date().getTime().toString());
    }, [registrationData]);

    // Save KYC text data to localStorage (excluding files)
    React.useEffect(() => {
        const textOnlyData = {
            gstNumber: kycData.gstNumber,
            cinOrLlpin: kycData.cinOrLlpin,
            le1LicenseNumber: kycData.le1LicenseNumber,
            le1ExpiryDate: kycData.le1ExpiryDate,
            le2LicenseNumber: kycData.le2LicenseNumber,
            le2ExpiryDate: kycData.le2ExpiryDate,
            le3LicenseNumber: kycData.le3LicenseNumber,
            le3ExpiryDate: kycData.le3ExpiryDate,
            le5Le6LicenseNumber: kycData.le5Le6LicenseNumber,
            le5Le6ExpiryDate: kycData.le5Le6ExpiryDate,
            neeriQRNumber: kycData.neeriQRNumber,
            neeriQRExpiry: kycData.neeriQRExpiry
        };
        localStorage.setItem('sellerKycData', JSON.stringify(textOnlyData));
        localStorage.setItem('sellerRegTimestamp', new Date().getTime().toString());
    }, [kycData.gstNumber, kycData.cinOrLlpin, kycData.le1LicenseNumber, kycData.le1ExpiryDate,
    kycData.le2LicenseNumber, kycData.le2ExpiryDate, kycData.le3LicenseNumber, kycData.le3ExpiryDate,
    kycData.le5Le6LicenseNumber, kycData.le5Le6ExpiryDate, kycData.neeriQRNumber, kycData.neeriQRExpiry]);

    // Auto-delete timer - check every minute if data should be deleted
    React.useEffect(() => {
        const interval = setInterval(() => {
            const savedTimestamp = localStorage.getItem('sellerRegTimestamp');
            if (savedTimestamp) {
                const currentTime = new Date().getTime();
                const savedTime = parseInt(savedTimestamp);
                const timeDiff = currentTime - savedTime;

                if (timeDiff > EXPIRY_TIME) {
                    console.log('Auto-deleting expired form data...');
                    clearFormData();
                    window.location.reload();
                }
            }
        }, 60000); // Check every minute

        return () => clearInterval(interval);
    }, []);

    // Clear localStorage on successful registration
    const clearFormData = () => {
        localStorage.removeItem('sellerRegStep');
        localStorage.removeItem('sellerRegData');
        localStorage.removeItem('sellerKycData');
        localStorage.removeItem('sellerRegTimestamp');
    };

    const handleRegistrationChange = (e) => {
        const { name, value } = e.target;
        setRegistrationData(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const handleKycTextChange = (key, value) => {
        setKycData(prev => ({ ...prev, [key]: value }));
        if (error) setError('');
    };

    const handleFileChange = (key, file) => {
        if (file) {
            // Validate file size (5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError(`File size must be less than 5MB`);
                return;
            }

            setKycData(prev => ({ ...prev, [key]: file }));

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => ({ ...prev, [key]: reader.result }));
            };
            reader.readAsDataURL(file);
            setError('');
        }
    };

    const handleRemoveFile = (key) => {
        setKycData(prev => ({ ...prev, [key]: null }));
        setPreviews(prev => {
            const newPreviews = { ...prev };
            delete newPreviews[key];
            return newPreviews;
        });
    };

    const validateStep1 = () => {
        const { name, email, phone, password, confirmPassword, businessName, businessType, businessAddress, city, state, pincode } = registrationData;

        if (!name || !email || !phone || !password || !confirmPassword || !businessName || !businessType || !businessAddress || !city || !state || !pincode) {
            setError('Please fill in all required fields');
            return false;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return false;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
            setError('Please enter a valid 10-digit phone number');
            return false;
        }

        return true;
    };

    // Check if email already exists
    const checkEmailExists = async (email) => {
        try {
            setCheckingEmail(true);
            const response = await API.post('/seller/auth/check-email', { email });
            return response.data.exists;
        } catch (err) {
            console.error('Error checking email:', err);
            // If there's an error checking, allow them to proceed
            // The backend will catch it during registration
            return false;
        } finally {
            setCheckingEmail(false);
        }
    };

    // Check if phone already exists
    const checkPhoneExists = async (phone) => {
        try {
            setCheckingEmail(true); // Reuse the same loading state
            const response = await API.post('/seller/auth/check-email', { phone });
            return response.data.exists;
        } catch (err) {
            console.error('Error checking phone:', err);
            return false;
        } finally {
            setCheckingEmail(false);
        }
    };

    const validateStep2 = () => {
        const requiredFiles = ['panCard', 'aadhaarFront', 'aadhaarBack', 'gstCertificate'];

        for (const field of requiredFiles) {
            if (!kycData[field]) {
                setError(`Please upload ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                return false;
            }
        }

        if (!kycData.gstNumber) {
            setError('Please enter GST number');
            return false;
        }

        return true;
    };

    const validateStep3 = () => {
        // Step 3 is optional, so always return true
        // But we can add warnings if they want
        return true;
    };

    const handleNext = async (e) => {
        // Explicitly prevent any form submission
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        console.log('🔵 handleNext called, currentStep:', currentStep);
        if (currentStep === 1) {
            if (validateStep1()) {
                // Check if email already exists
                const emailExists = await checkEmailExists(registrationData.email);
                if (emailExists) {
                    setError('An account with this email already exists. Please use a different email or login.');
                    return;
                }

                // Check if phone already exists
                const phoneExists = await checkPhoneExists(registrationData.phone);
                if (phoneExists) {
                    setError('An account with this phone number already exists. Please use a different phone number or login.');
                    return;
                }

                console.log('✅ Moving from Step 1 to Step 2');
                setCurrentStep(2);
                setError('');
            }
        } else if (currentStep === 2) {
            if (validateStep2()) {
                console.log('✅ Moving from Step 2 to Step 3');
                console.log('⚠️ IMPORTANT: Form should NOT submit yet!');
                setCurrentStep(3);
                setError('');
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('🔴 handleSubmit called! currentStep:', currentStep);

        // CRITICAL: Only allow submission on step 3
        // This prevents accidental form submission when user presses Enter on steps 1 or 2
        if (currentStep !== 3) {
            console.log('❌ FORM SUBMISSION BLOCKED - Current step is', currentStep, 'but must be 3');
            showToast.warning('Please complete all steps before submitting.');
            return;
        }

        console.log('✅ Form submission ALLOWED - proceeding with registration...');

        setError('');
        setSuccess('');

        if (!validateStep3()) {
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();

            // Append registration data
            Object.keys(registrationData).forEach(key => {
                if (key !== 'confirmPassword') {
                    formData.append(key, registrationData[key]);
                }
            });

            // Append KYC files and text data
            Object.keys(kycData).forEach(key => {
                if (kycData[key] instanceof File) {
                    formData.append(key, kycData[key]);
                } else if (kycData[key] && typeof kycData[key] === 'string') {
                    formData.append(key, kycData[key]);
                }
            });

            const response = await API.post('/seller/auth/register-with-kyc', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data) {
                clearFormData();
                setSuccess('Registration successful! Your application has been received.');
                localStorage.setItem('sellerPending', 'true');
                setIsSubmitted(true);

                // Scroll to top to show success message
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } catch (err) {
            console.error('Registration error:', err);
            console.error('Error response:', err.response);
            console.error('Error data:', err.response?.data);
            setError(err.response?.data?.message || err.response?.data?.error || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Prevent Enter key from submitting form on steps 1 and 2
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && currentStep !== 3) {
            e.preventDefault();
            console.log('Enter key blocked - use Next button to proceed');
        }
    };

    const inputClasses = "w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border-2 border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all placeholder:text-gray-400 bg-white hover:border-gray-300";
    const labelClasses = "block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2";

    // Step 2: Basic KYC Sections
    const step2Sections = [
        {
            title: 'Identity Documents',
            icon: FaIdCard,
            fields: [
                { key: 'panCard', label: 'PAN Card (Proprietor/Company/LLP)', required: true },
                { key: 'aadhaarFront', label: 'Aadhaar Card (Front)', required: true },
                { key: 'aadhaarBack', label: 'Aadhaar Card (Back)', required: true }
            ]
        },
        {
            title: 'Business Documents',
            icon: FaStoreLicense,
            fields: [
                { key: 'gstCertificate', label: 'GST Certificate', required: true },
                { key: 'incorporationCertificate', label: 'Incorporation Certificate (Optional)', required: false }
            ],
            textFields: [
                { key: 'gstNumber', label: 'GSTIN', type: 'text', placeholder: 'Enter GSTIN (e.g., 22AAAAA0000A1Z5)', required: true },
                { key: 'cinOrLlpin', label: 'CIN or LLPIN (Optional)', type: 'text', placeholder: 'Enter CIN or LLPIN', required: false }
            ]
        }
    ];

    // Step 3: PESO & NEERI Sections
    const step3Sections = [
        {
            title: 'PESO LE-1 License (Manufacturing)',
            icon: FaIndustry,
            fields: [
                { key: 'le1Manufacturing', label: 'LE-1 Manufacturing License', required: false }
            ],
            textFields: [
                { key: 'le1LicenseNumber', label: 'License Number', type: 'text', placeholder: 'Enter LE-1 license number', required: false },
                { key: 'le1ExpiryDate', label: 'Expiry Date', type: 'date', required: false }
            ]
        },
        {
            title: 'PESO LE-2 License (Shop)',
            icon: FaStoreLicense,
            fields: [
                { key: 'le2Shop', label: 'LE-2 Shop License', required: false }
            ],
            textFields: [
                { key: 'le2LicenseNumber', label: 'License Number', type: 'text', placeholder: 'Enter LE-2 license number', required: false },
                { key: 'le2ExpiryDate', label: 'Expiry Date', type: 'date', required: false }
            ]
        },
        {
            title: 'PESO LE-3 License (Storage)',
            icon: FaWarehouse,
            fields: [
                { key: 'le3Storage', label: 'LE-3 Storage License', required: false }
            ],
            textFields: [
                { key: 'le3LicenseNumber', label: 'License Number', type: 'text', placeholder: 'Enter LE-3 license number', required: false },
                { key: 'le3ExpiryDate', label: 'Expiry Date', type: 'date', required: false }
            ]
        },
        {
            title: 'PESO LE-5/LE-6 License (Sale/Transport)',
            icon: FaTruck,
            fields: [
                { key: 'le5Le6SaleTransport', label: 'LE-5/LE-6 Sale/Transport License', required: false }
            ],
            textFields: [
                { key: 'le5Le6LicenseNumber', label: 'License Number', type: 'text', placeholder: 'Enter LE-5/LE-6 license number', required: false },
                { key: 'le5Le6ExpiryDate', label: 'Expiry Date', type: 'date', required: false }
            ]
        },
        {
            title: 'NEERI QR Certification',
            icon: FaCertificate,
            fields: [
                { key: 'neeriQRCertificate', label: 'NEERI QR Certificate', required: false }
            ],
            textFields: [
                { key: 'neeriQRNumber', label: 'Certification Number', type: 'text', placeholder: 'Enter NEERI QR certification number', required: false },
                { key: 'neeriQRExpiry', label: 'Expiry Date', type: 'date', required: false }
            ]
        }
    ];

    if (isSubmitted) {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-white overflow-hidden">
      <div className="w-full h-full flex flex-col md:flex-row">
        <div className="w-full md:w-[40%] h-[35%] md:h-full bg-[#0f172a] flex items-center justify-center relative px-6 sm:px-10 md:px-12 lg:px-20">
          <div className="absolute -top-32 -left-32 w-[26rem] h-[26rem] bg-orange-500/10 rounded-full blur-[120px]" />
          <div className="absolute -bottom-32 -right-32 w-[26rem] h-[26rem] bg-orange-500/20 rounded-full blur-[120px]" />

          <div className="relative z-10 text-center space-y-6 max-w-sm">
            <div className="mx-auto flex items-center justify-center w-24 h-24 rounded-[2.2rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
              <MdStore className="w-11 h-11 text-orange-500" />
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                Welcome to the Community
              </h1>
              <p className="text-slate-400 text-sm lg:text-base">
                Your details are being securely verified by our compliance team.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[60%] h-[65%] md:h-full flex items-center justify-center px-6 sm:px-10 md:px-16 lg:px-24 overflow-y-auto">
          <div className="w-full max-w-2xl space-y-8 py-10">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-[10px] font-semibold uppercase tracking-wide border border-green-100">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Registration Confirmed
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Application Under Review
              </h2>

              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                We have received your documents. Our team will manually review and verify the submitted information.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
                Verification Stages
              </h3>

              <div className="grid gap-3">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex gap-4">
                  <div className="relative flex flex-col items-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-orange-500 ring-4 ring-orange-50 z-10" />
                    <div className="w-px h-full bg-gray-200 absolute top-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Document Validation
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      KYC, PAN, and GST documents review.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-gray-100 flex gap-4">
                  <div className="relative flex flex-col items-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-gray-300 z-10" />
                    <div className="w-px h-full bg-gray-200 absolute top-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-400">
                      License Verification
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      PESO license authenticity check.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-gray-100 flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-gray-300 z-10" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-400">
                      Store Activation
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Dashboard access after approval.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-2xl border border-orange-100">
              <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center text-orange-600">
                <MdEmail className="w-5 h-5" />
              </div>
              <p className="text-sm text-orange-900 leading-relaxed">
                Verification usually takes
                <span className="font-semibold ml-1">2–3 business days</span>.
                Updates will be sent to your registered email address.
              </p>
            </div>

            <button
              onClick={() => navigate("/")}
              className="w-full py-4 bg-[#0f172a] text-white font-semibold text-sm rounded-2xl hover:bg-slate-800 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <span>Go to Homepage</span>
              <MdArrowForward className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-50 flex items-center justify-center p-3 sm:p-4 md:p-6 py-6 sm:py-8">
            <div className="w-full max-w-5xl">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 shadow-lg">
                        <MdStore className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 px-4">Seller Registration</h1>
                    <p className="text-sm sm:text-base text-gray-600 px-4">Complete registration with KYC in 3 simple steps</p>
                </div>

                {/* Progress Steps */}
                <div className="mb-6 sm:mb-8">
                    <div className="flex items-center justify-center gap-4">
                        {[1, 2, 3].map((step) => (
                            <div key={step} className="flex items-center">
                                <div className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full font-bold text-sm sm:text-base transition-all ${currentStep >= step
                                    ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg'
                                    : 'bg-gray-200 text-gray-500'
                                    }`}>
                                    {step}
                                </div>
                                {step < totalSteps && (
                                    <div className={`w-12 sm:w-20 h-1 mx-2 rounded-full transition-all ${currentStep > step ? 'bg-orange-500' : 'bg-gray-200'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center gap-4 mt-3">
                        <span className={`text-xs sm:text-sm font-semibold ${currentStep === 1 ? 'text-orange-600' : 'text-gray-500'}`}>
                            Basic Info
                        </span>
                        <span className="text-xs sm:text-sm text-gray-300">•</span>
                        <span className={`text-xs sm:text-sm font-semibold ${currentStep === 2 ? 'text-orange-600' : 'text-gray-500'}`}>
                            KYC Documents
                        </span>
                        <span className="text-xs sm:text-sm text-gray-300">•</span>
                        <span className={`text-xs sm:text-sm font-semibold ${currentStep === 3 ? 'text-orange-600' : 'text-gray-500'}`}>
                            PESO & Certifications
                        </span>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 md:p-8">
                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 sm:mb-6 bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg">
                            <p className="text-xs sm:text-sm font-medium">{error}</p>
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="mb-4 sm:mb-6 bg-green-50 border border-green-200 text-green-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg">
                            <p className="text-xs sm:text-sm font-medium">{success}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-5 sm:space-y-6">
                        {/* STEP 1: Basic Registration */}
                        {currentStep === 1 && (
                            <div className="space-y-5 sm:space-y-6">
                                {/* Business Information */}
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex items-center gap-2 pb-2 sm:pb-3 border-b border-gray-200">
                                        <MdBusiness className="text-orange-600 text-lg sm:text-xl" />
                                        <h2 className="text-base sm:text-lg font-bold text-gray-900">Business Information</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                        <div>
                                            <label className={labelClasses}>Business Name *</label>
                                            <input
                                                type="text"
                                                name="businessName"
                                                value={registrationData.businessName}
                                                onChange={handleRegistrationChange}
                                                className={inputClasses}
                                                placeholder="Enter your business name"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClasses}>Business Type *</label>
                                            <select
                                                name="businessType"
                                                value={registrationData.businessType}
                                                onChange={handleRegistrationChange}
                                                className={inputClasses}
                                                required
                                            >
                                                <option value="">Select business type</option>
                                                <option value="manufacturer">Manufacturer</option>
                                                <option value="wholesaler">Wholesaler</option>
                                                <option value="retailer">Retailer</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelClasses}>Business Address *</label>
                                        <textarea
                                            name="businessAddress"
                                            value={registrationData.businessAddress}
                                            onChange={handleRegistrationChange}
                                            className={inputClasses}
                                            placeholder="Complete business address"
                                            rows="3"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                                        <div>
                                            <label className={labelClasses}>City *</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={registrationData.city}
                                                onChange={handleRegistrationChange}
                                                className={inputClasses}
                                                placeholder="City"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClasses}>State *</label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={registrationData.state}
                                                onChange={handleRegistrationChange}
                                                className={inputClasses}
                                                placeholder="State"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClasses}>Pincode *</label>
                                            <input
                                                type="text"
                                                name="pincode"
                                                value={registrationData.pincode}
                                                onChange={handleRegistrationChange}
                                                className={inputClasses}
                                                placeholder="XXXXXX"
                                                pattern="[0-9]{6}"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Owner Information */}
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex items-center gap-2 pb-2 sm:pb-3 border-b border-gray-200">
                                        <MdPerson className="text-orange-600 text-lg sm:text-xl" />
                                        <h2 className="text-base sm:text-lg font-bold text-gray-900">Owner Information</h2>
                                    </div>

                                    <div>
                                        <label className={labelClasses}>Owner Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={registrationData.name}
                                            onChange={handleRegistrationChange}
                                            className={inputClasses}
                                            placeholder="Full name of business owner"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                        <div>
                                            <label className={labelClasses}>Email Address *</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                                                    <MdEmail className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                                </div>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={registrationData.email}
                                                    onChange={handleRegistrationChange}
                                                    className={`${inputClasses} pl-10 sm:pl-11`}
                                                    placeholder="business@example.com"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className={labelClasses}>Phone Number *</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                                                    <MdPhone className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                                </div>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={registrationData.phone}
                                                    onChange={handleRegistrationChange}
                                                    className={`${inputClasses} pl-10 sm:pl-11`}
                                                    placeholder="+91 98765 43210"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Security */}
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex items-center gap-2 pb-2 sm:pb-3 border-b border-gray-200">
                                        <MdLock className="text-orange-600 text-lg sm:text-xl" />
                                        <h2 className="text-base sm:text-lg font-bold text-gray-900">Security</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                        <div>
                                            <label className={labelClasses}>Password *</label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={registrationData.password}
                                                onChange={handleRegistrationChange}
                                                className={inputClasses}
                                                placeholder="Create a strong password (min 8 characters)"
                                                minLength="8"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClasses}>Confirm Password *</label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={registrationData.confirmPassword}
                                                onChange={handleRegistrationChange}
                                                className={inputClasses}
                                                placeholder="Re-enter your password"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: Basic KYC Documents */}
                        {currentStep === 2 && (
                            <div className="space-y-5 sm:space-y-6">
                                {step2Sections.map((section, index) => {
                                    const SectionIcon = section.icon;
                                    return (
                                        <div key={index} className="space-y-3 sm:space-y-4">
                                            <div className="flex items-center gap-2 pb-2 sm:pb-3 border-b border-gray-200">
                                                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                                    <SectionIcon className="w-4 h-4 text-orange-600" />
                                                </div>
                                                <h2 className="text-base sm:text-lg font-bold text-gray-900">{section.title}</h2>
                                            </div>

                                            {/* Text Fields */}
                                            {section.textFields && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                                    {section.textFields.map(field => (
                                                        <div key={field.key}>
                                                            <label className={labelClasses}>
                                                                {field.label} {field.required && <span className="text-red-500">*</span>}
                                                            </label>
                                                            <input
                                                                type={field.type}
                                                                value={kycData[field.key] || ''}
                                                                onChange={(e) => handleKycTextChange(field.key, e.target.value)}
                                                                placeholder={field.placeholder}
                                                                className={inputClasses}
                                                                required={field.required}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* File Upload Fields */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                                {section.fields.map(field => (
                                                    <div key={field.key}>
                                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                                            {field.label} {field.required && <span className="text-red-500">*</span>}
                                                        </label>
                                                        {!previews[field.key] ? (
                                                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-orange-500 transition-colors cursor-pointer">
                                                                <input
                                                                    type="file"
                                                                    accept="image/*,.pdf"
                                                                    onChange={(e) => handleFileChange(field.key, e.target.files[0])}
                                                                    className="hidden"
                                                                    id={`upload-${field.key}`}
                                                                />
                                                                <label htmlFor={`upload-${field.key}`} className="cursor-pointer">
                                                                    <MdUploadFile className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                                                    <p className="text-xs text-gray-600">Click to upload</p>
                                                                    <p className="text-xs text-gray-400">PNG, JPG, PDF (Max 5MB)</p>
                                                                </label>
                                                            </div>
                                                        ) : (
                                                            <div className="relative">
                                                                <img
                                                                    src={previews[field.key]}
                                                                    alt={field.label}
                                                                    className="w-full h-32 object-cover rounded-lg"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveFile(field.key)}
                                                                    className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                                                >
                                                                    <MdClose className="w-3 h-3" />
                                                                </button>
                                                                <div className="absolute bottom-1 left-1 px-2 py-0.5 bg-black/70 text-white text-xs rounded">
                                                                    ✓ Uploaded
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Important Note */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <p className="text-xs sm:text-sm text-blue-800">
                                        <strong>ℹ️ Required Documents:</strong> PAN Card, Aadhaar (Front & Back), and GST Certificate are mandatory. Incorporation Certificate is optional.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: PESO Licenses & NEERI QR */}
                        {currentStep === 3 && (
                            <div className="space-y-5 sm:space-y-6">
                                {step3Sections.map((section, index) => {
                                    const SectionIcon = section.icon;
                                    return (
                                        <div key={index} className="space-y-3 sm:space-y-4">
                                            <div className="flex items-center gap-2 pb-2 sm:pb-3 border-b border-gray-200">
                                                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                                    <SectionIcon className="w-4 h-4 text-orange-600" />
                                                </div>
                                                <h2 className="text-base sm:text-lg font-bold text-gray-900">{section.title}</h2>
                                            </div>

                                            {/* Text Fields */}
                                            {section.textFields && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                                    {section.textFields.map(field => (
                                                        <div key={field.key}>
                                                            <label className={labelClasses}>
                                                                {field.label}
                                                            </label>
                                                            <input
                                                                type={field.type}
                                                                value={kycData[field.key] || ''}
                                                                onChange={(e) => handleKycTextChange(field.key, e.target.value)}
                                                                placeholder={field.placeholder}
                                                                className={inputClasses}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* File Upload Fields */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                                {section.fields.map(field => (
                                                    <div key={field.key}>
                                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                                            {field.label}
                                                        </label>
                                                        {!previews[field.key] ? (
                                                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-orange-500 transition-colors cursor-pointer">
                                                                <input
                                                                    type="file"
                                                                    accept="image/*,.pdf"
                                                                    onChange={(e) => handleFileChange(field.key, e.target.files[0])}
                                                                    className="hidden"
                                                                    id={`upload-${field.key}`}
                                                                />
                                                                <label htmlFor={`upload-${field.key}`} className="cursor-pointer">
                                                                    <MdUploadFile className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                                                    <p className="text-xs text-gray-600">Click to upload</p>
                                                                    <p className="text-xs text-gray-400">PNG, JPG, PDF (Max 5MB)</p>
                                                                </label>
                                                            </div>
                                                        ) : (
                                                            <div className="relative">
                                                                <img
                                                                    src={previews[field.key]}
                                                                    alt={field.label}
                                                                    className="w-full h-32 object-cover rounded-lg"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveFile(field.key)}
                                                                    className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                                                >
                                                                    <MdClose className="w-3 h-3" />
                                                                </button>
                                                                <div className="absolute bottom-1 left-1 px-2 py-0.5 bg-black/70 text-white text-xs rounded">
                                                                    ✓ Uploaded
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Important Note */}
                                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 space-y-2">
                                    <p className="text-xs sm:text-sm text-orange-800">
                                        <strong>ℹ️ Optional Documents:</strong> PESO licenses and NEERI QR certification are optional. Upload only the licenses applicable to your business type.
                                    </p>
                                    <p className="text-xs sm:text-sm text-orange-800">
                                        <strong>⏱️ Verification Timeline:</strong> All submitted documents will be verified by our team. Please note that the verification process typically takes 2-3 working days. You will be notified via email once your account is approved.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4">
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center gap-2"
                                >
                                    <MdArrowBack className="w-4 h-4 sm:w-5 sm:h-5" />
                                    Back
                                </button>
                            )}

                            {currentStep < totalSteps ? (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    disabled={checkingEmail}
                                    className={`w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-white font-semibold rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 ${checkingEmail
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-orange-500/30 hover:shadow-xl'
                                        }`}
                                >
                                    {checkingEmail && currentStep === 1 ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Validating...
                                        </>
                                    ) : (
                                        <>
                                            {currentStep === 1 ? 'Next: KYC Documents' : 'Next: PESO & Certifications'}
                                            <MdArrowForward className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </>
                                    )}
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-white font-semibold rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 ${loading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-orange-500/30 hover:shadow-xl'
                                        }`}
                                >
                                    {loading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Registering...
                                        </>
                                    ) : (
                                        <>
                                            <MdCheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                            Complete Registration
                                        </>
                                    )}
                                </button>
                            )}
                        </div>

                        {/* Login Link */}
                        <p className="text-center text-xs sm:text-sm text-gray-600 pt-3 sm:pt-4">
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => navigate('/seller-login')}
                                className="font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                            >
                                Sign In
                            </button>
                        </p>

                        {/* Clear Form Option */}
                        {(localStorage.getItem('sellerRegData') || localStorage.getItem('sellerKycData')) && (
                            <div className="text-center pt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        showToast.confirm("Are you sure you want to clear all saved form data?", () => {
                                            clearFormData();
                                            window.location.reload();
                                        });
                                    }}
                                    className="text-xs text-gray-500 hover:text-red-600 transition-colors underline"
                                >
                                    Clear Saved Form Data
                                </button>
                            </div>
                        )}
                    </form>
                </div>

                {/* Info Note - Data Saved */}
                {(localStorage.getItem('sellerRegData') || localStorage.getItem('sellerKycData')) && (
                    <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-xs sm:text-sm text-blue-800">
                            <strong>ℹ️ Form data saved:</strong> Your progress has been saved. You can safely close this page and return later to continue your registration.
                        </p>
                        <p className="text-xs text-blue-700 mt-1">
                            <strong>⏱️ Note:</strong> Saved data will automatically be deleted after 5 minutes of inactivity for security.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SellerRegister;

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Translate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isTranslateLoaded, setIsTranslateLoaded] = useState(false);
  const [hoverLanguage, setHoverLanguage] = useState("");
  const languageMenuRef = useRef(null);

  // Languages with native names in their scripts
  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', nativeName: 'हिंदी', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', nativeName: 'मराठी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', nativeName: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', nativeName: 'తెలుగు', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'zh-cn', name: 'Chinese (Simplified)', nativeName: '中文', flag: '🇨🇳' },
    { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृत', flag: '🇮🇳' },
  ];

  // Initialize Google Translate
  useEffect(() => {
    // Remove any existing Google Translate elements
    const existingElement = document.getElementById('google_translate_element');
    if (existingElement) {
      existingElement.remove();
    }

    // Create new container for Google Translate
    const googleTranslateElement = document.createElement('div');
    googleTranslateElement.id = 'google_translate_element';
    googleTranslateElement.style.display = 'none';
    document.body.appendChild(googleTranslateElement);

    // Function to initialize Google Translate
    window.googleTranslateElementInit = function() {
      try {
        if (window.google?.translate) {
          // Get saved language or default to English
          const savedLang = localStorage.getItem('googtrans') || '/en/en';
          
          console.log('Initializing Google Translate with saved language:', savedLang);
          
          // Initialize Google Translate with explicit Chinese support
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'en,hi,mr,ta,te,kn,gu,fr,ru,de,es,zh-CN,zh-cn,sa',
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
              multilanguagePage: true
            },
            'google_translate_element'
          );

          // Wait for Google Translate to load, then set language
          setTimeout(() => {
            const googleTranslateCombo = document.querySelector('.goog-te-combo');
            if (googleTranslateCombo) {
              console.log('Google Translate combo found, available languages:');
              for (let i = 0; i < googleTranslateCombo.options.length; i++) {
                console.log(`Option ${i}: ${googleTranslateCombo.options[i].value} - ${googleTranslateCombo.options[i].text}`);
              }
            }
            
            // Set language to saved one or default to English
            if (savedLang) {
              const langCode = savedLang.split('/').pop() || 'en';
              console.log('Setting current language to:', langCode);
              setCurrentLanguage(langCode === 'zh-CN' ? 'zh-cn' : langCode);
              document.cookie = `googtrans=${savedLang};path=/;domain=${window.location.hostname}`;
              document.documentElement.lang = langCode === 'zh-CN' ? 'zh-cn' : langCode;
            }
          }, 1000);
          
          setIsTranslateLoaded(true);
        }
      } catch (error) {
        console.error('Error initializing Google Translate:', error);
        setIsTranslateLoaded(true);
      }
    };

    // Add Google Translate script if not already added
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.onerror = () => {
        console.error('Failed to load Google Translate script');
        setIsTranslateLoaded(true);
      };
      document.body.appendChild(script);
    }

    const handleClickOutside = (event) => {
      if (isOpen && languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (langCode) => {
    // Don't do anything if already on this language
    if (currentLanguage === langCode) {
      setIsOpen(false);
      return;
    }
    
    console.log('Changing language to:', langCode); // Debug log
    
    // Special handling for Chinese - multiple methods
    if (langCode === 'zh-cn') {
      console.log('Applying Chinese translation methods...');
      
      // Method 1: Direct Google Translate URL redirect
      const currentUrl = window.location.href;
      const translateUrl = `https://translate.google.com/translate?sl=en&tl=zh-CN&u=${encodeURIComponent(currentUrl)}`;
      
      // Method 2: Try to use Google Translate combo
      const googleTranslateCombo = document.querySelector('.goog-te-combo');
      if (googleTranslateCombo) {
        console.log('Found Google Translate combo, trying to set Chinese...');
        // Find and select the Chinese option
        for (let i = 0; i < googleTranslateCombo.options.length; i++) {
          const option = googleTranslateCombo.options[i];
          console.log(`Checking option ${i}: ${option.value} - ${option.text}`);
          if (option.value === 'zh-CN' || 
              option.value === 'zh-cn' ||
              option.text.toLowerCase().includes('chinese') ||
              option.text.includes('中文') ||
              option.text.includes('中国')) {
            console.log('Found Chinese option, setting it...');
            googleTranslateCombo.value = option.value;
            googleTranslateCombo.dispatchEvent(new Event('change'));
            break;
          }
        }
      }
      
      // Method 3: Update storage and reload
      localStorage.setItem('googtrans', '/en/zh-cn');
      document.cookie = `googtrans=/en/zh-cn;path=/;domain=${window.location.hostname}`;
      document.documentElement.lang = 'zh-cn';
      
      // Method 4: Try to trigger Google Translate manually
      setTimeout(() => {
        const translateElement = document.querySelector('#google_translate_element');
        if (translateElement) {
          const selectElement = translateElement.querySelector('select');
          if (selectElement) {
            console.log('Found translate select, trying Chinese options...');
            for (let i = 0; i < selectElement.options.length; i++) {
              if (selectElement.options[i].value === 'zh-CN' || 
                  selectElement.options[i].value === 'zh-cn') {
                selectElement.value = selectElement.options[i].value;
                selectElement.dispatchEvent(new Event('change'));
                console.log('Chinese translation triggered via select element');
                break;
              }
            }
          }
        }
      }, 200);
      
      // Update UI
      setCurrentLanguage('zh-cn');
      setIsOpen(false);
      
      // Force reload after delay to allow translation to apply
      setTimeout(() => {
        console.log('Reloading page for Chinese translation...');
        window.location.reload();
      }, 1000);
      return;
    }
    
    // Handle other languages normally
    const newLang = langCode === 'en' ? '' : `/${langCode}`;
    const googtransValue = `/en${newLang}`;
    
    // Save language preference
    localStorage.setItem('googtrans', googtransValue);
    document.cookie = `googtrans=${googtransValue};path=/;domain=${window.location.hostname}`;
    
    // Update HTML lang attribute
    document.documentElement.lang = langCode;
    
    // Update UI
    setCurrentLanguage(langCode);
    setIsOpen(false);
    
    // Force a page reload to apply the translation
    console.log('Reloading page for translation:', googtransValue); // Debug log
    window.location.reload();
  };

  const getFlagEmoji = (langCode) => {
    const flagMap = {
      en: "🇺🇸",
      hi: "🇮🇳",
      mr: "🇮🇳",
      kn: "🇮🇳",
      te: "🇮🇳",
      fr: "🇫🇷",
      ru: "🇷🇺",
      de: "🇩🇪",
      es: "🇪🇸",
      'zh-cn': "🇨🇳",
      gu: "🇮🇳",
      ta: "🇮🇳",
      sa: "🇮🇳",
    };
    
    return flagMap[langCode] || "🌐";
  };

  const getLanguageFullName = (langCode) => {
    const language = languages.find(lang => lang.code === langCode);
    return language ? language.nativeName : "Unknown";
  };

  return (
    <>
      <div id="google_translate_element" style={{ position: 'absolute', top: '-9999px', left: '-9999px', width: '1px', height: '1px' }}></div>
      
      <div className="fixed bottom-2 left-6 z-50 language-selector-container">
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              ref={languageMenuRef}
              className="bg-white rounded-2xl shadow-2xl mb-4 p-2 border border-gray-100"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="max-h-64 sm:max-h-80 overflow-y-auto rounded-xl p-1">
                {languages.map((lang) => (
                  <motion.button
                    key={lang.code}
                    className={`block w-full text-left px-4 py-3 rounded-xl transition-all flex items-center space-x-3 cursor-pointer ${
                      currentLanguage === lang.code ? "text-[#1B9AAA] bg-[#CCE7EC] shadow-md" : "hover:bg-gray-50 hover:text-[#1B9AAA] hover:shadow-md"
                    }`}
                    onClick={() => changeLanguage(lang.code)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={() => setHoverLanguage(lang.code)}
                    onMouseLeave={() => setHoverLanguage("")}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="font-medium" style={{
                      color: currentLanguage === lang.code ? '#1B9AAA' : '#020509'
                    }}>{lang.nativeName}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          onClick={toggleDrawer}
          className="relative group overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={isTranslateLoaded ? { y: [10, 0] } : { opacity: 0.8 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div 
            className="relative z-10 bg-white text-gray-600 rounded-full shadow-lg flex flex-col items-center justify-center focus:outline-none text-[#147783] hover:bg-[#1B9AAA] hover:text-white transition-all cursor-pointer font-semibold font-sans"
            animate={{ 
              boxShadow: isOpen 
                ? "0 10px 25px -5px rgba(27, 154, 170, 0.5)" 
                : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
            }}
            whileHover={{ 
              boxShadow: "0 20px 25px -5px rgba(27, 154, 170, 0.4)"
            }}
            style={{
              width: isOpen ? "4rem" : "3.5rem",
              height: isOpen ? "4rem" : "3.5rem",
            }}
          >
            <span className="text-2xl mb-1">{getFlagEmoji(currentLanguage)}</span>
            <span className="text-xs font-semibold">{currentLanguage.toUpperCase()}</span>
          </motion.div>
        </motion.button>
        
        <AnimatePresence>
          {!isOpen && (
            <motion.div 
              className="absolute top-1/2 -translate-y-1/2 left-full ml-3"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -5 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white rounded-lg shadow-md py-1 px-3 text-sm whitespace-nowrap">
                <span className="text-gray-600">{getLanguageFullName(currentLanguage)}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Translate;

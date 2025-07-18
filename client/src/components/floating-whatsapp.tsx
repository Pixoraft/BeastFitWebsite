export default function FloatingWhatsApp() {
  const openWhatsApp = () => {
    window.open('https://wa.me/919111606607?text=Hi! I have a question about BeastFit Arena.', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button 
        onClick={openWhatsApp}
        className="bg-green-500 hover:bg-green-600 w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl shadow-lg animate-pulse-slow transition-all hover:scale-110"
        aria-label="Chat with us on WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </button>
    </div>
  );
}

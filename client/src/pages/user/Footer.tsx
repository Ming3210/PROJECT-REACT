import React from "react";

export default function Footer() {
  return (
    <footer className="mt-10 bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="text-white font-semibold mb-3">Furnicraft</h4>
          <p className="text-sm">Nâng tầm không gian sống với nội thất chất lượng.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Liên hệ</h4>
          <p className="text-sm">Email: support@furnicraft.vn</p>
          <p className="text-sm">Hotline: 1900 1234</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Theo dõi</h4>
          <p className="text-sm">Facebook, Instagram, Zalo</p>
        </div>
      </div>
      <div className="text-center text-xs py-3 border-t border-gray-800">© 2025 Furnicraft</div>
    </footer>
  );
}


